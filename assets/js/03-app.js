
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches;
const P={1:'assets/images/image-006.webp',2:'assets/images/image-007.webp',3:'assets/images/image-005.webp',5:'assets/images/image-004.webp',6:'assets/images/image-008.webp',7:'assets/images/image-009.webp'};
const Y=(id,q='')=>'https://youtube.com/playlist?list='+id+q;
const FUND=[
{n:'Logika',c:'var(--gold)',p:1,d:'Pemecahan masalah kritis, silogisme, dan penalaran induktif.',s:'Penalaran & Kritis',dd:'Dirancang untuk mengasah penalaran kritis, analisis argumen, serta pemecahan masalah secara logis.',y:Y('PLPtbHTXes2LPnITvrZvQ_yR5FnY6TTFiU','&si=wxZihTVlzZbgDdoB'),g:'https://drive.google.com/drive/folders/1Mm3qSaIDLL20rm5PtrqhZRiF-9tJb3D7?usp=drive_link'},
{n:'Matematika',c:'var(--lime)',p:6,d:'Pemantapan konsep aljabar, aritmatika, geometri dari nol.',s:'Konsep Dasar',dd:'Pemantapan konsep inti agar mampu menyelesaikan tipe soal HOTS secara logis.',y:Y('PLPtbHTXes2LPJDunxjBOU0knXcBhbvJ1G','&si=s877CiRpCZS-QNV2'),g:'https://drive.google.com/drive/folders/1VIHyDWl7EFmqVQ0grjufG_YxumsP4X19?usp=drive_link'},
{n:'Bahasa Indonesia',c:'#fff',p:2,d:'Penguasaan EBI, struktur kalimat, dan trik baca cepat.',s:'EBI & Struktur',dd:'Analisis bacaan panjang secara cepat dan akurat untuk menghadapi soal PBM.',y:'https://www.youtube.com/playlist?list=PLPtbHTXes2LPrYPjxuqNvKN-HyIMPf3ts',g:'https://drive.google.com/drive/folders/1PpouuntwzVL7tUySNt95LofoeVXow8di?usp=drive_link'},
{n:'Bahasa Inggris',c:'var(--red)',p:7,d:'Pondasi grammar dan reading comprehension terarah.',s:'Reading & Grammar',dd:'Meningkatkan kemampuan pemahaman bacaan akademik bahasa Inggris dan struktur.',y:null,g:'https://drive.google.com/drive/folders/1Yry1TGGUXTvNa5byBchWUUw0pKjseOgz?usp=drive_link'}];
const SUB=[
{n:'Penalaran Umum (PU)',t:'TPS',d:'Induktif, deduktif, & kuantitatif.',s:'Logika Pemecahan',dd:'Uji kemampuan berpikir secara logis, analitis, dan runtut menggunakan data.',y:Y('PLPtbHTXes2LNXEln1sgp7UlJrlIeTDogq','&si=IB63LAsLQDO_E8LS'),g:'https://drive.google.com/drive/folders/1kspb9X3smaSMovrtWKtZzmoZ3y5XtmAo?usp=drive_link'},
{n:'Pengetahuan Umum',dn:'PPU',t:'TPS',d:'Wawasan kognitif dan makna pesan.',s:'Wawasan Kognitif',dd:'Menguji wawasan dan pemahaman makna pesan dari teks tertulis secara komprehensif.',y:Y('PLWIeKCjmCGRBFTqBoGU62aNv3wftqZCB8','&si=CAzmrFX0xH-2QKzb'),g:'https://drive.google.com/drive/folders/1sQpcgK5B7flLPLZXvfBMfVxjBhT1DfPl?usp=drive_link'},
{n:'Pemahaman Bacaan & Menulis',dn:'PBM',d:'Ejaan dan paragraf efektif.',s:'Kaidah Penulisan',dd:'Fokus penguasaan ejaan bahasa Indonesia dan kerapihan struktur paragraf efektif.',y:Y('PLWIeKCjmCGRBFTqBoGU62aNv3wftqZCB8','&si=CAzmrFX0xH-2QKzb'),g:'https://drive.google.com/drive/folders/1nLq8eZihCp8AKzxr81lzsaZg1547KFgD?usp=drive_link'},
{n:'Pengetahuan Kuantitatif (PK)',k:'Subtes Paling Krusial',d:'Berpikir matematis menggunakan data dan probabilitas yang sangat menentukan kelulusan.',s:'Penerapan Matematis',dd:'Uji matematis mendalam untuk mengukur logika dasar berhitung. Sangat menentukan persentase kelulusan.',y:Y('PLPtbHTXes2LODiuJ0tHgrIMLeozqQakGM','&si=hCN-NrVK8IRTFoXh'),g:'https://drive.google.com/drive/folders/1VyyR3FDagaHIGXs6eID9qvqwFxk9Fxvg?usp=drive_link'},
{n:'Literasi B. Indonesia',t:'Literasi',d:'Membaca kritis ragam teks panjang.',s:'Evaluasi Gagasan',dd:'Kemampuan membaca kritis ragam teks panjang dan mencari kesimpulan tersembunyi.',y:Y('PLPtbHTXes2LPdFISsxrircxNkJZ4DTKuz','&si=I-_ug8kySwEuSxtf'),g:'https://drive.google.com/drive/folders/1r8OACcySIV00AayWa8-ZcfJYiXKqRq2A?usp=drive_link'},
{n:'Lit. B. Inggris',t:'Literasi',d:'Wacana akademik dan implikasi kalimat.',s:'Academic Reading',dd:'Membaca wacana akademik dan menemukan implikasi kalimat sesuai konteks global.',y:Y('PLPtbHTXes2LOLIOQLMhkmiQ3H99DwL1_n','&si=ew5oyUFfDPqEiYhw'),g:'https://drive.google.com/drive/folders/19FA-sugckVektkl6Jl7670MVSzF-Sggu?usp=drive_link'},
{n:'Penalaran MTK',dn:'Penalaran Matematika (PM)',t:'Literasi',d:'Soal cerita panjang bernuansa kehidupan nyata.',s:'HOTS Realistis',dd:'Penyelesaian soal cerita panjang bernuansa kehidupan nyata (Matematika Terapan).',y:Y('PLPtbHTXes2LOPt4mtAcQwbWpD2y1QLJdr','&si=tZ3U6_X34c3FhJCk'),g:'https://drive.google.com/drive/folders/1FfZn31VWnfR-8PBhY7D5bBJfpFHnGF6v?usp=drive_link'}];
/* cards */
$('#g4').innerHTML=FUND.map((f,i)=>`<button class="fc rv" style="background:${f.c};--i:${i}" data-k="F${i}"><h3>${f.n}</h3><p>${f.d}</p><img class="m" src="${P[f.p]}" alt=""></button>`).join('');
/* modal + detail */
const dlg=$('#dlg');let cur=null,sy=0;const get=k=>(k[0]=='F'?FUND:SUB)[k.slice(1)];
document.addEventListener('click',e=>{const b=e.target.closest('[data-k]');if(b){cur=get(b.dataset.k);$('#mT').textContent=cur.dn||cur.n;$('#mS').textContent=cur.s;$('#mD').textContent=cur.dd;dlg.showModal()}});
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});$('#mx').onclick=()=>dlg.close();
const link=(a,u)=>{if(u){a.href=u;a.removeAttribute('aria-disabled');a.textContent=a.dataset.t}else{a.removeAttribute('href');a.setAttribute('aria-disabled','true');a.textContent='Belum tersedia'}};
$('#dY').dataset.t='Buka YouTube';$('#dG').dataset.t='Buka G-Drive';
$('#mGo').onclick=()=>{dlg.close();sy=scrollY;$('#dT').textContent=cur.dn||cur.n;$('#dS').textContent=cur.s;$('#dD').textContent=cur.dd;link($('#dY'),cur.y);link($('#dG'),cur.g);document.body.classList.add('det');scrollTo({top:0,behavior:'instant'})};
const home=(to)=>{if(document.body.classList.contains('det')){document.body.classList.remove('det');scrollTo({top:to||0,behavior:'instant'})}};
$('#back').onclick=()=>home(sy);
$$('[data-home]').forEach(a=>a.addEventListener('click',()=>{const t=a.getAttribute('href');if(document.body.classList.contains('det')){home(0);setTimeout(()=>$(t)?.scrollIntoView(),30)}}));
$('#copy').onclick=async()=>{try{await navigator.clipboard.writeText('ALT-AYOPTN')}catch(e){}toast('Kode ALT-AYOPTN disalin')};
function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');setTimeout(()=>t.classList.remove('on'),2200)}
/* countdown */
const T=new Date(2027,3,22,7,30,0).getTime();const dleft=()=>Math.max(0,Math.ceil((T-Date.now())/864e5));
function tick(){let d=Math.max(0,T-Date.now());const v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];['cD','cH','cM','cS'].forEach((id,i)=>{const el=document.getElementById(id),s=String(v[i]);if(el.textContent!==s){el.textContent=s;if(!RM){el.classList.remove('tk');void el.offsetWidth;el.classList.add('tk')}}})}
tick();setInterval(tick,1000);
/* spring */
function spring(el,k=.12,d=.78){let x=0,y=0,tx=0,ty=0,vx=0,vy=0,on=0;const f=()=>{vx=(vx+(tx-x)*k)*d;vy=(vy+(ty-y)*k)*d;x+=vx;y+=vy;el.style.translate=`${x}px ${y}px`;if(Math.abs(vx)+Math.abs(vy)+Math.abs(tx-x)+Math.abs(ty-y)>.05)requestAnimationFrame(f);else on=0};return(a,b)=>{tx=a;ty=b;if(!on){on=1;requestAnimationFrame(f)}}}
if(FINE&&!RM){$$('[data-mag]').forEach(el=>{const s=spring(el,.15,.7);el.addEventListener('pointermove',e=>{const r=el.getBoundingClientRect();s((e.clientX-r.left-r.width/2)*.35,(e.clientY-r.top-r.height/2)*.35)});el.addEventListener('pointerleave',()=>s(0,0))});
 const hs=spring($('#hm'),.07,.8),hero=$('#top');hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();hs((e.clientX/r.width-.5)*-50,(e.clientY/innerHeight-.5)*-34)});
 /* kinetic headline */
 hero.addEventListener('pointermove',e=>$$('.ch').forEach(c=>{const r=c.getBoundingClientRect(),d=Math.hypot(e.clientX-r.left-r.width/2,e.clientY-r.top-r.height/2);c.style.setProperty('--y',-Math.max(0,1-d/150)*34+'px')}));
 hero.addEventListener('pointerleave',()=>$$('.ch').forEach(c=>c.style.setProperty('--y','0px')))}
let n=0;$$('#h1 .ln').forEach(l=>{const t=l.textContent;l.textContent='';l.setAttribute('aria-hidden','true');[...t].forEach(ch=>{const s=document.createElement('span');s.className='ch';s.textContent=ch;s.style.setProperty('--i',n++);l.append(s)})});
/* scroll: parallax, reveal, buddy */
addEventListener('scroll',()=>document.documentElement.style.setProperty('--sy',scrollY),{passive:true});
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const target=e.target,gsapOwnsMotion=!!window.SWM_GSAP_MOTION_READY&&(target.classList.contains('rv')||target.classList.contains('sb'));if(!gsapOwnsMotion)target.classList.add('in');io.unobserve(target)}}),{threshold:.15});
$$('.rv').forEach(el=>io.observe(el));
const bd=$('#buddy'),map={fundamental:1,subtes:7,alt:5,komunitas:6};let last='';
$$('#fundamental,#subtes,#alt,#komunitas').forEach(s=>new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting&&last!==s.id){last=s.id;bd.src=P[map[s.id]];bd.classList.remove('pp');void bd.offsetWidth;bd.classList.add('pp')}}),{rootMargin:'-45% 0px -50% 0px'}).observe(s));
/* 15-second intro (copied from reference) */
(()=>{const A={"read": "assets/images/image-010.webp", "think": "assets/images/image-011.webp", "scroll": "assets/images/image-012.webp", "zen": "assets/images/image-013.webp", "wave": "assets/images/image-014.webp", "stack": "assets/images/image-015.webp", "desk": "assets/images/image-016.webp"};A.fly=$('#hm').src;const RT=document.documentElement,EASE='cubic-bezier(.2,.8,.2,1)',SPRING='cubic-bezier(.34,1.56,.64,1)',T0=new Date(2027,3,22,7,30,0).getTime();
let introRunning=false,introCleanup=null;const FLYAR=(()=>{const i=$('#hm');return i.naturalWidth?i.naturalHeight/i.naturalWidth:670/900})();
function startIntro(manual){
  if(introRunning)return;
  if(RM){RT.classList.remove('intro-pending');return}
  if(document.body.classList.contains('det'))home(0);
  introRunning=true;
  scrollTo({top:0,behavior:'instant'});
  document.body.classList.add('lock');RT.classList.add('intro-pending');
  const prevFocus=document.activeElement;
  const el=document.createElement('div');el.id='intro';el.setAttribute('role','region');el.setAttribute('aria-label','Intro animasi Study with Mbah');
  const chips=['PU','PPU','PBM','PK','LBI','LBE','PM'].map(c=>`<span class="chp i-el">${c}</span>`).join('');
  const lines=Array.from({length:9},(_,i)=>`<i class="i-el" style="top:${8+i*10.5}vh;width:${22+(i*13)%30}vw"></i>`).join('');
  el.innerHTML=`
   <div class="sc s1"><div class="stack"><div class="mask"><span class="big i-el" id="i1">TEMBUS</span></div><div class="mask"><span class="big hl i-el" id="i2">PTN.</span></div></div></div>
   <div class="sc s2" id="sc2"><div class="stack2"><p class="mid i-el" id="i3">BUKAN HAFAL RUMUS<i class="strike" id="i3s"></i></p><span class="stamp i-el" id="i4">CERDAS.</span><span class="stamp i-el" id="i5">FOKUS.</span><span class="stamp i-el" id="i6">KONSISTEN.</span></div></div>
   <div class="sc s3" id="sc3"><div class="chips">${chips}</div><div class="days i-el" id="i7"><p class="mid">TINGGAL</p><b class="num" id="inum">0</b><p class="mid">HARI MENUJU UTBK 2027</p></div></div>
   <div class="sc s4" id="sc4"><div class="lines">${lines}</div><div class="t4 t4a i-el" id="i8">TEMBUS PTN.</div><div class="t4 t4b i-el" id="i9">BERSAMA MBAH.</div><div class="badge i-el" id="i10"><div><b>730+</b><span>Target Skor PTN</span></div></div></div>
   <img class="spr" id="spr" alt="">
   <div class="prog" aria-hidden="true"><i id="iprog"></i></div>`;
  const skip=document.createElement('button');skip.id='skipIntro';skip.type='button';skip.textContent='Lewati intro';
  const mas=document.createElement('img');mas.id='imas';mas.alt='';mas.src=A.fly;
  document.body.append(el,skip,mas);RT.classList.add('intro-live');
  skip.focus({preventScroll:true});

  const HM=$('#hm');const anims=[],evs=[];let t0=null,raf=0,done=false;
  const g=id=>el.querySelector('#'+id);
  const an=(node,kf,o)=>{const a=node.animate(kf,{fill:'both',easing:EASE,...o});anims.push(a);return a};
  const at=(ms,fn)=>evs.push({ms,fn,ran:false});
  const VW=innerWidth,VH=innerHeight;
  const slideUp=(n,d,dur=700)=>an(n,[{opacity:1,transform:'translateY(110%)'},{opacity:1,transform:'translateY(0)'}],{delay:d,duration:dur,easing:'cubic-bezier(.16,1,.3,1)'});
  const stamp=(n,d)=>an(n,[{opacity:0,transform:'scale(2) rotate(-9deg)'},{opacity:1,transform:'scale(.93) rotate(2.5deg)',offset:.6},{opacity:1,transform:'scale(1) rotate(-1.5deg)'}],{delay:d,duration:430,easing:'cubic-bezier(.2,.9,.3,1)'});
  const spr=g('spr');
  const sprShow=(key,d)=>at(d,()=>{spr.src=A[key];an(spr,[{opacity:1,transform:'translateY(35%) scale(.7) rotate(-8deg)'},{opacity:1,transform:'translateY(0) scale(1.06) rotate(3deg)',offset:.6},{opacity:1,transform:'translateY(0) scale(1) rotate(0deg)'}],{delay:0,duration:420,easing:SPRING})});

  // Scene 1  0–2.9s
  slideUp(g('i1'),300,750);slideUp(g('i2'),900,750);
  an(g('i2'),[{transform:'translateY(0) scale(1)'},{transform:'translateY(0) scale(1.07) rotate(-1.5deg)'},{transform:'translateY(0) scale(1) rotate(0)'}],{delay:1900,duration:520,easing:SPRING,fill:'forwards'});
  sprShow('zen',700);sprShow('think',1750);
  // Scene 2  2.9–6.8s
  an(g('sc2'),[{clipPath:'inset(100% 0 0 0)'},{clipPath:'inset(0% 0 0 0)'}],{delay:2800,duration:650,easing:'cubic-bezier(.7,0,.2,1)'});
  an(g('i3'),[{opacity:0,transform:'translateX(-60px)'},{opacity:1,transform:'none'}],{delay:3450,duration:520});
  an(g('i3s'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:4150,duration:380,easing:'cubic-bezier(.7,0,.2,1)'});
  stamp(g('i4'),4600);stamp(g('i5'),5150);stamp(g('i6'),5700);
  sprShow('desk',4600);sprShow('read',5150);sprShow('stack',5700);
  // Scene 3  6.7–10.4s
  an(g('sc3'),[{clipPath:'inset(0 0 0 100%)'},{clipPath:'inset(0 0 0 0%)'}],{delay:6600,duration:650,easing:'cubic-bezier(.7,0,.2,1)'});
  const keys=['zen','stack','scroll','desk','read','wave','think'];
  el.querySelectorAll('.chp').forEach((c,i)=>{const d=7100+i*270;an(c,[{opacity:0,transform:'translateY(40px) scale(.5) rotate(-12deg)'},{opacity:1,transform:'translateY(0) scale(1.1) rotate(3deg)',offset:.6},{opacity:1,transform:'none'}],{delay:d,duration:380,easing:SPRING});sprShow(keys[i],d)});
  an(g('i7'),[{opacity:0,transform:'translateY(50px) scale(.9)'},{opacity:1,transform:'none'}],{delay:9050,duration:600});
  an(el.querySelector('.chips'),[{opacity:1,transform:'none'},{opacity:.0,transform:'translateY(-40px) scale(.9)'}],{delay:9000,duration:400,fill:'forwards'});
  const DAYS=Math.max(0,Math.ceil((T0-Date.now())/864e5));
  // Scene 4  10.4–13.2s
  at(10150,()=>an(spr,[{opacity:1,transform:'none'},{opacity:0,transform:'translateY(110%)'}],{duration:300,easing:'ease-in',fill:'forwards'}));
  an(g('sc4'),[{clipPath:'circle(0% at 50% 60%)'},{clipPath:'circle(150% at 50% 60%)'}],{delay:10400,duration:800,easing:'cubic-bezier(.6,0,.2,1)'});
  el.querySelectorAll('.lines i').forEach((l,i)=>an(l,[{opacity:1,transform:'translateX(-40vw)'},{opacity:1,transform:'translateX(130vw)'}],{delay:10700+i*110,duration:900,iterations:2,easing:'linear'}));
  an(g('i8'),[{opacity:1,transform:'translateY(-140%) scale(1.15)'},{opacity:1,transform:'translateY(0) scale(1)',offset:.7},{opacity:1,transform:'none'}],{delay:11000,duration:620,easing:'cubic-bezier(.2,.9,.3,1.2)'});
  an(g('i9'),[{opacity:1,transform:'translateY(140%) scale(1.15)'},{opacity:1,transform:'translateY(0) scale(1)',offset:.7},{opacity:1,transform:'none'}],{delay:11100,duration:620,easing:'cubic-bezier(.2,.9,.3,1.2)'});
  an(g('i10'),[{opacity:0,transform:'scale(0) rotate(-120deg)'},{opacity:1,transform:'scale(1.15) rotate(8deg)',offset:.65},{opacity:1,transform:'scale(1) rotate(-9deg)'}],{delay:12150,duration:600,easing:SPRING});
  // flying mascot clone: base width
  const Wb=Math.min(VW*.74,VH*.5/FLYAR,720),Hb=Wb*FLYAR;
  mas.style.width=Wb+'px';mas.style.height=Hb+'px';
  const place=(cx,cy,s,r)=>`translate(${cx-Wb/2}px,${cy-Hb/2}px) scale(${s}) rotate(${r}deg)`;
  const cx0=VW/2,cy0=VH*.5;
  an(mas,[
    {opacity:1,transform:place(-Wb*.7,VH*1.05,.35,-28),offset:0,easing:'cubic-bezier(.3,.7,.2,1)'},
    {opacity:1,transform:place(VW*.3,VH*.28,.8,-10),offset:.45,easing:'cubic-bezier(.3,1.3,.5,1)'},
    {opacity:1,transform:place(cx0,cy0,1,0),offset:1}
  ],{delay:10500,duration:1250,easing:'linear'});
  at(11750,()=>an(el,[{transform:'translate(0,0)'},{transform:'translate(-10px,6px)'},{transform:'translate(8px,-6px)'},{transform:'translate(-4px,3px)'},{transform:'translate(0,0)'}],{duration:260,easing:'linear',fill:'forwards'}));
  an(mas,[{transform:place(cx0,cy0,1,0)},{transform:place(cx0,cy0-14,1.02,2)},{transform:place(cx0,cy0,1,0)}],{delay:11800,duration:1200,easing:'ease-in-out',fill:'forwards'});
  an(g('iprog'),[{transform:'scaleX(0)'},{transform:'scaleX(1)'}],{delay:0,duration:15000,easing:'linear'});

  // Scene 5: handoff 13.2–15.0
  let handed=false;
  function esc(e){if(e.key==='Escape'&&introRunning)finish(true)}
  at(13150,()=>{
    handed=true;
    const r=HM.getBoundingClientRect();
    const tcx=r.left+r.width/2,tcy=r.top+r.height/2,ts=r.width/Wb;
    // supersede flight anims so the handoff owns the transform
    anims.filter(a=>a.effect&&a.effect.target===mas).forEach(a=>a.cancel());
    an(mas,[
      {opacity:1,transform:place(cx0,cy0,1,0),offset:0,easing:'cubic-bezier(.4,0,.2,1)'},
      {opacity:1,transform:place((cx0+tcx)/2+VW*.08,(cy0+tcy)/2-VH*.14,Math.max(ts,.6)*1.25,-14),offset:.5,easing:'cubic-bezier(.3,1.2,.5,1)'},
      {opacity:1,transform:place(tcx,tcy,ts,0),offset:1}
    ],{duration:1250,easing:'linear'});
    el.style.setProperty('--cx',tcx+'px');el.style.setProperty('--cy',tcy+'px');
    const R=Math.hypot(Math.max(tcx,VW-tcx),Math.max(tcy,VH-tcy))+60;
    an(el,[{'--r':'0px'},{'--r':R+'px'}],{delay:150,duration:1150,easing:'cubic-bezier(.55,0,.2,1)'});
    skip.animate([{opacity:1},{opacity:0}],{duration:300,fill:'forwards'});
    // hero pieces assemble
    const parts=$$('.hero .hi,#h1,.hero p.d,.hero .cta,.tag,.stage .blob');
    parts.forEach((n,i)=>an(n,[{opacity:0,transform:'translateY(46px) scale(.94)'},{opacity:1,transform:'none'}],{delay:450+i*50,duration:600,easing:SPRING}));
    an(HM,[{opacity:0},{opacity:0}],{duration:1400});
  });
  at(15000,()=>finish());

  // tick: count-up + scheduled events
  function loop(ts){
    if(done)return;
    if(t0===null)t0=ts;
    const t=ts-t0;
    for(const e of evs)if(!e.ran&&t>=e.ms){e.ran=true;e.fn()}
    if(t>=9300&&t<=10400){const k=Math.min(1,(t-9300)/950);const v=Math.round(DAYS*(1-Math.pow(1-k,3)));g('inum').textContent=v}
    raf=requestAnimationFrame(loop);
  }
  raf=requestAnimationFrame(loop);

  function finish(quick){
    if(done)return;done=true;cancelAnimationFrame(raf);
    RT.classList.remove('intro-pending');
    const kill=()=>{removeEventListener('keydown',esc);RT.classList.remove('intro-pending');RT.classList.remove('intro-live');anims.forEach(a=>{try{a.cancel()}catch(e){}});el.remove();skip.remove();mas.remove();document.body.classList.remove('lock');introRunning=false;introCleanup=null;try{(prevFocus&&prevFocus.focus?prevFocus:$('#theme')).focus({preventScroll:true})}catch(e){}};
    // hero animations were created on hero nodes; cancelling them leaves the final state visible
    if(quick){
      const f=el.animate([{opacity:1},{opacity:0}],{duration:260,fill:'forwards'});mas.animate([{opacity:1},{opacity:0}],{duration:260,fill:'forwards'});
      anims.filter(a=>a.effect&&a.effect.target&&a.effect.target.closest&&a.effect.target.closest('.hero')).forEach(a=>a.cancel());
      f.onfinish=kill;
    }else kill();
  }
  
introCleanup=finish;
  skip.addEventListener('click',()=>finish(true));
  addEventListener('keydown',esc);
  setTimeout(()=>{if(introRunning)finish(false)},17500);
}
window.startIntro=startIntro})();
$('#replay').onclick=()=>{home(0);startIntro()};
if(RM){document.body.classList.remove('lock');document.documentElement.classList.remove('intro-pending');$$('.ch').forEach(c=>c.classList.add('in'))}else startIntro();

/* ===== theme + FLIP choreography ===== */
const root=document.documentElement,tb=$('#theme');
function paint(t){root.dataset.theme=t;tb.setAttribute('aria-pressed',t==='dark');tb.setAttribute('aria-label',t==='dark'?'Ganti ke mode terang':'Ganti ke mode malam');$('#tgl').textContent=t==='dark'?'Terang':'Malam';document.querySelector('meta[name=color-scheme]').content=t}
paint(root.dataset.theme);
const spr=(t,z,w)=>1-Math.exp(-z*t)*Math.cos(w*t);
const PERS=[['.hi',{arc:50,rot:-6,d:800,st:0}],['#h1 .ln',{arc:70,rot:3,d:950,st:80}],['.hero p.d',{arc:0,rot:0,d:850,st:260}],['.cta .btn',{arc:-60,rot:-9,d:900,st:320}],['.stage',{arc:-140,rot:0,d:1150,st:0}],['.tag',{arc:90,rot:26,d:950,st:420}],['.cds div',{arc:60,rot:14,d:950,st:90}],['.ttl',{arc:-80,rot:-7,d:950,st:0}],['.sb',{arc:60,rot:-6,d:950,st:60}],['.fc',{arc:100,rot:15,d:1000,st:90}],['.row',{arc:0,rot:0,unf:1,d:850,st:60}],['.altg .ph',{arc:-110,rot:-12,d:1000,st:0}],['.altg>div:last-child',{arc:40,rot:0,d:900,st:150}],['.comm a',{arc:80,rot:8,d:950,st:100}],['.join h2',{arc:60,rot:-3,d:900,st:0}],['.join img',{arc:120,rot:-18,d:1000,st:150}]];
function vis(r){return r.width>0&&r.bottom>-innerHeight&&r.top<innerHeight*2}
function snap(){const o=[];PERS.forEach(([s,p])=>$$('#landing '+s).forEach((el,i)=>{const r=el.getBoundingClientRect();if(vis(r))o.push({el,p,i,f:r})}));return o}
function anchor(){const a=$$('#landing section,#landing .hero,#landing .cd').find(e=>e.getBoundingClientRect().bottom>120);return a?{a,t:a.getBoundingClientRect().top}:null}
function fly({el,p,i,f}){const l=el.getBoundingClientRect();if(!l.width)return;const dx=f.left+f.width/2-(l.left+l.width/2),dy=f.top+f.height/2-(l.top+l.height/2),s0=Math.min(2.2,Math.max(.45,f.width/l.width));
 const N=34,ks=[],rk=[],z=p.z||5.5,w=p.w||10,len=Math.hypot(dx,dy)||1,nx=-dy/len,ny=dx/len,dir=i%2?1:-1;
 for(let k=0;k<=N;k++){const t=k/N,q=spr(t,z,w),a=Math.sin(Math.PI*Math.min(1,t))*p.arc*dir*(1-q*.3);
  ks.push({translate:`${dx*(1-q)+nx*a}px ${dy*(1-q)+ny*a}px`,scale:p.unf?`${1+(s0-1)*(1-q)} ${.2+.8*q}`:String(1+(s0-1)*(1-q)),offset:t});
  rk.push({rotate:`${p.rot*dir*(1-q)+(p.rot?Math.sin(t*Math.PI*2)*p.rot*.6:0)}deg`,offset:t})}
 const o={duration:p.d,delay:p.st+i*45,fill:'backwards',easing:'linear'};
 el.animate(ks,o);if(p.rot)el.animate(rk,{...o,composite:'add'})}
function setTheme(t,e){if(t===root.dataset.theme)return;try{localStorage.setItem('swm-theme',t)}catch(x){}
 const go=!RM&&!document.body.classList.contains('det')&&!document.body.classList.contains('lock');
 if(!go){paint(t);return}
 const F=snap(),A=anchor(),chs=$$('#h1 .ch');root.classList.add('tt');tb.disabled=true;
 paint(t);
 if(A){scrollTo({top:scrollY+A.a.getBoundingClientRect().top-A.t,behavior:'instant'})}
 F.forEach(x=>{x.f=x.f});
 requestAnimationFrame(()=>{F.forEach(fly);
  chs.forEach((c,i)=>c.animate([{rotate:`${(i%2?1:-1)*50}deg`,scale:'.4'},{rotate:'0deg',scale:'1'}],{duration:900,delay:200+i*22,easing:'cubic-bezier(.34,1.56,.64,1)',fill:'backwards',composite:'add'}));
  const hm=$('#hm');hm.animate([{rotate:'-300deg',scale:'.2'},{rotate:'0deg',scale:'1'}],{duration:1300,easing:'cubic-bezier(.34,1.56,.64,1)',composite:'add'});
  setTimeout(()=>{root.classList.remove('tt');tb.disabled=false},1700)})}
tb.addEventListener('click',()=>setTheme(root.dataset.theme==='dark'?'light':'dark'));
matchMedia('(prefers-color-scheme:dark)').addEventListener?.('change',e=>{try{if(localStorage.getItem('swm-theme'))return}catch(x){}paint(e.matches?'dark':'light')});
