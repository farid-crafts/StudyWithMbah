
(()=>{const alt=$('#alt');if(!alt)return;const END=Date.UTC(2026,9,20,16,59,59),link=document.querySelector('nav a[href="#alt"]');let iv=0;
const gone=()=>{clearInterval(iv);alt.remove();link&&link.remove();dispatchEvent(new Event('resize'))};
if(Date.now()>END){gone();return}
const el=['aD','aH','aM','aS'].map(id=>document.getElementById(id));
function t(){const d=END-Date.now();if(d<=0){gone();return}const v=[Math.floor(d/864e5),Math.floor(d/36e5)%24,Math.floor(d/6e4)%60,Math.floor(d/1e3)%60];el.forEach((e,i)=>{const s=String(v[i]).padStart(2,'0');if(e.textContent!==s)e.textContent=s})}
t();iv=setInterval(t,1000)})();
