(function(){
  'use strict';
  const dock=document.querySelector('.mascot-dock');
  if(!dock)return;
  const bubble=dock.querySelector('.mascot-bubble');
  const image=dock.querySelector('.mascot-figure img');
  const STORE='sparkMascotPos';
  const THRESHOLD=6;
  let drag=null;
  let suppressClickUntil=0;
  let resizeTimer=0;

  if(image)image.draggable=false;
  dock.setAttribute('aria-description','小星可以拖动到页面任意位置；用方向键微调，按 Home 键回到右下角，按回车打开 AI 助理。');

  const margin=()=>matchMedia('(max-width:560px)').matches?14:24;
  function metrics(){
    return {w:dock.offsetWidth,h:dock.offsetHeight,vw:document.documentElement.clientWidth,vh:window.innerHeight,m:margin()};
  }
  function clamp(x,y){
    const {w,h,vw,vh,m}=metrics();
    return {
      x:Math.min(Math.max(x,m),Math.max(m,vw-w-m)),
      y:Math.min(Math.max(y,m),Math.max(m,vh-h-m))
    };
  }
  function updateFlip(){
    if(!bubble||getComputedStyle(bubble).display==='none'){
      dock.classList.remove('is-flipped');
      return;
    }
    const rect=dock.getBoundingClientRect();
    dock.classList.toggle('is-flipped',rect.left-10-bubble.offsetWidth<margin());
  }
  function place(x,y){
    dock.style.left=Math.round(x)+'px';
    dock.style.top=Math.round(y)+'px';
    dock.style.right='auto';
    dock.style.bottom='auto';
    updateFlip();
  }
  function read(){
    try{
      const pos=JSON.parse(localStorage.getItem(STORE)||'null');
      if(pos&&Number.isFinite(pos.rx)&&Number.isFinite(pos.ry))return pos;
    }catch(error){}
    return null;
  }
  function remember(){
    const {w,h,vw,vh,m}=metrics();
    const rangeX=Math.max(0,vw-w-2*m);
    const rangeY=Math.max(0,vh-h-2*m);
    const x=parseFloat(dock.style.left);
    const y=parseFloat(dock.style.top);
    if(!Number.isFinite(x)||!Number.isFinite(y))return;
    try{
      localStorage.setItem(STORE,JSON.stringify({
        rx:rangeX?Math.min(1,Math.max(0,(x-m)/rangeX)):0,
        ry:rangeY?Math.min(1,Math.max(0,(y-m)/rangeY)):0
      }));
    }catch(error){}
  }
  function restore(){
    const pos=read();
    if(pos){
      const {w,h,vw,vh,m}=metrics();
      const rangeX=Math.max(0,vw-w-2*m);
      const rangeY=Math.max(0,vh-h-2*m);
      const point=clamp(m+pos.rx*rangeX,m+pos.ry*rangeY);
      place(point.x,point.y);
      return;
    }
    if(dock.style.left){
      const point=clamp(parseFloat(dock.style.left)||0,parseFloat(dock.style.top)||0);
      place(point.x,point.y);
    }else{
      updateFlip();
    }
  }
  function endDrag(event){
    if(!drag||event.pointerId!==drag.id)return;
    const moved=drag.moved;
    drag=null;
    dock.classList.remove('is-dragging');
    if(moved){
      suppressClickUntil=Date.now()+400;
      remember();
      updateFlip();
    }
    try{dock.releasePointerCapture(event.pointerId);}catch(error){}
  }

  dock.addEventListener('pointerdown',event=>{
    if(event.pointerType==='mouse'&&event.button!==0)return;
    const rect=dock.getBoundingClientRect();
    drag={id:event.pointerId,startX:event.clientX,startY:event.clientY,left:rect.left,top:rect.top,moved:false};
    try{dock.setPointerCapture(event.pointerId);}catch(error){}
  });
  dock.addEventListener('pointermove',event=>{
    if(!drag||event.pointerId!==drag.id)return;
    const dx=event.clientX-drag.startX;
    const dy=event.clientY-drag.startY;
    if(!drag.moved){
      if(Math.hypot(dx,dy)<THRESHOLD)return;
      drag.moved=true;
      dock.classList.add('is-dragging');
    }
    event.preventDefault();
    const point=clamp(drag.left+dx,drag.top+dy);
    place(point.x,point.y);
  },{passive:false});
  dock.addEventListener('pointerup',endDrag);
  dock.addEventListener('pointercancel',endDrag);
  dock.addEventListener('click',event=>{
    if(Date.now()<suppressClickUntil){
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },true);
  dock.addEventListener('dragstart',event=>event.preventDefault());
  dock.addEventListener('keydown',event=>{
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home'].includes(event.key))return;
    event.preventDefault();
    if(event.key==='Home'){
      dock.style.left='';
      dock.style.top='';
      dock.style.right='';
      dock.style.bottom='';
      dock.classList.remove('is-flipped');
      try{localStorage.removeItem(STORE);}catch(error){}
      return;
    }
    const rect=dock.getBoundingClientRect();
    const step=event.shiftKey?48:16;
    const x=rect.left+(event.key==='ArrowLeft'?-step:event.key==='ArrowRight'?step:0);
    const y=rect.top+(event.key==='ArrowUp'?-step:event.key==='ArrowDown'?step:0);
    const point=clamp(x,y);
    place(point.x,point.y);
    remember();
  });

  window.addEventListener('resize',()=>{
    clearTimeout(resizeTimer);
    resizeTimer=setTimeout(restore,120);
  });
  window.addEventListener('orientationchange',()=>setTimeout(restore,180));

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',restore,{once:true});
  else requestAnimationFrame(restore);
})();
