const OPTS=[{c:'#e53935',n:1},{c:'#fdd835',n:2},{c:'#1e88e5',n:3},{c:'#43a047',n:4}];
let last=-1;
Pantalla({
  secs:4,
  next(scr,stage){
    let i; do{ i=rnd(4); }while(i===last&&Math.random()<.7);
    last=i; scr.style.background=OPTS[i].c;
    stage.innerHTML='<div class="circ">'+OPTS[i].n+'</div>';
  }
});
