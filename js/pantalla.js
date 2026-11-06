// Controlador común: pantalla que muestra instrucciones (tocar, Auto, pantalla completa)
const $=id=>document.getElementById(id);
const rnd=n=>Math.floor(Math.random()*n);
const pick=a=>a[rnd(a.length)];
function shuffle(a){a=[...a];for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;}

function Pantalla(cfg){
  const scr=$('screen'), stage=$('stage'), prog=$('prog'), btnAuto=$('auto'), sel=$('secs');
  let timer=null, on=false;
  sel.value=String(cfg.secs||4);

  function base(){ let ms=parseFloat(sel.value)*1000; if(cfg.jitter) ms*=0.6+Math.random()*0.8; return ms; }
  function schedule(ms){
    clearTimeout(timer);
    prog.style.transition='none'; prog.style.width='0';
    if(!on) return;
    ms=ms||base(); void prog.offsetWidth;
    prog.style.transition='width '+ms+'ms linear'; prog.style.width='100%';
    timer=setTimeout(go,ms);
  }
  function go(){ const r=cfg.next(scr,stage); schedule(typeof r==='number'?r:null); }

  $('next').onclick=e=>{e.stopPropagation();go();};
  scr.onclick=e=>{ if(e.target.id!=='exit') go(); };
  btnAuto.onclick=()=>{ on=!on; btnAuto.textContent='Auto: '+(on?'SÍ':'NO'); if(on) go(); else schedule(); };
  sel.onchange=()=>{ if(on) schedule(); };
  function setFull(f){
    scr.classList.toggle('full',f);
    if(f&&scr.requestFullscreen) scr.requestFullscreen().catch(()=>{});
    if(!f&&document.fullscreenElement) document.exitFullscreen();
  }
  $('full').onclick=()=>setFull(true);
  $('exit').onclick=e=>{e.stopPropagation();setFull(false);};
  document.addEventListener('fullscreenchange',()=>{ if(!document.fullscreenElement) scr.classList.remove('full'); });
  document.addEventListener('keydown',e=>{
    if(e.key===' '||e.key==='ArrowRight'){e.preventDefault();go();}
    if(e.key==='Escape') setFull(false);
  });
  stage.innerHTML='<div class="hint">Toca la pantalla para empezar</div>';
  if(cfg.init) cfg.init(scr,stage);
}
