const ARROWS={
  up:'<polygon points="50,4 92,48 64,48 64,96 36,96 36,48 8,48"/>',
  down:'<polygon points="50,96 92,52 64,52 64,4 36,4 36,52 8,52"/>',
  both:'<polygon points="50,2 90,38 62,38 62,62 90,62 50,98 10,62 38,62 38,38 10,38"/>'
};
function show(stage,k){
  stage.innerHTML='<svg class="arrow" viewBox="0 0 100 100" fill="#1b1b1b">'+ARROWS[k]+'</svg>';
}
Pantalla({
  secs:3, jitter:true,
  init(scr){ scr.style.background='#d6e8fb'; },
  next(scr,stage){
    scr.style.background='#d6e8fb'; stage.innerHTML='';
    setTimeout(()=>show(stage,pick(['up','down','both'])),300);
  }
});
