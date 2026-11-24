// 旁译下载按钮：版本、日期、大小、SHA256 从 /latest.json 读取（发版后由
// 网站仓库的 pangyi-manifest workflow 自动更新）。
// 主下载按钮指向 latest.json 的 url：配好 R2 后是 https://download.eyuxq.com 直链，
// 未配置时仍是 GitHub Release。mirrors 里与主链不同的 HTTPS 地址显示为「备用下载」。
// SHA256 仍写在按钮下方。读取失败时，按钮保持指向 GitHub Releases，不显示校验信息。
(function(){
  var btn=document.getElementById('pangyi-dl');
  var ver=document.getElementById('pangyi-ver');
  var meta=document.getElementById('pangyi-meta');
  var mirror=document.getElementById('pangyi-mirror');
  if(!btn||!ver||!meta) return;
  function https(url){return typeof url==='string'&&/^https:\/\//i.test(url);}
  fetch('/latest.json',{cache:'no-cache'})
    .then(function(r){ if(!r.ok) throw new Error('manifest '+r.status); return r.json(); })
    .then(function(m){
      if(!m||!m.version||!m.url) throw new Error('bad manifest');
      if(https(m.url)){
        btn.setAttribute('href',m.url);
        btn.setAttribute('download','pangyi-v'+m.version+'.exe');
        btn.removeAttribute('target');
        btn.removeAttribute('rel');
      }
      ver.textContent='v'+m.version;
      var size=m.size>0?(m.size/1048576).toFixed(1)+' MB':'';
      var parts=['更新于 '+(m.released||'')];
      if(size) parts.push(size);
      if(m.sha256) parts.push('SHA256 '+m.sha256);
      meta.hidden=false;
      meta.textContent=parts.join(' · ');
      var alt='';
      var list=m.mirrors||[];
      for(var i=0;i<list.length;i++){
        if(https(list[i])&&list[i]!==m.url){alt=list[i];break;}
      }
      if(mirror){
        if(alt){
          mirror.setAttribute('href',alt);
          mirror.hidden=false;
        }else{
          mirror.hidden=true;
        }
      }
    })
    .catch(function(){
      // 读取失败时保持 GitHub Releases 回退链接，版本与校验信息不显示。
    });
})();
