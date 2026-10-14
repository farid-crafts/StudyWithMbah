
/* mascot life engine: idle loops, random actions, cursor reactions, petting hearts, click bursts */
(()=>{if(RM)return;
const els=[...document.querySelectorAll('#hm,.fc>img,.sb>img,#buddy,.join img.m,#detail img.m,.logo img,.ph>img')];
const R=Math.random,C=(v,a,b)=>Math.min(b,Math.max(a,v)),TAU=Math.PI*2,ease=p=>p<.5?2*p*p:1-2*(1-p)*(1-p);
const DUR={hop:.75,wiggle:1,look:1.8,stretch:1.4,wave:1.4,turn:1,roll:1.3,dash:1.1,jump:1,pop:.7};
const POOL={std:['hop','hop','wiggle','wiggle','look','look','look','stretch','stretch','wave','turn'],fly:['roll','dash','dash','look','wiggle'],logo:['hop','wiggle'],photo:[]};POOL.buddy=POOL.std;
let P=null,raf=0,lts=0;
const kindOf=e=>e.id==='hm'?'fly':e.id==='buddy'?'buddy':e.closest('.logo')?'logo':e.closest('.ph')?'photo':'std';
const M=els.map(el=>{el.classList.add('mx');return{el,k:kindOf(el),ph:R()*TAU,vis:false,s:{x:0,y:0,rx:0,ry:0,rz:0,sc:1},v:{x:0,y:0,rx:0,ry:0,rz:0,sc:0},hov:0,near:0,was:false,cool:0,act:null,next:1+R()*4,heart:0,R:150}});
const act=(m,n,t)=>{m.act={n,t0:t,d:DUR[n]}};
const spr=(m,k,tg,dt)=>{m.v[k]+=((tg-m.s[k])*230-m.v[k]*17)*dt;m.s[k]+=m.v[k]*dt};
function spawn(x,y,type,n){for(let i=0;i<n;i++){if(document.querySelectorAll('.mp').length>40)return;const e=document.createElement('i');e.className='mp '+type;
 if(type==='ht')e.textContent='♥';else e.style.setProperty('--c',['#FFA51F','#FF6A55','#4FE3E8','#BFE36B'][i%4]);
 e.style.left=x+'px';e.style.top=y+'px';document.body.append(e);
 const a=type==='ht'?-Math.PI/2+(R()-.5)*1.1:R()*TAU,d=type==='ht'?40+R()*34:46+R()*60;
 e.animate([{transform:'translate(-50%,-50%) scale(.3)',opacity:1},{transform:`translate(calc(-50% + ${Math.cos(a)*d}px),calc(-50% + ${Math.sin(a)*d}px)) scale(1.1) rotate(${(R()-.5)*180}deg)`,opacity:0}],{duration:800+R()*500,easing:'cubic-bezier(.2,.8,.2,1)'}).onfinish=()=>e.remove()}}
function frame(ts){if(!M.some(m=>m.vis)||document.hidden){raf=0;return}raf=requestAnimationFrame(frame);
 const dt=Math.min(.05,(ts-lts)/1000||.016);lts=ts;const t=ts/1000,vis=M.filter(m=>m.vis),rc=vis.map(m=>m.el.getBoundingClientRect());
 vis.forEach((m,i)=>{const r=rc[i];if(!r.width)return;const sz=Math.max(r.width,r.height),cx=r.left+r.width/2,cy=r.top+r.height/2,ph=m.ph;
  let dx=0,dy=0,nr=0,inside=false;
  if(P){dx=P.x-cx;dy=P.y-cy;m.R=sz*.5+130;nr=0;inside=false}
  m.near+=(nr-m.near)*(1-Math.exp(-dt*9));const nz=m.near,f=1+nz*1.2,ux=C(dx/m.R,-1,1),uy=C(dy/m.R,-1,1);
  m.cool-=dt;if(m.near<.2)m.was=false;else if(m.near>.42&&!m.was){m.was=true;if(m.k!=='photo'&&m.cool<=0&&!(m.act&&(m.act.n==='jump'))){act(m,m.k==='fly'?'dash':'hop',t);m.cool=2.4}}
  let ix=0,iy=0,irz=0,isx=1,isy=1,isk=0;
  if(m.k==='fly'){ix=9*Math.sin(t*.65);iy=13*Math.sin(t*1.3+ph);irz=3.2*Math.sin(t*.65+1);isy=1+.022*Math.sin(t*5.5*f);isx=1-.012*Math.sin(t*5.5*f)}
  else if(m.k==='photo'){ix=7*Math.sin(t*.22+ph)-ux*nz*6;iy=5*Math.cos(t*.18+ph);isx=isy=1.07+.012*Math.sin(t*.4)}
  else{const b=Math.sin(t*1.15*f*Math.PI+ph);isy=1+.022*b;isx=1-.013*b;iy=-2*Math.abs(b)*(m.k==='logo'?.4:1);irz=1.7*Math.sin(t*.55+ph*1.3)}
  let ax=0,ay=0,arz=0,ary=0,asx=1,asy=1,asc=1;const A=m.act;
  if(A){const p=(t-A.t0)/A.d;if(p>=1)m.act=null;else{const H=C(sz*.2,10,44)*(A.n==='jump'?1.8:1),u=4*p*(1-p),sq=p<.14?p/.14:p>.86?(1-p)/.14:0,s=Math.sin(p*Math.PI);
   switch(A.n){case'hop':ay-=H*u;asy*=1-.11*sq+.05*u;asx*=1+.08*sq-.03*u;break;
    case'wiggle':arz+=9*Math.sin(p*32)*(1-p);break;
    case'look':arz+=7*Math.sin(p*TAU*1.5);ax+=8*Math.sin(p*TAU);break;
    case'stretch':asy*=1+.08*s;asx*=1-.045*s;break;
    case'wave':arz+=11*Math.sin(p*TAU*3)*s;break;
    case'turn':ary+=360*ease(p);break;
    case'roll':arz+=360*ease(p);ay-=10*s;break;
    case'dash':ax+=34*s;arz-=9*s;asx*=1+.05*s;break;
    case'jump':ay-=H*u;ary+=360*p;asy*=1-.13*sq;asx*=1+.1*sq;break;
    case'pop':ay-=H*.8*u;asc*=1+.14*s;break}}}
  else if(t>m.next){const pool=POOL[m.k];if(pool.length)act(m,pool[(R()*pool.length)|0],t);m.next=t+(nz>.2?1.2+R()*1.5:2.6+R()*4.5)}
  if(inside&&m.k!=='photo')m.hov+=dt;else m.hov=Math.max(0,m.hov-dt*2);
  const pur=C(m.hov-.5,0,1);if(pur>0){m.heart-=dt;if(m.heart<=0){spawn(cx+(R()-.5)*sz*.4,r.top+sz*.12,'ht',1);m.heart=.75}}
  spr(m,'x',ux*nz*10,dt);spr(m,'y',uy*nz*6,dt);spr(m,'rz',ux*nz*5,dt);spr(m,'rx',-uy*nz*10,dt);spr(m,'ry',ux*nz*16,dt);spr(m,'sc',1+.06*nz+(inside&&m.k!=='photo'?.06:0)+pur*.03,dt);
  const S=m.s,sc=S.sc*asc;
  m.el.style.transform=`translate(${(ix+ax+S.x).toFixed(2)}px,${(iy+ay+S.y).toFixed(2)}px) perspective(800px) rotateX(${S.rx.toFixed(2)}deg) rotateY(${(ary+S.ry).toFixed(2)}deg) rotate(${(irz+arz+S.rz+pur*1.4*Math.sin(t*55)).toFixed(2)}deg) skewX(${isk.toFixed(2)}deg) scale(${(isx*asx*sc).toFixed(4)},${(isy*asy*sc).toFixed(4)})`})}
const kick=()=>{if(!raf&&M.some(m=>m.vis)&&!document.hidden){lts=performance.now();raf=requestAnimationFrame(frame)}};
const io=new IntersectionObserver(es=>{es.forEach(en=>{const m=M.find(x=>x.el===en.target);if(m){m.vis=en.isIntersecting;if(!m.vis)m.el.style.transform=''}});kick()},{rootMargin:'120px'});M.forEach(m=>io.observe(m.el));
document.addEventListener('visibilitychange',kick);
addEventListener('pointermove',e=>{P={x:e.clientX,y:e.clientY}},{passive:true});
document.documentElement.addEventListener('pointerleave',()=>{P=null});
addEventListener('pointerup',e=>{if(e.pointerType==='touch')setTimeout(()=>{P=null},350)},{passive:true});
addEventListener('pointerdown',e=>{P={x:e.clientX,y:e.clientY};const t=performance.now()/1000;M.forEach(m=>{if(!m.vis||m.k==='photo')return;const r=m.el.getBoundingClientRect();if(e.clientX>r.left&&e.clientX<r.right&&e.clientY>r.top&&e.clientY<r.bottom){act(m,'jump',t);spawn(e.clientX,e.clientY,'st',8);spawn(e.clientX,e.clientY,'ht',3)}})},{passive:true});
const bd=document.getElementById('buddy');if(bd)new MutationObserver(()=>{const m=M.find(x=>x.el===bd);if(m)act(m,'pop',performance.now()/1000)}).observe(bd,{attributes:true,attributeFilter:['src']});
})();
