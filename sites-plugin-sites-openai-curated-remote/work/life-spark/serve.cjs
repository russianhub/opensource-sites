const http=require('http'),fs=require('fs'),path=require('path');
const root=path.join(__dirname,'dist');
const types={
  '.html':'text/html;charset=utf-8',
  '.css':'text/css;charset=utf-8',
  '.js':'text/javascript;charset=utf-8',
  '.mjs':'text/javascript;charset=utf-8',
  '.webp':'image/webp',
  '.jpg':'image/jpeg',
  '.jpeg':'image/jpeg',
  '.png':'image/png',
  '.svg':'image/svg+xml',
  '.ico':'image/x-icon',
  '.json':'application/json',
  '.xml':'application/xml;charset=utf-8',
  '.txt':'text/plain;charset=utf-8',
  '.webmanifest':'application/manifest+json'
};
const port=Number(process.argv[2])||4173;
http.createServer((req,res)=>{
  let p=decodeURIComponent((req.url||'/').split('?')[0]);
  if(p.endsWith('/'))p+='index.html';
  const file=path.join(root,p);
  if(!file.startsWith(root)){res.writeHead(403).end('Forbidden');return}
  fs.readFile(file,(e,d)=>{
    if(e){
      fs.readFile(path.join(root,'404.html'),(e2,d2)=>{
        if(e2){res.writeHead(404,{'content-type':'text/plain;charset=utf-8'}).end('404 Not Found');return}
        res.writeHead(404,{'content-type':'text/html;charset=utf-8','cache-control':'no-cache'});
        res.end(d2);
      });
      return;
    }
    res.writeHead(200,{'content-type':types[path.extname(file).toLowerCase()]||'application/octet-stream','cache-control':'no-cache'});
    res.end(d);
  });
}).listen(port,'127.0.0.1',()=>console.log('预览地址: http://127.0.0.1:'+port+'/'));
