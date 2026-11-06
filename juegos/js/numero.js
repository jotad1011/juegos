const COL={red:'#e53935',blue:'#1e88e5',green:'#43a047',yellow:'#fdd835'};
let started=false, counting=false, last='';

function uno(c,num){
  return '<svg class="uno" viewBox="0 0 200 300">'+
    '<rect width="200" height="300" rx="22" fill="#fff"/>'+
    '<rect x="9" y="9" width="182" height="282" rx="16" fill="'+c+'"/>'+
    '<g transform="rotate(-28 100 150)"><ellipse cx="100" cy="150" rx="80" ry="128" fill="#fff"/>'+
    '<ellipse cx="100" cy="150" rx="64" ry="112" fill="none" stroke="'+c+'" stroke-width="11" stroke-dasharray="300 700" transform="rotate(200 100 150)"/></g>'+
    '<text x="100" y="170" text-anchor="middle" font-family="Arial Black,Arial" font-weight="900" font-size="54" fill="#111">'+num+'</text></svg>';
}
function newCard(stage,scr){
  let n, c;
  do{ n=String(1+rnd(9))+rnd(10)+rnd(10); c=pick(Object.keys(COL)); }while(n+c===last);
  last=n+c; scr.style.background='#fff'; stage.innerHTML=uno(COL[c],n);
}
Pantalla({
  secs:8,
  next(scr,stage){
    if(counting) return;
    if(!started){
      started=true; counting=true; let n=3;
      const show=()=>{ stage.innerHTML='<div class="count">'+n+'</div>'; };
      show();
      const t=setInterval(()=>{
        n--;
        if(n>0) show();
        else { clearInterval(t); stage.innerHTML=''; setTimeout(()=>{counting=false;newCard(stage,scr);},600); }
      },1000);
      return 3800;
    }
    newCard(stage,scr);
  }
});
