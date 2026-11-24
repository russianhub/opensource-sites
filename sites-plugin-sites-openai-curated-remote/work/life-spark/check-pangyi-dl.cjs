const fs=require('fs');
const vm=require('vm');
const assert=require('assert');

const code=fs.readFileSync('dist/pangyi-dl.js','utf8');
assert(!code.includes('innerHTML'),'pangyi-dl must not inject HTML');
assert(code.includes("btn.setAttribute('href',m.url)"),'primary button must follow manifest url');

function element(initial){
  const state={attrs:Object.assign({},initial&&initial.attrs),hidden:!!(initial&&initial.hidden),text:''};
  return {
    state,
    api:{
      get hidden(){return state.hidden},
      set hidden(value){state.hidden=value},
      setAttribute(key,value){state.attrs[key]=String(value)},
      removeAttribute(key){delete state.attrs[key]},
      get textContent(){return state.text},
      set textContent(value){state.text=String(value)}
    }
  };
}

function run(manifest,fetchImpl){
  const btn=element({attrs:{href:'https://github.com/russianhub/pangyi/releases/latest',target:'_blank',rel:'noopener'}});
  const ver=element();
  const meta=element({hidden:true});
  const mirror=element({attrs:{href:'https://github.com/russianhub/pangyi/releases/latest',target:'_blank',rel:'noopener'},hidden:true});
  const map={
    'pangyi-dl':btn.api,
    'pangyi-ver':ver.api,
    'pangyi-meta':meta.api,
    'pangyi-mirror':mirror.api
  };
  const sandbox={
    document:{getElementById(id){return map[id]||null}},
    fetch:fetchImpl||(()=>Promise.resolve({ok:true,json:()=>Promise.resolve(manifest)}))
  };
  vm.runInNewContext(code,sandbox,{filename:'pangyi-dl.js'});
  return new Promise(resolve=>setImmediate(resolve)).then(()=>({btn:btn.state,ver:ver.state,meta:meta.state,mirror:mirror.state}));
}

(async()=>{
  const r2='https://download.eyuxq.com/pangyi-v4.19.0.exe';
  const github='https://github.com/russianhub/pangyi/releases/download/v4.19.0/pangyi-v4.19.0.exe';
  const withMirror=await run({
    version:'4.19.0',
    released:'2026-11-19',
    url:r2,
    mirrors:[github,'http://insecure.example/pangyi.exe',r2],
    sha256:'abc123',
    size:1048576
  });
  assert.equal(withMirror.btn.attrs.href,r2,'primary href is the R2 url');
  assert.equal(withMirror.btn.attrs.download,'pangyi-v4.19.0.exe');
  assert.equal(withMirror.btn.attrs.target,undefined,'direct download drops the new-tab target');
  assert.equal(withMirror.ver.text,'v4.19.0');
  assert.ok(withMirror.meta.text.includes('SHA256 abc123'),'checksum stays visible');
  assert.equal(withMirror.meta.hidden,false);
  assert.equal(withMirror.mirror.hidden,false,'first different https mirror is shown');
  assert.equal(withMirror.mirror.attrs.href,github);
  assert.equal(withMirror.mirror.attrs.rel,'noopener');

  const noMirror=await run({
    version:'4.19.0',
    released:'2026-11-19',
    url:github,
    mirrors:[],
    sha256:'abc123',
    size:193165312
  });
  assert.equal(noMirror.btn.attrs.href,github);
  assert.equal(noMirror.mirror.hidden,true,'empty mirrors keep the backup link hidden');
  assert.ok(noMirror.meta.text.includes('184.2 MB'));

  const sameMirror=await run({version:'4.19.0',url:r2,mirrors:[r2],sha256:'abc',size:1});
  assert.equal(sameMirror.mirror.hidden,true,'a mirror identical to the primary url stays hidden');

  const failed=await run(null,()=>Promise.reject(new Error('offline')));
  assert.equal(failed.btn.attrs.href,'https://github.com/russianhub/pangyi/releases/latest');
  assert.equal(failed.meta.hidden,true);
  assert.equal(failed.mirror.hidden,true);

  console.log('Passed: pangyi download button uses manifest url, shows one HTTPS mirror, and keeps SHA256.');
})().catch(error=>{
  console.error(error);
  process.exit(1);
});
