const PEN={red:'#e53935',orange:'#fb8c00',green:'#2e7d32',blue:'#1e88e5'};
const NAMES=Object.keys(PEN);
let lastT='';

// Un lápiz vertical con la punta hacia arriba, centrado en (0,0)
function pencil(c,x,y,ang,s){
  return '<g transform="translate('+x+' '+y+') rotate('+ang+') scale('+s+')">'+
    '<rect x="-14" y="-60" width="28" height="135" rx="6" fill="'+c+'"/>'+
    '<rect x="-14" y="-60" width="9" height="135" rx="4" fill="#fff" opacity=".25"/>'+
    '<rect x="6" y="-60" width="8" height="135" rx="4" fill="#000" opacity=".18"/>'+
    '<polygon points="-14,-60 14,-60 0,-102" fill="#f2c999"/>'+
    '<polygon points="-5,-86 5,-86 0,-102" fill="'+c+'"/></g>';
}
function layout(t){
  const cols=shuffle(NAMES).map(n=>PEN[n]); let g='';
  if(t==='fila'){
    cols.forEach((c,i)=>g+=pencil(c,60+i*60,150,0,1.05));
  } else if(t==='pila'){
    cols.forEach((c,i)=>g+=pencil(c,150,48+i*68,pick([90,270]),.95));
  } else if(t==='marco'){
    g+=pencil(cols[0],150,62,pick([90,270]),.95);
    g+=pencil(cols[1],150,238,pick([90,270]),.95);
    g+=pencil(cols[2],62,150,pick([0,180]),.95);
    g+=pencil(cols[3],238,150,pick([0,180]),.95);
  } else { // inclinados
    cols.forEach((c,i)=>g+=pencil(c,60+i*60,150,pick([0,0,35,-35,180]),1.05));
  }
  return '<svg class="pen" viewBox="0 0 300 300">'+g+'</svg>';
}
Pantalla({
  secs:6,
  next(scr,stage){
    let t; do{ t=pick(['fila','pila','marco','inclinados']); }while(t===lastT);
    lastT=t; scr.style.background='#fff'; stage.innerHTML=layout(t);
  }
});
