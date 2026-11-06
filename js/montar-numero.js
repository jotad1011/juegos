const COLORS=['red','yellow','green','blue'];
const $=id=>document.getElementById(id);
let round, target, color, cards, slots, t0, penalty, timer;
const rnd=n=>Math.floor(Math.random()*n);
const shuffle=a=>{for(let i=a.length-1;i>0;i--){const j=rnd(i+1);[a[i],a[j]]=[a[j],a[i]];}return a;};

function newRound(){
  const digits=[rnd(10),rnd(10),rnd(10)];
  target=digits.join(''); color=COLORS[rnd(4)];
  cards=[]; let id=0;
  digits.forEach(d=>{
    cards.push({id:id++,d,c:color});
    cards.push({id:id++,d,c:COLORS.filter(x=>x!==color)[rnd(3)]});
  });
  for(let i=0;i<4;i++) cards.push({id:id++,d:rnd(10),c:COLORS[rnd(4)]});
  shuffle(cards); slots=[]; $('round').textContent=round; $('msg').textContent='';
  $('target').className='numcard c-'+color;
  $('target').innerHTML='<div class="oval">'+target+'</div>';
  render();
}
function render(){
  $('slots').innerHTML='';
  for(let i=0;i<3;i++){
    const s=document.createElement('div'); s.className='slot';
    const c=cards.find(x=>x.id===slots[i]);
    if(c) s.textContent=c.d;
    s.onclick=()=>{slots.splice(i,1);render();};
    $('slots').appendChild(s);
  }
  $('hand').innerHTML='';
  cards.forEach(c=>{
    const b=document.createElement('button');
    b.className='ucard c-'+c.c+(slots.includes(c.id)?' used':'');
    b.innerHTML='<div class="oval">'+c.d+'</div>';
    b.onclick=()=>pick(c,b);
    $('hand').appendChild(b);
  });
}
function pick(c,b){
  if(c.c!==color){ b.classList.add('shake'); $('msg').textContent='Ese no es del color del número'; return; }
  if(slots.length<3){ slots.push(c.id); $('msg').textContent=''; render(); }
}
function ring(){
  const got=slots.map(id=>cards.find(x=>x.id===id).d).join('');
  if(got===target){
    if(round===5){ clearInterval(timer); const t=elapsed(); $('msg').textContent='🎉 ¡Terminaste! Tiempo total: '+t+'s'; return; }
    round++; newRound();
  } else { penalty+=3; $('msg').textContent='Todavía no es ese número (+3s)'; }
}
const elapsed=()=>Math.round((Date.now()-t0)/1000+penalty);
function start(){ round=1; penalty=0; t0=Date.now(); clearInterval(timer); timer=setInterval(()=>$('time').textContent=elapsed(),500); newRound(); }
$('bell').onclick=ring; $('reset').onclick=start; start();
