
(()=>{const IMG=["assets/images/image-024.webp", "assets/images/image-025.webp", "assets/images/image-026.webp", "assets/images/image-027.webp", "assets/images/image-028.webp", "assets/images/image-029.webp", "assets/images/image-030.webp", "assets/images/image-031.webp", "assets/images/image-032.webp", "assets/images/image-033.webp"],n=IMG.length,cf=$('#cf'),tr=$('#cft'),sec=$('.cd');
tr.innerHTML=IMG.map(s=>`<div class="cfi"><img src="${s}" alt="" draggable="false"></div>`).join('');
const cards=[...tr.children],DRIFT=.3;let pos=0,vel=DRIFT,drag=false,sx=0,sp=0,lx=0,lt=0,vis=false,raf=0,lts=0,M={cw:320,sp:250,dp:210};
function size(){const w=sec.clientWidth,cw=Math.min(340,Math.max(200,w*.6));M={cw,sp:cw*.78,dp:cw*.66};cf.style.setProperty('--cw',cw+'px');cf.style.setProperty('--ch',cw*.75+'px');cf.style.perspective=cw*4+'px'}
function render(){for(let i=0;i<n;i++){const c=cards[i];let o=(((i-pos+n/2)%n)+n)%n-n/2;const a=Math.abs(o);
 c.style.transform=`translateX(${o*M.sp}px) translateZ(${RM?0:-a*M.dp}px) rotateY(${RM?0:-o*45}deg) scale(${Math.max(1-a*.15,.4)})`;
 c.style.opacity=Math.min(1,Math.max(0,3.5-a));c.style.filter=`brightness(${1-Math.min(a,3)*.13})`;c.style.zIndex=Math.round(n*2-a*2)}}
function tick(ts){raf=requestAnimationFrame(tick);const dt=Math.min(.05,(ts-lts)/1000||0);lts=ts;
 if(!drag){const k=1-Math.exp(-dt*1.4);vel+=((RM?0:DRIFT)-vel)*k;pos+=vel*dt}render()}
const run=()=>{cancelAnimationFrame(raf);if(vis){lts=performance.now();raf=requestAnimationFrame(tick)}};
cf.addEventListener('pointerdown',e=>{drag=true;sx=lx=e.clientX;sp=pos;lt=performance.now();vel=0;cf.setPointerCapture(e.pointerId)});
cf.addEventListener('pointermove',e=>{if(!drag)return;const now=performance.now(),np=sp-(e.clientX-sx)/M.sp,dt=Math.max(8,now-lt)/1000;vel=vel*.7+((np-pos)/dt)*.3;pos=np;lt=now});
const up=()=>{if(!drag)return;drag=false;vel=Math.max(-5,Math.min(5,vel))};
cf.addEventListener('pointerup',up);cf.addEventListener('pointercancel',up);
document.addEventListener('visibilitychange',()=>{vis=vis&&!document.hidden;run()});
new IntersectionObserver(es=>{vis=es[0].isIntersecting&&!document.hidden;run()},{threshold:.1}).observe(sec);
new ResizeObserver(size).observe(sec);size();render();
/* paw tap print */
if(matchMedia('(pointer:fine)').matches&&!RM)document.addEventListener('pointerdown',e=>{const d=document.createElement('i');d.className='pw';d.style.left=e.clientX+'px';d.style.top=e.clientY+'px';document.body.append(d);setTimeout(()=>d.remove(),700)});
})();
