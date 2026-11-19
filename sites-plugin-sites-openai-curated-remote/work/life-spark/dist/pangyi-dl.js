// 旁译下载按钮：版本、日期、大小、SHA256 从 /latest.json 读取（发版后由
// pangyi 仓库的 publish-manifest workflow 自动更新）。
// 读取失败（例如尚未发布第一版）时，按钮保持指向 GitHub Releases，不显示校验信息。
(function(){
  var btn=document.getElementById('pangyi-dl');
  var ver=document.getElementById('pangyi-ver');
  var meta=document.getElementById('pangyi-meta');
  if(!btn||!ver||!meta) return;
  fetch('/latest.json',{cache:'no-cache'})
    .then(function(r){ if(!r.ok) throw new Error('manifest '+r.status); return r.json(); })
    .then(function(m){
      if(!m||!m.version||!m.url) throw new Error('bad manifest');
      btn.setAttribute('href','/download/pangyi-latest.exe');
      btn.setAttribute('download','pangyi-latest.exe');
      btn.removeAttribute('target');
      btn.removeAttribute('rel');
      ver.textContent='v'+m.version;
      var size=m.size>0?(m.size/1048576).toFixed(1)+' MB':'';
      var parts=['更新于 '+(m.released||'')];
      if(size) parts.push(size);
      if(m.sha256) parts.push('SHA256 '+m.sha256);
      meta.hidden=false;
      meta.textContent=parts.join(' · ');
    })
    .catch(function(){
      // 读取失败时保持 GitHub Releases 回退链接，版本与校验信息不显示。
    });
})();
