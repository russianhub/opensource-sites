const CACHE='russian-world-v54';
const CORE=['./','./index.html','./agent.html','./agent.js?v=2','./mascot.js?v=1','./dashboard.html','./roadmap.html','./vocabulary.html','./practice.html','./resources.html','./about.html','./submit.html','./status.html','./test.html','./auth.html','./account.html','./admin.html','./style.css?v=48','./app.js?v=18','./auth-config.js?v=2','./auth-client.js?v=2','./auth-pages.js?v=3','./art.js','./russian-data.js?v=7','./favicon.svg','./favicon-32.png','./favicon-180.png','./pwa-192.png','./pwa-512.png','./pwa-maskable-512.png','./assets/mascot.svg?v=1','./assets/engine-icons/baidu.svg','./assets/engine-icons/bing.svg','./assets/engine-icons/google.svg','./assets/engine-icons/yandex.svg','./assets/engine-icons/youtube.svg','./assets/pangyi/icon-128.png','./assets/pangyi/candidate-window.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||new URL(request.url).origin!==location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy));return response}).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(request,copy))}return response})));
});
