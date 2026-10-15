
/* overlapping sections + scroll velocity */
(()=>{if(RM)return;const main=$('#landing'),stk=[$('#top'),$('.cd'),$('#mascot-motion-lab'),$('#fundamental'),$('#subtes'),$('#alt')].filter(Boolean),cover=$('#komunitas'),all=[...stk,cover],R=document.documentElement;
stk.forEach((s,i)=>{s.classList.add('stk');s.style.zIndex=i+2});cover.style.zIndex=stk.length+2;
const cl=(v,a,b)=>Math.min(b,Math.max(a,v));
function tops(){const off=matchMedia('(max-width:760px)').matches?64:0;stk.forEach(s=>{s.style.top=Math.min(0,innerHeight-s.offsetHeight-off)+'px'})}
stk.forEach(s=>new ResizeObserver(tops).observe(s));addEventListener('resize',tops);tops();
let last=scrollY,lt=performance.now(),vs=0,run=0;
function frame(now){const dy=scrollY-last,dt=Math.max(1,now-lt);last=scrollY;lt=now;
 const v=cl(dy/dt/2.2,-1,1);vs+=(v-vs)*.14;
 R.style.setProperty('--sk',(vs*-1.6).toFixed(3)+'deg');R.style.setProperty('--v',vs.toFixed(3));
 const vh=innerHeight,L=all.filter(e=>e.isConnected);L.slice(0,-1).forEach((s,i)=>{const t=L[i+1].getBoundingClientRect().top,p=cl(1-t/vh,0,1);s.style.setProperty('--dim',(p*.5).toFixed(3));s.style.setProperty('--sc',(1-p*.05).toFixed(4))});
 if(Math.abs(vs)>.003||dy)requestAnimationFrame(frame);else{run=0;R.style.setProperty('--sk','0deg');R.style.setProperty('--v',0)}}
addEventListener('scroll',()=>{if(!run){run=1;last=scrollY;lt=performance.now();requestAnimationFrame(frame)}},{passive:true});
document.addEventListener('click',e=>{const a=e.target.closest('a[href^="#"]');if(!a||document.body.classList.contains('det'))return;const t=document.querySelector(a.getAttribute('href'));if(!t||t.parentElement!==main)return;e.preventDefault();
 let y=main.getBoundingClientRect().top+scrollY;for(const c of main.children){if(c===t)break;y+=c.offsetHeight}scrollTo({top:Math.max(0,y-(t===stk[0]?0:70)),behavior:'smooth'})});
})();
