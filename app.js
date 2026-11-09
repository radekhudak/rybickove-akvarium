"use strict";
/* ============ DATA ============ */
const SPECIES=[
 {name:"Gupka",rar:"Běžná",base:"#ff9d3c",light:"#ffe0a8",dark:"#d95f12",fin:"#3fc6d6",aspect:.62,fact:"Gupky rodí živá mláďata, ne jikry."},
 {name:"Neonka",rar:"Běžná",base:"#3aa5ff",light:"#c6ecff",dark:"#1561c9",fin:"#ff5a6e",aspect:.5,stripe:"neon",fact:"Neonky svítí, aby se v hejnu v tmavé vodě našly."},
 {name:"Zlatá molinka",rar:"Běžná",base:"#ffd23f",light:"#fff6c4",dark:"#d99a00",fin:"#ffb21f",aspect:.6,fact:"Molinky zvládnou i trochu slanou vodu."},
 {name:"Pruhovaná korálovka",rar:"Neobvyklá",base:"#ff6f61",light:"#ffd0c4",dark:"#cf3b2f",fin:"#ff9a6b",aspect:.6,stripe:"bands",fact:"Korálovky bydlí v sasankách, které je chrání."},
 {name:"Ryba-balónek",rar:"Neobvyklá",base:"#ffe066",light:"#fffbe0",dark:"#d4a514",fin:"#ffcf4a",aspect:.92,stripe:"spots",spikes:true,fact:"Když se lekne, nafoukne se jako míč."},
 {name:"Skalára",rar:"Neobvyklá",base:"#c9d4e0",light:"#ffffff",dark:"#7b8ea3",fin:"#a9b8c9",aspect:.95,stripe:"angel",tall:true,fact:"Skaláry mají ploché tělo, proplují i mezi rostlinami."},
 {name:"Duhovka",rar:"Vzácná",base:"#9b6bff",light:"#e8dcff",dark:"#5b2fcf",fin:"#ff7ac8",aspect:.58,stripe:"rainbow",fact:"Duhovky mění barvu podle nálady a světla."},
 {name:"Svítící hlubinka",rar:"Legendární",base:"#2b3d74",light:"#5d79c9",dark:"#111a3a",fin:"#3f5ba8",aspect:.66,lure:true,fact:"Hluboko v moři si svítí vlastní lucernou."}
];
const TASKS=[
 {id:"zuby",name:"Vyčistit zuby",desc:"2 minuty, všechny strany. Bacily pryč!",icon:"🪥",bg:"#dff3ff",reward:2},
 {id:"pokoj",name:"Uklidit pokoj",desc:"Hračky, oblečení i knížky na své místo.",icon:"🧸",bg:"#ffe8dc",reward:3},
 {id:"jidlo",name:"Zdravý talíř",desc:"Zelenina, něco na sílu a příloha.",icon:"🥦",bg:"#e3f7e8",reward:2},
 {id:"postel",name:"Ustlat postel",desc:"Srovnej peřinu a načechrej polštář.",icon:"🛏️",bg:"#efe6ff",reward:1}
];
const DECOR=[
 {id:"rostlina",name:"Mořská tráva",price:4},
 {id:"koral",name:"Korál",price:8},
 {id:"hrad",name:"Hrad",price:15},
 {id:"truhla",name:"Poklad",price:20},
];
const ALL_DAYS=[0,1,2,3,4,5,6];
const DAYS=[[1,"Po"],[2,"Út"],[3,"St"],[4,"Čt"],[5,"Pá"],[6,"So"],[0,"Ne"]];
const ICONS=["⭐","🐱","🐶","🌱","📚","🎻","🧹","🧺","🍽️","🗑️","🚿","🦷","🎒","✏️","🧩","🏃","🚲","💤","👟","🧃","🎨","🤸","💌","🪴"];
const MAX_PER_DAY=6;
const MINIGAMES=[
 {id:"zuby",name:"Bacilí honička",icon:"🪥",desc:"2minutový časovač, bacily po čtvrtinách pusy"},
 {id:"pokoj",name:"Úklid do krabic",icon:"🧸",desc:"Přetahování věcí do správné krabice"},
 {id:"jidlo",name:"Zdravý talíř",icon:"🥦",desc:"Skládání talíře, sladkosti odskočí"},
 {id:"postel",name:"Ustlaná postel",icon:"🛏️",desc:"Natáhnout peřinu, načechrat polštář"}
];
function kidTasks(k=kid){if(!k.tasks)k.tasks=TASKS.map(t=>({id:t.id,name:t.name,desc:t.desc,icon:t.icon,bg:t.bg,reward:t.reward,builtin:true,game:t.id,on:true,days:ALL_DAYS.slice()}));
  k.tasks.forEach(t=>{if(t.game===undefined)t.game=t.builtin?t.id:null});return k.tasks}
let curTask=null;
function weekday(){const t=new Date();t.setDate(t.getDate()+(S.offset||0));return t.getDay()}
function todaysTasks(){const w=weekday();return kidTasks().filter(t=>t.on&&t.days.includes(w)).slice(0,MAX_PER_DAY)}
function findTask(id){return kidTasks().find(t=>t.id===id)||TASKS.find(t=>t.id===id)||{id,name:"Úkol",icon:"⭐",reward:1}}
function daysLabel(d){if(d.length===7)return "každý den";const s=d.slice().sort();if(s.join()==="1,2,3,4,5")return "Po–Pá";if(s.join()==="0,6")return "víkend";return DAYS.filter(([n])=>d.includes(n)).map(x=>x[1]).join(" ")}
function plural(n,a,b,c){return n===1?a:n>=2&&n<=4?b:c}
const PIN_SYMS=["🐙","🦀","🐚","⭐","🐠","🐳","🦑","🐢","🦐"];

function dayKey(d=0){const t=new Date();t.setDate(t.getDate()+d+(S.offset||0));return t.getFullYear()+"-"+String(t.getMonth()+1).padStart(2,"0")+"-"+String(t.getDate()).padStart(2,"0")}
let kid=null,kidId=null,tab="board",screenName="profiles";
function today(){const k=dayKey(0);if(!kid.days[k])kid.days[k]={tasks:{},golden:false};return kid.days[k]}
function streak(k=kid){let n=0;for(let d=0;d<400;d++){const day=k.days[dayKey(-d)];if(day&&day.golden)n++;else if(d===0)continue;else break}return n}
function daysSinceGolden(){if(!kid.fish.length)return 0;for(let d=0;d<30;d++){const day=kid.days[dayKey(-d)];if(day&&day.golden)return d}
  const born=kid.fish[0].born;if(!born)return 0;const [y,m,dd]=born.split("-").map(Number);const t=new Date();t.setDate(t.getDate()+(S.offset||0));t.setHours(0,0,0,0);return Math.max(0,Math.round((t-new Date(y,m-1,dd))/864e5))}
/* ============ SOUND ============ */
let AC=null;
function blip(f=660,dur=.12,type="sine",vol=.15){try{AC=AC||new (window.AudioContext||window.webkitAudioContext)();const o=AC.createOscillator(),g=AC.createGain();o.type=type;o.frequency.setValueAtTime(f,AC.currentTime);o.frequency.exponentialRampToValueAtTime(f*1.6,AC.currentTime+dur);g.gain.setValueAtTime(vol,AC.currentTime);g.gain.exponentialRampToValueAtTime(.001,AC.currentTime+dur);o.connect(g);g.connect(AC.destination);o.start();o.stop(AC.currentTime+dur)}catch(e){}}
function chime(){[523,659,784,1046].forEach((f,i)=>setTimeout(()=>blip(f,.18,"triangle",.12),i*90))}

function drawFish(c,sp,x,y,s,dir,t,o={}){
  const S_=SPECIES[sp];const h=s*S_.aspect*.9;const sq=o.squash||0;
  c.save();c.translate(x,y);c.scale(dir*(1+sq*.25),1-sq*.25);c.rotate(Math.sin(t*2)*.04+(o.tilt||0));
  const wag=Math.sin(t*(o.sleep?2:9))*.35;
  // glow for lure fish
  if(S_.lure){const g=c.createRadialGradient(.62*s,-.55*h,0,.62*s,-.55*h,s*.5);g.addColorStop(0,"rgba(255,240,150,.55)");g.addColorStop(1,"rgba(255,240,150,0)");c.fillStyle=g;c.beginPath();c.arc(.62*s,-.55*h,s*.5,0,7);c.fill()}
  // tail
  c.save();c.translate(-.38*s,0);c.rotate(wag);
  let tg=c.createLinearGradient(0,0,-.4*s,0);tg.addColorStop(0,S_.fin);tg.addColorStop(1,shade(S_.fin,.25));
  c.fillStyle=tg;c.beginPath();c.moveTo(.04*s,0);c.quadraticCurveTo(-.22*s,-.12*s,-.36*s,-.34*s*Math.max(.7,S_.aspect));c.quadraticCurveTo(-.3*s,0,-.36*s,.34*s*Math.max(.7,S_.aspect));c.quadraticCurveTo(-.22*s,.12*s,.04*s,0);c.fill();c.restore();
  // dorsal fin
  c.fillStyle=shade(S_.fin,-.05);c.beginPath();
  if(S_.tall){c.moveTo(-.15*s,-h*.75);c.quadraticCurveTo(-.05*s,-h*1.7,-.32*s,-h*1.55);c.quadraticCurveTo(-.25*s,-h*1.0,-.3*s,-h*.5);c.fill();c.beginPath();c.moveTo(-.15*s,h*.75);c.quadraticCurveTo(-.05*s,h*1.7,-.32*s,h*1.55);c.quadraticCurveTo(-.25*s,h*1.0,-.3*s,h*.5)}
  else{c.moveTo(-.2*s,-h*.78);c.quadraticCurveTo(-.05*s,-h*1.35+Math.sin(t*4)*.03*s,.12*s,-h*.85);c.lineTo(-.2*s,-h*.78)}
  c.fill();
  // body
  const bg=c.createRadialGradient(-.05*s,-.35*h,s*.04,0,0,s*.62);bg.addColorStop(0,S_.light);bg.addColorStop(.45,S_.base);bg.addColorStop(1,S_.dark);
  c.fillStyle=bg;c.beginPath();c.ellipse(0,0,.46*s,h,0,0,7);c.fill();
  // patterns (clipped)
  c.save();c.beginPath();c.ellipse(0,0,.46*s,h,0,0,7);c.clip();
  if(S_.stripe==="neon"){c.fillStyle="#ff4d6d";c.fillRect(-.5*s,.02*h,s,.32*h);c.fillStyle="rgba(150,255,255,.9)";c.fillRect(-.5*s,-.22*h,s,.18*h)}
  if(S_.stripe==="bands"){c.fillStyle="#fff";[.18,-.12].forEach(px=>{c.beginPath();c.ellipse(px*s,0,.055*s,h*1.1,0,0,7);c.fill()});c.strokeStyle="#3a1a14";c.lineWidth=.012*s;[.18,-.12].forEach(px=>{c.beginPath();c.ellipse(px*s,0,.06*s,h*1.1,0,0,7);c.stroke()})}
  if(S_.stripe==="spots"){c.fillStyle="rgba(150,100,20,.35)";for(let i=0;i<9;i++){const a=i*2.4,r=(i%3+1)*.12*s;c.beginPath();c.arc(Math.cos(a)*r*.9-.05*s,Math.sin(a)*r*.7,.03*s,0,7);c.fill()}}
  if(S_.stripe==="angel"){c.fillStyle="rgba(30,40,60,.75)";[-.2,0,.2].forEach(px=>c.fillRect(px*s,-h*1.2,.05*s,h*2.4))}
  if(S_.stripe==="rainbow"){["#ff7ac8","#ffd23f","#3fe0b0"].forEach((col,i)=>{c.fillStyle=col;c.globalAlpha=.55;c.fillRect(-.5*s,(-.3+i*.22)*h,s,.12*h)});c.globalAlpha=1}
  // belly + spec
  c.fillStyle="rgba(255,255,255,.32)";c.beginPath();c.ellipse(.04*s,.48*h,.32*s,.38*h,0,0,7);c.fill();
  c.fillStyle="rgba(255,255,255,.55)";c.beginPath();c.ellipse(-.05*s,-.62*h,.18*s,.1*h,-.15,0,7);c.fill();
  c.restore();
  // rim light
  c.strokeStyle="rgba(255,255,255,.45)";c.lineWidth=.02*s;c.beginPath();c.ellipse(0,0,.45*s,h*.98,0,3.6,5.6);c.stroke();
  // pectoral fin
  c.save();c.translate(.02*s,.25*h);c.rotate(.6+Math.sin(t*6)*.3);c.fillStyle=shade(S_.fin,.1);c.globalAlpha=.85;c.beginPath();c.ellipse(-.06*s,0,.11*s,.05*s,0,0,7);c.fill();c.restore();
  // lure
  if(S_.lure){c.strokeStyle=S_.light;c.lineWidth=.025*s;c.beginPath();c.moveTo(.18*s,-h*.85);c.quadraticCurveTo(.4*s,-h*1.6,.62*s,-h*.55);c.stroke();c.fillStyle="#fff6a0";c.beginPath();c.arc(.62*s,-.55*h,.06*s,0,7);c.fill()}
  // cheek
  c.fillStyle="rgba(255,120,140,.35)";c.beginPath();c.ellipse(.24*s,.18*h,.06*s,.04*s,0,0,7);c.fill();
  // eye
  const ex=.22*s,ey=-.12*h,er=.13*s;
  if(o.sleep){c.strokeStyle="#13324a";c.lineWidth=.03*s;c.lineCap="round";c.beginPath();c.arc(ex,ey,er*.6,.3,2.8);c.stroke()}
  else{const eg=c.createRadialGradient(ex-er*.3,ey-er*.3,er*.1,ex,ey,er);eg.addColorStop(0,"#fff");eg.addColorStop(1,"#dfe8ee");c.fillStyle=eg;c.beginPath();c.arc(ex,ey,er,0,7);c.fill();
    c.fillStyle="#1b2b44";c.beginPath();c.arc(ex+er*.25,ey+er*.05,er*.62,0,7);c.fill();
    c.fillStyle="#0b1424";c.beginPath();c.arc(ex+er*.3,ey+er*.08,er*.36,0,7);c.fill();
    const blink=(Math.sin(t*.9+x*.01)>.985);
    if(blink){c.fillStyle=S_.base;c.beginPath();c.arc(ex,ey,er*1.05,0,7);c.fill()}
    c.fillStyle="#fff";c.beginPath();c.arc(ex+er*.05,ey-er*.25,er*.26,0,7);c.fill();c.beginPath();c.arc(ex+er*.5,ey+er*.25,er*.11,0,7);c.fill()}
  // mouth
  c.strokeStyle=shade(S_.dark,.1);c.lineWidth=.022*s;c.lineCap="round";c.beginPath();c.arc(.38*s,.08*h,.05*s,.3,1.9);c.stroke();
  c.restore();
}
function shade(hex,amt){let n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255;const f=amt<0?0:255,p=Math.abs(amt);r=Math.round((f-r)*p+r);g=Math.round((f-g)*p+g);b=Math.round((f-b)*p+b);return"rgb("+r+","+g+","+b+")"}
function fishIcon(cv,sp,bg){const r=window.devicePixelRatio||1,w=cv.clientWidth||cv.width,h=cv.clientHeight||cv.height;cv.width=w*r;cv.height=h*r;const c=cv.getContext("2d");c.scale(r,r);if(bg){c.fillStyle=bg;c.fillRect(0,0,w,h)}drawFish(c,sp,w*.52,h*.52,Math.min(w,h/SPECIES[sp].aspect)*.72,1,1.2)}


/* decorations */
function drawDecor(c,id,x,y,s,t){
  c.save();c.translate(x,y);
  if(id==="rostlina"){for(let i=0;i<5;i++){c.strokeStyle=i%2?"#2fa36f":"#4fcf8e";c.lineWidth=s*.07;c.lineCap="round";c.beginPath();c.moveTo((i-2)*s*.08,0);c.quadraticCurveTo((i-2)*s*.1+Math.sin(t*1.5+i)*s*.15,-s*.5,(i-2)*s*.12+Math.sin(t*1.5+i+1)*s*.2,-s*(.8+i%3*.15));c.stroke()}}
  if(id==="koral"){c.fillStyle="#ff8aa8";const br=(bx,by,a,l,d)=>{if(d>3)return;const ex=bx+Math.cos(a)*l,ey=by+Math.sin(a)*l;c.strokeStyle=d?"#ff9fb8":"#ff7aa0";c.lineWidth=s*(.12-d*.025);c.lineCap="round";c.beginPath();c.moveTo(bx,by);c.lineTo(ex,ey);c.stroke();br(ex,ey,a-.5,l*.7,d+1);br(ex,ey,a+.45,l*.7,d+1)};br(0,0,-Math.PI/2,s*.32,0)}
  if(id==="hrad"){const g=c.createLinearGradient(-s*.4,0,s*.4,0);g.addColorStop(0,"#c9b49a");g.addColorStop(.5,"#e8d9c4");g.addColorStop(1,"#a8916f");c.fillStyle=g;c.fillRect(-s*.35,-s*.55,s*.7,s*.55);c.fillRect(-s*.45,-s*.8,s*.22,s*.8);c.fillRect(s*.23,-s*.8,s*.22,s*.8);c.fillStyle="#d96a5a";[[-s*.34,-s*.8],[s*.34,-s*.8]].forEach(([px,py])=>{c.beginPath();c.moveTo(px-s*.14,py);c.lineTo(px,py-s*.22);c.lineTo(px+s*.14,py);c.fill()});c.fillStyle="#3c2f2a";c.beginPath();c.arc(0,-s*.12,s*.12,Math.PI,0);c.fillRect(-s*.12,-s*.12,s*.24,s*.12);c.fill();c.fillStyle="#2b5f86";c.fillRect(-s*.39,-s*.62,s*.1,s*.12);c.fillRect(s*.29,-s*.62,s*.1,s*.12)}
  if(id==="truhla"){c.fillStyle="#9a5b2c";c.fillRect(-s*.3,-s*.25,s*.6,s*.25);c.fillStyle="#b8733c";c.beginPath();c.ellipse(0,-s*.25,s*.3,s*.14,0,Math.PI,0);c.fill();c.fillStyle="#ffd23f";c.fillRect(-s*.3,-s*.16,s*.6,s*.04);c.fillRect(-s*.04,-s*.22,s*.08,s*.1);const gl=.5+.5*Math.sin(t*3);c.fillStyle="rgba(255,230,120,"+(.3+gl*.4)+")";c.beginPath();c.arc(0,-s*.34,s*.08*(1+gl*.3),0,7);c.fill()}
  c.restore();
}
function decorIcon(cv,id){const r=window.devicePixelRatio||1,w=cv.clientWidth,h=cv.clientHeight;cv.width=w*r;cv.height=h*r;const c=cv.getContext("2d");c.scale(r,r);c.fillStyle="#e3f4fa";c.fillRect(0,0,w,h);c.fillStyle="#f0d9a8";c.fillRect(0,h*.82,w,h*.18);drawDecor(c,id,w/2,h*.86,h*.85,1)}


/* ============ 3D: FISH ============ */
const HAS3D=(()=>{try{if(!window.THREE)return false;const c=document.createElement("canvas");return !!(c.getContext("webgl2")||c.getContext("webgl"))}catch(e){return false}})();
const PORTRAIT={};
let SPH=null;
function bodyTex(D){
  const cv=document.createElement("canvas");cv.width=512;cv.height=256;const c=cv.getContext("2d");
  const g=c.createLinearGradient(0,0,0,256);g.addColorStop(0,D.dark);g.addColorStop(.42,D.base);g.addColorStop(.72,D.base);g.addColorStop(1,D.light);
  c.fillStyle=g;c.fillRect(0,0,512,256);
  const uFor=x=>Math.acos(-x)/(2*Math.PI);
  const band=(x,w,col,outline)=>{[uFor(x),1-uFor(x)].forEach(u=>{if(outline){c.fillStyle=outline;c.fillRect(u*512-w/2-5,0,w+10,256)}c.fillStyle=col;c.fillRect(u*512-w/2,0,w,256)})};
  if(D.stripe==="neon"){c.fillStyle="rgba(120,255,255,.95)";c.fillRect(0,96,512,22);c.fillStyle="#ff4d6d";c.fillRect(0,124,512,40)}
  if(D.stripe==="bands"){band(.42,26,"#fff","#3a1a14");band(-.18,26,"#fff","#3a1a14")}
  if(D.stripe==="angel"){[.45,0,-.45].forEach(x=>band(x,18,"rgba(30,40,60,.85)"))}
  if(D.stripe==="rainbow"){["#ff7ac8","#ffd23f","#3fe0b0"].forEach((col,i)=>{c.globalAlpha=.55;c.fillStyle=col;c.fillRect(0,80+i*30,512,16)});c.globalAlpha=1}
  if(D.stripe==="spots"){c.fillStyle="rgba(150,100,20,.4)";for(let i=0;i<60;i++){c.beginPath();c.arc((i*97)%512,30+(i*53)%140,6+(i%3)*2,0,7);c.fill()}}
  const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;return t;
}
function extrude(shape,depth=.04){const g=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelThickness:.03,bevelSize:.025,bevelSegments:3,curveSegments:18});g.translate(0,0,-depth/2);return g}
function makeFish(sp){
  const D=SPECIES[sp];SPH=SPH||new THREE.SphereGeometry(1,48,32);
  const g=new THREE.Group(),inner=new THREE.Group();g.add(inner);
  const sy=D.aspect*.95,sz=Math.max(.44,D.aspect*.62);
  const body=new THREE.Mesh(SPH,new THREE.MeshPhysicalMaterial({map:bodyTex(D),roughness:.36,clearcoat:.75,clearcoatRoughness:.22}));
  body.scale.set(1,sy,sz);body.castShadow=true;inner.add(body);
  const finM=new THREE.MeshPhysicalMaterial({color:D.fin,roughness:.3,clearcoat:.5,transparent:true,opacity:.93,side:THREE.DoubleSide});
  // tail
  const tailPivot=new THREE.Group();tailPivot.position.set(-.86,0,0);inner.add(tailPivot);
  const th=.62*Math.max(.75,sy);const ts=new THREE.Shape();ts.moveTo(.12,0);ts.quadraticCurveTo(-.3,.18,-.78,th);ts.quadraticCurveTo(-.56,0,-.78,-th);ts.quadraticCurveTo(-.3,-.18,.12,0);
  const tail=new THREE.Mesh(extrude(ts),finM);tail.castShadow=true;tailPivot.add(tail);
  // dorsal (+ anal for tall)
  const ds=new THREE.Shape();
  if(D.tall){ds.moveTo(-.55,0);ds.quadraticCurveTo(-.3,1.25,-.95,1.05);ds.quadraticCurveTo(-.55,.5,.3,0);ds.lineTo(-.55,0)}
  else{ds.moveTo(-.5,0);ds.quadraticCurveTo(-.15,.55,.32,.04);ds.lineTo(-.5,0)}
  const dor=new THREE.Mesh(extrude(ds,.03),finM);dor.position.y=sy*.86;inner.add(dor);
  if(D.tall){const an=dor.clone();an.scale.y=-1;an.position.y=-sy*.86;inner.add(an)}
  // pectoral fins
  const pecs=[1,-1].map(s=>{const p=new THREE.Group();p.position.set(.18,-.32*sy,s*sz*.86);const m=new THREE.Mesh(SPH,finM);m.scale.set(.26,.05,.13);m.position.x=-.18;p.add(m);inner.add(p);return p});
  // eyes
  const whiteM=new THREE.MeshPhysicalMaterial({color:"#ffffff",roughness:.15,clearcoat:1});
  const irisM=new THREE.MeshPhysicalMaterial({color:D.lure?"#2a1a5a":"#203a5c",roughness:.2,clearcoat:1});
  const pupilM=new THREE.MeshPhysicalMaterial({color:"#070b14",roughness:.1,clearcoat:1});
  const hiM=new THREE.MeshBasicMaterial({color:"#ffffff"});
  const ex=.5,ey=.2*sy;
  const eyes=[1,-1].map(s=>{
    const ez=s*sz*Math.sqrt(Math.max(.05,1-ex*ex-(ey/sy)**2));
    const n=new THREE.Vector3(ex,ey/(sy*sy),ez/(sz*sz)).normalize();n.x+=.35;n.normalize();
    const eg=new THREE.Group();eg.position.set(ex,ey,ez);eg.lookAt(eg.position.clone().add(n));
    const sc=new THREE.Mesh(SPH,whiteM);sc.scale.setScalar(.26);sc.position.z=-.05;eg.add(sc);
    const ir=new THREE.Mesh(SPH,irisM);ir.scale.set(.17,.17,.1);ir.position.z=.15;eg.add(ir);
    const pu=new THREE.Mesh(SPH,pupilM);pu.scale.set(.1,.1,.06);pu.position.z=.21;eg.add(pu);
    const h1=new THREE.Mesh(SPH,hiM);h1.scale.setScalar(.05);h1.position.set(.06,.08,.24);eg.add(h1);
    const h2=new THREE.Mesh(SPH,hiM);h2.scale.setScalar(.022);h2.position.set(-.06,-.05,.23);eg.add(h2);
    const lid=new THREE.Group();eg.add(lid);
    inner.add(eg);return eg});
  // cheeks
  const chM=new THREE.MeshBasicMaterial({color:"#ff7a95",transparent:true,opacity:.35,depthWrite:false});
  [1,-1].forEach(s=>{const z=s*sz*Math.sqrt(1-.62*.62-.04);const ch=new THREE.Mesh(SPH,chM);ch.scale.set(.1,.06,.03);ch.position.set(.62,-.2*sy,z*1.01);ch.lookAt(ch.position.clone().multiplyScalar(2));inner.add(ch)});
  // mouth
  const mouth=new THREE.Mesh(new THREE.TorusGeometry(.09,.022,8,20,Math.PI),new THREE.MeshStandardMaterial({color:shade(D.dark,-.1),roughness:.5}));
  mouth.position.set(.985,-.1*sy,0);mouth.rotation.set(0,Math.PI/2,Math.PI);inner.add(mouth);
  // spikes
  if(D.spikes){const cg=new THREE.ConeGeometry(.045,.16,8),cm=new THREE.MeshStandardMaterial({color:D.light,roughness:.5});for(let i=0;i<46;i++){const y=1-(i/45)*2,r=Math.sqrt(1-y*y),a=i*2.399;const v=new THREE.Vector3(Math.cos(a)*r,y,Math.sin(a)*r);if(v.x>.55)continue;const p=new THREE.Vector3(v.x,v.y*sy,v.z*sz);const nn=new THREE.Vector3(v.x,v.y/sy,v.z/sz).normalize();const cn=new THREE.Mesh(cg,cm);cn.position.copy(p).addScaledVector(nn,.05);cn.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),nn);inner.add(cn)}}
  // lure
  let lure=null;
  if(D.lure){const curve=new THREE.QuadraticBezierCurve3(new THREE.Vector3(.35,sy*.9,0),new THREE.Vector3(.9,sy*2.1,0),new THREE.Vector3(1.45,sy*1.05,0));
    inner.add(new THREE.Mesh(new THREE.TubeGeometry(curve,20,.025,6),new THREE.MeshStandardMaterial({color:D.light})));
    const bulb=new THREE.Mesh(SPH,new THREE.MeshBasicMaterial({color:"#fff6a0"}));bulb.scale.setScalar(.1);bulb.position.set(1.45,sy*1.05,0);inner.add(bulb);
    lure=new THREE.PointLight(0xfff2a0,1.4,5);lure.position.copy(bulb.position);inner.add(lure)}
  body.userData.root=g;
  return {g,inner,tailPivot,eyes,pecs,body,lure,D};
}
function lightRig(scene){
  scene.add(new THREE.HemisphereLight(0xd6f7ff,0x2d5a66,.95));
  const k=new THREE.DirectionalLight(0xfff1d6,1.5);k.position.set(4,10,6);scene.add(k);
  const r=new THREE.DirectionalLight(0x8fdcff,.7);r.position.set(-6,3,-6);scene.add(r);
  return k;
}
function makePortraits(){
  if(!HAS3D)return;
  try{
    const W=240,H=170;const r=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:true});
    r.setSize(W,H);r.setPixelRatio(2);r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.1;
    const scene=new THREE.Scene();lightRig(scene);
    const cam=new THREE.PerspectiveCamera(30,W/H,.1,50);
    SPECIES.forEach((D,i)=>{const f=makeFish(i);f.g.rotation.y=-.55;f.g.rotation.z=.04;f.tailPivot.rotation.y=.25;scene.add(f.g);
      const h=D.tall?1.5:D.lure?1.3:1;cam.position.set(.25,.15*h,4.3*Math.max(1,h*.85));cam.lookAt(0,D.tall?.05:.08,0);
      r.render(scene,cam);PORTRAIT[i]=r.domElement.toDataURL("image/png");scene.remove(f.g)});
    r.dispose();r.forceContextLoss&&r.forceContextLoss();
  }catch(e){}
}

/* ============ 3D: AQUARIUM ============ */
let T3=null;
function stopTank3D(){if(!T3)return;cancelAnimationFrame(T3.raf);T3.ro&&T3.ro.disconnect();try{T3.renderer.dispose();T3.renderer.forceContextLoss&&T3.renderer.forceContextLoss()}catch(e){}T3=null}
function gradTex(stops){const cv=document.createElement("canvas");cv.width=4;cv.height=256;const c=cv.getContext("2d");const g=c.createLinearGradient(0,0,0,256);stops.forEach(([o,col])=>g.addColorStop(o,col));c.fillStyle=g;c.fillRect(0,0,4,256);const t=new THREE.CanvasTexture(cv);t.encoding=THREE.sRGBEncoding;return t}
function heartTex(){const cv=document.createElement("canvas");cv.width=cv.height=64;const c=cv.getContext("2d");c.fillStyle="#ff5a7a";c.beginPath();c.moveTo(32,54);c.bezierCurveTo(4,34,10,8,32,22);c.bezierCurveTo(54,8,60,34,32,54);c.fill();c.fillStyle="rgba(255,255,255,.6)";c.beginPath();c.arc(22,24,5,0,7);c.fill();return new THREE.CanvasTexture(cv)}
function makePlant(color,n=5,h=6){const grp=new THREE.Group();const m=new THREE.MeshStandardMaterial({color,roughness:.6});const blades=[];
  for(let b=0;b<n;b++){let parent=new THREE.Group();parent.position.set((b-n/2)*.18,0,(b%2)*.15);parent.rotation.z=(b-n/2)*.08;grp.add(parent);const chain=[];
    for(let s=0;s<h;s++){const tp=1-s/h;const seg=new THREE.Mesh(new THREE.CylinderGeometry(.06*tp+.015,.07*tp+.02,.5,7),m);seg.position.y=.25;seg.castShadow=true;const node=new THREE.Group();node.position.y=s?.5:0;node.add(seg);parent.add(node);chain.push(node);parent=node}
    blades.push({chain,ph:Math.random()*6})}
  grp.userData.blades=blades;return grp}
function makeDecor(id){const g=new THREE.Group();
  if(id==="rostlina"){g.add(makePlant("#3fcf8e",6,7))}
  if(id==="koral"){const m=new THREE.MeshPhysicalMaterial({color:"#ff86a6",roughness:.45,clearcoat:.3});const tipM=new THREE.MeshPhysicalMaterial({color:"#ffc1d2",roughness:.4});
    const br=(par,len,d)=>{if(d>3)return;const n=new THREE.Group();par.add(n);const seg=new THREE.Mesh(new THREE.CylinderGeometry(.09-d*.018,.12-d*.02,len,8),m);seg.position.y=len/2;n.add(seg);
      const tip=new THREE.Group();tip.position.y=len;n.add(tip);if(d===3){const s=new THREE.Mesh(SPH,tipM);s.scale.setScalar(.09);tip.add(s)}
      [-.55,.5].forEach((a,i)=>{const c=new THREE.Group();c.rotation.z=a;c.rotation.y=i*1.7+d;tip.add(c);br(c,len*.72,d+1)})};br(g,.9,0);g.traverse(o=>o.isMesh&&(o.castShadow=true))}
  if(id==="hrad"){const m=new THREE.MeshStandardMaterial({color:"#e3d2b6",roughness:.85}),roof=new THREE.MeshStandardMaterial({color:"#e0705e",roughness:.5}),dark=new THREE.MeshStandardMaterial({color:"#3a2c28"}),win=new THREE.MeshStandardMaterial({color:"#2b6f9a",emissive:"#1c4e70",emissiveIntensity:.4});
    const main=new THREE.Mesh(new THREE.BoxGeometry(1.8,1.3,1.1),m);main.position.y=.65;g.add(main);
    [-1,1].forEach(s=>{const t=new THREE.Mesh(new THREE.CylinderGeometry(.42,.48,2.2,20),m);t.position.set(s*1.05,1.1,0);g.add(t);const r=new THREE.Mesh(new THREE.ConeGeometry(.56,.8,20),roof);r.position.set(s*1.05,2.6,0);g.add(r);const w=new THREE.Mesh(new THREE.BoxGeometry(.18,.28,.05),win);w.position.set(s*1.05,1.5,.47);g.add(w)});
    const door=new THREE.Mesh(new THREE.CylinderGeometry(.3,.3,.06,20,1,false,0,Math.PI),dark);door.rotation.x=Math.PI/2;door.position.set(0,.2,.56);g.add(door);const dd=new THREE.Mesh(new THREE.BoxGeometry(.6,.4,.06),dark);dd.position.set(0,.2,.56);g.add(dd);
    g.traverse(o=>{if(o.isMesh){o.castShadow=true;o.receiveShadow=true}})}
  if(id==="truhla"){const wood=new THREE.MeshStandardMaterial({color:"#9a5b2c",roughness:.7}),gold=new THREE.MeshPhysicalMaterial({color:"#ffcf3f",metalness:.8,roughness:.25,clearcoat:1});
    const box=new THREE.Mesh(new THREE.BoxGeometry(1.2,.6,.75),wood);box.position.y=.3;g.add(box);
    const lid=new THREE.Mesh(new THREE.CylinderGeometry(.375,.375,1.2,20,1,false,0,Math.PI),wood);lid.rotation.z=Math.PI/2;lid.rotation.y=Math.PI/2;lid.position.y=.6;
    const lidG=new THREE.Group();lidG.position.set(0,0,-.375);lid.position.z=.375;lidG.add(lid);lidG.rotation.x=-.35;g.add(lidG);
    [-.4,.4].forEach(x=>{const b=new THREE.Mesh(new THREE.BoxGeometry(.08,.62,.78),gold);b.position.set(x,.3,0);g.add(b)});
    const coins=new THREE.Mesh(new THREE.SphereGeometry(.5,20,10,0,Math.PI*2,0,Math.PI/2),new THREE.MeshPhysicalMaterial({color:"#ffd84a",metalness:.9,roughness:.3,emissive:"#7a5a00",emissiveIntensity:.4}));coins.scale.set(1.05,.35,.65);coins.position.y=.58;g.add(coins);
    const glow=new THREE.PointLight(0xffd36b,.9,3);glow.position.set(0,1,0);g.add(glow);g.userData.glow=glow;
    g.traverse(o=>o.isMesh&&(o.castShadow=true))}
  return g}

function startTank3D(wrap,opts){
  const canvas=wrap.querySelector("canvas");
  const renderer=new THREE.WebGLRenderer({canvas,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));renderer.outputEncoding=THREE.sRGBEncoding;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.0;
  renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  const scene=new THREE.Scene();
  const {night,murk}=opts;
  scene.background=gradTex(night?[[0,"#2a4f86"],[.6,"#13305a"],[1,"#081a33"]]:[[0,"#a6eef7"],[.45,"#3aa6cf"],[1,"#145a86"]]);
  const fogCol=new THREE.Color(night?"#0f2a50":"#2f8fbf").lerp(new THREE.Color("#5a7a4a"),murk*.7);
  scene.fog=new THREE.Fog(fogCol,15-murk*7,40-murk*20);
  const cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.set(0,1.2,15);cam.lookAt(0,.2,0);
  const key=lightRig(scene);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-11,right:11,top:9,bottom:-6,near:1,far:30});key.shadow.radius=5;key.shadow.bias=-.0006;
  if(night){scene.children.forEach(o=>{if(o.isLight)o.intensity*=.45})}
  // sand with caustics
  const sandG=new THREE.PlaneGeometry(44,18,90,36);sandG.rotateX(-Math.PI/2);const pa=sandG.attributes.position;
  for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i);pa.setY(i,Math.sin(x*.45)*.18+Math.cos(z*.7+x*.2)*.12+Math.sin(x*1.7+z*1.3)*.04)}sandG.computeVertexNormals();
  const sandM=new THREE.MeshStandardMaterial({color:"#e9c486",roughness:.95});const CU={t:{value:0},k:{value:night?.08:.24*(1-murk*.6)}};
  sandM.onBeforeCompile=sh=>{sh.uniforms.uT=CU.t;sh.uniforms.uK=CU.k;
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vW;").replace("#include <begin_vertex>","#include <begin_vertex>\nvW=(modelMatrix*vec4(transformed,1.0)).xyz;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vW;uniform float uT;uniform float uK;\nfloat caus(vec2 p,float t){float a=sin(p.x*2.1+t)+sin(p.y*2.4-t*1.1)+sin((p.x+p.y)*1.6+t*.7)+sin(length(p*1.2+vec2(3.))*2.2-t*1.3);a/=4.;return pow(1.-abs(a),7.);}")
      .replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vec3(1.,.98,.85)*(caus(vW.xz*1.1,uT)+caus(vW.xz*.7+vec2(5.),uT*.8)*.6)*uK;")};
  const sand=new THREE.Mesh(sandG,sandM);sand.position.set(0,-2.6,-2);sand.receiveShadow=true;scene.add(sand);
  const sandY=(x,z)=>-2.6+Math.sin(x*.45)*.18+Math.cos((z+2)*.7+x*.2)*.12;
  // rocks & pebbles
  const rockM=new THREE.MeshStandardMaterial({color:"#8fa3b3",roughness:.8});
  [[-3.2,-3.5,1.2],[2.6,-4,1.6],[-6.5,-2.5,.9],[6.8,-1.5,.7]].forEach(([x,z,s])=>{const r=new THREE.Mesh(new THREE.IcosahedronGeometry(1,2),rockM);r.scale.set(s*1.3,s*.8,s);r.position.set(x,sandY(x,z)+s*.3,z);r.rotation.y=x;r.castShadow=r.receiveShadow=true;scene.add(r)});
  const pebM=["#c9b49a","#9fb4c6","#d49a86","#e8e2d6"].map(c=>new THREE.MeshStandardMaterial({color:c,roughness:.6}));
  for(let i=0;i<26;i++){const x=-8+((i*137)%160)/10,z=-1+((i*71)%30)/10-1.5;const p=new THREE.Mesh(SPH||(SPH=new THREE.SphereGeometry(1,48,32)),pebM[i%4]);p.scale.set(.18,.1,.14);p.position.set(x,sandY(x,z)+.05,z);p.castShadow=true;scene.add(p)}
  // plants
  const plants=[];const addPlant=(grp,x,z,s=1)=>{grp.position.set(x,sandY(x,z),z);grp.scale.setScalar(s);scene.add(grp);plants.push(grp)};
  addPlant(makePlant("#2fae74",5,7),-7,-2.2,1.1);addPlant(makePlant("#4fcf8e",4,6),6.2,-2.8,1);addPlant(makePlant("#2a9a6a",4,5),-1,-5,1.2);
  // decor
  const decorObjs=[];const slots={rostlina:[-4.6,-1],koral:[-2,-2.2],hrad:[4.2,-2.6],truhla:[1.6,-.4]};
  (opts.decor||[]).forEach(id=>{const d=makeDecor(id);const [x,z]=slots[id];d.position.set(x,sandY(x,z),z);scene.add(d);decorObjs.push(d);if(d.children[0]&&d.children[0].userData.blades)plants.push(d.children[0])});
  // light rays
  const rayTex=(()=>{const cv=document.createElement("canvas");cv.width=64;cv.height=256;const c=cv.getContext("2d");const g=c.createLinearGradient(0,0,0,256);g.addColorStop(0,"rgba(255,255,235,1)");g.addColorStop(1,"rgba(255,255,235,0)");c.fillStyle=g;c.fillRect(0,0,64,256);c.globalCompositeOperation="destination-in";const h=c.createLinearGradient(0,0,64,0);h.addColorStop(0,"rgba(0,0,0,0)");h.addColorStop(.5,"rgba(0,0,0,1)");h.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=h;c.fillRect(0,0,64,256);return new THREE.CanvasTexture(cv)})();
  const rays=[];for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6,16),new THREE.MeshBasicMaterial({map:rayTex,transparent:true,opacity:night?.04:.13*(1-murk*.6),blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));m.position.set(-7+i*2.8,3,-4+(i%3));m.rotation.z=.28;scene.add(m);rays.push(m)}
  // bubbles
  const BN=60;const bubM=new THREE.MeshPhysicalMaterial({color:"#ffffff",transparent:true,opacity:.4,roughness:0,clearcoat:1});
  const bub=new THREE.InstancedMesh(new THREE.SphereGeometry(1,14,10),bubM,BN);scene.add(bub);
  const bx=6.6,bz=-1.2;const bubbler=new THREE.Mesh(new THREE.CylinderGeometry(.3,.38,.25,16),new THREE.MeshStandardMaterial({color:"#6f8394",roughness:.5}));bubbler.position.set(bx,sandY(bx,bz)+.1,bz);scene.add(bubbler);
  const bubbles=[...Array(BN)].map((_,i)=>({x:bx,y:-2.4+Math.random()*7,z:bz,r:.05+Math.random()*.1,v:.7+Math.random()*.8,src:i<26?"stream":"free",alive:i<26}));
  const dummy=new THREE.Object3D();
  // murk particles
  let motes=null;if(murk>0){const n=Math.floor(260*murk),g=new THREE.BufferGeometry(),arr=new Float32Array(n*3);for(let i=0;i<n;i++){arr[i*3]=(Math.random()-.5)*20;arr[i*3+1]=-2.5+Math.random()*7;arr[i*3+2]=-4+Math.random()*6}g.setAttribute("position",new THREE.BufferAttribute(arr,3));motes=new THREE.Points(g,new THREE.PointsMaterial({color:"#cfe0a0",size:.06,transparent:true,opacity:.6}));scene.add(motes)}
  // egg when empty
  let egg=null;if(!opts.fish.length){egg=new THREE.Mesh(SPH,new THREE.MeshPhysicalMaterial({color:"#ffe39a",roughness:.25,clearcoat:1,emissive:"#5a3a00",emissiveIntensity:.15}));egg.scale.set(.7,.92,.7);egg.position.set(0,sandY(0,.5)+.85,.5);egg.castShadow=true;scene.add(egg);
    const spots=new THREE.MeshPhysicalMaterial({color:"#ffb84a",roughness:.3,clearcoat:1});[[.4,.3,.5],[-.3,.5,.55],[.1,-.2,.68],[-.45,-.1,.5]].forEach(([x,y,z])=>{const s=new THREE.Mesh(SPH,spots);s.scale.set(.12,.12,.04);s.position.set(x,y,z);s.lookAt(new THREE.Vector3(x,y,z).multiplyScalar(3));egg.add(s)})}
  // fish
  const hTex=heartTex();
  const fishes=opts.fish.map(f=>{const m=makeFish(f.sp);const D=SPECIES[f.sp];const s=(D.tall?.78:.66)+Math.random()*.14;m.g.scale.setScalar(s);scene.add(m.g);
    const heart=new THREE.Sprite(new THREE.SpriteMaterial({map:hTex,transparent:true,opacity:0,depthWrite:false}));heart.scale.setScalar(.6);scene.add(heart);
    return {m,name:f.name,sp:f.sp,s,pos:new THREE.Vector3((Math.random()-.5)*8,Math.random()*3-.5,Math.random()*3-2),vel:new THREE.Vector3(),tgt:new THREE.Vector3(),yaw:0,ph:Math.random()*9,sq:0,hp:0,heart,blink:2+Math.random()*4}});
  let B={x:6,y0:-1.4,y1:3,z0:-2.6,z1:1.8};
  const pick=f=>{f.tgt.set((Math.random()*2-1)*B.x,night||murk>.5?B.y0+Math.random()*1.4:B.y0+Math.random()*(B.y1-B.y0),B.z0+Math.random()*(B.z1-B.z0))};fishes.forEach(pick);
  // food
  const foodM=new THREE.MeshStandardMaterial({color:"#c26a2c",roughness:.6});const food=[];
  const ray=new THREE.Raycaster(),ndc=new THREE.Vector2();
  const label=wrap.querySelector(".fishname");let labelFish=null,labelT=0;
  const onTap=e=>{const r=canvas.getBoundingClientRect();ndc.set(((e.clientX-r.left)/r.width)*2-1,-((e.clientY-r.top)/r.height)*2+1);ray.setFromCamera(ndc,cam);
    if(egg&&ray.intersectObject(egg).length){egg.userData.wob=1;blip(500,.12,"triangle");return}
    const hits=ray.intersectObjects(fishes.map(f=>f.m.body),false);
    if(hits.length){const f=fishes.find(x=>x.m.body===hits[0].object);f.sq=1;f.hp=1;f.tgt.copy(f.pos).add(new THREE.Vector3((Math.random()-.5)*6,1.2,(Math.random()-.5)*2));clampV(f.tgt);blip(700,.1);labelFish=f;labelT=1.8;return}
    const p=new THREE.Vector3();ray.ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),-.5),p);let k=0;for(const b of bubbles){if(!b.alive&&b.src==="free"){b.alive=true;b.x=p.x+(Math.random()-.5)*.4;b.y=p.y;b.z=p.z;b.r=.04+Math.random()*.08;b.v=1+Math.random();if(++k>6)break}}blip(1000,.06,"sine",.06)};
  canvas.addEventListener("pointerdown",onTap);
  const clampV=v=>{v.x=Math.max(-B.x,Math.min(B.x,v.x));v.y=Math.max(B.y0,Math.min(B.y1,v.y));v.z=Math.max(B.z0,Math.min(B.z1,v.z))};
  const resize=()=>{const w=wrap.clientWidth,h=wrap.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);cam.aspect=w/h;
    cam.fov=w/h<1?50:38;cam.updateProjectionMatrix();const hh=Math.tan(cam.fov*Math.PI/360)*15;B.x=Math.max(2.2,Math.min(8,hh*cam.aspect-1.3));B.y1=Math.min(3.4,hh-1.2)};
  resize();const ro=new ResizeObserver(resize);ro.observe(wrap);
  const tmp=new THREE.Vector3();let last=performance.now();
  const loop=now=>{if(!T3||T3.renderer!==renderer)return;const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;CU.t.value=t;
    plants.forEach(p=>p.userData.blades.forEach(b=>b.chain.forEach((n,i)=>{n.rotation.z=Math.sin(t*1.3+b.ph+i*.5)*.09*(i?1:.4);n.rotation.x=Math.cos(t*.9+b.ph+i*.4)*.05})));
    rays.forEach((m,i)=>{m.rotation.z=.28+Math.sin(t*.35+i)*.05;m.material.opacity=(night?.04:.13*(1-murk*.6))*(.7+.3*Math.sin(t*.8+i*1.7))});
    decorObjs.forEach(d=>{if(d.userData.glow)d.userData.glow.intensity=.6+.4*Math.sin(t*3)});
    if(egg){egg.userData.wob=Math.max(0,(egg.userData.wob||0)-dt*1.5);egg.rotation.z=Math.sin(t*2)*.05+Math.sin(t*25)*.25*egg.userData.wob;egg.position.y=sandY(0,.5)+.85+Math.abs(Math.sin(t*25))*.15*egg.userData.wob}
    // bubbles
    bubbles.forEach((b,i)=>{if(b.alive){b.y+=b.v*dt*1.6;b.x+=Math.sin(t*3+i)*.004;if(b.y>4.5){if(b.src==="stream"){b.y=sandY(bx,bz)+.3;b.x=bx+(Math.random()-.5)*.2}else b.alive=false}}
      dummy.position.set(b.x,b.alive?b.y:-50,b.z);dummy.scale.setScalar(b.r*(1+.08*Math.sin(t*8+i)));dummy.updateMatrix();bub.setMatrixAt(i,dummy.matrix)});bub.instanceMatrix.needsUpdate=true;
    if(motes){motes.rotation.y=Math.sin(t*.05)*.2;motes.position.y=Math.sin(t*.3)*.15}
    // food
    for(let i=food.length-1;i>=0;i--){const p=food[i];const fl=sandY(p.position.x,p.position.z)+.05;p.position.y=Math.max(fl,p.position.y-dt*.9);p.position.x+=Math.sin(t*2+i)*.003}
    // fish
    fishes.forEach(f=>{let speed=night?.5:1.6;tmp.copy(f.tgt);
      if(food.length&&!night){let best=null,bd=1e9;food.forEach(p=>{const d=p.position.distanceTo(f.pos);if(d<bd){bd=d;best=p}});tmp.copy(best.position);speed=2.8;if(bd<.45*f.s*2){scene.remove(best);food.splice(food.indexOf(best),1);f.sq=.6;f.hp=1;blip(1200,.05,"sine",.05)}}
      const dir=tmp.clone().sub(f.pos);const dist=dir.length();if(dist<.3&&!food.length)pick(f);dir.normalize().multiplyScalar(speed);
      f.vel.lerp(dir,Math.min(1,dt*1.6));f.pos.addScaledVector(f.vel,dt);f.pos.y+=Math.sin(t*1.8+f.ph)*.002;
      const want=Math.atan2(-f.vel.z,f.vel.x);let d=want-f.yaw;while(d>Math.PI)d-=2*Math.PI;while(d<-Math.PI)d+=2*Math.PI;f.yaw+=d*Math.min(1,dt*3.5);
      const g=f.m.g;g.position.copy(f.pos);g.rotation.y=f.yaw;f.m.inner.rotation.z=Math.max(-.35,Math.min(.35,f.vel.y*.35));
      const sp=f.vel.length();f.m.tailPivot.rotation.y=Math.sin(t*(night?2.5:5+sp*3)+f.ph)*(.3+sp*.12);f.m.inner.rotation.y=Math.sin(t*(5+sp*3)+f.ph+1)*.05;
      f.m.pecs.forEach((p,i)=>p.rotation.y=(i?-1:1)*(.3+Math.sin(t*6+f.ph)*.35));
      f.sq=Math.max(0,f.sq-dt*2.2);const q=Math.sin(f.sq*Math.PI)*.35;g.scale.set(f.s*(1+q*.5),f.s*(1-q*.6),f.s*(1+q*.2));
      f.blink-=dt;let ey=night?.12:1;if(f.blink<0){ey=.1;if(f.blink<-.12)f.blink=2+Math.random()*4}f.m.eyes.forEach(e=>e.scale.y=ey);
      f.hp=Math.max(0,f.hp-dt*.7);f.heart.material.opacity=f.hp;f.heart.position.set(f.pos.x,f.pos.y+.9*f.s*1.6+(1-f.hp)*.8,f.pos.z);
    });
    // name label
    if(labelFish&&labelT>0){labelT-=dt;const v=labelFish.pos.clone();v.y+=1.1*labelFish.s*1.4;v.project(cam);label.textContent=labelFish.name;label.style.left=((v.x+1)/2*100)+"%";label.style.top=((1-v.y)/2*100)+"%";label.style.opacity=Math.min(1,labelT*2)}else label.style.opacity=0;
    renderer.render(scene,cam);T3.raf=requestAnimationFrame(loop)};
  T3={renderer,ro,raf:requestAnimationFrame(loop),dropFood(){for(let i=0;i<10;i++){const p=new THREE.Mesh(SPH,foodM);p.scale.setScalar(.07);p.position.set((Math.random()-.5)*5,4.2+Math.random(),(Math.random()-.5)*2);p.castShadow=true;scene.add(p);food.push(p)}}};
}

/* ============ UI HELPERS ============ */
const $=s=>document.querySelector(s);
const app=$("#app");
function esc(s){return String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
let toastT;function toast(m){const t=$("#toast");t.textContent=m;t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2200)}
let sheetClose=null,pendingRefresh=false;
function openSheet(html,onClose){const p=$("#panel");p.innerHTML=html;$("#sheet").hidden=false;sheetClose=onClose||null;p.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeSheet)}
function closeSheet(){$("#sheet").hidden=true;$("#panel").innerHTML="";clearInterval(gameTimer);const f=sheetClose;sheetClose=null;if(f)f();if(pendingRefresh){pendingRefresh=false;refreshScreen()}}
$("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet")closeSheet()});
function head(t){return `<div class="panel-head"><h2>${t}</h2><button class="close" data-close aria-label="Zavřít">✕</button></div>`}
function fishHTML(sp,cls=""){return PORTRAIT[sp]?`<img class="fimg ${cls}" src="${PORTRAIT[sp]}" alt="${esc(SPECIES[sp].name)}">`:`<canvas class="fimg ${cls}" data-sp="${sp}"></canvas>`}
function hydrate(root){root.querySelectorAll("canvas.fimg[data-sp]").forEach(cv=>fishIcon(cv,+cv.dataset.sp))}
function confetti(){const cv=$("#confetti"),c=cv.getContext("2d");cv.width=innerWidth;cv.height=innerHeight;const ps=[...Array(90)].map(()=>({x:innerWidth/2,y:innerHeight*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*14-4,r:Math.random()*6+4,c:["#ff7a59","#ffc93c","#3fb68b","#3aa5ff","#ff7ac8"][Math.random()*5|0],a:Math.random()*6}));let f=0;(function step(){c.clearRect(0,0,cv.width,cv.height);ps.forEach(p=>{p.vy+=.4;p.x+=p.vx;p.y+=p.vy;p.a+=.2;c.save();c.translate(p.x,p.y);c.rotate(p.a);c.fillStyle=p.c;c.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);c.restore()});if(++f<110)requestAnimationFrame(step);else c.clearRect(0,0,cv.width,cv.height)})()}
function refreshScreen(){
  if(!$("#sheet").hidden){pendingRefresh=true;updateAccountChip();return}
  if(screenName==="main"){kid=S.kids.find(k=>k.id===kidId)||null;if(!kid){renderProfiles();return}refreshChips();if(kid.eggs>0){hatch();return}if(tab==="board")renderBoard();else{const sig=tankSig();if(sig!==lastTankSig)renderTank()}}
  else renderProfiles();
}
function accountHTML(){
  const u=cloud.user;
  if(u)return `<div class="account on"><span class="acc-ic">${esc((u.email||"?")[0].toUpperCase())}</span><div><b>${esc(u.email||"Přihlášeno")}</b><small data-sync>${esc(cloud.status)}</small></div></div>`;
  return `<div class="account"><span class="acc-ic">${cloud.mode==="pending"?"…":"!"}</span><div><b>${cloud.mode==="pending"?"Přihlašuji…":"Bez účtu"}</b><small data-sync>${esc(cloud.status)}</small></div>${SB&&cloud.mode==="local"?'<button class="linkbtn" data-login>Přihlásit</button>':""}</div>`}
document.addEventListener("click",e=>{if(e.target.closest&&e.target.closest("[data-login]")){if(!$("#sheet").hidden){sheetClose=null;closeSheet()}goLogin()}});
function updateAccountChip(){const a=document.querySelector(".account");if(a)a.outerHTML=accountHTML()}

/* ============ STATE + ACCOUNT (Supabase) ============ */
const CFG=Object.assign({supabaseUrl:"",supabaseAnonKey:"",testTools:false},window.AKVARIUM_CONFIG||{});
const SB=(CFG.supabaseUrl&&CFG.supabaseAnonKey&&window.supabase&&window.supabase.createClient)
  ?window.supabase.createClient(CFG.supabaseUrl,CFG.supabaseAnonKey,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true,storageKey:"akvarium-auth"}}):null;
const LKEY="rybickove-akvarium-v2";
function blank(){return {v:2,parentPin:null,kids:[],offset:0}}
function readLocal(key){try{const r=localStorage.getItem(key);if(r){const o=JSON.parse(r);if(o&&o.v===2)return o}}catch(e){}return null}
function writeLocal(){try{localStorage.setItem(localKey(),JSON.stringify(S))}catch(e){}}
function localKey(){return cloud.user?LKEY+":"+cloud.user.id:LKEY}
function hasData(o){return !!(o&&(o.parentPin||(o.kids&&o.kids.length)))}
const cloud={mode:SB?"pending":"local",user:null,loaded:false,status:SB?"Přihlašuji…":"Bez účtu: postup se ukládá jen v tomto zařízení",lastJSON:null,channel:null,starting:false};
let S=readLocal(LKEY)||blank();
let saveTimer=null,saving=false,dirty=false,retryTimer=null;
function save(){writeLocal();
  if(cloud.mode==="cloud"&&cloud.user){dirty=true;clearTimeout(saveTimer);saveTimer=setTimeout(flush,700);setSync("Ukládám…")}}
async function flush(){
  if(saving||!dirty||!cloud.user)return;saving=true;dirty=false;
  const snapshot=JSON.parse(JSON.stringify(S));const json=JSON.stringify(snapshot);
  const {error}=await SB.from("families").upsert({owner:cloud.user.id,state:snapshot,updated_at:new Date().toISOString()},{onConflict:"owner"});
  saving=false;
  if(error){dirty=true;setSync(navigator.onLine===false?"Offline: uložím, až bude internet":"Ukládání se nepovedlo, zkusím to znovu");clearTimeout(retryTimer);retryTimer=setTimeout(flush,15000);return}
  cloud.lastJSON=json;setSync("Uloženo v účtu");if(dirty)flush();
}
addEventListener("online",()=>{if(dirty)flush()});
function setSync(t){cloud.status=t;document.querySelectorAll("[data-sync]").forEach(el=>el.textContent=t)}

async function pullRemote(){
  if(!cloud.user)return;
  const {data,error}=await SB.from("families").select("state").eq("owner",cloud.user.id).maybeSingle();
  if(error)return {error};
  return {state:data&&data.state&&data.state.v===2?data.state:null};
}
function applyRemote(st){const j=JSON.stringify(st);if(j===cloud.lastJSON||j===JSON.stringify(S)||dirty||saving)return;S=st;cloud.lastJSON=j;writeLocal();refreshScreen()}
async function startCloud(user){
  if(cloud.starting||(cloud.user&&cloud.user.id===user.id))return;cloud.starting=true;
  cloud.user=user;cloud.mode="cloud";cloud.loaded=false;setSync("Načítám rodinu z účtu…");
  const mine=readLocal(localKey());const anon=readLocal(LKEY);
  S=mine||blank();
  const r=await pullRemote();
  if(r&&r.error){S=mine||anon||blank();setSync("Účet teď nejde načíst, hraje se z tohoto zařízení");cloud.loaded=true}
  else if(r.state){S=r.state;cloud.lastJSON=JSON.stringify(S);writeLocal();cloud.loaded=true;setSync("Uloženo v účtu")}
  else{cloud.loaded=true;const seed=hasData(mine)?mine:hasData(anon)?anon:null;if(seed){S=seed;save()}else{S=blank();setSync("Přihlášeno, rodina je zatím prázdná")}}
  if(cloud.channel)SB.removeChannel(cloud.channel);
  cloud.channel=SB.channel("family-"+user.id).on("postgres_changes",{event:"*",schema:"public",table:"families",filter:"owner=eq."+user.id},p=>{const st=p.new&&p.new.state;if(st&&st.v===2)applyRemote(st)}).subscribe();
  cloud.starting=false;
  if(screenName==="login"||screenName==="profiles")renderProfiles();else refreshScreen();
}
document.addEventListener("visibilitychange",async()=>{if(document.visibilityState!=="visible"||!cloud.user)return;if(dirty){flush();return}const r=await pullRemote();if(r&&r.state)applyRemote(r.state)});
function signedOut(){if(cloud.channel){SB.removeChannel(cloud.channel);cloud.channel=null}cloud.user=null;cloud.mode="pending";dirty=false;S=blank();setSync("Odhlášeno");renderLogin()}
async function boot(){
  if(!SB){renderProfiles();return}
  let session=null;try{session=(await SB.auth.getSession()).data.session}catch(e){}
  SB.auth.onAuthStateChange((ev,ses)=>{if(ses&&ses.user){if(!cloud.user||cloud.user.id!==ses.user.id)startCloud(ses.user)}else if(ev==="SIGNED_OUT")signedOut()});
  if(session)startCloud(session.user);
  else{let skip=false;try{skip=localStorage.getItem("akvarium-skip-login")==="1"}catch(e){}if(skip){cloud.mode="local";setSync("Bez účtu: postup se ukládá jen v tomto zařízení");renderProfiles()}else renderLogin()}
}
function renderLogin(){
  stopTank&&stopTank();screenName="login";
  let email="";try{email=localStorage.getItem("akvarium-email")||""}catch(e){}
  app.innerHTML=`<div class="screen"><div class="welcome pad">
   <div class="logo">Rybičkové<br><span>akvárium</span></div>
   <div class="login">
    <h2>Přihlášení rodiče</h2>
    <p class="sub">Pošleme ti e-mail s přihlašovacím odkazem. Otevři ho na zařízení, kde se bude hrát. Postup dětí se uloží v účtu.</p>
    <form id="f1" class="lform"><label class="field">E-mail<input id="em" type="email" autocomplete="email" inputmode="email" required value="${esc(email)}" placeholder="jmeno@email.cz"></label>
     <button class="btn" id="send">Poslat odkaz</button></form>
    <form id="f2" class="lform" hidden><p class="lead" id="sentTo"></p><label class="field">Kód z e-mailu (nepovinné)<input id="code" inputmode="numeric" autocomplete="one-time-code" maxlength="10" pattern="[0-9]*" placeholder="123456"></label>
     <button class="btn kelp" id="verify">Přihlásit</button><button type="button" class="linkbtn" id="back">Změnit e-mail</button></form>
    <p class="say" id="lerr" role="alert"></p>
    <button type="button" class="linkbtn" id="skip">Vyzkoušet bez účtu (jen toto zařízení)</button>
   </div></div></div>`;
  const err=t=>{$("#lerr").textContent=t||""};
  $("#f1").onsubmit=async e=>{e.preventDefault();err("");const em=$("#em").value.trim();if(!em)return;$("#send").disabled=true;$("#send").textContent="Posílám…";
    try{localStorage.setItem("akvarium-email",em)}catch(x){}
    const {error}=await SB.auth.signInWithOtp({email:em,options:{shouldCreateUser:true,emailRedirectTo:location.origin+location.pathname}});
    $("#send").disabled=false;$("#send").textContent="Poslat odkaz";
    if(error){err(/rate|seconds|limit/i.test(error.message)?"E-mailů bylo moc najednou. Počkej chvíli a zkus to znovu.":"Kód se nepodařilo poslat: "+error.message);return}
    $("#f1").hidden=true;$("#f2").hidden=false;$("#sentTo").textContent="E-mail jsme poslali na "+em+". Klikni v něm na odkaz (na tomto zařízení). Pokud e-mail obsahuje číselný kód, můžeš ho zadat sem.";setTimeout(()=>$("#code").focus(),50)};
  $("#f2").onsubmit=async e=>{e.preventDefault();err("");const token=$("#code").value.replace(/\D/g,"");if(token.length<6){err("Kód má aspoň 6 číslic");return}
    $("#verify").disabled=true;const {error}=await SB.auth.verifyOtp({email:$("#em").value.trim(),token,type:"email"});$("#verify").disabled=false;
    if(error){err("Kód nesedí nebo vypršel. Zkontroluj ho, případně si pošli nový.");return}};
  $("#back").onclick=()=>{$("#f2").hidden=true;$("#f1").hidden=false;err("")};
  $("#skip").onclick=()=>{try{localStorage.setItem("akvarium-skip-login","1")}catch(x){}cloud.mode="local";S=readLocal(LKEY)||blank();setSync("Bez účtu: postup se ukládá jen v tomto zařízení");renderProfiles()};
}
function goLogin(){try{localStorage.removeItem("akvarium-skip-login")}catch(e){}renderLogin()}
async function logout(){try{await flush()}catch(e){}await SB.auth.signOut()}

/* ============ SCREENS ============ */
function renderProfiles(){
  stopTank();screenName="profiles";kid=null;kidId=null;
  const needSetup=!S.parentPin;
  app.innerHTML=`<div class="screen"><div class="welcome pad">
   ${accountHTML()}
   <div class="logo">Rybičkové<br><span>akvárium</span></div>
   ${needSetup?`<p class="sub">Vítejte! Nejdřív si rodič nastaví vlastní PIN. Pak přidáte profily dětí.</p><button class="btn" id="setup">Nastavit rodičovský PIN</button>`
   :`<p class="sub">${S.kids.length?"Kdo dnes plní úkoly?":"Přidejte první dítě. Akvárium začíná prázdné, první rybka se vylíhne po prvním splněném úkolu."}</p>
   <div class="profiles">${S.kids.map((k,i)=>`<button class="prof" data-i="${i}"><div class="av">${fishHTML(k.av)}</div><span class="nm">${esc(k.name)}</span><span class="hint">${k.fish.length?k.fish.length+" "+(k.fish.length===1?"rybka":k.fish.length<5?"rybky":"rybek"):"zatím vajíčko"}</span></button>`).join("")}
   <button class="prof add" id="addKid"><div class="av">+</div><span class="nm">Přidat dítě</span></button></div>`}
   </div></div>`;
  hydrate(app);
  app.querySelectorAll(".prof[data-i]").forEach(b=>b.onclick=()=>{blip(520);askKidPin(S.kids[+b.dataset.i])});
  if($("#addKid"))$("#addKid").onclick=()=>parentGate(addKidFlow);
  if($("#setup"))$("#setup").onclick=setupPin;
}
function keypadHTML(n){return `<div class="pin-dots" id="dots">${"<i></i>".repeat(n)}</div><div class="keypad">${[1,2,3,4,5,6,7,8,9,"",0,"⌫"].map(x=>x===""?"<span></span>":`<button data-n="${x}">${x}</button>`).join("")}</div>`}
function wireKeypad(onFull){let code="";$("#panel").querySelectorAll(".keypad button").forEach(b=>b.onclick=()=>{const n=b.dataset.n;code=n==="⌫"?code.slice(0,-1):code+n;[...$("#dots").children].forEach((d,i)=>d.textContent=i<code.length?"●":"");if(code.length===4){const c=code;code="";setTimeout(()=>onFull(c,()=>{$("#dots").classList.add("shake");setTimeout(()=>{[...$("#dots").children].forEach(d=>d.textContent="");$("#dots").classList.remove("shake")},420)}),120)}})}
function setupPin(){
  let first=null;
  const step=()=>{openSheet(head(first?"Zopakuj PIN":"Rodičovský PIN")+`<div class="center"><p class="lead">${first?"Pro jistotu ještě jednou.":"Čtyři číslice, které děti neznají. Budeš s nimi potvrzovat úkoly."}</p>${keypadHTML(4)}</div>`);
    wireKeypad((c,fail)=>{if(!first){first=c;step()}else if(c===first){S.parentPin=c;save();closeSheet();renderProfiles();addKidFlow()}else{first=null;fail();setTimeout(step,500)}})};step();
}
function askKidPin(k){
  let entered=[];
  openSheet(head("Ahoj, "+esc(k.name)+"!")+`<div class="center"><p class="lead">Ťukni na své 3 tajné zvířátka.</p>
   <div class="pin-dots" id="dots"><i></i><i></i><i></i></div>
   <div class="pin-grid">${PIN_SYMS.map((s,i)=>`<button data-i="${i}" aria-label="symbol ${i+1}">${s}</button>`).join("")}</div>
   <button class="linkbtn" id="forgot">Zapomněl/a jsem (rodič)</button></div>`);
  $("#forgot").onclick=()=>parentGate(()=>{toast("PIN: "+k.pin.map(i=>PIN_SYMS[i]).join(" "))});
  $("#panel").querySelectorAll(".pin-grid button").forEach(b=>b.onclick=()=>{
    blip(600+entered.length*120);entered.push(+b.dataset.i);
    const dots=$("#dots").children;dots[entered.length-1].textContent=PIN_SYMS[+b.dataset.i];
    if(entered.length===3){
      if(entered.join()===k.pin.join()){setTimeout(()=>{closeSheet();kid=k;kidId=k.id;tab="board";renderMain()},250)}
      else{setTimeout(()=>{$("#dots").classList.add("shake");blip(200,.25,"square",.08);setTimeout(()=>{entered=[];[...dots].forEach(d=>d.textContent="");$("#dots").classList.remove("shake")},420)},150)}
    }});
}
function parentGate(then){
  openSheet(head("Rodičovský režim")+`<div class="center"><p class="lead">Zadej čtyřmístný PIN rodiče.</p>${keypadHTML(4)}</div>`);
  wireKeypad((c,fail)=>{if(c===S.parentPin){closeSheet();then()}else fail()});
}
function addKidFlow(){
  let av=0,pin=[];
  openSheet(head("Nový profil dítěte")+`<div class="center">
   <label class="field">Jméno nebo přezdívka<input id="kname" maxlength="16" placeholder="Např. Kuba"></label>
   <p class="lead" style="margin-top:4px">Vyber rybku na profil. Vylíhne se jako první.</p>
   <div class="avpick">${[0,1,2,3].map(i=>`<button data-av="${i}" aria-pressed="${i===0}">${fishHTML(i)}</button>`).join("")}</div>
   <p class="lead">Vyber 3 tajná zvířátka (PIN dítěte)</p>
   <div class="pin-dots" id="dots"><i></i><i></i><i></i></div>
   <div class="pin-grid">${PIN_SYMS.map((s,i)=>`<button data-i="${i}">${s}</button>`).join("")}</div>
   <button class="btn kelp" id="mk" disabled>Vytvořit profil</button></div>`);
  const P=$("#panel");hydrate(P);
  const check=()=>{$("#mk").disabled=!($("#kname").value.trim()&&pin.length===3)};
  $("#kname").oninput=check;
  P.querySelectorAll(".avpick button").forEach(b=>b.onclick=()=>{av=+b.dataset.av;P.querySelectorAll(".avpick button").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  P.querySelectorAll(".pin-grid button").forEach(b=>b.onclick=()=>{if(pin.length>=3)pin=[];pin.push(+b.dataset.i);[...$("#dots").children].forEach((d,i)=>d.textContent=pin[i]!=null?PIN_SYMS[pin[i]]:"");check()});
  $("#mk").onclick=()=>{S.kids.push({id:"k"+Date.now().toString(36),name:$("#kname").value.trim(),av,pin,pearls:0,fish:[],eggs:0,decor:[],days:{},lastFed:"",created:dayKey(0)});save();closeSheet();renderProfiles();toast("Profil je hotový. Akvárium čeká na první rybku.")};
}

function renderMain(){
  screenName="main";
  app.innerHTML=`<div class="screen">
   <div class="top pad"><button class="who" id="who" aria-label="Změnit profil">${fishHTML(kid.av,"mini")}${esc(kid.name)}</button>
    <div class="spacer"></div><div class="chip" title="Perličky"><span class="pearl"></span><span id="pearls">${kid.pearls}</span></div>
    <div class="chip" title="Série zlatých dnů">🔥 <span id="streak">${streak()}</span></div>
    <button class="iconbtn" id="parent" aria-label="Rodičovský režim">🔒</button></div>
   <div class="view pad" id="vBoard"></div>
   <div class="view pad" id="vTank" hidden></div>
   <div class="tabs pad" role="tablist"><button role="tab" id="tB">Úkoly</button><button role="tab" id="tT">Akvárium</button></div></div>`;
  hydrate(app);
  $("#who").onclick=renderProfiles;
  $("#parent").onclick=()=>parentGate(parentPanel);
  $("#tB").onclick=()=>{tab="board";showTab()};$("#tT").onclick=()=>{tab="tank";showTab()};
  showTab();
  if(kid.eggs>0)setTimeout(hatch,300);
}
function refreshChips(){const p=$("#pearls");if(p&&kid){p.textContent=kid.pearls;$("#streak").textContent=streak()}}
function showTab(){
  $("#tB").setAttribute("aria-selected",tab==="board");$("#tT").setAttribute("aria-selected",tab==="tank");
  $("#vBoard").hidden=tab!=="board";$("#vTank").hidden=tab!=="tank";
  if(tab==="board"){stopTank();renderBoard()}else renderTank();
}
function renderBoard(){
  const d=today();const list=todaysTasks();const done=list.filter(t=>d.tasks[t.id]==="confirmed").length;const pend=list.filter(t=>d.tasks[t.id]==="pending").length;
  const dt=new Date();dt.setDate(dt.getDate()+(S.offset||0));
  const dn=dt.toLocaleDateString("cs-CZ",{weekday:"long",day:"numeric",month:"long"});
  const first=!kid.fish.length;
  $("#vBoard").innerHTML=`<div class="daybar"><div><h2>Tabule dne</h2><p>${dn}</p></div><p>${list.length?done+" z "+list.length+" potvrzeno":"Dnes žádné úkoly"}${pend?` · ${pend} čeká na rodiče`:""}</p></div>
   <div class="progress"><b id="prog"></b></div>
   ${list.length?"":'<div class="golden"><div><h3>Dnes máš volno</h3><p>Rodič na dnešek nenastavil žádné úkoly. Rybky se na tebe těší i tak.</p></div></div>'}
   <div class="board">${list.map(t=>{const st=d.tasks[t.id];return `<button class="task ${st||""}" data-t="${t.id}">
     ${st==="pending"?'<span class="badge pending">Čeká na rodiče</span>':st==="confirmed"?'<span class="badge confirmed">Hotovo ✓</span>':""}
     <span class="ic" style="background:${t.bg||"#fff3d6"}">${t.icon}</span><h3>${esc(t.name)}</h3><p>${esc(t.desc||"")}</p>
     <span class="rw"><span class="pearl"></span> +${t.reward}</span></button>`}).join("")}</div>
   <div class="golden"><div class="egg"></div><div>${first?`<h3>Tvoje první rybka je ještě ve vajíčku</h3><p>Splň jakýkoli úkol a nech ho potvrdit rodičem. Pak se vylíhne.</p>`
     :`<h3>${d.golden?"Zlatá tabule! Rybka se vylíhla.":"Splň všechny úkoly"}</h3><p>${d.golden?"Zítra je tu nová tabule a nové vajíčko.":"Když rodič potvrdí všech "+list.length+" "+plural(list.length,"úkol","úkoly","úkolů")+", vylíhne se nová rybka."}</p>`}</div></div>`;
  requestAnimationFrame(()=>{const p=$("#prog");if(p)p.style.width=(list.length?done/list.length*100:0)+"%"});
  $("#vBoard").querySelectorAll(".task").forEach(b=>b.onclick=()=>{const id=b.dataset.t,st=today().tasks[id];
    if(st==="confirmed"){toast("Tohle už máš dnes hotové");return}
    if(st==="pending"){toast("Ukaž to rodiči, ať ti to potvrdí");return}
    blip(500);const t=findTask(id);curTask=t.id;if(t.game&&GAMES[t.game])GAMES[t.game](t);else GAMES.custom(t)});
}
function finishTask(id){today().tasks[id]="pending";save();chime();
  const sp=kid.fish.length?kid.fish[kid.fish.length-1].sp:kid.av;
  openSheet(head("Hotovo!")+`<div class="center"><div class="bob">${fishHTML(sp,"big")}</div><h3 style="font-size:1.6rem">Skvělá práce!</h3><p class="lead">Teď to ukaž mámě nebo tátovi. Až to potvrdí, dostaneš perličky${kid.fish.length?"":" a vylíhne se tvoje první rybka"}.</p><button class="btn" data-close>Jasně</button></div>`,()=>renderBoard());
  hydrate($("#panel"));confetti()}

/* ============ MINI-GAMES ============ */
let gameTimer;
const GAMES={
 custom(t){
  openSheet(head(esc(t.name))+`<div class="center"><span class="bigic" style="background:${t.bg||"#fff3d6"}">${t.icon}</span><p class="lead">${esc(t.desc||"Udělej to doopravdy. Až budeš hotový/á, podrž tlačítko.")}</p>
   <button class="hold" id="hold"><svg viewBox="0 0 120 120" aria-hidden="true"><circle cx="60" cy="60" r="52" class="track"/><circle cx="60" cy="60" r="52" class="fill" id="ring"/></svg><span>Podrž,<br>až to máš</span></button></div>`);
  const ring=$("#ring"),hold=$("#hold"),C=2*Math.PI*52;ring.style.strokeDasharray=C;ring.style.strokeDashoffset=C;let p=0,rid=0,holding=false,last=0;
  const step=now=>{if(!ring.isConnected)return;const dt=(now-last)/1000;last=now;p=Math.max(0,Math.min(1,p+(holding?dt/1.4:-dt*2)));ring.style.strokeDashoffset=C*(1-p);
    if(p>=1){finishTask(t.id);return}if(holding||p>0)rid=requestAnimationFrame(step)};
  const down=e=>{e&&e.preventDefault();if(holding)return;holding=true;last=performance.now();blip(500);cancelAnimationFrame(rid);rid=requestAnimationFrame(step)};
  const up=()=>{holding=false};
  hold.addEventListener("pointerdown",down);["pointerup","pointerleave","pointercancel"].forEach(ev=>hold.addEventListener(ev,up));
  hold.addEventListener("keydown",e=>{if(e.key===" "||e.key==="Enter")down(e)});hold.addEventListener("keyup",up);
 },
 zuby(){
  let total=120,left=total,running=false,popped=0;
  const quads=["Nahoře vlevo","Nahoře vpravo","Dole vpravo","Dole vlevo"];
  const qpos=[[[18,26],[30,18],[24,36]],[[70,18],[82,26],[76,36]],[[70,64],[82,74],[76,82]],[[18,74],[30,64],[24,82]]];
  openSheet(head("Čištění zubů")+`<div class="center"><p class="lead">Spusť časovač a čisti. Na které straně jsou bacily, tam právě kartáčuj a ťukej na ně.</p>
   <div class="timer" id="tm">2:00</div><div class="quad" id="qd">Připraveno</div>
   <div class="teeth" id="teeth"><svg viewBox="0 0 130 100"><defs><radialGradient id="gum" cx=".5" cy=".4"><stop offset="0" stop-color="#ffb3c1"/><stop offset="1" stop-color="#f07f98"/></radialGradient></defs>
    <ellipse cx="65" cy="50" rx="62" ry="46" fill="url(#gum)"/><ellipse cx="65" cy="50" rx="40" ry="24" fill="#a3304d"/>
    ${[...Array(8)].map((_,i)=>{const a=Math.PI+.3+i*(Math.PI-.6)/7;return `<rect x="${65+Math.cos(a)*50-6}" y="${50+Math.sin(a)*34-7}" width="12" height="14" rx="5" fill="#fff" stroke="#e8eef3"/>`}).join("")}
    ${[...Array(8)].map((_,i)=>{const a=.3+i*(Math.PI-.6)/7;return `<rect x="${65+Math.cos(a)*50-6}" y="${50+Math.sin(a)*34-7}" width="12" height="14" rx="5" fill="#fff" stroke="#e8eef3"/>`}).join("")}
   </svg></div>
   <div class="tools"><button class="btn sea" id="go">Spustit 2 minuty</button><button class="btn ghost small" id="fast">Ukázka 12 s</button></div></div>`);
  const T=$("#teeth");
  function spawn(q){T.querySelectorAll(".germ").forEach(g=>g.remove());qpos[q].forEach(([x,y])=>{const g=document.createElement("button");g.className="germ";g.setAttribute("aria-label","bacil");g.style.left=x+"%";g.style.top=y+"%";g.onclick=()=>{g.classList.add("pop");blip(900,.08);popped++;setTimeout(()=>g.remove(),300)};T.appendChild(g)})}
  function start(sec){total=left=sec;running=true;$("#go").disabled=true;$("#fast").disabled=true;let lastQ=-1;
   const tick=()=>{const q=Math.min(3,Math.floor((total-left)/(total/4)));if(q!==lastQ){lastQ=q;spawn(q);$("#qd").textContent=quads[q];blip(440,.15,"triangle")}
    $("#tm").textContent=Math.floor(left/60)+":"+String(left%60).padStart(2,"0");
    if(left<=0){clearInterval(gameTimer);T.querySelectorAll(".germ").forEach(g=>g.remove());$("#qd").textContent="Zuby se lesknou!";setTimeout(()=>finishTask(curTask),600)}left--};
   tick();gameTimer=setInterval(tick,1000)}
  $("#go").onclick=()=>start(120);$("#fast").onclick=()=>start(12);
 },
 pokoj(){
  const items=[["🧸","hracky"],["🚗","hracky"],["🧦","obleceni"],["👕","obleceni"],["📘","knihy"],["📗","knihy"],["🎲","hracky"]];
  const bins=[["hracky","Hračky","#ff9d3c","📦"],["obleceni","Oblečení","#3aa5ff","🧺"],["knihy","Knížky","#3fb68b","📚"]];
  openSheet(head("Úklid pokoje")+`<div class="center"><p class="lead">Přetáhni věci do správné krabice. Pak to samé udělej u sebe v pokoji.</p>
   <div class="room" id="room"><div class="win"></div></div>
   <div class="bins">${bins.map(b=>`<div class="bin" data-b="${b[0]}" style="background:${b[2]}"><span class="lid">${b[3]}</span>${b[1]}<span class="cnt">0</span></div>`).join("")}</div>
   <div class="say" id="say"></div></div>`);
  const room=$("#room");let left=items.length;
  const W=room.clientWidth;
  items.forEach(([e,cat],i)=>{const el=document.createElement("div");el.className="thing";el.textContent=e;el.dataset.c=cat;el.style.left=(8+((i*37)%80))+"%";el.style.top=(40+((i*53)%45))+"%";el.style.transform=`rotate(${(i%3-1)*18}deg)`;room.appendChild(el);
   el.onpointerdown=ev=>{ev.preventDefault();el.setPointerCapture(ev.pointerId);el.classList.add("drag");const r=room.getBoundingClientRect();
    const move=m=>{el.style.left=(m.clientX-r.left-24)+"px";el.style.top=(m.clientY-r.top-24)+"px";document.querySelectorAll(".bin").forEach(b=>{const br=b.getBoundingClientRect();b.classList.toggle("hot",m.clientX>br.left&&m.clientX<br.right&&m.clientY>br.top&&m.clientY<br.bottom)})};
    const up=u=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.classList.remove("drag");let hit=null;document.querySelectorAll(".bin").forEach(b=>{b.classList.remove("hot");const br=b.getBoundingClientRect();if(u.clientX>br.left&&u.clientX<br.right&&u.clientY>br.top&&u.clientY<br.bottom)hit=b});
     if(hit){if(hit.dataset.b===cat){el.remove();blip(780);const c=hit.querySelector(".cnt");c.textContent=+c.textContent+1;left--;$("#say").textContent=left?"Ještě "+left+"!":"Pokoj je jako ze škatulky!";if(!left)setTimeout(()=>finishTask(curTask),700)}else{blip(220,.2,"square",.06);$("#say").textContent="Tohle patří jinam";}}};
    el.addEventListener("pointermove",move);el.addEventListener("pointerup",up)}});
 },
 jidlo(){
  const foods=[["🥕","zelenina"],["🥦","zelenina"],["🍅","zelenina"],["🥚","sila"],["🐟","sila"],["🫘","sila"],["🍚","priloha"],["🥔","priloha"],["🍬","ne"],["🍟","ne"]];
  const need={zelenina:null,sila:null,priloha:null};
  openSheet(head("Zdravý talíř")+`<div class="center"><p class="lead">Poskládej talíř: zelenina, něco na sílu a příloha. Pak ho opravdu sněz.</p>
   <div class="plate"><div class="slots"><div class="slot wide" data-s="zelenina"><span class="f"></span>Zelenina</div><div class="slot" data-s="sila"><span class="f"></span>Na sílu</div><div class="slot" data-s="priloha"><span class="f"></span>Příloha</div></div></div>
   <div class="say" id="say"></div>
   <div class="foods">${foods.map((f,i)=>`<button class="food" data-i="${i}">${f[0]}</button>`).join("")}</div>
   <button class="btn kelp" id="eat" disabled>Snědl/a jsem to</button></div>`);
  const P=$("#panel");
  P.querySelectorAll(".food").forEach(b=>b.onclick=()=>{const [e,cat]=foods[+b.dataset.i];
   if(cat==="ne"){b.classList.remove("no");void b.offsetWidth;b.classList.add("no");blip(220,.2,"square",.06);$("#say").textContent="Mňam, ale to až někdy jindy";return}
   if(need[cat]){$("#say").textContent="Tohle místo už je plné";return}
   need[cat]=e;b.classList.add("used");blip(700);const sl=P.querySelector(`[data-s="${cat}"]`);sl.classList.add("full");sl.querySelector(".f").textContent=e;
   const ok=Object.values(need).every(Boolean);$("#say").textContent=ok?"Krásně vyvážený talíř!":"";$("#eat").disabled=!ok});
  $("#eat").onclick=()=>finishTask(curTask);
 },
 postel(){
  openSheet(head("Ustlat postel")+`<div class="center"><p class="lead">Táhni posuvníkem a natáhni peřinu. Pak načechrej polštář ťuknutím.</p>
   <div class="bed"><div class="sheet-b"></div><button class="pillow" id="pil" aria-label="polštář"></button><div class="duvet" id="duv"></div></div>
   <input type="range" class="slider" id="sl" min="0" max="100" value="0" aria-label="Natáhnout peřinu">
   <div class="say" id="say"></div></div>`);
  let fluff=0,stretched=false;const duv=$("#duv");
  const upd=v=>{duv.style.width=(30+v*.58)+"%";duv.style.transform=`skewY(${(100-v)*.12}deg) rotate(${(100-v)*.06}deg)`};upd(0);
  $("#sl").oninput=e=>{const v=+e.target.value;upd(v);if(v>=98&&!stretched){stretched=true;blip(660);$("#say").textContent="Peřina hladká jako moře. A polštář?"}check()};
  $("#pil").onclick=()=>{fluff++;blip(500+fluff*90);const p=$("#pil");p.style.transform=`scale(${1+.15*Math.min(fluff,3)},${1+.08*Math.min(fluff,3)})`;setTimeout(()=>p.style.transform=`scale(${1+.05*Math.min(fluff,3)})`,180);if(fluff===3&&!stretched)$("#say").textContent="Polštář je nadýchaný. Ještě peřina!";check()};
  function check(){if(stretched&&fluff>=3){$("#say").textContent="Postel jako v hotelu!";setTimeout(()=>finishTask(curTask),700);check=()=>{}}}
 }
};


/* ============ PARENT ============ */
function parentPanel(){
  const d=today();const pend=Object.keys(d.tasks).filter(id=>d.tasks[id]==="pending").map(findTask);
  openSheet(head("Rodičovský režim")+`<div class="center">
   <p class="lead">${esc(kid.name)}: ${pend.length?"tyhle úkoly čekají na potvrzení. Potvrď jen to, co dítě opravdu udělalo.":"nic nečeká na potvrzení."}</p>
   <div class="plist">${pend.map(t=>`<div class="prow"><span class="ic">${t.icon}</span><span class="t">${esc(t.name)}<small>+${t.reward} ${plural(t.reward,"perlička","perličky","perliček")}</small></span><button class="btn kelp small" data-ok="${t.id}">Potvrdit</button><button class="btn ghost small" data-no="${t.id}">Vrátit</button></div>`).join("")}</div>
   ${pend.length>1?'<button class="btn kelp" id="all">Potvrdit vše</button>':""}
   <button class="btn sea" id="editT">Upravit úkoly pro ${esc(kid.name)}</button>
   ${accountHTML()}
   <h3 class="section-t" style="margin-bottom:0">Nástroje</h3>
   <div class="tools">${CFG.testTools?'<button class="btn ghost small" id="nextDay">Test: další den</button>':""}<button class="btn ghost small" id="gift">Odměna navíc +10 perliček</button>${cloud.user?'<button class="btn ghost small" id="logout">Odhlásit rodinu z tohoto zařízení</button>':""}<button class="btn ghost small" id="delKid">Smazat profil ${esc(kid.name)}</button></div>
   <p class="hint" id="rhint"></p></div>`,()=>{if(kid){refreshChips();if(kid.eggs>0){tab="board";showTab();setTimeout(hatch,200)}else showTab()}});
  const P=$("#panel");
  P.querySelectorAll("[data-ok]").forEach(b=>b.onclick=()=>{confirmTask(b.dataset.ok);parentPanel()});
  P.querySelectorAll("[data-no]").forEach(b=>b.onclick=()=>{delete today().tasks[b.dataset.no];save();parentPanel()});
  if($("#all"))$("#all").onclick=()=>{pend.forEach(t=>confirmTask(t.id));parentPanel()};
  $("#editT").onclick=()=>taskEditor();
  if($("#logout"))$("#logout").onclick=()=>{sheetClose=null;closeSheet();logout()};
  if($("#nextDay"))$("#nextDay").onclick=()=>{S.offset=(S.offset||0)+1;save();toast("Nový den, nová tabule");closeSheet()};
  $("#gift").onclick=()=>{kid.pearls+=10;save();refreshChips();toast("+10 perliček")};
  let armed=false;$("#delKid").onclick=()=>{if(!armed){armed=true;$("#rhint").textContent="Ťukni znovu. Smaže se profil, rybky i perličky a nejde to vrátit.";return}
    S.kids=S.kids.filter(k=>k.id!==kid.id);save();sheetClose=null;closeSheet();renderProfiles();toast("Profil smazán")};
}
function overLimit(tasks){for(const [n,l] of DAYS){if(tasks.filter(t=>t.on&&t.days.includes(n)).length>MAX_PER_DAY)return l}return null}
function backToBoard(){if(kid&&screenName==="main"){refreshChips();showTab()}}
function taskEditor(){
  const list=kidTasks();
  openSheet(head("Úkoly: "+esc(kid.name))+`<div class="center"><p class="lead">Zapni, vypni nebo uprav úkoly a nastav, ve které dny platí. Na jeden den jde nejvýš ${MAX_PER_DAY} úkolů. Zlatá tabule je, když jsou potvrzené všechny dnešní.</p>
   <div class="plist">${list.map((t,i)=>`<div class="prow ${t.on?"":"off"}"><span class="ic">${t.icon}</span><span class="t">${esc(t.name)}<small>${daysLabel(t.days)} · +${t.reward}${t.game?" · "+(MINIGAMES.find(m=>m.id===t.game)||{}).name:" · bez mini-hry"}</small></span>
     <button class="mini" data-up="${i}" aria-label="Posunout výš" ${i?"":"disabled"}>↑</button>
     <button class="switch" role="switch" aria-checked="${t.on}" data-tog="${i}" aria-label="${t.on?"Vypnout":"Zapnout"} ${esc(t.name)}"></button>
     <button class="btn ghost small" data-ed="${i}">Upravit</button></div>`).join("")}</div>
   <p class="hint" id="thint"></p>
   <div class="tools"><button class="btn kelp" id="addT">Přidat vlastní úkol</button><button class="btn ghost" data-close>Hotovo</button></div></div>`,backToBoard);
  const P=$("#panel");
  P.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>{const t=list[+b.dataset.tog];t.on=!t.on;const over=overLimit(list);if(over){t.on=!t.on;$("#thint").textContent="V "+over+" už je "+MAX_PER_DAY+" úkolů. Nejdřív jiný vypni nebo uber dny.";return}save();taskEditor()});
  P.querySelectorAll("[data-up]").forEach(b=>b.onclick=()=>{const i=+b.dataset.up;if(!i)return;[list[i-1],list[i]]=[list[i],list[i-1]];save();taskEditor()});
  P.querySelectorAll("[data-ed]").forEach(b=>b.onclick=()=>taskForm(+b.dataset.ed));
  $("#addT").onclick=()=>taskForm(null);
}
function taskForm(i){
  const list=kidTasks();const isNew=i==null;
  const t=isNew?{id:"c"+Date.now().toString(36),name:"",desc:"",icon:"⭐",bg:"#fff3d6",reward:2,game:null,days:ALL_DAYS.slice(),on:true}:{...list[i],days:list[i].days.slice()};
  let lastGame=t.game||(t.builtin?t.id:"zuby");
  openSheet(head(isNew?"Nový úkol":"Upravit úkol")+`<div class="center">
   <label class="field">Název<input id="tn" maxlength="28" value="${esc(t.name)}" placeholder="Např. Nakrmit kočku"></label>
   <label class="field">Krátký popis pro dítě<input id="td" maxlength="70" value="${esc(t.desc||"")}" placeholder="Co přesně má udělat"></label>
   <p class="lead">Obrázek</p><div class="icons">${(ICONS.includes(t.icon)?ICONS:[t.icon].concat(ICONS)).map(ic=>`<button data-ic="${ic}" aria-pressed="${ic===t.icon}">${ic}</button>`).join("")}</div>
   <label class="check"><input type="checkbox" id="tg" ${t.game?"checked":""}><span>Obsahuje mini-hru</span></label>
   <div class="games" id="gpick" ${t.game?"":"hidden"}>${MINIGAMES.map(m=>`<button data-g="${m.id}" aria-pressed="${m.id===t.game}"><span>${m.icon}</span><b>${m.name}</b><small>${m.desc}</small></button>`).join("")}</div>
   <p class="hint" id="gnote">${t.game?"Dítě nejdřív zahraje mini-hru, pak úkol potvrdíš ty.":"Bez mini-hry dítě úkol odklikne podržením tlačítka, pak ho potvrdíš ty."}</p>
   <p class="lead">Odměna</p><div class="stepper"><button id="rm" aria-label="Méně">−</button><span><span class="pearl"></span><b id="rv">${t.reward}</b></span><button id="rp" aria-label="Více">+</button></div>
   <p class="lead">Které dny</p><div class="days">${DAYS.map(([n,l])=>`<button data-day="${n}" aria-pressed="${t.days.includes(n)}">${l}</button>`).join("")}</div>
   <div class="quick"><button class="linkbtn" data-q="all">Každý den</button><button class="linkbtn" data-q="wk">Po–Pá</button><button class="linkbtn" data-q="we">Víkend</button></div>
   <p class="say" id="fhint"></p>
   <div class="tools"><button class="btn kelp" id="tsave">Uložit</button>${!isNew?'<button class="btn ghost" id="tdel">Smazat úkol</button>':""}</div></div>`,taskEditor);
  const P=$("#panel");
  const paintDays=()=>P.querySelectorAll("[data-day]").forEach(b=>b.setAttribute("aria-pressed",t.days.includes(+b.dataset.day)));
  P.querySelectorAll("[data-ic]").forEach(b=>b.onclick=()=>{t.icon=b.dataset.ic;P.querySelectorAll("[data-ic]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  const paintGames=()=>{$("#gpick").hidden=!t.game;P.querySelectorAll("[data-g]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.g===t.game));$("#gnote").textContent=t.game?"Dítě nejdřív zahraje mini-hru, pak úkol potvrdíš ty.":"Bez mini-hry dítě úkol odklikne podržením tlačítka, pak ho potvrdíš ty."};
  $("#tg").onchange=e=>{if(e.target.checked){t.game=lastGame}else{if(t.game)lastGame=t.game;t.game=null}paintGames()};
  P.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{t.game=lastGame=b.dataset.g;paintGames()});
  $("#rm").onclick=()=>{t.reward=Math.max(1,t.reward-1);$("#rv").textContent=t.reward};
  $("#rp").onclick=()=>{t.reward=Math.min(5,t.reward+1);$("#rv").textContent=t.reward};
  P.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{const n=+b.dataset.day;t.days=t.days.includes(n)?t.days.filter(x=>x!==n):t.days.concat(n);paintDays()});
  P.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{t.days=b.dataset.q==="all"?ALL_DAYS.slice():b.dataset.q==="wk"?[1,2,3,4,5]:[0,6];paintDays()});
  $("#tsave").onclick=()=>{t.name=$("#tn").value.trim();t.desc=$("#td").value.trim();
    if(!t.name){$("#fhint").textContent="Napiš název úkolu";$("#tn").focus();return}
    if(!t.days.length){$("#fhint").textContent="Vyber aspoň jeden den";return}
    const next=list.slice();if(isNew)next.push(t);else next[i]=t;const over=overLimit(next);
    if(over){$("#fhint").textContent="V "+over+" by bylo víc než "+MAX_PER_DAY+" úkolů. Uber dny nebo jiný úkol vypni.";return}
    if(isNew)list.push(t);else list[i]=t;save();toast(isNew?"Úkol přidán":"Uloženo");taskEditor()};
  let armed=false;if($("#tdel"))$("#tdel").onclick=()=>{if(!armed){armed=true;$("#fhint").textContent="Ťukni znovu pro smazání úkolu.";return}list.splice(i,1);const d=today();delete d.tasks[t.id];save();toast("Úkol smazán");taskEditor()};
}
function confirmTask(id){const d=today();if(d.tasks[id]!=="pending")return;d.tasks[id]="confirmed";const t=findTask(id);kid.pearls+=t.reward||1;
  if(!kid.fish.length&&!kid.eggs)kid.eggs=1;
  const list=todaysTasks();if(!d.golden&&list.length&&list.every(x=>d.tasks[x.id]==="confirmed")){d.golden=true;if(kid.fish.length)kid.eggs=(kid.eggs||0)+1}
  save();refreshChips();blip(880)}

/* ============ HATCH ============ */
function pickSpecies(){if(!kid.fish.length)return kid.av;const st=streak();const r=Math.random();
  let pool=[0,1,2];if(st>=3&&r<.5)pool=[3,4,5];if(st>=7&&r<.25)pool=[6];if(st>=14&&r<.08)pool=[7];
  const have=new Set(kid.fish.map(f=>f.sp));const fresh=pool.filter(p=>!have.has(p));const list=fresh.length?fresh:pool;return list[Math.random()*list.length|0]}
function hatch(){
  if(!kid||!(kid.eggs>0))return;
  const sp=pickSpecies();let taps=0;const first=!kid.fish.length;
  openSheet(head(first?"Tvoje první rybka!":"Zlatá tabule!")+`<div class="center"><p class="lead">${first?"Rodič potvrdil tvůj první úkol.":"Všechny úkoly máš potvrzené."} Ťukej na vajíčko, ať se rybka vylíhne.</p>
   <div id="eggzone"><button class="hatch-egg" id="egg" aria-label="vajíčko"><svg class="crack" viewBox="0 0 150 186"><path id="cr" d="" stroke="#a8740a" stroke-width="4" fill="none" stroke-linecap="round"/></svg></button></div></div>`);
  const cracks=["M40 70 L60 85 L50 100","M40 70 L60 85 L50 100 M110 60 L95 80 L108 95","M40 70 L60 85 L50 100 M110 60 L95 80 L108 95 M70 40 L78 60 L68 72"];
  $("#egg").onclick=()=>{taps++;const e=$("#egg");e.classList.remove("wob");void e.offsetWidth;e.classList.add("wob");blip(300+taps*150,.15,"triangle");
   if(taps<=3)$("#cr").setAttribute("d",cracks[taps-1]);
   if(taps===4){chime();confetti();const D=SPECIES[sp];
    $("#eggzone").outerHTML=`<div class="reveal">${fishHTML(sp,"big")}</div><h3 style="font-size:1.7rem">${D.name}</h3><p class="lead">${D.rar} · ${D.fact}</p>
     <label class="field">Jak se bude jmenovat?<input id="fname" maxlength="14" placeholder="Jméno rybky"></label><button class="btn" id="keep">Pustit do akvária</button>`;
    hydrate($("#panel"));
    $("#keep").onclick=()=>{kid.fish.push({sp,name:$("#fname").value.trim()||D.name,born:dayKey(0)});kid.eggs=Math.max(0,(kid.eggs||1)-1);save();sheetClose=null;closeSheet();
      if(kid.eggs>0){setTimeout(hatch,300);return}tab="tank";showTab();toast(D.name+" je v akváriu")};
   }};
}

/* ============ AQUARIUM ============ */
let lastTankSig="";
function tankSig(){return kid?kid.fish.map(f=>f.sp+f.name).join("|")+"#"+kid.decor.join(","):""}
function stopTank(){stopTank3D();stopTank2D()}
function renderTank(){
  stopTank();lastTankSig=tankSig();
  const fedToday=kid.lastFed===dayKey(0);const empty=!kid.fish.length;
  const hour=new Date().getHours();const night=hour>=20||hour<6;
  const murk=empty?0:Math.min(1,Math.max(0,daysSinceGolden()-1)/3);
  $("#vTank").innerHTML=`<div class="tankwrap" id="tw"><canvas id="tank" aria-label="Akvárium s rybkami"></canvas><div class="fishname"></div>${empty?`<div class="tank-empty"><b>Akvárium čeká na první rybku</b><span>Splň úkol, rodič ho potvrdí a vajíčko se vylíhne.</span></div>`:""}</div>
   <div class="tankbar"><button class="btn" id="feed" ${empty?"disabled":""}>${fedToday?"Přikrmit (1 perlička)":"Nakrmit rybky"}</button><span class="hint" id="mood"></span></div>
   <h3 class="section-t">Obchůdek s dekoracemi</h3>
   <div class="shop">${DECOR.map(d=>{const own=kid.decor.includes(d.id);return `<div class="item ${own?"own":""}"><canvas data-d="${d.id}"></canvas><b>${d.name}</b><button class="btn sea small" data-buy="${d.id}" ${own||kid.pearls<d.price?"disabled":""}>${own?"Máš":`<span style="display:inline-flex;align-items:center;gap:6px"><span class="pearl"></span>${d.price}</span>`}</button></div>`}).join("")}</div>
   <h3 class="section-t">Encyklopedie moře</h3>
   <div class="dex">${SPECIES.map((s,i)=>{const has=kid.fish.some(f=>f.sp===i);return `<div class="card ${has?"":"locked"}">${fishHTML(i)}<b>${has?s.name:"???"}</b><small>${s.rar}</small></div>`}).join("")}</div>`;
  hydrate($("#vTank"));
  document.querySelectorAll("canvas[data-d]").forEach(cv=>decorIcon(cv,cv.dataset.d));
  document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{const d=DECOR.find(x=>x.id===b.dataset.buy);if(kid.pearls<d.price)return;kid.pearls-=d.price;kid.decor.push(d.id);save();refreshChips();chime();toast(d.name+" je v akváriu");renderTank()});
  $("#feed").onclick=()=>{const fed=kid.lastFed===dayKey(0);if(fed){if(kid.pearls<1){toast("Nemáš perličku");return}kid.pearls--}kid.lastFed=dayKey(0);save();refreshChips();if(T3)T3.dropFood();else dropFood2D();$("#feed").textContent="Přikrmit (1 perlička)";blip(400,.2,"triangle")};
  $("#mood").textContent=empty?"Ťukni na vajíčko, třeba se pohne.":night?"Rybky spí. Dobrou noc!":murk>.5?"Voda je kalná. Splň úkoly a vyčistí se.":murk>0?"Voda se trochu kalí, rybky se těší na zlatou tabuli.":"Voda je křišťálová, rybky jsou spokojené.";
  if(HAS3D){try{startTank3D($("#tw"),{fish:kid.fish,decor:kid.decor,night,murk});return}catch(e){stopTank3D()}}
  startTank2D(night,murk);
}

let raf=0,tankState=null;
function stopTank2D(){cancelAnimationFrame(raf);raf=0;tankState=null}
function startTank2D(){
  const cv=$("#tank");const c=cv.getContext("2d");let W,H;
  const fit=()=>{const r=devicePixelRatio||1;W=cv.clientWidth;H=cv.clientHeight;cv.width=W*r;cv.height=H*r;c.setTransform(r,0,0,r,0,0)};fit();
  const hour=new Date().getHours();const night=hour>=20||hour<6;const murk=kid.fish.length?Math.min(1,Math.max(0,daysSinceGolden()-1)/3):0;
  const fish=kid.fish.map((f,i)=>({...f,x:W*(.2+Math.random()*.6),y:H*(.25+Math.random()*.4),tx:0,ty:0,vx:0,vy:0,dir:1,turn:1,sq:0,s:Math.min(W,H)*(SPECIES[f.sp].tall?.16:.13)*(.9+Math.random()*.25),phase:Math.random()*9,heart:0}));
  fish.forEach(pick);
  function pick(f){f.tx=W*(.08+Math.random()*.84);f.ty=H*(murk>.5||night?.55+Math.random()*.2:.15+Math.random()*.55)}
  const bubbles=[...Array(14)].map(()=>({x:W*.86+Math.random()*10,y:Math.random()*H,r:2+Math.random()*5,v:.4+Math.random()*.8}));
  const food=[];
  tankState={dropFood:()=>{for(let i=0;i<8;i++)food.push({x:W*(.25+Math.random()*.5),y:-10-Math.random()*40,vy:.6+Math.random()*.5})}};
  cv.onclick=e=>{const r=cv.getBoundingClientRect(),mx=e.clientX-r.left,my=e.clientY-r.top;let hit=null;fish.forEach(f=>{if(Math.hypot(f.x-mx,f.y-my)<f.s*.5)hit=f});
    if(hit){hit.sq=1;hit.heart=1;hit.tx=Math.max(W*.08,Math.min(W*.92,hit.x+(hit.x-mx)*4+(Math.random()-.5)*80));hit.ty=Math.max(H*.12,Math.min(H*.7,hit.y-40));blip(700,.1);showName=hit;nameT=1.6}
    else{for(let i=0;i<5;i++)bubbles.push({x:mx+(Math.random()-.5)*14,y:my,r:2+Math.random()*4,v:1+Math.random(),tmp:1});blip(1000,.06,"sine",.06)}};
  let showName=null,nameT=0;
  const sandY=x=>H*.83+Math.sin(x/W*Math.PI*2)*H*.025;
  const slots=[[.18,"rostlina"],[.82,"hrad"],[.38,"koral"],[.6,"truhla"]];
  let last=performance.now();
  const loop=now=>{if(!tankState)return;const dt=Math.min(.05,(now-last)/1000);last=now;const t=now/1000;
    if(cv.clientWidth!==W)fit();
    // water
    let g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,"#8fe3f0");g.addColorStop(.45,"#2c97c4");g.addColorStop(1,"#0f4a72");c.fillStyle=g;c.fillRect(0,0,W,H);
    // rays
    c.save();c.globalCompositeOperation="lighter";for(let i=0;i<5;i++){const x0=W*(.1+i*.22)+Math.sin(t*.4+i)*W*.04;const rg=c.createLinearGradient(0,0,0,H*.85);rg.addColorStop(0,"rgba(255,255,230,.16)");rg.addColorStop(1,"rgba(255,255,230,0)");c.fillStyle=rg;c.beginPath();c.moveTo(x0,0);c.lineTo(x0+W*.07,0);c.lineTo(x0+W*.2,H*.85);c.lineTo(x0+W*.06,H*.85);c.fill()}c.restore();
    // far plants silhouette
    c.fillStyle="rgba(10,60,90,.35)";for(let i=0;i<9;i++){const bx=W*i/8;c.beginPath();c.moveTo(bx-12,sandY(bx));c.quadraticCurveTo(bx+Math.sin(t+i)*14,H*.55,bx+Math.sin(t*1.2+i)*10,H*.5+((i*37)%40));c.quadraticCurveTo(bx+8,H*.65,bx+12,sandY(bx));c.fill()}
    // sand
    const sg=c.createLinearGradient(0,H*.78,0,H);sg.addColorStop(0,"#f6dfae");sg.addColorStop(1,"#d3a967");c.fillStyle=sg;c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=10)c.lineTo(x,sandY(x));c.lineTo(W,H);c.fill();
    // caustics on sand
    c.save();c.globalCompositeOperation="lighter";c.strokeStyle="rgba(255,255,255,.18)";c.lineWidth=2;for(let i=0;i<14;i++){const cx=(i*97+t*12)%W,cy=sandY(cx)+8+(i%3)*8;c.beginPath();c.ellipse(cx,cy,14+6*Math.sin(t*2+i),4,0,0,7);c.stroke()}c.restore();
    // pebbles
    for(let i=0;i<12;i++){const px=(i*131)%W,py=sandY(px)+10+(i%4)*7;const pg=c.createRadialGradient(px-2,py-2,1,px,py,7);pg.addColorStop(0,"#fff");pg.addColorStop(1,["#b8a48a","#8fa6b8","#c98f7a"][i%3]);c.fillStyle=pg;c.beginPath();c.ellipse(px,py,7,4.5,0,0,7);c.fill()}
    // decor
    drawDecor(c,"rostlina",W*.06,sandY(W*.06)+4,H*.32,t);
    slots.forEach(([fx,id])=>{if(kid.decor.includes(id))drawDecor(c,id,W*fx,sandY(W*fx)+6,H*(id==="hrad"?.34:id==="truhla"?.3:.3),t)});
    // bubbler
    c.fillStyle="#8a9aa8";c.beginPath();c.ellipse(W*.86+5,sandY(W*.86)+2,12,6,0,0,7);c.fill();
    bubbles.forEach(b=>{b.y-=b.v*60*dt;b.x+=Math.sin(t*3+b.r)*.3;if(b.y<-10){if(b.tmp){b.dead=1}else{b.y=sandY(b.x);b.x=W*.86+Math.random()*10}}
      c.strokeStyle="rgba(255,255,255,.75)";c.lineWidth=1.3;c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.stroke();c.fillStyle="rgba(255,255,255,.6)";c.beginPath();c.arc(b.x-b.r*.35,b.y-b.r*.35,b.r*.28,0,7);c.fill()});
    for(let i=bubbles.length-1;i>=0;i--)if(bubbles[i].dead)bubbles.splice(i,1);
    // food
    food.forEach(p=>{p.y+=p.vy*60*dt;if(p.y>sandY(p.x))p.y=sandY(p.x);c.fillStyle="#c26a2c";c.beginPath();c.arc(p.x,p.y,3.2,0,7);c.fill()});
    // fish
    fish.sort((a,b)=>a.s-b.s);
    fish.forEach(f=>{
      let tx=f.tx,ty=f.ty,speed=night?18:55;
      if(food.length&&!night){let best=null,bd=1e9;food.forEach(p=>{const d=Math.hypot(p.x-f.x,p.y-f.y);if(d<bd){bd=d;best=p}});tx=best.x;ty=best.y;speed=110;if(bd<f.s*.35){food.splice(food.indexOf(best),1);f.sq=.6;f.heart=1;blip(1200,.05,"sine",.05)}}
      const dx=tx-f.x,dy=ty-f.y,dist=Math.hypot(dx,dy);
      if(dist<12&&!food.length)pick(f);
      const ax=dx/(dist||1)*speed,ay=dy/(dist||1)*speed;f.vx+=(ax-f.vx)*dt*1.8;f.vy+=(ay-f.vy)*dt*1.8;
      f.x+=f.vx*dt;f.y+=f.vy*dt+Math.sin(t*2+f.phase)*.15;
      if(Math.abs(f.vx)>4)f.dir=f.vx>0?1:-1;f.turn+=(f.dir-f.turn)*Math.min(1,dt*6);
      f.sq=Math.max(0,f.sq-dt*2.5);f.heart=Math.max(0,f.heart-dt*.8);
      // shadow
      c.fillStyle="rgba(10,40,60,.12)";c.beginPath();c.ellipse(f.x,sandY(f.x)+6,f.s*.35*(1-(sandY(f.x)-f.y)/H),4,0,0,7);c.fill();
      drawFish(c,f.sp,f.x,f.y,f.s,f.turn,t+f.phase,{squash:Math.sin(f.sq*Math.PI)*.8,sleep:night,tilt:Math.max(-.3,Math.min(.3,f.vy/120))*f.dir});
      if(f.heart>0){c.globalAlpha=f.heart;c.fillStyle="#ff5a7a";const hx=f.x,hy=f.y-f.s*.6-(1-f.heart)*24,hs=8;c.beginPath();c.moveTo(hx,hy+hs*.6);c.bezierCurveTo(hx-hs*1.4,hy-hs*.4,hx-hs*.4,hy-hs*1.3,hx,hy-hs*.4);c.bezierCurveTo(hx+hs*.4,hy-hs*1.3,hx+hs*1.4,hy-hs*.4,hx,hy+hs*.6);c.fill();c.globalAlpha=1}
      if(night&&Math.sin(t+f.phase)>0){c.fillStyle="rgba(255,255,255,.8)";c.font="700 14px Baloo\\ 2, sans-serif";c.fillText("z",f.x+f.s*.3,f.y-f.s*.45-(t*8+f.phase*10)%14)}
    });
    // name tag
    if(showName&&nameT>0){nameT-=dt;const f=fish.find(x=>x.name===showName.name)||showName;c.globalAlpha=Math.min(1,nameT*2);c.font="800 16px 'Baloo 2', sans-serif";const tw=c.measureText(f.name).width+22;const nx=Math.max(tw/2+6,Math.min(W-tw/2-6,f.x)),ny=Math.max(22,f.y-f.s*.85);c.fillStyle="rgba(255,255,255,.92)";c.beginPath();c.roundRect?c.roundRect(nx-tw/2,ny-14,tw,28,14):c.rect(nx-tw/2,ny-14,tw,28);c.fill();c.fillStyle="#13324a";c.textAlign="center";c.textBaseline="middle";c.fillText(f.name,nx,ny+1);c.textAlign="start";c.textBaseline="alphabetic";c.globalAlpha=1}
    // murk + night
    if(murk>0){c.fillStyle=`rgba(96,120,70,${murk*.45})`;c.fillRect(0,0,W,H);for(let i=0;i<30*murk;i++){c.fillStyle="rgba(200,210,150,.25)";c.beginPath();c.arc((i*71+t*6)%W,(i*53+Math.sin(t+i)*10)%H,1.5,0,7);c.fill()}}
    if(night){c.fillStyle="rgba(8,20,60,.45)";c.fillRect(0,0,W,H)}
    // glass highlight
    const gl=c.createLinearGradient(0,0,W*.3,0);gl.addColorStop(0,"rgba(255,255,255,.18)");gl.addColorStop(1,"rgba(255,255,255,0)");c.fillStyle=gl;c.fillRect(0,0,W*.3,H);
    raf=requestAnimationFrame(loop)};
  raf=requestAnimationFrame(loop);
}
function dropFood2D(){tankState&&tankState.dropFood()}



/* boot */
makePortraits();
boot();
