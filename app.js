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
 {id:"zuby",name:"Bacilí honička",icon:"🪥",desc:"2min časovač, bacily po čtvrtinách pusy"},
 {id:"pokoj",name:"Úklid do krabic",icon:"🧸",desc:"Hračky, oblečení, knížky do krabic"},
 {id:"jidlo",name:"Zdravý talíř",icon:"🥦",desc:"Skládání talíře, sladkosti odskočí"},
 {id:"postel",name:"Ustlaná postel",icon:"🛏️",desc:"Natáhnout peřinu, načechrat polštář"},
 {id:"plavba",name:"Plavba lodičky",icon:"⛵",desc:"Časovač: lodička pluje k pokladu"},
 {id:"rutina",name:"Krok za krokem",icon:"✅",desc:"Obrázkový seznam kroků k odškrtnutí"},
 {id:"trideni",name:"Třídění odpadu",icon:"♻️",desc:"Plast, papír, sklo, bio do barev"},
 {id:"batoh",name:"Aktovka",icon:"🎒",desc:"Správné věci do aktovky podle dne"},
 {id:"prostirani",name:"Prostírání",icon:"🍽️",desc:"Talíř, příbor a sklenička na místo"},
 {id:"pena",name:"Mýdlová pěna",icon:"🧼",desc:"20 s drhnutí prstem po obrazovce"},
 {id:"satnik",name:"Šatník",icon:"👕",desc:"Oblékání ve správném pořadí podle počasí"},
 {id:"konvicka",name:"Konvička",icon:"🪴",desc:"Zalít akorát, ne moc a ne málo"},
 {id:"miska",name:"Miska",icon:"🐱",desc:"Správná porce granulí a voda"},
 {id:"lednice",name:"Lednička",icon:"🛒",desc:"Mrazák, lednice, nebo spíž"},
 {id:"mycka",name:"Myčka",icon:"🫧",desc:"Nádobí do správného koše"},
 {id:"rozcvicka",name:"Rozcvička",icon:"🤸",desc:"5 cviků po 15 sekundách"},
 {id:"matika",name:"Mořská matika",icon:"🔢",desc:"5 příkladů podle úrovně"},
 {id:"muslicka",name:"Srdíčková mušle",icon:"🐚",desc:"Výběr dobrého skutku pro rodiče"},
 {id:"uspavani",name:"Uspávání",icon:"🌙",desc:"Zhasnout lampy, zatáhnout závěsy"}
];
function kidTasks(k=kid){if(!k.tasks)k.tasks=TASKS.map(t=>({id:t.id,name:t.name,desc:t.desc,icon:t.icon,bg:t.bg,reward:t.reward,builtin:true,cat:t.id,game:t.id,on:true,days:ALL_DAYS.slice()}));
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
  const {night,murk}=opts;const TH=THEMES[opts.bg]||THEMES.utes;
  scene.background=gradTex(night?[[0,"#2a4f86"],[.6,"#13305a"],[1,"#081a33"]]:[[0,TH.water[0]],[.45,TH.water[1]],[1,TH.water[2]]]);
  {const bt=new THREE.CanvasTexture(backdropCanvas(opts.bg||"utes"));bt.encoding=THREE.sRGBEncoding;const back=new THREE.Mesh(new THREE.PlaneGeometry(44,16.5),new THREE.MeshBasicMaterial({map:bt,transparent:true,fog:false,depthWrite:false,color:night?0x6f7fa0:0xffffff}));back.position.set(0,1.6,-10.5);scene.add(back)}
  const fogCol=new THREE.Color(night?"#0f2a50":TH.fog).lerp(new THREE.Color("#5a7a4a"),murk*.7);
  scene.fog=new THREE.Fog(fogCol,15-murk*7,40-murk*20);
  const cam=new THREE.PerspectiveCamera(38,1,.1,100);cam.position.set(0,1.2,15);cam.lookAt(0,.2,0);
  const key=lightRig(scene);key.castShadow=true;key.shadow.mapSize.set(1024,1024);Object.assign(key.shadow.camera,{left:-11,right:11,top:9,bottom:-6,near:1,far:30});key.shadow.radius=5;key.shadow.bias=-.0006;
  if(night){scene.children.forEach(o=>{if(o.isLight)o.intensity*=.45})}
  // sand with caustics
  const sandG=new THREE.PlaneGeometry(44,18,90,36);sandG.rotateX(-Math.PI/2);const pa=sandG.attributes.position;
  for(let i=0;i<pa.count;i++){const x=pa.getX(i),z=pa.getZ(i);pa.setY(i,Math.sin(x*.45)*.18+Math.cos(z*.7+x*.2)*.12+Math.sin(x*1.7+z*1.3)*.04)}sandG.computeVertexNormals();
  const sandM=new THREE.MeshStandardMaterial({color:TH.sand,roughness:.95});const CU={t:{value:0},k:{value:night?.08:.24*(1-murk*.6)}};
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
  addPlant(makePlant(TH.plants[0],5,7),-7,-2.2,1.1);addPlant(makePlant(TH.plants[1],4,6),6.2,-2.8,1);addPlant(makePlant(TH.plants[2],4,5),-1,-5,1.2);
  // decor
  const decorObjs=[];const slots={rostlina:[-4.6,-1],koral:[-2,-2.2],hrad:[4.2,-2.6],truhla:[1.6,-.4]};
  (opts.decor||[]).forEach(id=>{const d=makeDecor(id);const [x,z]=slots[id];d.position.set(x,sandY(x,z),z);scene.add(d);decorObjs.push(d);if(d.children[0]&&d.children[0].userData.blades)plants.push(d.children[0])});
  // light rays
  const rayTex=(()=>{const cv=document.createElement("canvas");cv.width=64;cv.height=256;const c=cv.getContext("2d");const g=c.createLinearGradient(0,0,0,256);g.addColorStop(0,"rgba(255,255,235,1)");g.addColorStop(1,"rgba(255,255,235,0)");c.fillStyle=g;c.fillRect(0,0,64,256);c.globalCompositeOperation="destination-in";const h=c.createLinearGradient(0,0,64,0);h.addColorStop(0,"rgba(0,0,0,0)");h.addColorStop(.5,"rgba(0,0,0,1)");h.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=h;c.fillRect(0,0,64,256);return new THREE.CanvasTexture(cv)})();
  const rays=[];for(let i=0;i<6;i++){const m=new THREE.Mesh(new THREE.PlaneGeometry(1.6,16),new THREE.MeshBasicMaterial({map:rayTex,transparent:true,opacity:night?.04:TH.rays*(1-murk*.6),blending:THREE.AdditiveBlending,depthWrite:false,fog:false}));m.position.set(-7+i*2.8,3,-4+(i%3));m.rotation.z=.28;scene.add(m);rays.push(m)}
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
    rays.forEach((m,i)=>{m.rotation.z=.28+Math.sin(t*.35+i)*.05;m.material.opacity=(night?.04:TH.rays*(1-murk*.6))*(.7+.3*Math.sin(t*.8+i*1.7))});
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
/* ============ VOICE (průvodce) ============ */
const HAS_TTS="speechSynthesis" in window&&"SpeechSynthesisUtterance" in window;
let CZ_VOICE=null;
function pickVoice(){if(!HAS_TTS)return;const vs=speechSynthesis.getVoices();CZ_VOICE=vs.find(v=>/^cs/i.test(v.lang)&&/google/i.test(v.name))||vs.find(v=>/^cs/i.test(v.lang)&&!v.localService)||vs.find(v=>/^cs/i.test(v.lang))||null}
if(HAS_TTS){pickVoice();speechSynthesis.onvoiceschanged=pickVoice}
function voiceCfg(){return Object.assign({on:true,rate:.95},(typeof S!=="undefined"&&S&&S.voice)||{})}
function speechText(t){return String(t||"").replace(/[\u{1F000}-\u{1FFFF}\u{2600}-\u{27BF}\u{FE0F}\u{200D}]/gu,"").replace(/\s*=\s*\?/g," je kolik?").replace(/\s\+\s/g," plus ").replace(/\s[−-]\s/g," mínus ").replace(/\s×\s/g," krát ").replace(/\//g," lomeno ").replace(/\s+/g," ").trim()}
function speak(text,interrupt=true){const c=voiceCfg();if(!HAS_TTS||!c.on)return;const t=speechText(text);if(!t)return;try{if(interrupt)speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="cs-CZ";if(CZ_VOICE)u.voice=CZ_VOICE;u.rate=c.rate;u.pitch=1.12;speechSynthesis.speak(u)}catch(e){}}
function stopSpeak(){try{HAS_TTS&&speechSynthesis.cancel()}catch(e){}}
const QUIET_SHEET=/Rodičovský|^Úkoly:|Nový úkol|Upravit úkol|Nabídka úkolů|Nový profil|Zopakuj PIN/;
function narrateSheet(){const p=$("#panel");const h=p.querySelector(".panel-head h2");const title=h?h.textContent:"";if(QUIET_SHEET.test(title))return;
  const lead=[...p.querySelectorAll(".lead")].filter(x=>x.offsetParent!==null).map(x=>x.textContent).join(" ");speak(title&&lead?title+(/[.!?]$/.test(title)?" ":". ")+lead:title||lead)}
let lastSaid="";
const sayObserver=new MutationObserver(ms=>{const h=$("#panel .panel-head h2");if(h&&QUIET_SHEET.test(h.textContent))return;for(const m of ms){const el=m.target.nodeType===3?m.target.parentElement:m.target;const say=el&&el.closest&&el.closest(".say");if(say&&say.textContent&&say.textContent!==lastSaid){lastSaid=say.textContent;speak(say.textContent);break}}});

const $=s=>document.querySelector(s);
const app=$("#app");
function esc(s){return String(s).replace(/[&<>"]/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[m]))}
let toastT;function toast(m){const t=$("#toast");t.textContent=m;if(screenName==="main"||screenName==="profiles")speak(m);t.hidden=false;clearTimeout(toastT);toastT=setTimeout(()=>t.hidden=true,2200)}
let sheetClose=null,pendingRefresh=false;
function openSheet(html,onClose){stopSpeak();lastSaid="";const p=$("#panel");p.innerHTML=html;$("#sheet").hidden=false;sheetClose=onClose||null;p.querySelectorAll("[data-close]").forEach(b=>b.onclick=closeSheet);const rp=p.querySelector("[data-replay]");if(rp)rp.onclick=()=>narrateSheet();sayObserver.disconnect();sayObserver.observe(p,{subtree:true,childList:true,characterData:true});setTimeout(narrateSheet,120)}
function closeSheet(){disposeViewers();stopSpeak();sayObserver.disconnect();$("#sheet").hidden=true;$("#panel").innerHTML="";clearInterval(gameTimer);const f=sheetClose;sheetClose=null;if(f)f();if(pendingRefresh){pendingRefresh=false;refreshScreen()}}
$("#sheet").addEventListener("click",e=>{if(e.target.id==="sheet")closeSheet()});
function head(t){return `<div class="panel-head"><h2>${t}</h2>${QUIET_SHEET.test(t)?"":`<button class="replay" data-replay aria-label="Přečíst znovu">🔊</button>`}<button class="close" data-close aria-label="Zavřít">✕</button></div>`}
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
   <p class="lead">Vyber 3 tajná zvířátka (PIN dítěte)</p>
   <div class="pin-dots" id="dots"><i></i><i></i><i></i></div>
   <div class="pin-grid">${PIN_SYMS.map((s,i)=>`<button data-i="${i}">${s}</button>`).join("")}</div>
   <button class="btn kelp" id="mk" disabled>Vytvořit profil</button></div>`);
  const P=$("#panel");hydrate(P);
  const check=()=>{$("#mk").disabled=!($("#kname").value.trim()&&pin.length===3)};
  $("#kname").oninput=check;
  P.querySelectorAll(".pin-grid button").forEach(b=>b.onclick=()=>{if(pin.length>=3)pin=[];pin.push(+b.dataset.i);[...$("#dots").children].forEach((d,i)=>d.textContent=pin[i]!=null?PIN_SYMS[pin[i]]:"");check()});
  $("#mk").onclick=()=>{S.kids.push({id:"k"+Date.now().toString(36),name:$("#kname").value.trim(),av,pin,pearls:0,points:0,fishPts:0,fishEvery:15,fish:[],eggs:0,decor:[],days:{},lastFed:"",created:dayKey(0)});save();closeSheet();renderProfiles();toast("Profil je hotový. Při prvním otevření si dítě vybere akvárium a rybku.")};
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
  {const n=todaysTasks().length,dn=todaysTasks().filter(t=>today().tasks[t.id]==="confirmed").length;speak("Ahoj "+kid.name+"! "+(n?(dn>=n?"Dnes máš všechno hotové. Paráda!":"Dnes máš "+(n-dn)+" "+plural(n-dn,"úkol","úkoly","úkolů")+". Vyber si, čím začneš."):"Dnes máš volno."))}
  if(!kid.tank)setTimeout(()=>setupTank(true),300);
  else if(kid.eggs>0)setTimeout(hatch,300);
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
   ${fishProgressHTML()}`;
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
   <div class="plist">${pend.map(t=>`<div class="prow"><span class="ic">${t.icon}</span><span class="t">${esc(t.name)}<small>+${t.reward} ${plural(t.reward,"bod","body","bodů")}${d.notes&&d.notes[t.id]?" · „"+esc(d.notes[t.id])+"“":""}</small></span><button class="btn kelp small" data-ok="${t.id}">Potvrdit</button><button class="btn ghost small" data-no="${t.id}">Vrátit</button></div>`).join("")}</div>
   ${pend.length>1?'<button class="btn kelp" id="all">Potvrdit vše</button>':""}
   <button class="btn sea" id="editT">Upravit úkoly pro ${esc(kid.name)}</button>
   <div class="fishset"><b>Nová rybka každých</b><div class="stepper"><button id="fm" aria-label="Méně">−</button><span><b id="fv">${kid.fishEvery||15}</b> bodů</span><button id="fp" aria-label="Více">+</button></div>
    <small>Body dítě dostává za potvrzené úkoly (podle odměny úkolu) a +${GOLD_BONUS} za splnění všech dnešních. Teď má ${kid.fishPts||0} z ${kid.fishEvery||15}.</small></div>
   ${accountHTML()}
   <div class="fishset"><b>Hlas průvodce</b><label class="check"><input type="checkbox" id="von" ${voiceCfg().on?"checked":""}><span>Předčítat dětem pokyny</span></label>
    <div class="stepper"><button id="vs" aria-label="Pomaleji">🐢</button><span><b id="vr">${Math.round(voiceCfg().rate*100)}</b> %</span><button id="vf" aria-label="Rychleji">🐇</button></div>
    <button class="btn ghost small" id="vtest">Vyzkoušet hlas</button>
    <small>${!HAS_TTS?"Tento prohlížeč neumí předčítat.":CZ_VOICE?"Hlas: "+esc(CZ_VOICE.name):"Na zařízení chybí český hlas. Android: Nastavení → Usnadnění → Převod textu na řeč → Google → stáhnout češtinu."}</small></div>
   <h3 class="section-t" style="margin-bottom:0">Nástroje</h3>
   <div class="tools">${CFG.testTools?'<button class="btn ghost small" id="nextDay">Test: další den</button>':""}<button class="btn ghost small" id="gift">Odměna navíc +10 perliček</button>${cloud.user?'<button class="btn ghost small" id="logout">Odhlásit rodinu z tohoto zařízení</button>':""}<button class="btn ghost small" id="delKid">Smazat profil ${esc(kid.name)}</button></div>
   <p class="hint" id="rhint"></p></div>`,()=>{if(kid){refreshChips();if(kid.eggs>0){tab="board";showTab();setTimeout(hatch,200)}else showTab()}});
  const P=$("#panel");
  P.querySelectorAll("[data-ok]").forEach(b=>b.onclick=()=>{confirmTask(b.dataset.ok);parentPanel()});
  P.querySelectorAll("[data-no]").forEach(b=>b.onclick=()=>{delete today().tasks[b.dataset.no];save();parentPanel()});
  if($("#all"))$("#all").onclick=()=>{pend.forEach(t=>confirmTask(t.id));parentPanel()};
  $("#editT").onclick=()=>taskEditor();
  const setEvery=v=>{kid.fishEvery=Math.max(5,Math.min(100,v));$("#fv").textContent=kid.fishEvery;save()};
  $("#fm").onclick=()=>setEvery((kid.fishEvery||15)-5);$("#fp").onclick=()=>setEvery((kid.fishEvery||15)+5);
  if($("#logout"))$("#logout").onclick=()=>{sheetClose=null;closeSheet();logout()};
  if($("#nextDay"))$("#nextDay").onclick=()=>{S.offset=(S.offset||0)+1;save();toast("Nový den, nová tabule");closeSheet()};
  const setV=o=>{S.voice=Object.assign(voiceCfg(),o);save()};
  $("#von").onchange=e=>setV({on:e.target.checked});
  $("#vs").onclick=()=>{const r=Math.max(.6,Math.round((voiceCfg().rate-.05)*100)/100);setV({rate:r});$("#vr").textContent=Math.round(r*100)};
  $("#vf").onclick=()=>{const r=Math.min(1.4,Math.round((voiceCfg().rate+.05)*100)/100);setV({rate:r});$("#vr").textContent=Math.round(r*100)};
  $("#vtest").onclick=()=>{const c=S.voice&&S.voice.on===false;if(c){toast("Hlas je vypnutý");return}speak("Ahoj! Já jsem tvoje rybka průvodkyně. Pojďme splnit dnešní úkoly!")};
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
   <div class="tools"><button class="btn kelp" id="addC">Přidat z nabídky</button><button class="btn sea" id="addT">Vlastní úkol</button><button class="btn ghost" data-close>Hotovo</button></div></div>`,backToBoard);
  const P=$("#panel");
  P.querySelectorAll("[data-tog]").forEach(b=>b.onclick=()=>{const t=list[+b.dataset.tog];t.on=!t.on;const over=overLimit(list);if(over){t.on=!t.on;$("#thint").textContent="V "+over+" už je "+MAX_PER_DAY+" úkolů. Nejdřív jiný vypni nebo uber dny.";return}save();taskEditor()});
  P.querySelectorAll("[data-up]").forEach(b=>b.onclick=()=>{const i=+b.dataset.up;if(!i)return;[list[i-1],list[i]]=[list[i],list[i-1]];save();taskEditor()});
  P.querySelectorAll("[data-ed]").forEach(b=>b.onclick=()=>taskForm(+b.dataset.ed));
  $("#addT").onclick=()=>taskForm(null);$("#addC").onclick=()=>catalogSheet();
}
function taskForm(i){
  const list=kidTasks();const isNew=i==null;
  const t=isNew?{id:"c"+Date.now().toString(36),name:"",desc:"",icon:"⭐",bg:"#fff3d6",reward:2,game:null,days:ALL_DAYS.slice(),on:true}:{...list[i],days:list[i].days.slice(),steps:list[i].steps?list[i].steps.slice():undefined};
  let lastGame=t.game||(t.builtin?t.id:"zuby");
  openSheet(head(isNew?"Nový úkol":"Upravit úkol")+`<div class="center">
   <label class="field">Název<input id="tn" maxlength="28" value="${esc(t.name)}" placeholder="Např. Nakrmit kočku"></label>
   <label class="field">Krátký popis pro dítě<input id="td" maxlength="70" value="${esc(t.desc||"")}" placeholder="Co přesně má udělat"></label>
   <p class="lead">Obrázek</p><div class="icons">${(ICONS.includes(t.icon)?ICONS:[t.icon].concat(ICONS)).map(ic=>`<button data-ic="${ic}" aria-pressed="${ic===t.icon}">${ic}</button>`).join("")}</div>
   <label class="check"><input type="checkbox" id="tg" ${t.game?"checked":""}><span>Obsahuje mini-hru</span></label>
   <div class="games" id="gpick" ${t.game?"":"hidden"}>${MINIGAMES.map(m=>`<button data-g="${m.id}" aria-pressed="${m.id===t.game}"><span>${m.icon}</span><b>${m.name}</b><small>${m.desc}</small></button>`).join("")}</div>
   <div id="gparams"></div>
   <p class="hint" id="gnote">${t.game?"Dítě nejdřív zahraje mini-hru, pak úkol potvrdíš ty.":"Bez mini-hry dítě úkol odklikne podržením tlačítka, pak ho potvrdíš ty."}</p>
   <p class="lead">Odměna</p><div class="stepper"><button id="rm" aria-label="Méně">−</button><span><span class="pearl"></span><b id="rv">${t.reward}</b></span><button id="rp" aria-label="Více">+</button></div>
   <p class="lead">Které dny</p><div class="days">${DAYS.map(([n,l])=>`<button data-day="${n}" aria-pressed="${t.days.includes(n)}">${l}</button>`).join("")}</div>
   <div class="quick"><button class="linkbtn" data-q="all">Každý den</button><button class="linkbtn" data-q="wk">Po–Pá</button><button class="linkbtn" data-q="we">Víkend</button></div>
   <p class="say" id="fhint"></p>
   <div class="tools"><button class="btn kelp" id="tsave">Uložit</button>${!isNew?'<button class="btn ghost" id="tdel">Smazat úkol</button>':""}</div></div>`,taskEditor);
  const P=$("#panel");
  const paintDays=()=>P.querySelectorAll("[data-day]").forEach(b=>b.setAttribute("aria-pressed",t.days.includes(+b.dataset.day)));
  P.querySelectorAll("[data-ic]").forEach(b=>b.onclick=()=>{t.icon=b.dataset.ic;P.querySelectorAll("[data-ic]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
  const paramsHTML=()=>t.game==="plavba"?`<div class="fishset"><b>Délka plavby</b><div class="stepper"><button id="mm" aria-label="Méně">−</button><span><b id="mv">${t.minutes||10}</b> min</span><button id="mp" aria-label="Více">+</button></div></div>`
    :t.game==="rutina"?`<label class="field">Kroky (každý na nový řádek)<textarea id="stps" rows="6">${esc((t.steps||["Krok 1","Krok 2","Krok 3"]).join("\n"))}</textarea></label>`
    :t.game==="matika"?`<label class="field">Úroveň příkladů<select id="lvl"><option value="10" ${(t.level||"10")==="10"?"selected":""}>Sčítání a odčítání do 10</option><option value="20" ${t.level==="20"?"selected":""}>Sčítání a odčítání do 20</option><option value="nas" ${t.level==="nas"?"selected":""}>Malá násobilka</option></select></label>`:"";
  const wireParams=()=>{$("#gparams").innerHTML=paramsHTML();if($("#mm")){$("#mm").onclick=()=>{t.minutes=Math.max(5,(t.minutes||10)-5);$("#mv").textContent=t.minutes};$("#mp").onclick=()=>{t.minutes=Math.min(60,(t.minutes||10)+5);$("#mv").textContent=t.minutes}}
    if($("#lvl"))$("#lvl").onchange=e=>{t.level=e.target.value}};
  const paintGames=()=>{wireParams();$("#gpick").hidden=!t.game;P.querySelectorAll("[data-g]").forEach(b=>b.setAttribute("aria-pressed",b.dataset.g===t.game));$("#gnote").textContent=t.game?"Dítě nejdřív zahraje mini-hru, pak úkol potvrdíš ty.":"Bez mini-hry dítě úkol odklikne podržením tlačítka, pak ho potvrdíš ty."};
  $("#tg").onchange=e=>{if(e.target.checked){t.game=lastGame}else{if(t.game)lastGame=t.game;t.game=null}paintGames()};
  P.querySelectorAll("[data-g]").forEach(b=>b.onclick=()=>{t.game=lastGame=b.dataset.g;paintGames()});
  wireParams();
  $("#rm").onclick=()=>{t.reward=Math.max(1,t.reward-1);$("#rv").textContent=t.reward};
  $("#rp").onclick=()=>{t.reward=Math.min(5,t.reward+1);$("#rv").textContent=t.reward};
  P.querySelectorAll("[data-day]").forEach(b=>b.onclick=()=>{const n=+b.dataset.day;t.days=t.days.includes(n)?t.days.filter(x=>x!==n):t.days.concat(n);paintDays()});
  P.querySelectorAll("[data-q]").forEach(b=>b.onclick=()=>{t.days=b.dataset.q==="all"?ALL_DAYS.slice():b.dataset.q==="wk"?[1,2,3,4,5]:[0,6];paintDays()});
  $("#tsave").onclick=()=>{t.name=$("#tn").value.trim();t.desc=$("#td").value.trim();if($("#stps")){t.steps=$("#stps").value.split("\n").map(x=>x.trim()).filter(Boolean).slice(0,12);if(!t.steps.length){$("#fhint").textContent="Napiš aspoň jeden krok";return}}
    if(!t.name){$("#fhint").textContent="Napiš název úkolu";$("#tn").focus();return}
    if(!t.days.length){$("#fhint").textContent="Vyber aspoň jeden den";return}
    const next=list.slice();if(isNew)next.push(t);else next[i]=t;const over=overLimit(next);
    if(over){$("#fhint").textContent="V "+over+" by bylo víc než "+MAX_PER_DAY+" úkolů. Uber dny nebo jiný úkol vypni.";return}
    if(isNew)list.push(t);else list[i]=t;save();toast(isNew?"Úkol přidán":"Uloženo");taskEditor()};
  let armed=false;if($("#tdel"))$("#tdel").onclick=()=>{if(!armed){armed=true;$("#fhint").textContent="Ťukni znovu pro smazání úkolu.";return}list.splice(i,1);const d=today();delete d.tasks[t.id];save();toast("Úkol smazán");taskEditor()};
}


/* ============ HATCH ============ */
function pickSpecies(){if(!kid.fish.length)return kid.av;const st=streak();const r=Math.random();
  let pool=[0,1,2];if(st>=3&&r<.5)pool=[3,4,5];if(st>=7&&r<.25)pool=[6];if(st>=14&&r<.08)pool=[7];
  const have=new Set(kid.fish.map(f=>f.sp));const fresh=pool.filter(p=>!have.has(p));const list=fresh.length?fresh:pool;return list[Math.random()*list.length|0]}
function hatch(){
  if(!kid||!(kid.eggs>0))return;
  const sp=pickSpecies();let taps=0;const first=!kid.fish.length;
  openSheet(head(first?"Tvoje první rybka!":"Nová rybka!")+`<div class="center"><p class="lead">${first?"Rodič potvrdil tvůj první úkol.":"Nasbíral/a jsi dost bodů."} Ťukej na vajíčko, ať se rybka vylíhne.</p>
   <div id="eggzone"><button class="hatch-egg" id="egg" aria-label="vajíčko"><svg class="crack" viewBox="0 0 150 186"><path id="cr" d="" stroke="#a8740a" stroke-width="4" fill="none" stroke-linecap="round"/></svg></button></div></div>`);
  const cracks=["M40 70 L60 85 L50 100","M40 70 L60 85 L50 100 M110 60 L95 80 L108 95","M40 70 L60 85 L50 100 M110 60 L95 80 L108 95 M70 40 L78 60 L68 72"];
  $("#egg").onclick=()=>{taps++;const e=$("#egg");e.classList.remove("wob");void e.offsetWidth;e.classList.add("wob");blip(300+taps*150,.15,"triangle");
   if(taps<=3)$("#cr").setAttribute("d",cracks[taps-1]);
   if(taps===4){chime();confetti();const D=SPECIES[sp];
    $("#eggzone").outerHTML=`<div class="reveal"><canvas class="viewer" id="fv"></canvas></div>${fishInfoHTML(sp)}
     <label class="field">Jak se bude jmenovat?<input id="fname" maxlength="14" placeholder="Jméno rybky"></label><button class="btn" id="keep">Pustit do akvária</button>`;
    fishViewer($("#fv"),sp);
    $("#keep").onclick=()=>{kid.fish.push({sp,name:$("#fname").value.trim()||D.name,born:dayKey(0)});kid.eggs=Math.max(0,(kid.eggs||1)-1);save();sheetClose=null;closeSheet();
      if(kid.eggs>0){setTimeout(hatch,300);return}tab="tank";showTab();toast(D.name+" je v akváriu")};
   }};
}

/* ============ AQUARIUM ============ */
let lastTankSig="";
function tankSig(){return kid?kid.fish.map(f=>f.sp+f.name).join("|")+"#"+kid.decor.join(",")+"#"+JSON.stringify(kid.tank||{}):""}
function stopTank(){stopTank3D();stopTank2D()}
function renderTank(){
  stopTank();lastTankSig=tankSig();
  const fedToday=kid.lastFed===dayKey(0);const empty=!kid.fish.length;
  const hour=new Date().getHours();const night=hour>=20||hour<6;
  const murk=empty?0:Math.min(1,Math.max(0,daysSinceGolden()-1)/3);
  $("#vTank").innerHTML=`<div class="tankwrap shape-${kidTank().shape}" id="tw"><canvas id="tank" aria-label="Akvárium s rybkami"></canvas><div class="fishname"></div>${empty?`<div class="tank-empty"><b>Akvárium čeká na první rybku</b><span>Splň úkol, rodič ho potvrdí a vajíčko se vylíhne.</span></div>`:""}</div>
   <div class="tankbar"><button class="btn" id="feed" ${empty?"disabled":""}>${fedToday?"Přikrmit (1 perlička)":"Nakrmit rybky"}</button><button class="btn ghost" id="tset">Upravit akvárium</button><span class="hint" id="mood"></span></div>
   <h3 class="section-t">Obchůdek s dekoracemi</h3>
   <div class="shop">${DECOR.map(d=>{const own=kid.decor.includes(d.id);return `<div class="item ${own?"own":""}"><canvas data-d="${d.id}"></canvas><b>${d.name}</b><button class="btn sea small" data-buy="${d.id}" ${own||kid.pearls<d.price?"disabled":""}>${own?"Máš":`<span style="display:inline-flex;align-items:center;gap:6px"><span class="pearl"></span>${d.price}</span>`}</button></div>`}).join("")}</div>
   <h3 class="section-t">Encyklopedie moře</h3>
   <div class="dex">${SPECIES.map((s,i)=>{const has=kid.fish.some(f=>f.sp===i);return `<div class="card ${has?"":"locked"}" data-dex="${i}" role="button" tabindex="0">${fishHTML(i)}<b>${has?s.name:"???"}</b><small>${s.rar}</small></div>`}).join("")}</div>`;
  hydrate($("#vTank"));
  $("#tset").onclick=()=>setupTank(false);
  $("#vTank").querySelectorAll("[data-dex]").forEach(c=>c.onclick=()=>fishDetail(+c.dataset.dex));
  document.querySelectorAll("canvas[data-d]").forEach(cv=>decorIcon(cv,cv.dataset.d));
  document.querySelectorAll("[data-buy]").forEach(b=>b.onclick=()=>{const d=DECOR.find(x=>x.id===b.dataset.buy);if(kid.pearls<d.price)return;kid.pearls-=d.price;kid.decor.push(d.id);save();refreshChips();chime();toast(d.name+" je v akváriu");renderTank()});
  $("#feed").onclick=()=>{const fed=kid.lastFed===dayKey(0);if(fed){if(kid.pearls<1){toast("Nemáš perličku");return}kid.pearls--}kid.lastFed=dayKey(0);save();refreshChips();if(T3)T3.dropFood();else dropFood2D();$("#feed").textContent="Přikrmit (1 perlička)";blip(400,.2,"triangle")};
  $("#mood").textContent=empty?"Ťukni na vajíčko, třeba se pohne.":night?"Rybky spí. Dobrou noc!":murk>.5?"Voda je kalná. Splň úkoly a vyčistí se.":murk>0?"Voda se trochu kalí, rybky se těší na zlatou tabuli.":"Voda je křišťálová, rybky jsou spokojené.";
  if(HAS3D){try{startTank3D($("#tw"),{fish:kid.fish,decor:kid.decor,night,murk,bg:kidTank().bg});return}catch(e){stopTank3D()}}
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
    const TH2=themeOf();let g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,TH2.water[0]);g.addColorStop(.45,TH2.water[1]);g.addColorStop(1,TH2.water[2]);c.fillStyle=g;c.fillRect(0,0,W,H);c.drawImage(backdropCanvas(kidTank().bg),0,H*.28,W,H*.58);
    // rays
    c.save();c.globalCompositeOperation="lighter";for(let i=0;i<5;i++){const x0=W*(.1+i*.22)+Math.sin(t*.4+i)*W*.04;const rg=c.createLinearGradient(0,0,0,H*.85);rg.addColorStop(0,"rgba(255,255,230,.16)");rg.addColorStop(1,"rgba(255,255,230,0)");c.fillStyle=rg;c.beginPath();c.moveTo(x0,0);c.lineTo(x0+W*.07,0);c.lineTo(x0+W*.2,H*.85);c.lineTo(x0+W*.06,H*.85);c.fill()}c.restore();
    // far plants silhouette
    c.fillStyle="rgba(10,60,90,.35)";for(let i=0;i<9;i++){const bx=W*i/8;c.beginPath();c.moveTo(bx-12,sandY(bx));c.quadraticCurveTo(bx+Math.sin(t+i)*14,H*.55,bx+Math.sin(t*1.2+i)*10,H*.5+((i*37)%40));c.quadraticCurveTo(bx+8,H*.65,bx+12,sandY(bx));c.fill()}
    // sand
    const sg=c.createLinearGradient(0,H*.78,0,H);sg.addColorStop(0,TH2.sand2[0]);sg.addColorStop(1,TH2.sand2[1]);c.fillStyle=sg;c.beginPath();c.moveTo(0,H);for(let x=0;x<=W;x+=10)c.lineTo(x,sandY(x));c.lineTo(W,H);c.fill();
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




/* ============ EXTRAS: species info, themes, tanks ============ */
const SP_INFO=[
 {size:"5 cm",food:"vločky a drobné larvy",mood:"Zvědavá a hravá"},
 {size:"3 cm",food:"mikro granule",mood:"Nejradši plave v hejnu"},
 {size:"8 cm",food:"vločky a řasy",mood:"Klidná pohodářka"},
 {size:"10 cm",food:"krevetky a granule",mood:"Odvážná, hlídá si domeček"},
 {size:"15 cm",food:"krevety a mušličky",mood:"Lekavá, ale přátelská"},
 {size:"15 cm",food:"larvy a vločky",mood:"Elegantní a vznešená"},
 {size:"10 cm",food:"vločky a ovoce",mood:"Veselá a barevná"},
 {size:"20 cm",food:"všechno, co přiláká lucernou",mood:"Tajemná noční lovkyně"}];
const STARTERS=[0,1,2,3];
const GOLD_BONUS=2;
const TANKS=[{id:"klasik",name:"Klasické"},{id:"panorama",name:"Široké panorama"},{id:"koule",name:"Kulaté"},{id:"vysoke",name:"Vysoký sloup"}];
function drawUtes(c,w,h){
  const mound=(x,y,r,col)=>{c.fillStyle=col;c.beginPath();c.ellipse(x,y,r,r*.7,0,Math.PI,0);c.fill()};
  [["rgba(255,140,170,.55)",.1],["rgba(255,170,110,.5)",.35],["rgba(190,120,220,.45)",.62],["rgba(255,120,140,.5)",.86]].forEach(([col,fx],i)=>{
    mound(w*fx,h,h*(.32+i%2*.08),col);
    c.strokeStyle=col;c.lineCap="round";
    const br=(x,y,a,l,d)=>{if(d>4)return;const ex=x+Math.cos(a)*l,ey=y+Math.sin(a)*l;c.lineWidth=Math.max(2,14-d*3);c.beginPath();c.moveTo(x,y);c.lineTo(ex,ey);c.stroke();br(ex,ey,a-.45,l*.72,d+1);br(ex,ey,a+.4,l*.72,d+1)};
    br(w*fx+h*.12,h*.82,-Math.PI/2,h*.16,0)});
  c.fillStyle="rgba(255,210,120,.45)";[[.22,.8,26],[.5,.86,34],[.75,.78,22]].forEach(([x,y,r])=>{c.beginPath();c.arc(w*x,h*y,r,0,7);c.fill()});
  c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=2;for(let i=0;i<8;i++){c.beginPath();c.arc(w*(.08+i*.12),h*(.55+i%3*.05),5+i%3*3,0,7);c.stroke()}
}
function drawDzungle(c,w,h){
  for(let i=0;i<46;i++){const x=(i*97)%w,hh=h*(.35+((i*37)%50)/100);c.strokeStyle=i%3?"rgba(70,150,60,.5)":"rgba(120,190,80,.45)";c.lineWidth=6+(i%4)*2;c.lineCap="round";c.beginPath();c.moveTo(x,h);c.quadraticCurveTo(x+Math.sin(i)*40,h-hh*.5,x+Math.sin(i*1.7)*30,h-hh);c.stroke()}
  c.strokeStyle="rgba(110,70,40,.65)";c.lineCap="round";[[.3,.95,.15,.55],[.62,.98,.72,.5],[.8,.96,.95,.62]].forEach(([x0,y0,x1,y1])=>{c.lineWidth=22;c.beginPath();c.moveTo(w*x0,h*y0);c.bezierCurveTo(w*(x0+.05),h*.6,w*(x1-.05),h*.7,w*x1,h*y1);c.stroke();c.lineWidth=9;c.beginPath();c.moveTo(w*x1,h*y1);c.lineTo(w*x1+30,h*y1-50);c.stroke()});
  c.fillStyle="rgba(150,210,110,.5)";for(let i=0;i<5;i++){c.beginPath();c.ellipse(w*(.1+i*.2),h*.06,46,10,0,0,7);c.fill()}
}
function drawTrosky(c,w,h){
  const col="rgba(200,220,240,.55)",dark="rgba(120,150,190,.5)";
  [[.12,.62],[.24,.5],[.7,.55],[.86,.66]].forEach(([x,top],i)=>{const cx=w*x,cw=46;c.fillStyle=col;c.fillRect(cx-cw/2,h*top,cw,h*(1-top));c.fillStyle=dark;for(let k=-1;k<=1;k++)c.fillRect(cx+k*13-2,h*top+14,4,h*(1-top)-14);c.fillStyle=col;c.fillRect(cx-cw/2-10,h*top-14,cw+20,16);if(i===2){c.fillStyle="rgba(200,220,240,.4)";c.fillRect(cx-cw/2-10,h*top-26,cw+20,10)}});
  c.strokeStyle=col;c.lineWidth=34;c.beginPath();c.arc(w*.47,h*.9,h*.36,Math.PI,Math.PI*1.75);c.stroke();
  c.fillStyle="rgba(200,220,240,.5)";c.fillRect(w*.38,h*.9,w*.24,h*.1);c.fillRect(w*.4,h*.84,w*.2,h*.06);
  c.fillStyle="rgba(160,190,220,.55)";c.beginPath();c.arc(w*.58,h*.95,30,Math.PI,0);c.fill();
}
function drawHlubina(c,w,h){
  c.fillStyle="rgba(10,20,50,.7)";c.beginPath();c.moveTo(0,h);for(let x=0;x<=w;x+=40)c.lineTo(x,h*(.62+Math.sin(x*.013)*.12+Math.sin(x*.05)*.04));c.lineTo(w,h);c.fill();
  for(let i=0;i<90;i++){const x=(i*131)%w,y=(i*71)%(h*.8),r=1+(i%4);const col=i%3?"rgba(120,230,255,":"rgba(255,240,140,";const g=c.createRadialGradient(x,y,0,x,y,r*4);g.addColorStop(0,col+".9)");g.addColorStop(1,col+"0)");c.fillStyle=g;c.beginPath();c.arc(x,y,r*4,0,7);c.fill()}
  [[.3,.25],[.72,.18]].forEach(([fx,fy])=>{const x=w*fx,y=h*fy;c.fillStyle="rgba(200,160,255,.45)";c.beginPath();c.arc(x,y,26,Math.PI,0);c.fill();c.strokeStyle="rgba(200,160,255,.4)";c.lineWidth=3;for(let k=-2;k<=2;k++){c.beginPath();c.moveTo(x+k*9,y);c.quadraticCurveTo(x+k*9+8,y+30,x+k*9,y+60);c.stroke()}});
}
const THEMES={
 utes:{name:"Korálový útes",water:["#a6eef7","#3aa6cf","#145a86"],fog:"#2f8fbf",sand:"#e9c486",sand2:["#f6dfae","#d3a967"],plants:["#2fae74","#4fcf8e","#2a9a6a"],rays:.13,draw:drawUtes},
 dzungle:{name:"Říční džungle",water:["#cdf3c4","#4fa985","#1d5a48"],fog:"#3f8f6f",sand:"#b9925e",sand2:["#c9a571","#8f6a3e"],plants:["#3e9d3a","#6cc04a","#2c7a35"],rays:.16,draw:drawDzungle},
 trosky:{name:"Potopené město",water:["#bfe6ff","#4f8fc9","#1d3f73"],fog:"#3f78b0",sand:"#cdbb94",sand2:["#efe6d2","#c4b79a"],plants:["#3fae8a","#5cc6a0","#2f8a74"],rays:.12,draw:drawTrosky},
 hlubina:{name:"Hlubina",water:["#3a6fb0","#173f78","#060f2a"],fog:"#0d2350",sand:"#7f8aa6",sand2:["#8b96b0","#4f5975"],plants:["#2f7f9a","#45a3c0","#215f78"],rays:.05,draw:drawHlubina}};
function kidTank(k=kid){return k.tank||{shape:"klasik",bg:"utes"}}
function themeOf(k=kid){return THEMES[kidTank(k).bg]||THEMES.utes}
const BACKDROP_CACHE={};
function backdropCanvas(bg){if(BACKDROP_CACHE[bg])return BACKDROP_CACHE[bg];const cv=document.createElement("canvas");cv.width=1024;cv.height=384;(THEMES[bg]||THEMES.utes).draw(cv.getContext("2d"),1024,384);return BACKDROP_CACHE[bg]=cv}
function themePreview(cv,bg){const T=THEMES[bg]||THEMES.utes;const r=Math.min(2,devicePixelRatio||1),w=cv.clientWidth||160,h=cv.clientHeight||110;cv.width=w*r;cv.height=h*r;const c=cv.getContext("2d");c.scale(r,r);
  const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,T.water[0]);g.addColorStop(.5,T.water[1]);g.addColorStop(1,T.water[2]);c.fillStyle=g;c.fillRect(0,0,w,h);
  c.drawImage(backdropCanvas(bg),0,h*.2,w,h*.62);
  const s=c.createLinearGradient(0,h*.78,0,h);s.addColorStop(0,T.sand2[0]);s.addColorStop(1,T.sand2[1]);c.fillStyle=s;c.beginPath();c.moveTo(0,h);c.lineTo(0,h*.82);c.quadraticCurveTo(w/2,h*.74,w,h*.84);c.lineTo(w,h);c.fill();
  drawFish(c,kid?kid.av||0:0,w*.5,h*.48,Math.min(w,h)*.42,1,1.2)}
function hydratePreviews(root){root.querySelectorAll("canvas[data-theme]").forEach(cv=>themePreview(cv,cv.dataset.theme))}

/* ============ EXTRAS: 3D fish viewer ============ */
let VIEWERS=[];
function disposeViewers(){VIEWERS.forEach(v=>v.dispose());VIEWERS=[]}
function fishViewer(canvas,sp){
  let alive=true,cur=sp,pop=1,yaw=-.5,vyaw=0,drag=null,t0=performance.now(),sq=0,blink=2;
  if(!HAS3D){const loop=now=>{if(!alive)return;const r=Math.min(2,devicePixelRatio||1),w=canvas.clientWidth,h=canvas.clientHeight;if(canvas.width!==w*r){canvas.width=w*r;canvas.height=h*r}const c=canvas.getContext("2d");c.setTransform(r,0,0,r,0,0);c.clearRect(0,0,w,h);const tt=(now-t0)/1000;drawFish(c,cur,w/2,h/2+Math.sin(tt*2)*6,Math.min(w*.7,h*.8/SPECIES[cur].aspect),1,tt,{squash:sq});sq=Math.max(0,sq-.04);requestAnimationFrame(loop)};requestAnimationFrame(loop);
    canvas.onpointerdown=()=>{sq=.8;blip(700,.1)};const v={set(s){cur=s},dispose(){alive=false}};VIEWERS.push(v);return v}
  const r=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio||1,2));r.outputEncoding=THREE.sRGBEncoding;r.toneMapping=THREE.ACESFilmicToneMapping;r.toneMappingExposure=1.05;
  const scene=new THREE.Scene();lightRig(scene);const cam=new THREE.PerspectiveCamera(30,1,.1,50);
  const shadow=new THREE.Mesh(new THREE.CircleGeometry(1.2,40),new THREE.MeshBasicMaterial({color:0x0b3b5a,transparent:true,opacity:.16,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.y=-1.25;scene.add(shadow);
  const holder=new THREE.Group();scene.add(holder);let f=null;
  function set(s){cur=s;if(f)holder.remove(f.g);f=makeFish(s);holder.add(f.g);const D=SPECIES[s];const hh=D.tall?1.55:D.lure?1.35:1;cam.position.set(0,.3*hh,5.4*Math.max(1,hh*.85));cam.lookAt(0,D.tall?.05:.12,0);pop=1}
  set(sp);
  canvas.style.touchAction="none";
  canvas.onpointerdown=e=>{drag={x:e.clientX,moved:0};canvas.setPointerCapture(e.pointerId)};
  canvas.onpointermove=e=>{if(!drag)return;const dx=e.clientX-drag.x;drag.x=e.clientX;drag.moved+=Math.abs(dx);vyaw=dx*.012;yaw+=dx*.012};
  canvas.onpointerup=()=>{if(drag&&drag.moved<6){sq=1;blip(700,.1)}drag=null};
  const loop=now=>{if(!alive)return;const w=canvas.clientWidth,h=canvas.clientHeight;if(w&&h&&(canvas.width!==Math.round(w*r.getPixelRatio())||canvas.height!==Math.round(h*r.getPixelRatio()))){r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
    const t=(now-t0)/1000;if(!drag){vyaw*=.94;yaw+=vyaw+.004}
    pop=Math.max(0,pop-.04);sq=Math.max(0,sq-.035);const s=1+Math.sin(sq*Math.PI)*.18;const p=1-Math.pow(pop,3)*.6;
    holder.rotation.y=yaw;holder.position.y=Math.sin(t*1.6)*.08;holder.scale.set(p*s,p*(2-s),p);
    f.tailPivot.rotation.y=Math.sin(t*5)*.35;f.pecs.forEach((q,i)=>q.rotation.y=(i?-1:1)*(.3+Math.sin(t*6)*.35));
    blink-=.016;let ey=1;if(blink<0){ey=.1;if(blink<-.12)blink=2+Math.random()*3}f.eyes.forEach(e=>e.scale.y=ey);
    r.render(scene,cam);requestAnimationFrame(loop)};
  requestAnimationFrame(loop);
  const v={set,dispose(){alive=false;try{r.dispose();r.forceContextLoss&&r.forceContextLoss()}catch(e){}}};VIEWERS.push(v);return v;
}
function fishInfoHTML(sp,name){const D=SPECIES[sp],I=SP_INFO[sp]||{};return `<div class="finfo"><h3>${name?esc(name)+" <small>("+D.name+")</small>":D.name}</h3><span class="rar rar-${D.rar.slice(0,3)}">${D.rar}</span>
  <dl><div><dt>Velikost</dt><dd>${I.size||"?"}</dd></div><div><dt>Povaha</dt><dd>${I.mood||"?"}</dd></div><div><dt>Nejradši jí</dt><dd>${I.food||"?"}</dd></div></dl><p>${D.fact}</p></div>`}
function fishDetail(sp){const own=kid.fish.filter(f=>f.sp===sp);
  if(!own.length){toast("Tuhle rybku ještě nemáš. Sbírej body!");return}
  openSheet(head("Encyklopedie moře")+`<div class="center"><canvas class="viewer" id="fv"></canvas><p class="hint">Otáčej rybkou prstem, ťuknutím ji polechtáš.</p>${fishInfoHTML(sp,own.map(f=>f.name).join(", "))}</div>`);
  fishViewer($("#fv"),sp)}

/* ============ EXTRAS: onboarding (tank, background, first fish) ============ */
function setupTank(first){
  const k=kid;const sel={shape:kidTank(k).shape,bg:kidTank(k).bg,sp:k.av||0};let step=1;const total=first&&!k.fish.length?3:2;
  const after=()=>{if(kid){showTab();if(kid.eggs>0)setTimeout(hatch,300)}};
  const render=()=>{disposeViewers();
    if(step===1){openSheet(head(first?"Ahoj "+esc(k.name)+"! Vyber si akvárium":"Tvar akvária")+`<div class="center"><p class="steps-dot">Krok 1 z ${total}</p>
      <div class="pick4">${TANKS.map(T=>`<button class="tankpick" data-shape="${T.id}" aria-pressed="${T.id===sel.shape}"><span class="mini-tank shape-${T.id}"><canvas data-theme="${sel.bg}"></canvas></span><b>${T.name}</b></button>`).join("")}</div>
      <button class="btn" id="nx">Dál</button></div>`,first?after:after);
      hydratePreviews($("#panel"));$("#panel").querySelectorAll("[data-shape]").forEach(b=>b.onclick=()=>{sel.shape=b.dataset.shape;blip(600);$("#panel").querySelectorAll("[data-shape]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
      $("#nx").onclick=()=>{step=2;render()}}
    else if(step===2){openSheet(head("Vyber pozadí")+`<div class="center"><p class="steps-dot">Krok 2 z ${total}</p>
      <div class="pick4">${Object.entries(THEMES).map(([id,T])=>`<button class="bgpick" data-bg="${id}" aria-pressed="${id===sel.bg}"><canvas data-theme="${id}"></canvas><b>${T.name}</b></button>`).join("")}</div>
      <div class="tools"><button class="btn ghost" id="bk">Zpět</button><button class="btn" id="nx">${total===3?"Dál":"Hotovo"}</button></div></div>`,after);
      hydratePreviews($("#panel"));$("#panel").querySelectorAll("[data-bg]").forEach(b=>b.onclick=()=>{sel.bg=b.dataset.bg;blip(650);$("#panel").querySelectorAll("[data-bg]").forEach(x=>x.setAttribute("aria-pressed",x===b))});
      $("#bk").onclick=()=>{step=1;render()};
      $("#nx").onclick=()=>{k.tank={shape:sel.shape,bg:sel.bg};if(total===3){step=3;render()}else{save();chime();sheetClose=null;closeSheet();renderTank();toast("Akvárium je upravené")}}}
    else{let idx=Math.max(0,STARTERS.indexOf(sel.sp));
      openSheet(head("Vyber svou první rybku")+`<div class="center"><p class="steps-dot">Krok 3 z 3</p>
        <div class="viewerwrap"><button class="arrow" id="pv" aria-label="Předchozí rybka">‹</button><canvas class="viewer" id="fv"></canvas><button class="arrow" id="nv" aria-label="Další rybka">›</button></div>
        <div class="dots">${STARTERS.map((s,i)=>`<i class="${i===idx?"on":""}"></i>`).join("")}</div>
        <div id="finfo">${fishInfoHTML(STARTERS[idx])}</div>
        <p class="hint">Rybka bude zatím ve vajíčku. Vylíhne se, až rodič potvrdí tvůj první úkol.</p>
        <div class="tools"><button class="btn ghost" id="bk">Zpět</button><button class="btn kelp" id="ok">Tuhle chci!</button></div></div>`,after);
      const v=fishViewer($("#fv"),STARTERS[idx]);
      const show=d=>{idx=(idx+d+STARTERS.length)%STARTERS.length;v.set(STARTERS[idx]);blip(550+idx*60);$("#finfo").innerHTML=fishInfoHTML(STARTERS[idx]);$("#panel").querySelectorAll(".dots i").forEach((x,i)=>x.classList.toggle("on",i===idx))};
      $("#pv").onclick=()=>show(-1);$("#nv").onclick=()=>show(1);$("#bk").onclick=()=>{step=2;render()};
      $("#ok").onclick=()=>{k.av=STARTERS[idx];k.tank={shape:sel.shape,bg:sel.bg};save();chime();confetti();sheetClose=null;closeSheet();renderMain();toast("Hotovo! Teď splň první úkol.")}}
  };
  render();
}

/* ============ EXTRAS: points ============ */
function addFishPts(n){kid.fishPts=(kid.fishPts||0)+n;const every=kid.fishEvery||15;while(kid.fishPts>=every){kid.fishPts-=every;kid.eggs=(kid.eggs||0)+1}}
function confirmTask(id){const d=today();if(d.tasks[id]!=="pending")return;d.tasks[id]="confirmed";const t=findTask(id);const pts=t.reward||1;
  kid.pearls+=pts;kid.points=(kid.points||0)+pts;
  if(!kid.fish.length){if(!kid.eggs)kid.eggs=1}else addFishPts(pts);
  const list=todaysTasks();if(!d.golden&&list.length&&list.every(x=>d.tasks[x.id]==="confirmed")){d.golden=true;kid.pearls+=GOLD_BONUS;kid.points+=GOLD_BONUS;if(kid.fish.length)addFishPts(GOLD_BONUS)}
  save();refreshChips();blip(880)}
function fishProgressHTML(){const every=kid.fishEvery||15,have=kid.fishPts||0;
  if(!kid.fish.length)return `<div class="golden"><div class="egg"></div><div><h3>Tvoje první rybka je ještě ve vajíčku</h3><p>Splň jakýkoli úkol a nech ho potvrdit rodičem. Pak se vylíhne.</p></div></div>`;
  const d=today();return `<div class="golden"><div class="egg"></div><div class="gp"><h3>Do další rybky: ${have} z ${every} bodů</h3><div class="fbar"><b style="width:${Math.min(100,have/every*100)}%"></b></div><p>${d.golden?"Zlatá tabule! Dnes +"+GOLD_BONUS+" body navíc.":"Za každý potvrzený úkol dostaneš body. Za splnění všech dnešních úkolů +"+GOLD_BONUS+" navíc."}</p></div></div>`}

/* ============ EXTRAS: task catalog ============ */
const CATALOG=[
 {cat:"zuby",name:"Vyčistit zuby",desc:"2 minuty, všechny strany. Bacily pryč!",icon:"🪥",bg:"#dff3ff",reward:2,game:"zuby"},
 {cat:"pokoj",name:"Uklidit pokoj",desc:"Hračky, oblečení i knížky na své místo.",icon:"🧸",bg:"#ffe8dc",reward:3,game:"pokoj"},
 {cat:"jidlo",name:"Zdravý talíř",desc:"Zelenina, něco na sílu a příloha.",icon:"🥦",bg:"#e3f7e8",reward:2,game:"jidlo"},
 {cat:"postel",name:"Ustlat postel",desc:"Srovnej peřinu a načechrej polštář.",icon:"🛏️",bg:"#efe6ff",reward:1,game:"postel"},
 {cat:"rano",name:"Ranní rutina",desc:"Krok za krokem, ať je ráno v pohodě.",icon:"🌅",bg:"#fff1d6",reward:2,game:"rutina",steps:["Vyčůrat se","Umýt obličej","Vyčistit zuby","Obléct se","Učesat se","Nasnídat se"]},
 {cat:"vecer",name:"Večerní rutina",desc:"Všechno, co patří před spaním.",icon:"🌙",bg:"#e6e4ff",reward:2,game:"rutina",steps:["Uklidit hračky","Osprchovat se","Vyčistit zuby","Obléct pyžamo","Připravit oblečení na zítra","Pohádka"]},
 {cat:"odpad",name:"Vytřídit odpad",desc:"Plast, papír, sklo a bio do správných košů.",icon:"♻️",bg:"#e3f7e8",reward:2,game:"trideni"},
 {cat:"aktovka",name:"Sbalit aktovku",desc:"Ať ráno nic nechybí.",icon:"🎒",bg:"#ffe8dc",reward:2,game:"batoh",days:[0,1,2,3,4]},
 {cat:"stul",name:"Prostřít stůl",desc:"Talíř, příbor, sklenička.",icon:"🍽️",bg:"#fff3d6",reward:1,game:"prostirani"},
 {cat:"ruce",name:"Umýt si ruce",desc:"Mýdlo, 20 vteřin, opláchnout.",icon:"🧼",bg:"#dff3ff",reward:1,game:"pena"},
 {cat:"obleceni",name:"Obléct se",desc:"Ve správném pořadí a podle počasí.",icon:"👕",bg:"#efe6ff",reward:1,game:"satnik"},
 {cat:"kytky",name:"Zalít květiny",desc:"Akorát, ať se neutopí.",icon:"🪴",bg:"#e3f7e8",reward:1,game:"konvicka"},
 {cat:"zvire",name:"Nakrmit zvíře",desc:"Správná porce a čerstvá voda.",icon:"🐱",bg:"#fff3d6",reward:2,game:"miska"},
 {cat:"nakup",name:"Vybalit nákup",desc:"Mrazák, lednice, nebo spíž?",icon:"🛒",bg:"#dff3ff",reward:2,game:"lednice"},
 {cat:"nadobi",name:"Uklidit nádobí",desc:"Do myčky, nebo na místo.",icon:"🍽️",bg:"#e6e4ff",reward:2,game:"mycka"},
 {cat:"pohyb",name:"Rozcvička",desc:"5 cviků s rybkou.",icon:"🤸",bg:"#ffe8dc",reward:2,game:"rozcvicka"},
 {cat:"skola",name:"Úkoly do školy",desc:"Napřed úkoly, pak hraní.",icon:"✏️",bg:"#fff1d6",reward:3,game:"matika",days:[0,1,2,3,4],level:"10"},
 {cat:"cteni",name:"Čtení",desc:"Lodička pluje, dokud čteš.",icon:"📚",bg:"#efe6ff",reward:3,game:"plavba",minutes:15},
 {cat:"nastroj",name:"Cvičení na nástroj",desc:"Pár minut každý den.",icon:"🎻",bg:"#e6e4ff",reward:3,game:"plavba",minutes:15},
 {cat:"radost",name:"Udělat někomu radost",desc:"Pomoc, pochvala nebo dárek.",icon:"💌",bg:"#ffe3ec",reward:2,game:"muslicka"},
 {cat:"spani",name:"Jít spát včas",desc:"Zhasnout a dobrou noc.",icon:"💤",bg:"#e6e4ff",reward:1,game:"uspavani"}
];
function catalogSheet(){
  const list=kidTasks();const have=new Set(list.map(t=>t.cat||t.id));
  openSheet(head("Nabídka úkolů")+`<div class="center"><p class="lead">Ťukni na Přidat. Úkol se objeví v seznamu a můžeš mu pak upravit dny i odměnu.</p>
   <div class="plist">${CATALOG.map(c=>`<div class="prow"><span class="ic">${c.icon}</span><span class="t">${c.name}<small>${(MINIGAMES.find(m=>m.id===c.game)||{}).name||""} · +${c.reward}${c.days?" · Po–Pá":""}</small></span><button class="btn ${have.has(c.cat)?"ghost":"kelp"} small" data-cat="${c.cat}" ${have.has(c.cat)?"disabled":""}>${have.has(c.cat)?"Máš":"Přidat"}</button></div>`).join("")}</div>
   <p class="hint" id="chint"></p><button class="btn ghost" id="cdone">Zpět na úkoly</button></div>`,taskEditor);
  $("#panel").querySelectorAll("[data-cat]").forEach(b=>b.onclick=()=>{const c=CATALOG.find(x=>x.cat===b.dataset.cat);
    const t=Object.assign({},c,{id:"t"+Date.now().toString(36)+c.cat,on:true,days:(c.days||ALL_DAYS).slice(),steps:c.steps?c.steps.slice():undefined});
    list.push(t);let note="Přidáno: "+c.name;if(overLimit(list)){t.on=false;note=c.name+" je přidaný, ale vypnutý: v některý den už je "+MAX_PER_DAY+" úkolů."}
    save();blip(700);b.textContent="Máš";b.disabled=true;b.classList.replace("kelp","ghost");$("#chint").textContent=note});
  $("#cdone").onclick=()=>taskEditor();
}

/* ============ EXTRAS: drag helper ============ */
function makeDraggable(el,onDrop){
  el.addEventListener("pointerdown",e=>{e.preventDefault();const sx=e.clientX,sy=e.clientY;let moved=false;el.setPointerCapture(e.pointerId);
    const move=m=>{const dx=m.clientX-sx,dy=m.clientY-sy;if(!moved&&Math.hypot(dx,dy)>6){moved=true;el.classList.add("dragging")}if(moved){el.style.transform=`translate(${dx}px,${dy}px) scale(1.15)`;
      document.querySelectorAll("[data-drop]").forEach(t=>{const r=t.getBoundingClientRect();t.classList.toggle("hot",m.clientX>r.left&&m.clientX<r.right&&m.clientY>r.top&&m.clientY<r.bottom)})}};
    const up=u=>{el.removeEventListener("pointermove",move);el.removeEventListener("pointerup",up);el.removeEventListener("pointercancel",up);el.classList.remove("dragging");
      let hit=null;document.querySelectorAll("[data-drop]").forEach(t=>{t.classList.remove("hot");const r=t.getBoundingClientRect();if(u.clientX>r.left&&u.clientX<r.right&&u.clientY>r.top&&u.clientY<r.bottom)hit=t});
      el.style.transform="";
      if(!moved){document.querySelectorAll(".dragitem.sel").forEach(x=>x!==el&&x.classList.remove("sel"));el.classList.toggle("sel");blip(520,.06);return}
      if(hit){if(!onDrop(el,hit)){el.classList.remove("no");void el.offsetWidth;el.classList.add("no")}}};
    el.addEventListener("pointermove",move);el.addEventListener("pointerup",up);el.addEventListener("pointercancel",up)});
}
function wireTapTargets(root,onDrop){root.querySelectorAll("[data-drop]").forEach(t=>t.addEventListener("click",()=>{const s=root.querySelector(".dragitem.sel");if(!s)return;s.classList.remove("sel");if(!onDrop(s,t)){s.classList.remove("no");void s.offsetWidth;s.classList.add("no")}}))}
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.random()*(i+1)|0;[a[i],a[j]]=[a[j],a[i]]}return a}

/* generic sorting game: items [emoji,label,cat], bins [cat,label,color,emoji] */
function sortGame(title,lead,items,bins,wrongMsg,doneMsg){
  const pick=shuffle(items).slice(0,8);let left=pick.length;
  openSheet(head(title)+`<div class="center"><p class="lead">${lead}</p>
   <div class="tray" id="tray">${pick.map((it,i)=>`<button class="dragitem" data-cat="${it[2]}" aria-label="${it[1]}"><span>${it[0]}</span><small>${it[1]}</small></button>`).join("")}</div>
   <div class="bins4">${bins.map(b=>`<div class="bin" data-drop="${b[0]}" style="background:${b[2]}" role="button" tabindex="0"><span class="lid">${b[3]}</span>${b[1]}<span class="cnt">0</span></div>`).join("")}</div>
   <div class="say" id="say">Táhni věc do koše, nebo na ni ťukni a pak na koš.</div></div>`);
  const P=$("#panel");
  const drop=(el,bin)=>{if(el.dataset.cat!==bin.dataset.drop){blip(220,.2,"square",.06);$("#say").textContent=wrongMsg;return false}
    el.remove();blip(780);const c=bin.querySelector(".cnt");c.textContent=+c.textContent+1;bin.classList.remove("pulse");void bin.offsetWidth;bin.classList.add("pulse");left--;
    $("#say").textContent=left?"Správně! Ještě "+left+".":doneMsg;if(!left)setTimeout(()=>finishTask(curTask),800);return true};
  P.querySelectorAll(".dragitem").forEach(el=>makeDraggable(el,drop));wireTapTargets(P,drop);
}

/* ============ EXTRAS: new mini-games ============ */
Object.assign(GAMES,{
 trideni(){sortGame("Třídění odpadu","Každá věc patří do svého kontejneru.",[
   ["🥤","Kelímek","plast"],["🧴","Lahev od šamponu","plast"],["🛍️","Igelitka","plast"],["🥡","Krabička od jídla","plast"],
   ["📰","Noviny","papir"],["📦","Krabice","papir"],["📄","Papír","papir"],["📒","Starý sešit","papir"],
   ["🫙","Sklenice","sklo"],["🍾","Skleněná lahev","sklo"],
   ["🍌","Slupka od banánu","bio"],["🍎","Ohryzek","bio"],["🥚","Skořápky","bio"],["🥕","Natě od mrkve","bio"]],
   [["plast","Plast","#e3b10a","🟡"],["papir","Papír","#2f6fdf","🔵"],["sklo","Sklo","#2f9e5a","🟢"],["bio","Bio","#8a5a2b","🟤"]],
   "Tohle patří do jiné barvy","Všechno vytříděno! Planeta děkuje.")},
 lednice(){sortGame("Vybalit nákup","Kam patří co? Do mrazáku, do lednice, nebo do spíže?",[
   ["🍦","Zmrzlina","mraz"],["🧊","Led","mraz"],["🫛","Mražený hrášek","mraz"],["🍕","Mražená pizza","mraz"],
   ["🥛","Mléko","led"],["🧀","Sýr","led"],["🧈","Máslo","led"],["🥚","Vajíčka","led"],["🍓","Jahody","led"],
   ["🍝","Těstoviny","spiz"],["🍚","Rýže","spiz"],["🥫","Konzerva","spiz"],["🍪","Sušenky","spiz"],["🍯","Med","spiz"]],
   [["mraz","Mrazák","#5fb4ef","❄️"],["led","Lednice","#3f8fb0","🧊"],["spiz","Spíž","#c98a4a","🗄️"]],
   "Tady by se to zkazilo nebo rozmrzlo","Nákup je uklizený!")},
 mycka(){sortGame("Uklidit nádobí","Velké dolů, hrnky a skleničky nahoru, příbory do košíčku.",[
   ["🍽️","Talíř","dole"],["🍳","Pánev","dole"],["🍲","Hrnec","dole"],["🥘","Mísa","dole"],
   ["☕","Hrnek","nahore"],["🍵","Šálek","nahore"],["🥛","Sklenička","nahore"],["🧋","Kelímek","nahore"],
   ["🥄","Lžíce","kosik"],["🍴","Vidlička","kosik"],["🥢","Hůlky","kosik"]],
   [["dole","Spodní koš","#3f6fb0","⬇️"],["nahore","Horní koš","#4fa3c9","⬆️"],["kosik","Košík na příbory","#8a7ad6","🧺"]],
   "Tohle se dává jinam","Myčka je naplněná!")},
 batoh(){
  const wd=weekday();const need=[["📚","Učebnice"],["📓","Sešit"],["✏️","Penál"],["🥪","Svačina"],["🧃","Pití"]];if(wd===1||wd===3)need.push(["👟","Cvičky na tělocvik"]);if(wd===5)need.push(["🎨","Výtvarka"]);
  const decoy=[["🧸","Plyšák"],["🎮","Herní konzole"],["🍬","Bonbóny"],["⚽","Míč"],["🦖","Dinosaurus"]];
  const all=shuffle(need.map(x=>[...x,1]).concat(shuffle(decoy).slice(0,3).map(x=>[...x,0])));let left=need.length;
  openSheet(head("Sbalit aktovku")+`<div class="center"><p class="lead">Dnes potřebuješ tyhle věci. Ťukni na ně a dej je do aktovky.</p>
   <div class="needlist">${need.map(n=>`<span data-need="${n[1]}">${n[0]} ${n[1]}</span>`).join("")}</div>
   <div class="bagzone"><span class="bag" id="bag">🎒</span></div>
   <div class="foods">${all.map((x,i)=>`<button class="food big" data-i="${i}" aria-label="${x[1]}">${x[0]}</button>`).join("")}</div>
   <div class="say" id="say"></div><p class="hint">Teď to samé udělej doopravdy se svou aktovkou.</p></div>`);
  $("#panel").querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{const it=all[+b.dataset.i];
    if(!it[2]){b.classList.remove("no");void b.offsetWidth;b.classList.add("no");blip(220,.2,"square",.06);$("#say").textContent=it[1]+" do školy nepatří";return}
    b.classList.add("used");blip(760);const bag=$("#bag");bag.classList.remove("gulp");void bag.offsetWidth;bag.classList.add("gulp");$(`[data-need="${it[1]}"]`).classList.add("ok");left--;
    $("#say").textContent=left?"Ještě "+left:"Aktovka je sbalená!";if(!left)setTimeout(()=>finishTask(curTask),800)});
 },
 prostirani(){
  const parts=[["talir","🍽️","Talíř"],["vidlicka","🍴","Vidlička"],["nuz","🔪","Nůž"],["lzice","🥄","Lžíce"],["sklenice","🥛","Sklenička"],["ubrousek","🧻","Ubrousek"]];let left=parts.length;
  openSheet(head("Prostřít stůl")+`<div class="center"><p class="lead">Dej každou věc na její místo. Vidlička vlevo, nůž a lžíce vpravo.</p>
   <div class="placemat">${parts.map(p=>`<div class="pslot ps-${p[0]}" data-drop="${p[0]}"><span>${p[1]}</span></div>`).join("")}</div>
   <div class="tray small">${shuffle(parts).map(p=>`<button class="dragitem" data-cat="${p[0]}" aria-label="${p[2]}"><span>${p[1]}</span><small>${p[2]}</small></button>`).join("")}</div>
   <div class="say" id="say"></div></div>`);
  const P=$("#panel");
  const drop=(el,slot)=>{if(el.dataset.cat!==slot.dataset.drop){blip(220,.2,"square",.06);$("#say").textContent="Tohle místo patří něčemu jinému";return false}
    slot.classList.add("full");el.remove();blip(800);left--;$("#say").textContent=left?"Paráda!":"Stůl je prostřený jako v restauraci!";if(!left)setTimeout(()=>finishTask(curTask),800);return true};
  P.querySelectorAll(".dragitem").forEach(el=>makeDraggable(el,drop));wireTapTargets(P,drop);
 },
 pena(){
  const NEED=20;let scrub=0,last=null,done=false;
  openSheet(head("Umýt si ruce")+`<div class="center"><p class="lead">Namydli si ruce a drhni. Prstem drhni i tady, dokud se nenaplní bublina.</p>
   <div class="soap"><canvas id="soap"></canvas><span class="hands">🙌</span></div>
   <div class="fbar wide"><b id="sb"></b></div><div class="say" id="say">Drhni prstem po obrázku</div>
   <button class="btn kelp" id="rinse" hidden>Opláchnuto a utřeno!</button></div>`);
  const cv=$("#soap"),c=cv.getContext("2d");const R=Math.min(2,devicePixelRatio||1);const W=cv.clientWidth,H=cv.clientHeight;cv.width=W*R;cv.height=H*R;c.scale(R,R);
  const bubbles=[];let tick=0;
  const draw=()=>{if(!cv.isConnected)return;c.clearRect(0,0,W,H);bubbles.forEach(b=>{b.a-=.004;b.y-=.2;c.globalAlpha=Math.max(0,b.a);c.fillStyle="rgba(255,255,255,.55)";c.strokeStyle="rgba(140,200,255,.9)";c.lineWidth=1.5;c.beginPath();c.arc(b.x,b.y,b.r,0,7);c.fill();c.stroke();c.fillStyle="#fff";c.beginPath();c.arc(b.x-b.r*.3,b.y-b.r*.3,b.r*.25,0,7);c.fill()});c.globalAlpha=1;for(let i=bubbles.length-1;i>=0;i--)if(bubbles[i].a<=0)bubbles.splice(i,1);requestAnimationFrame(draw)};draw();
  cv.style.touchAction="none";
  cv.onpointerdown=e=>{last={x:e.offsetX,y:e.offsetY,t:performance.now()};cv.setPointerCapture(e.pointerId)};
  cv.onpointermove=e=>{if(!last||done)return;const now=performance.now(),d=Math.hypot(e.offsetX-last.x,e.offsetY-last.y);if(d>2){scrub+=Math.min(.1,(now-last.t)/1000);for(let i=0;i<2;i++)bubbles.push({x:e.offsetX+(Math.random()-.5)*30,y:e.offsetY+(Math.random()-.5)*30,r:4+Math.random()*12,a:1});
      if(++tick%14===0)blip(900+Math.random()*400,.05,"sine",.04)}last={x:e.offsetX,y:e.offsetY,t:now};
    const p=Math.min(1,scrub/NEED);$("#sb").style.width=p*100+"%";$("#say").textContent=p<1?Math.ceil(NEED-scrub)+" s drhnutí":"Super pěna!";
    if(p>=1&&!done){done=true;chime();$("#rinse").hidden=false;$("#say").textContent="Teď ruce opláchni a utři."}};
  cv.onpointerup=()=>{last=null};
  $("#rinse").onclick=()=>finishTask(curTask);
 },
 satnik(){
  const W=[["slunce","☀️","Je teplo"],["dest","🌧️","Prší"],["snih","❄️","Mrzne"]][Math.random()*3|0];
  const order=[["🩲","Spodní prádlo"],["👕","Tričko"],["👖","Kalhoty"],["🧦","Ponožky"]];
  if(W[0]==="slunce")order.push(["🧢","Kšiltovka"]);if(W[0]==="dest")order.push(["🧥","Bunda"],["☂️","Deštník"]);if(W[0]==="snih")order.push(["🧥","Bunda"],["🧣","Šála"],["🧤","Rukavice"]);
  const decoys=W[0]==="slunce"?[["🧤","Rukavice"],["🧣","Šála"]]:W[0]==="snih"?[["🩳","Kraťasy"],["🕶️","Sluneční brýle"]]:[["🕶️","Sluneční brýle"],["🩳","Kraťasy"]];
  const all=shuffle(order.concat(decoys));let step=0;
  openSheet(head("Obléct se")+`<div class="center"><div class="weather"><span>${W[1]}</span><b>${W[2]}</b></div><p class="lead">Obleč postavičku ve správném pořadí a podle počasí. Pak se obleč i ty.</p>
   <div class="figure"><span class="kidfig">🧒</span><div class="worn" id="worn"></div></div>
   <div class="foods">${all.map((x,i)=>`<button class="food big" data-i="${i}" aria-label="${x[1]}">${x[0]}</button>`).join("")}</div><div class="say" id="say"></div></div>`);
  $("#panel").querySelectorAll("[data-i]").forEach(b=>b.onclick=()=>{const it=all[+b.dataset.i];
    if(!order.some(o=>o[1]===it[1])){b.classList.remove("no");void b.offsetWidth;b.classList.add("no");blip(220,.2,"square",.06);$("#say").textContent=it[1]+"? To dnes potřebovat nebudeš.";return}
    if(order[step][1]!==it[1]){b.classList.remove("no");void b.offsetWidth;b.classList.add("no");blip(260,.15,"square",.05);$("#say").textContent="Nejdřív: "+order[step][1];return}
    b.classList.add("used");blip(700+step*60);$("#worn").insertAdjacentHTML("beforeend",`<span>${it[0]}</span>`);step++;
    $("#say").textContent=step<order.length?"Dobře! Co dál?":"Hotovo, můžeš vyrazit!";if(step===order.length)setTimeout(()=>finishTask(curTask),900)});
 },
 konvicka(){
  const plants=["🌷","🌻","🌼"];let i=0,level=0,holding=false,rid=0,last=0;
  const ui=()=>`<div class="plantrow">${plants.map((p,k)=>`<span class="${k<i?"grown":k===i?"cur":""}">${k<i?p:"🌱"}</span>`).join("")}</div>`;
  openSheet(head("Zalít květiny")+`<div class="center"><p class="lead">Drž tlačítko a zalévej. Pusť, když je voda v zeleném pásu. Moc vody květině škodí!</p>
   <div id="pr">${ui()}</div><div class="gauge"><i class="zone"></i><b id="lv"></b></div>
   <button class="hold small" id="pour"><span>Zalévat 🚿</span></button><div class="say" id="say"></div></div>`);
  const paint=()=>{$("#lv").style.height=Math.min(100,level)+"%"};
  const step=now=>{const dt=(now-last)/1000;last=now;if(holding){level+=dt*38;paint();if(level>100){holding=false;level=0;paint();blip(200,.3,"square",.06);$("#say").textContent="Moc vody! Zkus to znovu, pomaleji."}else rid=requestAnimationFrame(step)}};
  const down=e=>{e.preventDefault();holding=true;last=performance.now();rid=requestAnimationFrame(step)};
  const up=()=>{if(!holding)return;holding=false;cancelAnimationFrame(rid);
    if(level>=55&&level<=82){blip(900);i++;level=0;paint();$("#pr").innerHTML=ui();$("#say").textContent=i<plants.length?"Vyrostla! Další kytka.":"Všechny kytky kvetou!";if(i>=plants.length)setTimeout(()=>finishTask(curTask),900)}
    else if(level<55)$("#say").textContent="Ještě trochu přilej."};
  const b=$("#pour");b.addEventListener("pointerdown",down);["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,up));
 },
 miska(t){
  const pet=["🐱","🐶","🐰","🐹","🐢","🐦"].includes(t&&t.icon)?t.icon:"🐱";const N=3;let sc=0,water=0,holding=false,rid=0,last=0,phase=1;
  openSheet(head("Nakrmit zvíře")+`<div class="center"><span class="pet" id="pet">${pet}</span>
   <p class="lead" id="ml">Nasyp přesně ${N} lžičky granulí.</p>
   <div class="bowls"><div class="bowl"><div class="kib" id="kib"></div><small>Granule <b id="sc">0</b>/${N}</small></div><div class="bowl"><div class="wat"><b id="wl"></b><i class="line"></i></div><small>Voda</small></div></div>
   <div class="tools"><button class="btn" id="scoop">Nasypat lžičku 🥄</button><button class="hold small" id="pourw" hidden><span>Napustit 💧</span></button></div><div class="say" id="say"></div></div>`);
  $("#scoop").onclick=()=>{if(phase!==1)return;sc++;blip(600+sc*80);$("#sc").textContent=sc;$("#kib").textContent="🟤".repeat(Math.min(sc,6));
    if(sc>N){$("#say").textContent="Moc! Zvíře by se přejedlo. Zkus to znovu.";sc=0;setTimeout(()=>{$("#sc").textContent=0;$("#kib").textContent=""},700);return}
    if(sc===N){phase=2;$("#say").textContent="Akorát! Teď čerstvá voda.";$("#ml").textContent="Drž tlačítko, dokud voda nedosáhne čárky.";$("#scoop").hidden=true;$("#pourw").hidden=false}};
  const step=now=>{const dt=(now-last)/1000;last=now;if(holding){water=Math.min(100,water+dt*40);$("#wl").style.height=water+"%";if(water>=100){holding=false;$("#say").textContent="Přeteklo! Vylijeme a znovu.";water=0;setTimeout(()=>$("#wl").style.height="0%",500)}else rid=requestAnimationFrame(step)}};
  const b=$("#pourw");b.addEventListener("pointerdown",e=>{e.preventDefault();holding=true;last=performance.now();rid=requestAnimationFrame(step)});
  ["pointerup","pointerleave","pointercancel"].forEach(ev=>b.addEventListener(ev,()=>{if(!holding)return;holding=false;cancelAnimationFrame(rid);
    if(water>=70&&water<=90){chime();$("#pet").classList.add("happy");$("#say").textContent="Mňam! Děkuje ti.";setTimeout(()=>finishTask(curTask),1000)}else if(water<70)$("#say").textContent="Ještě trochu."}));
 },
 rozcvicka(){
  const ex=[["Dřepy","🏋️","Ruce dopředu, zadek dozadu"],["Panák","🤸","Skoky s rukama nahoru"],["Letadlo","✈️","Ruce do stran, stoj na jedné noze"],["Běh na místě","🏃","Kolena vysoko"],["Protažení","🙆","Ruce ke stropu, pak k zemi"]];const SEC=15;let i=0,left=SEC,run=false;
  openSheet(head("Rozcvička s rybkou")+`<div class="center"><div class="exdots">${ex.map((e,k)=>`<i data-k="${k}"></i>`).join("")}</div>
   <span class="exic" id="exi">${ex[0][1]}</span><h3 id="exn">${ex[0][0]}</h3><p class="lead" id="exd">${ex[0][2]}</p><div class="timer" id="tm">${SEC}</div>
   <button class="btn sea" id="go">Start</button></div>`);
  const show=()=>{if(run)speak(ex[i][0]+". "+ex[i][2]);$("#exi").textContent=ex[i][1];$("#exn").textContent=ex[i][0];$("#exd").textContent=ex[i][2];$("#panel").querySelectorAll(".exdots i").forEach((d,k)=>d.className=k<i?"done":k===i?"on":"")};show();
  $("#go").onclick=()=>{if(run)return;run=true;$("#go").disabled=true;blip(500);
    gameTimer=setInterval(()=>{left--;$("#tm").textContent=left;if(left<=3&&left>0)blip(700,.06);
      if(left<=0){i++;blip(1000,.2,"triangle");if(i>=ex.length){clearInterval(gameTimer);$("#exn").textContent="Hotovo, šampione!";$("#exi").textContent="🏆";$("#exd").textContent="";setTimeout(()=>finishTask(curTask),900);return}left=SEC;$("#tm").textContent=left;show()}},1000)};
 },
 matika(t){
  const lvl=(t&&t.level)||"10";const gen=()=>{let a,b,op,res;
    if(lvl==="nas"){a=1+Math.random()*10|0;b=1+Math.random()*10|0;op="×";res=a*b}
    else{const max=lvl==="20"?20:10;if(Math.random()<.5){a=Math.random()*(max+1)|0;b=Math.random()*(max-a+1)|0;op="+";res=a+b}else{a=1+Math.random()*max|0;b=Math.random()*(a+1)|0;op="−";res=a-b}}
    const opts=new Set([res]);while(opts.size<3){const d=res+(Math.random()<.5?-1:1)*(1+Math.random()*3|0);if(d>=0)opts.add(d)}return {a,b,op,res,opts:shuffle([...opts])}};
  let n=0,q=gen();const TOTAL=5;
  const render=()=>{setTimeout(()=>speak(q.a+" "+q.op+" "+q.b+" = ?"),n?300:2600);$("#mq").innerHTML=`<div class="prob">${q.a} ${q.op} ${q.b} = ?</div>${lvl==="10"&&q.op==="+"?`<div class="count">${"🐟".repeat(q.a)} <b>+</b> ${"🐠".repeat(q.b)}</div>`:lvl==="10"?`<div class="count">${"🐟".repeat(q.a-q.b)}${"<s>🐟</s>".repeat(q.b)}</div>`:""}
    <div class="answers">${q.opts.map(o=>`<button class="bubble" data-a="${o}">${o}</button>`).join("")}</div>`;
    $("#mq").querySelectorAll("[data-a]").forEach(b=>b.onclick=()=>{if(+b.dataset.a===q.res){blip(900);n++;$("#ms").textContent=n+" / "+TOTAL;if(n>=TOTAL){$("#mq").innerHTML='<div class="prob">🎉 Výborně!</div>';chime();setTimeout(()=>finishTask(curTask),900);return}q=gen();render()}else{b.classList.remove("no");void b.offsetWidth;b.classList.add("no");blip(220,.2,"square",.06)}})};
  openSheet(head("Mořská matika")+`<div class="center"><p class="lead">Rozehřej hlavu před úkoly do školy. Vyřeš ${TOTAL} příkladů.</p><div class="score" id="ms">0 / ${TOTAL}</div><div id="mq"></div><p class="hint">Pak udělej úkoly do školy doopravdy a ukaž je rodiči.</p></div>`);render();
 },
 muslicka(){
  const deeds=["Pomohl/a jsem sourozenci","Půjčil/a jsem hračku","Někoho jsem pochválil/a","Pomohl/a jsem s vařením","Utěšil/a jsem kamaráda","Udělal/a jsem dárek nebo obrázek","Něco jiného hezkého"];
  openSheet(head("Udělat někomu radost")+`<div class="center"><span class="shell" id="shell">🐚</span><p class="lead">Co hezkého jsi dnes udělal/a?</p>
   <div class="deeds">${deeds.map((d,i)=>`<button class="btn ghost small" data-d="${i}">${d}</button>`).join("")}</div></div>`);
  $("#panel").querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{const d=today();d.notes=d.notes||{};d.notes[curTask]=deeds[+b.dataset.d];
    const s=$("#shell");s.textContent="🦪";s.classList.add("open");chime();$("#panel").querySelector(".deeds").innerHTML='<p class="lead">Mušle se otevřela a v ní perla. Svět je o kousek hezčí!</p>';setTimeout(()=>finishTask(curTask),1300)});
 },
 uspavani(){
  let lamps=[1,1,1],curtain=0;
  openSheet(head("Jít spát")+`<div class="center"><p class="lead">Zhasni světla a zatáhni závěsy. Rybky jdou taky spát.</p>
   <div class="bedroom" id="room"><div class="curtain l" id="cl"></div><div class="curtain r" id="cr"></div><div class="moon">🌙</div>
    <div class="lamps">${lamps.map((_,i)=>`<button class="lamp on" data-l="${i}" aria-label="Lampička ${i+1}">💡</button>`).join("")}</div><span class="sleepfish" id="sf">🐠</span></div>
   <input type="range" class="slider" id="cur" min="0" max="100" value="0" aria-label="Zatáhnout závěsy"><div class="say" id="say"></div></div>`);
  let check=()=>{const dark=lamps.filter(x=>!x).length/3;$("#room").style.setProperty("--dark",dark*.6+curtain/100*.3);if(!lamps.some(Boolean)&&curtain>=95){$("#sf").textContent="💤";$("#say").textContent="Dobrou noc! Rybky už spí.";chime();setTimeout(()=>finishTask(curTask),1200);check=()=>{}}};
  $("#panel").querySelectorAll("[data-l]").forEach(b=>b.onclick=()=>{const i=+b.dataset.l;if(!lamps[i])return;lamps[i]=0;b.classList.remove("on");blip(300,.12,"triangle");check()});
  $("#cur").oninput=e=>{curtain=+e.target.value;$("#cl").style.width=$("#cr").style.width=(curtain/2)+"%";check()};
 },
 plavba(t){
  const mins=(t&&t.minutes)||10;const total=mins*60;let elapsed=0,startAt=null,run=false;
  openSheet(head(esc((t&&t.name)||"Plavba"))+`<div class="center"><p class="lead">${esc((t&&t.desc)||"")} Lodička pluje ${mins} minut, dokud se věnuješ úkolu.</p>
   <div class="voyage"><div class="waves"></div><span class="boat" id="boat">⛵</span><span class="island">🏝️</span><span class="chest" id="chest">🧰</span></div>
   <div class="timer" id="tm">${mins}:00</div>
   <div class="tools"><button class="btn sea" id="go">Vyplout</button>${CFG.testTools?'<button class="btn ghost small" id="fast">Test 10 s</button>':""}</div><div class="say" id="say"></div></div>`);
  let lock=null;const tick=()=>{const now=Date.now();const el=elapsed+(run?(now-startAt)/1000:0);const p=Math.min(1,el/total);$("#boat").style.left=(4+p*74)+"%";const rest=Math.max(0,Math.ceil(total-el));$("#tm").textContent=Math.floor(rest/60)+":"+String(rest%60).padStart(2,"0");
    if(p>=1){clearInterval(gameTimer);run=false;$("#chest").textContent="🎁";$("#chest").classList.add("open");$("#say").textContent="Doplul/a jsi k pokladu!";chime();try{lock&&lock.release()}catch(e){}setTimeout(()=>finishTask(curTask),1100)}};
  const start=()=>{run=!run;if(run){startAt=Date.now();$("#go").textContent="Pauza";blip(500);try{navigator.wakeLock&&navigator.wakeLock.request("screen").then(l=>lock=l).catch(()=>{})}catch(e){}clearInterval(gameTimer);gameTimer=setInterval(tick,500)}else{elapsed+=(Date.now()-startAt)/1000;$("#go").textContent="Pokračovat";clearInterval(gameTimer);tick()}};
  $("#go").onclick=start;if($("#fast"))$("#fast").onclick=()=>{elapsed=Math.max(elapsed,total-10);if(!run)start()};
 },
 rutina(t){
  const steps=(t&&t.steps&&t.steps.length)?t.steps:["Krok 1","Krok 2","Krok 3"];const done=new Set();
  openSheet(head(esc((t&&t.name)||"Rutina"))+`<div class="center"><p class="lead">Odškrtni každý krok, až ho uděláš.</p>
   <div class="steplist">${steps.map((s,i)=>`<button class="stp" data-s="${i}"><i></i><span>${esc(s)}</span></button>`).join("")}</div><div class="say" id="say"></div></div>`);
  $("#panel").querySelectorAll("[data-s]").forEach(b=>b.onclick=()=>{const i=+b.dataset.s;if(done.has(i))return;done.add(i);b.classList.add("ok");blip(600+done.size*70);
    $("#say").textContent=done.size<steps.length?"Ještě "+(steps.length-done.size):"Všechno hotovo!";if(done.size===steps.length)setTimeout(()=>finishTask(curTask),800)});
 }
});

/* boot */
makePortraits();
boot();
