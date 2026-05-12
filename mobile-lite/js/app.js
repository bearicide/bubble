
"use strict";

function runSplash(){
  const splash=document.getElementById("splash");
  const bar=document.getElementById("splashProgress");
  const note=document.getElementById("splashNote");
  const pct=document.getElementById("splashPercent");
  const enter=document.getElementById("splashEnter");
  if(!splash || !bar || !enter) return;

  const notes=[
    "Loading...",
    "Loading roses...",
    "Loading bonus...",
    "Almost ready...",
    "Ready."
  ];

  let p=0;
  enter.style.display="none";
  enter.disabled=true;

  const finish=()=>{
    p=100;
    bar.style.width="100%";
    if(pct)pct.textContent="100%";
    if(note)note.textContent="Ready. Tap START.";
    enter.style.display="inline-block";
    enter.disabled=false;
    enter.focus({preventScroll:true});
  };

  const timer=setInterval(()=>{
    p += 5 + Math.random()*10;
    if(p>=100){
      clearInterval(timer);
      finish();
      return;
    }
    const shown=Math.floor(p);
    bar.style.width=shown+"%";
    if(pct)pct.textContent=shown+"%";
    if(note)note.textContent=notes[Math.min(notes.length-1,Math.floor(shown/25))];
  },110);

  enter.onclick=()=>{
    splash.classList.add("hide");
    startMusic();
  };

  // Failsafe: never let the splash get stuck if a timer gets weird.
  setTimeout(()=>{
    if(!splash.classList.contains("hide") && enter.style.display==="none"){
      clearInterval(timer);
      finish();
    }
  },3500);
}

const bets=[0.10,0.20,0.40,0.50,0.60,0.80,1.00], ROWS=4, COLS=4;
const PAYLINES=[
  [[0,0],[0,1],[0,2],[0,3]],
  [[1,0],[1,1],[1,2],[1,3]],
  [[2,0],[2,1],[2,2],[2,3]],
  [[3,0],[3,1],[3,2],[3,3]],
  [[0,0],[1,1],[2,2],[3,3]],
  [[3,0],[2,1],[1,2],[0,3]],
  [[0,0],[1,1],[1,2],[0,3]],
  [[3,0],[2,1],[2,2],[3,3]],
  [[1,0],[0,1],[1,2],[0,3]],
  [[2,0],[3,1],[2,2],[3,3]]
];
const approved2=new Set(["AD", "AH", "AM", "AS", "AT", "AW", "DO", "EH", "EM", "ER", "ET", "HA", "HE", "HO", "LA", "LO", "MA", "ME", "MO", "MY", "OH", "OM", "OP", "OR", "OW", "PA", "PE", "RE", "SH", "SO", "TA", "TO", "WE", "WO", "YA", "YO"]);
const approved3=new Set(["ADO", "ADS", "AHA", "ARM", "ASH", "ATE", "AWE", "AWL", "DAM", "DAP", "DAW", "DAY", "DOE", "DOS", "DOT", "DRY", "EAR", "EAT", "ELM", "EMS", "ERA", "HAM", "HAS", "HAT", "HAY", "HEM", "HER", "HEY", "HOE", "HOP", "HOT", "HOW", "LAD", "LAM", "LAP", "LAW", "LAY", "LET", "LOP", "LOT", "LOW", "MAD", "MAE", "MAP", "MAT", "MET", "MOM", "MOP", "MOW", "OAR", "OAT", "ODE", "OLD", "ORE", "OWE", "OWL", "PAD", "PAL", "PAR", "PAT", "PAW", "PAY", "PEA", "PER", "PET", "PLY", "POD", "PRO", "PRY", "RAM", "RAP", "RAT", "RAW", "RAY", "RED", "REP", "ROD", "ROE", "ROT", "ROW", "RYE", "SAD", "SAP", "SAT", "SAW", "SAY", "SEA", "SET", "SEW", "SHE", "SHY", "SOD", "SOP", "SOW", "SOY", "SPA", "SPY", "TAD", "TAM", "TAP", "TAR", "TEA", "THE", "TOE", "TOM", "TOP", "TOW", "TOY", "TRY", "TWO", "VAT", "VET", "VOW", "WAD", "WAR", "WAS", "WAY", "WED", "WET", "WHO", "WHY", "WOE", "WRY", "YAM", "YAP", "YAW", "YEA", "YES", "YET", "YOW"]);
const approved4=new Set(["AMMO", "ARMY", "AWAY", "DARE", "DATE", "DEAR", "DOER", "DOME", "DORY", "DOVE", "DRAM", "DRAW", "DREW", "DROP", "EAST", "EASY", "HALE", "HALO", "HARD", "HARE", "HARM", "HARP", "HART", "HATE", "HAVE", "HEAD", "HEAL", "HEAR", "HEAT", "HELD", "HELM", "HERD", "HERO", "HOME", "HOPE", "HOST", "LADY", "LAME", "LARD", "LAST", "LATE", "LATH", "LEAD", "LOAM", "LODE", "LORD", "LORE", "LOSE", "LOST", "LOVE", "MADE", "MALE", "MALT", "MARE", "MART", "MARY", "MASH", "MAST", "MATE", "MATH", "MATT", "MEAL", "MEAT", "MELT", "MESA", "MESH", "MODE", "MOLD", "MOLE", "MOPE", "MORE", "MOST", "MOTH", "MOVE", "OWED", "PALE", "PALM", "PARE", "PART", "PAST", "PATH", "PEAL", "PEAR", "PEAT", "PELT", "PLAY", "PLOD", "PLOT", "POEM", "POET", "POLE", "POME", "PORT", "POSE", "POST", "PRAM", "PREY", "PROD", "PROM", "PYRE", "READ", "REAL", "REAM", "REAP", "REDO", "RELY", "REST", "ROAD", "ROAM", "RODE", "ROLE", "ROME", "ROPE", "ROSE", "ROTA", "ROTE", "SALE", "SAME", "SATE", "SEAL", "SEAM", "SEAT", "SHAM", "SHED", "SHOE", "SHOP", "SHOT", "SHOW", "SLAM", "SLAP", "SLAT", "SLAW", "SLED", "SLOW", "SOAP", "SODA", "SOLD", "SOLE", "SOME", "SORE", "SORT", "SPAM", "SPAR", "SPAT", "SPAY", "STAY", "STEM", "STEP", "STEW", "STOP", "STOW", "SWAM", "SWAP", "SWAT", "SWAY", "TAME", "TAPE", "TARE", "TEAM", "TEAR", "TEMP", "TERM", "THEM", "THEY", "TOAD", "TOLD", "TOME", "TORE", "TRAM", "TRAY", "TROD", "TROW", "VERY", "VETO", "VOTE", "WADE", "WARM", "WARP", "WART", "WARY", "WASH", "WASP", "WELD", "WEST", "WHAT", "WHEY", "WORD", "WORE", "YARD", "YAWL", "YORE"]);
const defs=[
{id:"W",label:"W",pic:"W",type:"letter",rarity:"common",w:7},{id:"O",label:"O",pic:"O",type:"letter",rarity:"common",w:9},{id:"R",label:"R",pic:"R",type:"letter",rarity:"common",w:6},{id:"D",label:"D",pic:"D",type:"letter",rarity:"common",w:6},
{id:"P",label:"P",pic:"P",type:"letter",rarity:"common",w:5},{id:"L",label:"L",pic:"L",type:"letter",rarity:"common",w:6},{id:"A",label:"A",pic:"A",type:"letter",rarity:"common",w:8},{id:"Y",label:"Y",pic:"Y",type:"letter",rarity:"common",w:6},
{id:"M",label:"M",pic:"M",type:"letter",rarity:"common",w:8},{id:"T",label:"T",pic:"T",type:"letter",rarity:"common",w:8},{id:"H",label:"H",pic:"H",type:"letter",rarity:"common",w:5},{id:"E",label:"E",pic:"E",type:"letter",rarity:"common",w:7},{id:"S",label:"S",pic:"S",type:"letter",rarity:"common",w:5},{id:"V",label:"V",pic:"V",type:"letter",rarity:"common",w:3},
{id:"ROSE",label:"Rose",pic:"🌹",type:"flower",rarity:"rare",w:5},{id:"BOUQUET",label:"Bouquet",pic:"💐",type:"flower",rarity:"rare",w:4},{id:"RIBBON",label:"Ribbon",pic:"🎀",type:"pretty",rarity:"rare",w:4},{id:"TEA",label:"Tea",pic:"☕",type:"pretty",rarity:"rare",w:3},
{id:"HEART",label:"Heart",pic:"💖",type:"premium",rarity:"epic",w:3},{id:"CRYSTAL",label:"Crystal",pic:"💎",type:"premium",rarity:"epic",w:3},{id:"CROWN",label:"Crown",pic:"👑",type:"queen",rarity:"legend",w:2},{id:"SCEPTER",label:"Scepter",pic:"🪄",type:"queen",rarity:"epic",w:2},
{id:"CALL",label:"Call Mom",pic:"📞",type:"scatter",rarity:"legend",w:2},{id:"LIONESS",label:"Lioness",pic:"🦁",type:"queen",rarity:"legend",w:1},{id:"MJ",label:"Matthew & James",pic:"💞",type:"queen",rarity:"legend",w:1}
];
let bag=[]; defs.forEach(t=>{for(let i=0;i<t.w;i++)bag.push(t)});

const DEFAULT_OPERATOR={
  mode:"standard",
  wordChance:24,
  premium:100,
  queenEase:100,
  queenMin:35,
  queenMax:250,
  chaos:200,
  autoDelay:900
};
let OP={...DEFAULT_OPERATOR};

const OP_MODES={
  reserved:{wordChance:8,premium:70,queenEase:70,queenMin:20,queenMax:120,chaos:300,autoDelay:1100},
  standard:{wordChance:24,premium:100,queenEase:100,queenMin:35,queenMax:250,chaos:200,autoDelay:900},
  warm:{wordChance:30,premium:120,queenEase:120,queenMin:45,queenMax:300,chaos:180,autoDelay:850},
  queen:{wordChance:36,premium:150,queenEase:150,queenMin:75,queenMax:420,chaos:140,autoDelay:750},
  chaos:{wordChance:42,premium:190,queenEase:175,queenMin:100,queenMax:600,chaos:90,autoDelay:550}
};

function loadOperator(){
  try{
    const saved=localStorage.getItem("spellslots_operator_v19");
    if(saved) OP={...DEFAULT_OPERATOR,...JSON.parse(saved)};
  }catch(e){}
}
function saveOperator(){
  try{localStorage.setItem("spellslots_operator_v19",JSON.stringify(OP));}catch(e){}
}
function weightedPick(list){
  const premiumTypes=new Set(["premium","queen","scatter"]);
  const adjusted=list.map(t=>{
    let w=t.w;
    if(premiumTypes.has(t.type)) w=w*(OP.premium/100);
    return {t,w};
  });
  const total=adjusted.reduce((a,b)=>a+b.w,0);
  let roll=Math.random()*total;
  for(const item of adjusted){
    roll-=item.w;
    if(roll<=0)return item.t;
  }
  return adjusted[adjusted.length-1].t;
}

let S={bet:0,words:0,lines:4,bouquet:0,favor:0,spin:false,auto:false,sound:true,music:true,autoRemaining:0,grid:[],found:new Set()}, reels=[], audio=null, autoTimer=null;
const $=id=>document.getElementById(id);
const E={reels:$("reels"),spin:$("spinBtn"),win:$("winDisplay"),bet:$("betDisplay"),words:$("wordsSpelled"),lines:$("activeLines"),bouquet:$("bouquet"),favor:$("favor"),wordBar:$("wordBar"),lineBar:$("lineBar"),bouquetBar:$("bouquetBar"),favorBar:$("favorBar"),unlock:$("unlockText"),toast:$("toast"),toastH:document.querySelector("#toast h2"),toastP:document.querySelector("#toast p"),svg:$("paylineSvg"),cab:$("cabinet"),help:$("help")};
const money=n=>"$"+Number(n).toFixed(2), lineBet=()=>bets[S.bet], totalBet=()=>lineBet()*S.lines;
function pick(){return weightedPick(defs)}
function tHTML(t){return `<div class="tile ${t.rarity}" data-id="${t.id}"><span class="pic">${t.pic}</span><span class="word">${t.type==="letter"?"LETTER":t.label}</span></div>`}
function fx(){
  for(let i=0;i<18;i++){let p=document.createElement("div");p.className="petal";p.style.left=Math.random()*100+"vw";p.style.animationDuration=8+Math.random()*9+"s";p.style.animationDelay=Math.random()*8+"s";$("petals").appendChild(p)}
  for(let i=0;i<10;i++){let s=document.createElement("div");s.className="sparkle";s.style.left=Math.random()*100+"vw";s.style.top=Math.random()*100+"vh";s.style.animationDelay=Math.random()*3+"s";$("sparkles").appendChild(s)}
}
function build(){
  E.reels.innerHTML=""; reels=[];
  for(let c=0;c<COLS;c++){let reel=document.createElement("div"), strip=document.createElement("div");reel.className="reel";strip.className="strip";reel.appendChild(strip);E.reels.appendChild(reel);let o={reel,strip,final:[]};reels.push(o);fill(o,28)}
}
function fill(o,n,final=null){let h="";for(let i=0;i<n;i++){h+=tHTML(final&&i<ROWS?final[i]:pick())}o.strip.innerHTML=h}
function tileH(){let t=document.querySelector(".tile");if(!t)return 132;let s=getComputedStyle(t);return t.getBoundingClientRect().height+parseFloat(s.marginTop)+parseFloat(s.marginBottom)}
function finalGrid(){
  let g=Array.from({length:ROWS},()=>Array(COLS).fill(null));
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)g[r][c]=pick();
  if(Math.random()<(OP.wordChance/100)){let words=["WORD","PLAY","LOVE","MATT","MOM","DAY","THE","HER","ROSE","HOME","HOPE","HART","TEAM","WARM","YOW","OWL","WHO","YES","TOY","WOW"],w=words[Math.floor(Math.random()*words.length)],r=Math.floor(Math.random()*ROWS);for(let c=0;c<Math.min(w.length,COLS);c++){let m=defs.find(t=>t.id===w[c]);if(m)g[r][c]=m}}
  return g;
}
function spin(){playSample("sSpin");
  if(S.spin)return; S.spin=true; E.spin.classList.remove("ready"); E.win.textContent="WIN $0.00"; E.svg.innerHTML=""; document.querySelectorAll(".winTile").forEach(t=>t.classList.remove("winTile"));
  let g=finalGrid(), h=tileH(); S.grid=g;
  reels.forEach((o,c)=>{
    let col=g.map(row=>row[c]), dist=h*(18+c*2);
    o.strip.style.transition="none"; o.strip.style.transform="translateY(0)"; fill(o,36); o.reel.classList.remove("spinning");
    setTimeout(()=>{o.reel.classList.add("spinning");o.strip.style.transition=`transform ${1.7+c*.34}s cubic-bezier(.10,.78,.15,1)`;o.strip.style.transform=`translateY(-${dist}px)`;tone(180+c*75,.045,.025)},40+c*120);
    setTimeout(()=>{o.reel.classList.remove("spinning");fill(o,28,col);o.strip.style.transition="none";o.strip.style.transform="translateY(0)";playSample("sStop");tone(100+c*28,.07,.032);if(c===COLS-1)setTimeout(evalWin,180)},2100+c*420);
  });
}

function startBigWinChaos(){ showBigWinToast.lite=true; return; }
function startBigWinChaos_DISABLED(){
  document.body.classList.add("big-chaos");

  let party=document.getElementById("partyLight");
  if(!party){
    party=document.createElement("div");
    party.id="partyLight";
    party.className="party-light";
    document.body.appendChild(party);
  }

  for(let i=0;i<36;i++){
    const c=document.createElement("div");
    c.className="confetti-piece";
    c.style.left=Math.random()*100+"vw";
    c.style.background=["#ff4f9a","#ffd447","#ffffff","#ff8fbd","#7ee7ff","#b36bff"][Math.floor(Math.random()*6)];
    c.style.animationDuration=(1.6+Math.random()*1.8)+"s";
    c.style.animationDelay=(Math.random()*0.8)+"s";
    c.style.transform="rotate("+Math.random()*360+"deg)";
    document.body.appendChild(c);
    setTimeout(()=>c.remove(),4200);
  }

  if(navigator.vibrate){
    try{ navigator.vibrate([80,40,100,40,140,60,180]); }catch(e){}
  }

  clearTimeout(startBigWinChaos.timer);
  startBigWinChaos.timer=setTimeout(stopBigWinChaos,4200);
}
function stopBigWinChaos(){
  document.body.classList.remove("big-chaos");
  const party=document.getElementById("partyLight");
  if(party) party.remove();
  if(E.toast) E.toast.classList.remove("big-win-toast");
}
function showBigWinToast(title,msg){
  toast(title,msg);
  E.toast.classList.add("big-win-toast");
  startBigWinChaos();
}


function isLetterTile(t){
  return t && t.id && t.id.length===1 && /^[A-Z]$/.test(t.id);
}
function payoutForWord(word, source){
  if(word==="WORD"||word==="PLAY")return {mult: source==="snake" ? 25 : 100, premium:true};
  if(word==="LOVE"||word==="MATT")return {mult: source==="snake" ? 10 : 40, premium:true};
  if(approved4.has(word))return {mult: source==="snake" ? 5 : 12, premium:false};
  if(approved3.has(word))return {mult: source==="snake" ? 2 : 5, premium:false};
  if(approved2.has(word))return {mult: source==="snake" ? .5 : .5, premium:false};
  return null;
}
function validWord(word){
  return payoutForWord(word,"snake");
}
function keyOf(r,c){return r+","+c}
function neighborsOf(r,c){
  const out=[];
  for(let dr=-1;dr<=1;dr++){
    for(let dc=-1;dc<=1;dc++){
      if(dr===0 && dc===0)continue;
      const nr=r+dr,nc=c+dc;
      if(nr>=0 && nr<ROWS && nc>=0 && nc<COLS)out.push([nr,nc]);
    }
  }
  return out;
}
function findSnakeWords(){
  const found=[];
  const maxLen=4;
  function dfs(r,c,path,word){
    if(path.length>=2){
      const pay=validWord(word);
      if(pay)found.push({word,path:[...path],pay});
    }
    if(path.length>=maxLen)return;
    for(const [nr,nc] of neighborsOf(r,c)){
      const k=keyOf(nr,nc);
      if(path.some(p=>p.key===k))continue;
      const tile=S.grid[nr][nc];
      if(!isLetterTile(tile))continue;
      dfs(nr,nc,[...path,{r:nr,c:nc,key:k}],word+tile.id);
    }
  }
  for(let r=0;r<ROWS;r++){
    for(let c=0;c<COLS;c++){
      const tile=S.grid[r][c];
      if(isLetterTile(tile))dfs(r,c,[{r,c,key:keyOf(r,c)}],tile.id);
    }
  }
  found.sort((a,b)=>{
    if(b.word.length!==a.word.length)return b.word.length-a.word.length;
    if(b.pay.mult!==a.pay.mult)return b.pay.mult-a.pay.mult;
    return a.word.localeCompare(b.word);
  });
  const used=new Set();
  const chosen=[];
  const seenWords=new Set();
  for(const item of found){
    if(seenWords.has(item.word))continue;
    if(item.path.some(p=>used.has(p.key)))continue;
    chosen.push(item);
    seenWords.add(item.word);
    item.path.forEach(p=>used.add(p.key));
    if(chosen.length>=3)break;
  }
  return chosen;
}
function clearSnakeVisuals(){
  document.querySelectorAll(".snakeTile").forEach(t=>t.classList.remove("snakeTile"));
  document.querySelectorAll(".snake-label").forEach(t=>t.remove());
  if(E.svg){
    E.svg.querySelectorAll(".snake-path").forEach(p=>p.remove());
  }
}
function drawSnakeWords(items){
  clearSnakeVisuals();
  if(!items.length)return;
  const frame=setupOverlaySvg();

  items.forEach((item,idx)=>{
    const points=[];
    item.path.forEach(({r,c})=>{
      const tile=reels[c] && reels[c].strip ? reels[c].strip.children[r] : null;
      if(!tile)return;
      tile.classList.add("snakeTile");
      points.push(tileCenterInFrame(tile,frame));
    });
    if(points.length>=2){
      const d=points.map((p,i)=>(i===0?"M ":"L ")+p.x+" "+p.y).join(" ");
      const path=document.createElementNS("http://www.w3.org/2000/svg","path");
      path.setAttribute("class","snake-path");
      path.setAttribute("d",d);
      E.svg.appendChild(path);
    }
    const last=points[points.length-1];
    if(last){
      const label=document.createElement("div");
      label.className="snake-label";
      label.textContent=item.word+" +"+item.pay.mult+"x";
      const safeX=Math.max(60,Math.min(frame.clientWidth-60,last.x));
      const safeY=Math.max(30,Math.min(frame.clientHeight-10,last.y));
      label.style.left=safeX+"px";
      label.style.top=safeY+"px";
      frame.appendChild(label);
    }
  });
  clearTimeout(drawSnakeWords.timer);
  drawSnakeWords.timer=setTimeout(clearSnakeVisuals,3000);
}
function updateSpinLog(items, lineWords){
  const all=[];
  lineWords.forEach(w=>{
    const p=payoutForWord(w,"line");
    all.push({word:w,source:"LINE",mult:p?p.mult:0,premium:p?p.premium:false});
  });
  items.forEach(item=>{
    all.push({word:item.word,source:"SNAKE",mult:item.pay.mult,premium:item.pay.premium});
  });
  const unique=[];
  const seen=new Set();
  all.forEach(x=>{
    const k=x.source+":"+x.word;
    if(!seen.has(k)){seen.add(k);unique.push(x)}
  });
  if(E.lastSpinWords){
    if(!unique.length){
      E.lastSpinWords.classList.add("empty");
      E.lastSpinWords.innerHTML="No words this spin";
    }else{
      E.lastSpinWords.classList.remove("empty");
      E.lastSpinWords.innerHTML=unique.map(x=>'<div class="spin-entry '+(x.premium?"premium":"")+'"><strong>'+x.word+'</strong> '+x.source+' +'+x.mult+'x</div>').join("");
    }
  }
  if(E.spinHistory){
    const row=document.createElement("div");
    row.className="spin-entry";
    row.innerHTML=unique.length?unique.map(x=>'<strong>'+x.word+'</strong>').join(", "):"No words";
    if(E.spinHistory.textContent==="No spins yet")E.spinHistory.innerHTML="";
    E.spinHistory.prepend(row);
    while(E.spinHistory.children.length>8)E.spinHistory.lastChild.remove();
  }
}

function evalWin(){
  let win=0, words=[], flowers=0, calls=0, royal=0, winLines=[], premiumHit=false, queenTriggered=false;
  const active=PAYLINES.slice(0,S.lines);

  active.forEach((line,lineIndex)=>{
    const tiles=line.map(([r,c])=>S.grid[r][c]);
    const ids=tiles.map(t=>t.id);
    const lineText=ids.join("");
    let lineWon=false;

    if(lineText==="WORD"||lineText==="PLAY"){
      win+=lineBet()*100;
      words.push(lineText);
      premiumHit=true;
      lineWon=true;
    }else if(lineText==="LOVE"||lineText==="MATT"){
      win+=lineBet()*40;
      words.push(lineText);
      lineWon=true;
    }else if(approved4.has(lineText)){
      win+=lineBet()*12;
      words.push(lineText);
      lineWon=true;
    }else{
      const first3=ids.slice(0,3).join("");
      const first2=ids.slice(0,2).join("");
      const fourthIsLetter=ids[3] && ids[3].length===1;

      if(approved3.has(first3) && !fourthIsLetter){
        win+=lineBet()*5;
        words.push(first3);
        lineWon=true;
      }else if(approved2.has(first2) && !(ids[2] && ids[2].length===1)){
        win+=lineBet()*1;
        words.push(first2);
        lineWon=true;
      }
    }

    if(ids.every(x=>x===ids[0])){
      win+=lineBet()*25;
      lineWon=true;
    }

    if(lineWon)winLines.push({index:lineIndex,line});
  });


  const lineWords=[...words];
  const snakeWords=findSnakeWords();
  snakeWords.forEach(item=>{
    win+=lineBet()*item.pay.mult;
    words.push(item.word);
  });

  S.grid.flat().forEach(t=>{
    const id=t.id;
    if(id==="ROSE"||id==="BOUQUET")flowers++;
    if(id==="CALL")calls++;
    if(["CROWN","LIONESS","MJ"].includes(id))royal++;
  });

  if(words.length){updateFoundWords(words);S.favor=Math.min(100,S.favor+6*words.length)}
  if(flowers)S.bouquet=Math.min(12,S.bouquet+flowers);
  if(royal)S.favor=Math.min(100,S.favor+4*royal);
  if(calls>=2||S.bouquet>=12||S.favor>=100){queenTriggered=true;win+=queenBonus();S.bouquet=0;S.favor=Math.max(0,S.favor-55)}
  updateFoundWords([]); unlocks(); ui(); mark(winLines); updateSpinLog(snakeWords,lineWords); requestAnimationFrame(()=>{draw(winLines); drawSnakeWords(snakeWords);});
  E.win.textContent="WIN "+money(win);
  if(win>0){
    const bigThreshold = totalBet()*OP.chaos;
    const isBigWin = queenTriggered || premiumHit || win >= bigThreshold;
    if(isBigWin){
      playSample("sBig");
      showBigWinToast("BIG WIN!", (words.length?[...new Set(words)].join(", ")+" paid ":"Kim's machine pays ")+money(win));
    }else{
      chime();
    }
  }
  S.spin=false; E.spin.classList.add("ready"); if(S.auto && !E.toast.classList.contains("show"))queueAuto();
}
function queenBonus(){let p=Math.random(),label="Scepter",m=35+Math.floor(Math.random()*35);if(p>.42){label="Crown";m=75+Math.floor(Math.random()*55)}if(p>.82){label="Matthew & James";m=150+Math.floor(Math.random()*101)}playSample("sQueen");toast("Queen Bonus!",label+" awards "+m+"x total bet.");return totalBet()*m}
function unlocks(){S.lines=S.words>=15?10:S.words>=5?8:4}
function ui(){
  E.words.textContent=S.words;E.lines.textContent=S.lines;E.bouquet.textContent=S.bouquet;E.favor.textContent=S.favor;E.bet.textContent="BET "+money(lineBet());
  E.wordBar.style.width=Math.min(100,S.words/25*100)+"%";E.lineBar.style.width=((S.lines-4)/6*100)+"%";E.bouquetBar.style.width=S.bouquet/12*100+"%";E.favorBar.style.width=S.favor+"%";
  E.unlock.textContent=S.words<5?"Spell "+(5-S.words)+" more words to unlock 8 lines.":S.words<15?"Spell "+(15-S.words)+" more words to unlock 10 lines.":S.words<25?"Keep spelling to build the bonus.":"All features are open.";
  E.cab.classList.toggle("bloom1",S.words>=5);E.cab.classList.toggle("bloom2",S.words>=15);E.cab.classList.toggle("bloom3",S.words>=25);
}

function makeSparkBurst(frame){
  const rect=frame.getBoundingClientRect();
  for(let i=0;i<12;i++){
    const s=document.createElement("div");
    s.className="spark-burst";
    s.style.left=(rect.width/2)+"px";
    s.style.top=(rect.height/2)+"px";
    const angle=(Math.PI*2*i/22)+(Math.random()*.35);
    const dist=70+Math.random()*150;
    s.style.setProperty("--dx",Math.cos(angle)*dist+"px");
    s.style.setProperty("--dy",Math.sin(angle)*dist+"px");
    frame.appendChild(s);
    setTimeout(()=>s.remove(),850);
  }
}

function tileCenterInFrame(tile, frame){
  const x = tile.offsetLeft + tile.offsetWidth / 2;
  const y = tile.offsetTop + tile.offsetHeight / 2;
  return {x,y};
}
function setupOverlaySvg(){
  const frame=document.getElementById("reelFrame");
  const w=frame.clientWidth;
  const h=frame.clientHeight;
  E.svg.setAttribute("viewBox","0 0 "+w+" "+h);
  E.svg.setAttribute("width",w);
  E.svg.setAttribute("height",h);
  E.svg.style.width=w+"px";
  E.svg.style.height=h+"px";
  return frame;
}
function draw(winLines){
  E.svg.innerHTML="";
  const frame=setupOverlaySvg();
  frame.classList.remove("win-flash");
  E.cab.classList.remove("win-glow");
  if(!winLines.length)return;

  winLines.slice(0,6).forEach(item=>{
    const points=[];
    item.line.forEach(([r,c])=>{
      const tile=reels[c] && reels[c].strip ? reels[c].strip.children[r] : null;
      if(!tile)return;
      points.push(tileCenterInFrame(tile,frame));
    });
    if(points.length<2)return;
    const d=points.map((p,i)=>(i===0?"M ":"L ")+p.x+" "+p.y).join(" ");
    const path=document.createElementNS("http://www.w3.org/2000/svg","path");
    path.setAttribute("class","payline-path");
    path.setAttribute("d",d);
    E.svg.appendChild(path);
  });

  frame.classList.add("win-flash");
  E.cab.classList.add("win-glow");
  /* mobile-lite: spark burst disabled */
}
function mark(winLines){winLines.forEach(item=>item.line.forEach(([r,c])=>{let t=reels[c].strip.children[r];if(t)t.classList.add("winTile")}))}
function toast(a,b){
  E.toastH.textContent=a;
  E.toastP.textContent=b;
  E.toast.classList.add("show");
  const btn=document.getElementById("toastContinue");
  if(btn){
    btn.focus({preventScroll:true});
    btn.onclick=()=>{E.toast.classList.remove("show"); stopBigWinChaos(); if(S.auto && !S.spin) queueAuto();};
  }
}
function setBet(d){S.bet=Math.max(0,Math.min(bets.length-1,S.bet+d));ui()}
function toggleAuto(){
  const countEl=document.getElementById("autoCount");
  if(S.auto){
    S.auto=false;
    S.autoRemaining=0;
  }else{
    S.auto=true;
    S.autoRemaining=countEl ? Number(countEl.value || 10) : 10;
  }
  $("autoBtn").textContent=S.auto ? (S.autoRemaining ? "AUTO "+S.autoRemaining : "AUTO ∞") : "AUTO OFF";
  if(S.auto && !S.spin)queueAuto();
  if(!S.auto)clearTimeout(autoTimer);
}
function queueAuto(){
  clearTimeout(autoTimer);
  if(!S.auto)return;
  autoTimer=setTimeout(()=>{
    if(S.auto && !S.spin){
      if(S.autoRemaining>0){
        S.autoRemaining--;
        $("autoBtn").textContent=S.autoRemaining ? "AUTO "+S.autoRemaining : "AUTO OFF";
        if(S.autoRemaining<=0){
          S.auto=false;
          $("autoBtn").textContent="AUTO OFF";
          return;
        }
      }
      spin();
    }
  },OP.autoDelay);
}
function toggleSound(){S.sound=!S.sound;$("soundBtn").textContent=S.sound?"SOUND ON":"SOUND OFF";if(S.sound)playSample("sClick");}
function audioInit(){if(!audio)audio=new (window.AudioContext||window.webkitAudioContext)()}
function tone(f,d,g){if(!S.sound)return;try{audioInit();let o=audio.createOscillator(),a=audio.createGain();o.frequency.value=f;a.gain.value=g;o.connect(a);a.connect(audio.destination);o.start();a.gain.exponentialRampToValueAtTime(.0001,audio.currentTime+d);o.stop(audio.currentTime+d)}catch(e){}}
function chime(){playSample("sSmall");tone(440,.08,.04);setTimeout(()=>tone(660,.08,.04),95);setTimeout(()=>tone(880,.1,.035),190)}


function bg(){
  return document.getElementById("bgMusic");
}

function setMusicVolume(){
  const b=bg();
  const v=document.getElementById("musicVol");
  if(b && v) b.volume = Number(v.value || 28) / 100;
}

function startMusic(){
  const b=bg();
  if(!b || !S.music) return;
  setMusicVolume();
  try{ b.play().catch(()=>{}); }catch(e){} updateMiniPlayer();
}

function toggleMusic(){
  S.music=!S.music;
  const b=bg();
  const btn=document.getElementById("musicBtn");
  if(btn) btn.textContent=S.music ? "MUSIC ON" : "MUSIC OFF";
  if(b){
    if(S.music) startMusic();
    else b.pause();
  }
  playSample("sClick");
  updateMiniPlayer();
}

function playSample(id){
  if(!S.sound) return;
  const a=document.getElementById(id);
  if(!a) return;
  try{
    a.currentTime=0;
    a.play().catch(()=>{});
  }catch(e){}
}

document.addEventListener("click",(e)=>{
  const help=E.help;
  const info=document.getElementById("infoBtn");
  if(help && help.classList.contains("show")){
    if(!help.contains(e.target) && e.target!==info){
      help.classList.remove("show");
    }
  }
}, true);


function ensureFoundSet(){
  if(!S.found || typeof S.found.add!=="function") S.found=new Set();
}
function renderDictionary(){
  ensureFoundSet();
  const d2=document.getElementById("dict2");
  const d3=document.getElementById("dict3");
  if(!d2 || !d3)return;
  d2.innerHTML=[...approved2].sort().map(w=>'<span class="dict-word '+(S.found.has(w)?"found":"")+'">'+w+'</span>').join("");
  const longWords=[...new Set([...approved3,...approved4,"LOVE","MATT","WORD","PLAY"])].sort();
  d3.innerHTML=longWords.map(w=>'<span class="dict-word '+(S.found.has(w)?"found":"")+'">'+w+'</span>').join("");
}
function showWords(){
  renderDictionary();
  const modal=document.getElementById("wordModal");
  if(modal)modal.classList.add("show");
}
function hideWords(){
  const modal=document.getElementById("wordModal");
  if(modal)modal.classList.remove("show");
}
function updateFoundWords(words){
  ensureFoundSet();
  if(words && words.length){words.forEach(w=>S.found.add(w));S.words=S.found.size;}
  const totalWords=approved2.size+approved3.size+approved4.size+4;
  const pct=Math.min(100,Math.round((S.found.size/totalWords)*100));
  const overallBar=document.getElementById("overallBar");
  const overallText=document.getElementById("overallText");
  const foundWords=document.getElementById("foundWords");
  if(overallBar)overallBar.style.width=pct+"%";
  if(overallText)overallText.textContent=pct+"% complete • "+S.found.size+" words found";
  if(foundWords)foundWords.textContent=S.found.size?[...S.found].sort().join(", "):"None yet";
  renderDictionary();
}


function openOperator(){
  syncOperatorUI();
  const p=$("operatorPanel");
  if(p){p.classList.add("show");p.setAttribute("aria-hidden","false")}
}
function closeOperator(){
  const p=$("operatorPanel");
  if(p){p.classList.remove("show");p.setAttribute("aria-hidden","true")}
}
function setOperatorStatus(msg){
  const s=$("opStatus");
  if(s)s.textContent=msg;
}
function syncOperatorUI(){
  const map={
    opMode:OP.mode,
    opWordChance:OP.wordChance,
    opPremium:OP.premium,
    opQueenEase:OP.queenEase,
    opQueenMin:OP.queenMin,
    opQueenMax:OP.queenMax,
    opChaos:OP.chaos,
    opAutoDelay:OP.autoDelay
  };
  Object.entries(map).forEach(([id,val])=>{const el=$(id);if(el)el.value=val});
  updateOperatorLabels();
}
function readOperatorUI(){
  OP.mode=$("opMode")?.value || "custom";
  OP.wordChance=Number($("opWordChance")?.value || OP.wordChance);
  OP.premium=Number($("opPremium")?.value || OP.premium);
  OP.queenEase=Number($("opQueenEase")?.value || OP.queenEase);
  OP.queenMin=Number($("opQueenMin")?.value || OP.queenMin);
  OP.queenMax=Number($("opQueenMax")?.value || OP.queenMax);
  OP.chaos=Number($("opChaos")?.value || OP.chaos);
  OP.autoDelay=Number($("opAutoDelay")?.value || OP.autoDelay);
  updateOperatorLabels();
}
function updateOperatorLabels(){
  const labels=[
    ["opWordChanceVal",OP.wordChance+"%"],
    ["opPremiumVal",OP.premium+"%"],
    ["opQueenEaseVal",OP.queenEase+"%"],
    ["opQueenMinVal",OP.queenMin+"x"],
    ["opQueenMaxVal",OP.queenMax+"x"],
    ["opChaosVal",OP.chaos+"x"],
    ["opAutoDelayVal",OP.autoDelay+"ms"]
  ];
  labels.forEach(([id,val])=>{const el=$(id);if(el)el.textContent=val});
}
function applyOperatorMode(){
  const mode=$("opMode")?.value || "standard";
  if(mode!=="custom" && OP_MODES[mode]){
    OP={...OP,...OP_MODES[mode],mode};
    syncOperatorUI();
  }else{
    readOperatorUI();
  }
  setOperatorStatus("Applied: "+OP.mode+" mode.");
}
function bindOperator(){
  loadOperator();
  syncOperatorUI();
  const ids=["opWordChance","opPremium","opQueenEase","opQueenMin","opQueenMax","opChaos","opAutoDelay"];
  ids.forEach(id=>{
    const el=$(id);
    if(el)el.addEventListener("input",()=>{OP.mode="custom";const mode=$("opMode");if(mode)mode.value="custom";readOperatorUI();});
  });
  const mode=$("opMode");
  if(mode)mode.addEventListener("change",applyOperatorMode);
  const apply=$("opApply"); if(apply)apply.onclick=()=>{readOperatorUI();setOperatorStatus("Applied custom settings.");};
  const save=$("opSave"); if(save)save.onclick=()=>{readOperatorUI();saveOperator();setOperatorStatus("Saved settings on this browser.");};
  const reset=$("opReset"); if(reset)reset.onclick=()=>{OP={...DEFAULT_OPERATOR};saveOperator();syncOperatorUI();setOperatorStatus("Settings reset.");};
  const clear=$("opClearProgress"); if(clear)clear.onclick=()=>{S.found=new Set();S.words=0;S.bouquet=0;S.favor=0;updateFoundWords([]);unlocks();ui();setOperatorStatus("Progress cleared.");};
  const close=$("opClose"); if(close)close.onclick=closeOperator;
  const panel=$("operatorPanel"); if(panel)panel.addEventListener("click",e=>{if(e.target===panel)closeOperator();});
}


function updateMiniPlayer(){
  const bgm=bg();
  const bars=document.getElementById("miniBars");
  const play=document.getElementById("miniPlay");
  const mute=document.getElementById("miniMute");
  const box=document.getElementById("miniPlayer");
  const isPlaying=bgm && !bgm.paused && S.music;
  if(bars)bars.classList.toggle("playing",!!isPlaying);
  if(play)play.textContent=isPlaying?"PAUSE":"PLAY";
  if(mute)mute.textContent=S.music?"MUTE":"MUTED";
  if(box)box.classList.toggle("off",!S.music);
}
function toggleMiniPlay(){
  const b=bg();
  if(!b)return;
  if(b.paused || !S.music){
    S.music=true;
    const mb=document.getElementById("musicBtn");
    if(mb)mb.textContent="MUSIC ON";
    startMusic();
  }else{
    b.pause();
  }
  playSample("sClick");
  updateMiniPlayer();
}
function toggleMiniMute(){
  toggleMusic();
  updateMiniPlayer();
}

function bind(){
  E.spin.onclick=spin;$("betUp").onclick=()=>setBet(1);$("betDown").onclick=()=>setBet(-1);$("autoBtn").onclick=toggleAuto;$("soundBtn").onclick=toggleSound; const autoCount=document.getElementById("autoCount"); if(autoCount)autoCount.onchange=()=>{if(S.auto){S.auto=false;toggleAuto();}};
  const miniPlay=document.getElementById("miniPlay"); if(miniPlay)miniPlay.onclick=toggleMiniPlay;
  const miniMute=document.getElementById("miniMute"); if(miniMute)miniMute.onclick=toggleMiniMute;
  const musicBtn=document.getElementById("musicBtn"); if(musicBtn) musicBtn.onclick=toggleMusic; const musicVol=document.getElementById("musicVol"); if(musicVol) musicVol.oninput=setMusicVolume;$("infoBtn").onclick=(e)=>{e.stopPropagation();E.help.classList.toggle("show");playSample("sClick");};
  const wordsBtn=document.getElementById("wordsBtn"); if(wordsBtn)wordsBtn.onclick=showWords;
  const wordClose=document.getElementById("wordClose"); if(wordClose)wordClose.onclick=hideWords;
  document.addEventListener("pointerdown",()=>{if(audio&&audio.state==="suspended")audio.resume()},{passive:true});
  document.addEventListener("keydown",e=>{if(["Space","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault();if(e.code==="Space")spin();if(e.code==="ArrowRight")setBet(1);if(e.code==="ArrowLeft")setBet(-1);if(e.key.toLowerCase()==="a")toggleAuto();if(e.key.toLowerCase()==="s")toggleSound();if(e.shiftKey && e.altKey && e.key.toLowerCase()==="m"){e.preventDefault();openOperator();return;}if(e.key.toLowerCase()==="m")toggleMusic();if(e.key.toLowerCase()==="i")E.help.classList.toggle("show");if(e.key.toLowerCase()==="w")showWords();if(e.code==="Escape")closeOperator()});
  window.addEventListener("resize",()=>{E.svg.innerHTML=""; setupOverlaySvg();},{passive:true});
}
runSplash();
document.addEventListener("keydown",e=>{
  const splash=document.getElementById("splash");
  const enter=document.getElementById("splashEnter");
  if(splash && !splash.classList.contains("hide")){
    if(enter && enter.style.display!=="none" && (e.code==="Enter" || e.code==="Space")){
      e.preventDefault();
      enter.click();
    }else if(e.code==="Space"){
      e.preventDefault();
    }
    return;
  }
  if(E.toast.classList.contains("show") && (e.code==="Enter" || e.code==="Space" || e.code==="Escape")){
    e.preventDefault();
    const btn=document.getElementById("toastContinue");
    if(btn) btn.click();
  }
}, true);


document.addEventListener("click",(e)=>{
  const wordModal=document.getElementById("wordModal");
  const wordsBtn=document.getElementById("wordsBtn");
  if(wordModal && wordModal.classList.contains("show")){
    if(!wordModal.contains(e.target) && e.target!==wordsBtn){
      wordModal.classList.remove("show");
    }
  }
}, true);

bindOperator();fx();build();ui();bind();updateMiniPlayer();updateFoundWords([]);toast("Made for Kim","Tap SPIN to play.");
