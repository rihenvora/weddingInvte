const legacyBackTop = document.getElementById("backTop");

const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
let opened=false;

/* One curtain controller only. Body is physically fixed before opening,
   so wheel/touch/trackpad cannot move the document underneath the curtain. */
(function(){
 const landing=document.getElementById("landing");
 const openButtons=[document.getElementById("openInvitationFinal"),document.getElementById("openBtn")].filter(Boolean);
 const audio=document.getElementById("music");
 const musicBtn=document.getElementById("musicBtn");
 let leftTop=false;

 function lockCurtain(){
   opened=false; leftTop=false;
   landing.classList.remove("open");
   document.documentElement.classList.add("curtainLocked");
   document.body.classList.add("closed","curtainLocked");
   document.body.style.position="fixed";
   document.body.style.top="0";
   document.body.style.left="0";
   document.body.style.right="0";
   document.body.style.width="100%";
   window.scrollTo(0,0);
 }

 function unlockCurtain(){
   opened=true;
   landing.classList.add("open");
   document.documentElement.classList.remove("curtainLocked");
   document.body.classList.remove("closed","curtainLocked");
   document.body.style.position="";
   document.body.style.top="";
   document.body.style.left="";
   document.body.style.right="";
   document.body.style.width="";
   window.scrollTo(0,0);
 }

 async function startAudio(){
   if(!audio)return;
   audio.loop=true; audio.preload="auto";
   try{await audio.play(); if(musicBtn)musicBtn.textContent="Ⅱ";}catch(e){}
 }

 async function openInvitation(e){
   if(e){e.preventDefault();e.stopImmediatePropagation();}
   unlockCurtain();
   await startAudio();
   // Keep the opened Rihen weds Meghana hero on screen.
   // The visitor explicitly enters Divine Blessings using the Continue button.
   window.scrollTo(0,0);
 }

 openButtons.forEach(b=>b.addEventListener("click",openInvitation,true));

 const heroContinue=document.getElementById("heroContinue");
 if(heroContinue) heroContinue.addEventListener("click",e=>{
   e.preventDefault(); e.stopPropagation();
   if(!opened) return;
   const gods=document.querySelector('#main > .walk.gods');
   if(gods) gods.scrollIntoView({behavior:'smooth',block:'start'});
 },true);

 if(musicBtn) musicBtn.addEventListener("click",async function(e){
   e.preventDefault();
   if(!audio)return;
   if(audio.paused){await startAudio();}
   else{audio.pause();musicBtn.textContent="\u266b";}
 });

 /* Best effort autoplay from the curtain. Browsers may block audible autoplay
    until Open Invitation is pressed. */
 window.addEventListener("load",startAudio,{once:true});

 /* Belt-and-suspenders input lock. */
 ["wheel","touchmove"].forEach(type=>window.addEventListener(type,e=>{
   if(!opened){e.preventDefault();e.stopPropagation();}
 },{passive:false,capture:true}));
 window.addEventListener("keydown",e=>{
   if(!opened && ["ArrowDown","ArrowUp","PageDown","PageUp"," ","End","Home"].includes(e.key)){
     e.preventDefault();e.stopPropagation();
   }
 },true);

 window.addEventListener("scroll",()=>{
   // IMPORTANT: never re-lock the curtain merely because scrollY becomes 0.
   // The Gods modal intentionally fixes <body>, which can temporarily report
   // scrollY=0; the old code interpreted that as "back at the beginning" and
   // bounced the visitor back to the curtain.
   if(!opened){window.scrollTo(0,0);return;}
   if(window.scrollY>100) leftTop=true;
   // With the Gods section no longer using a fixed/body lock, scrollY=0 now
   // genuinely means the visitor returned to the opening. Restore the closed
   // curtain and gate until OPEN THE INVITATION is pressed again.
   if(opened && leftTop && window.scrollY<=2){
     lockCurtain();
     return;
   }
   if(typeof walk==="function") walk();
 },{passive:true});

 const back=document.getElementById("backToBeginning")||document.getElementById("backTop");
 if(back)back.addEventListener("click",e=>{
   e.preventDefault();
   leftTop=true;
   window.scrollTo({top:0,behavior:"smooth"});
 },true);

 lockCurtain();
})();

function walk(){
  /* Gods and mobile invite are controlled by the final deterministic controller below.
     No scroll-progress transforms are applied here. */
}
const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle("show",e.isIntersecting)),{threshold:.15});$$(".reveal").forEach(e=>io.observe(e));
$("#wa").href="https://wa.me/917977500797?text="+encodeURIComponent("Hello! We would love to RSVP for Rihen & Meghana's wedding.");
const c=$("#scratch"),x=c.getContext("2d",{willReadFrequently:true});
let scratchReady=false, down=false, scratchMoves=0, lastCheck=0;

function initScratch(){
  const d=window.devicePixelRatio||1;
  const w=c.clientWidth,h=c.clientHeight;
  c.width=Math.max(1,Math.round(w*d));
  c.height=Math.max(1,Math.round(h*d));
  x.setTransform(d,0,0,d,0,0);

  const g=x.createLinearGradient(0,0,w,h);
  g.addColorStop(0,"#8e623c");
  g.addColorStop(.25,"#e4c17e");
  g.addColorStop(.5,"#9d6d40");
  g.addColorStop(.75,"#efd99e");
  g.addColorStop(1,"#8d6039");

  x.globalCompositeOperation="source-over";
  x.fillStyle=g;
  x.fillRect(0,0,w,h);

  x.fillStyle="#5e4436";
  x.font="16px serif";
  x.textAlign="center";
  x.textBaseline="middle";
  x.fillText("✦  SCRATCH TO REVEAL  ✦",w/2,h/2);

  x.globalCompositeOperation="destination-out";
}

function revealAfterScratch(){
  if(scratchReady)return;
  scratchReady=true;

  const wrap=document.querySelector(".scratchWrap");
  if(!wrap)return;

  /*
   * Keep the scratch interaction as the ONLY manual part.
   * Once enough of the heart has been scratched, the existing
   * celebration animation takes over automatically.
   */
  wrap.classList.add("autoDone");

  // Let the CSS celebration play; then remove the scratch layer.
  setTimeout(()=>{
    c.style.transition="opacity .55s ease";
    c.style.opacity="0";
  },180);

  setTimeout(()=>{
    c.style.pointerEvents="none";
  },800);
}

function scratchProgress(){
  if(scratchReady)return;

  const now=performance.now();
  if(now-lastCheck<180)return;
  lastCheck=now;

  const w=c.width,h=c.height;
  // Sample the canvas rather than reading every pixel.
  const sampleW=Math.min(180,w);
  const sampleH=Math.min(180,h);
  const data=x.getImageData(
    Math.max(0,(w-sampleW)/2),
    Math.max(0,(h-sampleH)/2),
    sampleW,
    sampleH
  ).data;

  let transparent=0,total=0;
  for(let i=3;i<data.length;i+=16){
    total++;
    if(data[i]<45)transparent++;
  }

  // About 30% scratched is enough; the rest of the reveal is animated.
  if(total && transparent/total>=0.30) revealAfterScratch();
}

function scratch(e){
  if(!down||scratchReady)return;

  const r=c.getBoundingClientRect();
  const px=e.clientX-r.left;
  const py=e.clientY-r.top;

  x.beginPath();
  x.arc(px,py,30,0,Math.PI*2);
  x.fill();

  scratchMoves++;
  if(scratchMoves%4===0)scratchProgress();
}

initScratch();

c.addEventListener("pointerdown",e=>{
  if(scratchReady)return;
  down=true;
  try{c.setPointerCapture(e.pointerId)}catch(_){}
  scratch(e);
});

c.addEventListener("pointermove",scratch);

c.addEventListener("pointerup",()=>{
  down=false;
  scratchProgress();
});

c.addEventListener("pointercancel",()=>{
  down=false;
  scratchProgress();
});

window.addEventListener("resize",()=>{
  if(!scratchReady)initScratch();
});

for(let i=0;i<28;i++){let q=document.createElement("i");q.className="spark";q.style.left=Math.random()*100+"%";q.style.animationDuration=5+Math.random()*7+"s";q.style.animationDelay=-Math.random()*8+"s";$("#sparks").appendChild(q)}
if(legacyBackTop) legacyBackTop.onclick=()=>{scrollTo({top:0,behavior:"smooth"});setTimeout(closeLanding,700)};
/* Full heart celebration after scratch auto-completion */
(function(){
  const wrap=document.querySelector(".scratchWrap"), field=document.querySelector("#heartBurst");
  if(!wrap||!field)return;
  let fired=false;
  function hearts(){
    if(fired)return; fired=true;
    const palette=["#a95e66","#c7827f","#d7a06e","#8f5a62","#e0b38b"];
    for(let i=0;i<46;i++){
      const h=document.createElement("span");
      h.className="flyingHeart"; h.textContent=i%5===0?"\u2661":"\u2665";
      const angle=(Math.PI*2*i/46)+(Math.random()-.5)*.28;
      const dist=90+Math.random()*270;
      h.style.setProperty("--x",Math.cos(angle)*dist+"px");
      h.style.setProperty("--y",Math.sin(angle)*dist+"px");
      h.style.setProperty("--r",(-100+Math.random()*200)+"deg");
      h.style.setProperty("--s",(12+Math.random()*27)+"px");
      h.style.setProperty("--d",(1.25+Math.random()*1.25)+"s");
      h.style.setProperty("--delay",(Math.random()*.22)+"s");
      h.style.setProperty("--c",palette[i%palette.length]);
      field.appendChild(h);
    }
    setTimeout(()=>field.replaceChildren(),3000);
  }
  new MutationObserver(()=>{
    if(wrap.classList.contains("autoDone")||wrap.classList.contains("done")) hearts();
  }).observe(wrap,{attributes:true,attributeFilter:["class"]});
})();

/* Extra celebratory hearts after the date is revealed. */
(function(){
 const wrap=document.querySelector(".scratchWrap");
 const burst=document.querySelector("#heartBurst");
 if(!wrap||!burst)return;
 const obs=new MutationObserver(()=>{
   if(!wrap.classList.contains("autoDone") || burst.dataset.fullBurst==="1")return;
   burst.dataset.fullBurst="1";
   const chars=["\u2661","\u2665","\u2661","\u2665","\u2661"];
   for(let i=0;i<42;i++){
     const h=document.createElement("i");
     h.textContent=chars[i%chars.length];
     h.style.setProperty("--x",(Math.random()*360-180)+"px");
     h.style.setProperty("--y",(-80-Math.random()*230)+"px");
     h.style.setProperty("--r",(Math.random()*100-50)+"deg");
     h.style.left=(35+Math.random()*30)+"%";
     h.style.top=(48+Math.random()*12)+"%";
     h.style.animationDelay=(Math.random()*.35)+"s";
     burst.appendChild(h);
   }
 });
 obs.observe(wrap,{attributes:true,attributeFilter:["class"]});
})();


/* responsive canvas + scroll animation refresh */
let responsiveResizeTimer;
addEventListener("resize",()=>{
  clearTimeout(responsiveResizeTimer);
  responsiveResizeTimer=setTimeout(()=>{
    if(document.querySelector("#scratch") && !document.querySelector(".scratchWrap.autoDone")) initScratch();
    try{ walk(); }catch(e){}
  },160);
},{passive:true});

/* definitive Back to Beginning / Back to Top handler */
(function(){
 const buttons=[
   document.getElementById("backToBeginning"),
   document.getElementById("backTop"),
   ...document.querySelectorAll(".backToBeginning,.backTop,[data-back-top]")
 ].filter(Boolean);
 [...new Set(buttons)].forEach(btn=>{
   btn.addEventListener("click",function(e){
     e.preventDefault(); e.stopPropagation();
     window.scrollTo({top:0,left:0,behavior:"smooth"});
   },true);
 });
})();

/* ===== FINAL MOBILE NAV / BACK TO BEGINNING FIX ===== */
(function(){
  function backToBeginning(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    try {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0,0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      /* restore curtain/gate state when returning to beginning */
      const gate = document.getElementById("gate");
      if (gate) gate.classList.remove("open");
      document.body.classList.remove("invitation-open");
      document.documentElement.classList.remove("invitation-open");

      /* keep page locked at curtain until OPEN is clicked again */
      if (gate) {
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
      }

      requestAnimationFrame(()=>{
        window.scrollTo(0,0);
        setTimeout(()=>window.scrollTo(0,0),60);
        setTimeout(()=>window.scrollTo(0,0),180);
      });
    } catch(err) {
      window.scrollTo(0,0);
    }
  }

  document.addEventListener("click", function(e){
    const t=e.target.closest(
      "#backTop,#backToBeginning,.backTop,.backToBeginning,[data-back-top],a[href='#top'],a[href='#gate']"
    );
    if(t) backToBeginning(e);
  }, true);
})();

/* legacy gods controller disabled */
if(false){
/* ===== FINAL GODS CONTROLLER — DEVICE SAFE ===== */
(function(){
  const section=document.querySelector('.walk.gods');
  if(!section)return;
  const cards=[...section.querySelectorAll('.god')].slice(0,3);
  const btn=section.querySelector('.godsNextBtn');
  if(cards.length!==3||!btn)return;

  let step=0, active=false, done=false, busy=false;

  function render(i){
    step=i;
    cards.forEach((card,n)=>{
      card.classList.remove('godStepActive','godStepLeaving');
      if(n===i)card.classList.add('godStepActive');
    });
    const label=btn.querySelector('span');
    if(label)label.textContent=i===cards.length-1?'CONTINUE':'NEXT';
    btn.classList.add('show');
  }

  function activate(){
    if(active||done)return;
    active=true;
    section.classList.add('godsSequenceActive');
    render(0);
  }

  function release(){
    active=false;
    section.classList.remove('godsSequenceActive');
  }

  function finish(){
    if(busy)return;
    busy=true;
    cards[step].classList.remove('godStepActive');
    cards[step].classList.add('godStepLeaving');
    btn.classList.remove('show');
    done=true;
    release();
    requestAnimationFrame(()=>requestAnimationFrame(()=>{
      const next=section.nextElementSibling;
      if(next) next.scrollIntoView({block:'start',behavior:'smooth'});
      busy=false;
    }));
  }

  btn.addEventListener('click',e=>{
    e.preventDefault(); e.stopPropagation();
    if(!active||busy)return;
    if(step===cards.length-1){finish();return;}
    busy=true;
    const old=cards[step];
    old.classList.remove('godStepActive');
    old.classList.add('godStepLeaving');
    setTimeout(()=>{render(step+1);busy=false},360);
  },true);

  // While the blessing scene is active, only its NEXT/CONTINUE button advances it.
  const stop=e=>{if(active){e.preventDefault();e.stopPropagation()}};
  window.addEventListener('wheel',stop,{passive:false,capture:true});
  window.addEventListener('touchmove',stop,{passive:false,capture:true});
  window.addEventListener('keydown',e=>{
    if(active&&['ArrowDown','ArrowUp','PageDown','PageUp',' ','Home','End'].includes(e.key)){
      e.preventDefault();e.stopPropagation();
    }
  },true);

  const observer=new IntersectionObserver(entries=>{
    for(const entry of entries){
      if(!done&&!active&&entry.isIntersecting&&entry.intersectionRatio>=0.55){
        activate(); break;
      }
    }
  },{threshold:[0,.55,1]});
  observer.observe(section);

  // Never leave stale page-wide locks behind.
  document.documentElement.classList.remove('godsSequenceLocked');
  document.body.classList.remove('godsSequenceLocked');
  window.addEventListener('pageshow',()=>{
    document.documentElement.classList.remove('godsSequenceLocked');
    document.body.classList.remove('godsSequenceLocked');
  });
})();



}
/* ===== GODS SEQUENCE — NO PAGE LOCK ===== */
(function(){
  const main=document.getElementById('main');
  const gods=main && main.querySelector('.walk.gods');
  if(!main || !gods) return;

  const sections=[...main.querySelectorAll(':scope > section')];
  const cards=[...gods.querySelectorAll('.god')].slice(0,3);
  const invite=main.querySelector('.walk.invite');
  let btn=gods.querySelector('.godsNextBtn');
  let step=0, busy=false;

  // Permanently remove every old lock state from previous builds.
  const clearGodLocks=()=>{
    document.documentElement.classList.remove('godsHardLocked','godsSequenceLocked');
    document.body.classList.remove('godsHardLocked','godsSequenceLocked');
    gods.classList.remove('godsSequenceActive');
    if(document.body.style.position==='fixed' && !document.body.classList.contains('curtainLocked')){
      document.body.style.position=''; document.body.style.top='';
      document.body.style.left=''; document.body.style.right=''; document.body.style.width='';
    }
  };
  clearGodLocks();

  if(btn){ const fresh=btn.cloneNode(true); btn.replaceWith(fresh); btn=fresh; }

  function render(n){
    step=Math.max(0,Math.min(cards.length-1,n));
    cards.forEach((card,i)=>{
      card.classList.remove('godStepActive','godStepLeaving');
      if(i===step) card.classList.add('godStepActive');
    });
    if(btn){
      const label=btn.querySelector('span');
      if(label) label.textContent=step===cards.length-1?'CONTINUE':'NEXT';
      btn.classList.add('show');
    }
  }
  render(0);

  if(btn) btn.addEventListener('click',e=>{
    e.preventDefault(); e.stopPropagation();
    clearGodLocks();
    if(busy) return;
    if(step < cards.length-1){
      busy=true;
      const old=cards[step];
      old.classList.remove('godStepActive'); old.classList.add('godStepLeaving');
      btn.classList.remove('show');
      setTimeout(()=>{ render(step+1); busy=false; },420);
    } else {
      // No observer and no lock: final Continue always leaves Gods exactly once.
      cards.forEach(c=>c.classList.remove('godStepActive','godStepLeaving'));
      if(invite) invite.scrollIntoView({behavior:'smooth',block:'start'});
    }
  },true);

  // If the visitor scrolls back to Gods later, start again at Ganesh Ji,
  // but NEVER capture/fix/lock the page.
  let wasVisible=false;
  const observer=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting && !wasVisible){ clearGodLocks(); render(0); }
      wasVisible=entry.isIntersecting;
    });
  },{threshold:.25});
  observer.observe(gods);

  // Continue buttons on ordinary sections remain navigation aids only.
  sections.forEach((sec,i)=>{
    if(sec===gods || i===sections.length-1) return;
    sec.querySelectorAll(':scope > .sectionContinue').forEach(x=>x.remove());
    const b=document.createElement('button');
    b.type='button'; b.className='sectionContinue'; b.innerHTML='<span>CONTINUE</span><b>↓</b>';
    b.addEventListener('click',()=>{
      clearGodLocks();
      const next=sections[i+1];
      if(next) next.scrollIntoView({behavior:'smooth',block:'start'});
    });
    sec.appendChild(b);
  });

  window.addEventListener('pageshow',clearGodLocks);
  window.addEventListener('resize',clearGodLocks,{passive:true});
})();

/* ===== GODS ENTRY NOTE =====
   Entry is intentionally handled only by openInvitation() above.
   Keeping a second click/scroll controller here caused competing scrolls. */



/* =========================================================
   OUR LITTLE WORLD — ELASTIC INFINITE CAROUSEL
   ========================================================= */
(function(){
  function boot(){
  return; // Native scroll carousel below is the only active gallery controller.
  const gallery=document.querySelector(".gallery");
  const track=document.getElementById("track");
  if(!gallery || !track || track.dataset.crispCarousel==="1") return;
  track.dataset.crispCarousel="1";

  const cards=[...track.querySelectorAll("figure")];
  const N=cards.length;
  if(N<2) return;

  cards.forEach((card,i)=>{
    card.dataset.i=i;
    card.draggable=false;
    const img=card.querySelector("img");
    if(img){
      img.draggable=false;
      img.addEventListener("dragstart",e=>e.preventDefault());
    }
  });

  let pos=0;
  let timer=null;
  let dragging=false;
  let pointerId=null;
  let startX=0;
  let startPos=0;
  let moved=false;

  function wrap(v){ return ((v%N)+N)%N; }

  function dist(i){
    let d=i-pos;
    while(d>N/2)d-=N;
    while(d<-N/2)d+=N;
    return d;
  }

  function metrics(){
    const w=gallery.clientWidth;
    const mobile=window.innerWidth<=760;
    const cardW=mobile ? Math.min(w*.76,330) : Math.min(w*.28,360);
    const gap=mobile ? Math.min(18,w*.045) : Math.min(30,w*.022);
    return {cardW,step:cardW+gap,mobile};
  }

  /*
   * IMPORTANT:
   * Photos are positioned with LEFT/TOP rather than 3D transforms.
   * This prevents browser GPU rasterisation from making the JPEGs soft.
   * There is intentionally NO blur, perspective, rotateY, scale or
   * will-change on the photographs.
   */
  function render(animate=true){
    const {step,mobile}=metrics();
    const gr=gallery.getBoundingClientRect();
    const tr=track.getBoundingClientRect();
    const centerX=(gr.left+gr.width/2)-tr.left;
    const centerY=track.clientHeight/2;

    cards.forEach((card,i)=>{
      const d=dist(i);
      const ad=Math.abs(d);

      if(ad>3.15){
        card.style.opacity="0";
        card.style.pointerEvents="none";
        return;
      }

      const x=centerX+d*step;
      const y=centerY+(ad===0 ? 0 : Math.min(mobile?14:28,ad*(mobile?6:10)));

      card.style.left=x+"px";
      card.style.top=y+"px";

      /*
       * No transform on the image/card.
       * The centre card is therefore rendered at its native pixel quality.
       */
      card.style.transform="translate(-50%,-50%)";

      card.style.transition=animate
        ? "left .72s cubic-bezier(.22,1,.36,1),top .72s cubic-bezier(.22,1,.36,1),opacity .45s ease"
        : "none";

      card.style.opacity=ad<2.35 ? "1" : String(Math.max(0,(3.15-ad)/.8));
      card.style.zIndex=String(100-Math.round(ad*10));
      card.style.pointerEvents=ad<.8 ? "auto" : "none";
      card.classList.toggle("is-center",ad<.5);
    });
  }

  function stopAuto(){
    if(timer){
      clearInterval(timer);
      timer=null;
    }
  }

  function startAuto(delay=2400){
    stopAuto();
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    timer=setInterval(()=>{
      if(!dragging){
        pos=wrap(Math.round(pos)+1);
        render(true);
      }
    },delay);
  }

  function moveBy(delta){
    pos=wrap(Math.round(pos)+delta);
    render(true);
    startAuto(2800);
  }

  function begin(x,id){
    dragging=true;
    pointerId=id;
    startX=x;
    startPos=pos;
    moved=false;
    stopAuto();
  }

  function move(x){
    if(!dragging) return;
    const dx=x-startX;
    if(Math.abs(dx)>7) moved=true;

    const {step}=metrics();
    pos=startPos-dx/step;
    render(false);
  }

  function end(){
    if(!dragging) return;
    dragging=false;
    pointerId=null;
    pos=wrap(Math.round(pos));
    render(true);
    startAuto(2800);
  }

  /* Mouse / Pointer */
  track.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse" && e.button!==0) return;
    begin(e.clientX,e.pointerId);
    try{track.setPointerCapture(e.pointerId)}catch(_){}
  });

  track.addEventListener("pointermove",e=>{
    if(dragging && pointerId===e.pointerId) move(e.clientX);
  });

  track.addEventListener("pointerup",e=>{
    if(dragging && pointerId===e.pointerId){
      end();
      try{track.releasePointerCapture(e.pointerId)}catch(_){}
    }
  });

  track.addEventListener("pointercancel",end);

  /* Direct touch fallback for iPhone / Android */
  track.addEventListener("touchstart",e=>{
    const t=e.touches[0];
    if(t) begin(t.clientX,"touch");
  },{passive:true});

  track.addEventListener("touchmove",e=>{
    if(!dragging) return;
    const t=e.touches[0];
    if(!t) return;

    if(Math.abs(t.clientX-startX)>8){
      e.preventDefault();
      move(t.clientX);
    }
  },{passive:false});

  track.addEventListener("touchend",end,{passive:true});
  track.addEventListener("touchcancel",end,{passive:true});

  const prev=document.getElementById("prev");
  const next=document.getElementById("next");

  if(prev) prev.onclick=e=>{e.preventDefault();moveBy(-1)};
  if(next) next.onclick=e=>{e.preventDefault();moveBy(1)};

  track.addEventListener("click",e=>{
    if(moved){
      moved=false;
      return;
    }

    const card=e.target.closest("figure");
    if(!card) return;

    const d=dist(Number(card.dataset.i));
    if(Math.abs(d)>.45) moveBy(d);
  });

  window.addEventListener("resize",()=>render(false),{passive:true});

  render(false);
  startAuto();
}


if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot,{once:true});
}else{
  boot();
}

})();


/* =========================================================
   OUR LITTLE WORLD — NATIVE INFINITE CAROUSEL
   No 3D transforms. No image blur. Native horizontal scroll
   gives iPhone/Android the browser's own touch physics.
   ========================================================= */
(function(){
  function initNativeGallery(){
    const gallery=document.querySelector(".gallery");
    const track=document.getElementById("track");
    if(!gallery || !track || track.dataset.nativeCarousel==="1") return;
    track.dataset.nativeCarousel="1";

    const original=[...track.querySelectorAll("figure")];
    if(original.length<2) return;

    /* Build a 3x loop. The middle copy is the starting copy. */
    const base=original.map(f=>f.cloneNode(true));
    track.innerHTML="";
    const copies=[...original.map(f=>f.cloneNode(true)),...base.map(f=>f.cloneNode(true)),...base.map(f=>f.cloneNode(true))];
    copies.forEach((card,i)=>{
      card.dataset.loopIndex=i;
      card.draggable=false;
      const img=card.querySelector("img");
      if(img){
        img.draggable=false;
        img.loading=i<original.length*2 ? "eager" : "lazy";
        img.addEventListener("dragstart",e=>e.preventDefault());
      }
      track.appendChild(card);
    });

    const N=original.length;
    let timer=null;
    let dragging=false;
    let startX=0;
    let startScroll=0;
    let moved=false;

    function gap(){
      const cs=getComputedStyle(track);
      return parseFloat(cs.columnGap)||parseFloat(cs.gap)||18;
    }

    function step(){
      const card=track.querySelector("figure");
      return card ? card.getBoundingClientRect().width+gap() : 1;
    }

    function middleStart(){
      return step()*N;
    }

    function centerStart(){
      const s=step();
      const card=track.querySelector("figure");
      const viewport=track.clientWidth;
      const cardW=card ? card.getBoundingClientRect().width : 0;
      return s*N - (viewport-cardW)/2;
    }

    function normalise(animated=false){
      const s=step();
      const middle=s*N;
      const max=track.scrollWidth-track.clientWidth;
      const left=track.scrollLeft;

      if(left < s*(N*.55)){
        track.scrollLeft=left+middle;
      }else if(left > max-s*(N*.55)){
        track.scrollLeft=left-middle;
      }

      updateCenter();
    }

    function updateCenter(){
      const center=track.scrollLeft+track.clientWidth/2;
      let best=null,bd=Infinity;
      [...track.children].forEach(card=>{
        const c=card.offsetLeft+card.offsetWidth/2;
        const d=Math.abs(c-center);
        if(d<bd){bd=d;best=card;}
      });
      track.querySelectorAll("figure").forEach(f=>f.classList.remove("is-center"));
      if(best) best.classList.add("is-center");
    }

    function scrollToCard(card,behavior="smooth"){
      const left=card.offsetLeft-(track.clientWidth-card.offsetWidth)/2;
      track.scrollTo({left,behavior});
    }

    function next(){
      const s=step();
      track.scrollBy({left:s,behavior:"smooth"});
      setTimeout(normalise,760);
    }
    function prev(){
      const s=step();
      track.scrollBy({left:-s,behavior:"smooth"});
      setTimeout(normalise,760);
    }

    const prevBtn=document.getElementById("prev");
    const nextBtn=document.getElementById("next");
    if(prevBtn) prevBtn.addEventListener("click",e=>{e.preventDefault();prev();resetAuto();});
    if(nextBtn) nextBtn.addEventListener("click",e=>{e.preventDefault();next();resetAuto();});

    track.addEventListener("scroll",updateCenter,{passive:true});

    track.addEventListener("pointerdown",e=>{
      if(e.pointerType==="mouse" && e.button!==0) return;
      dragging=true;
      moved=false;
      startX=e.clientX;
      startScroll=track.scrollLeft;
      track.classList.add("native-dragging");
      try{track.setPointerCapture(e.pointerId)}catch(_){}
      stopAuto();
    });

    track.addEventListener("pointermove",e=>{
      if(!dragging)return;
      const dx=e.clientX-startX;
      if(Math.abs(dx)>6)moved=true;
      track.scrollLeft=startScroll-dx;
    });

    const end=e=>{
      if(!dragging)return;
      dragging=false;
      track.classList.remove("native-dragging");
      try{if(e?.pointerId)track.releasePointerCapture(e.pointerId)}catch(_){}
      const s=step();
      const target=Math.round(track.scrollLeft/s)*s;
      track.scrollTo({left:target,behavior:"smooth"});
      setTimeout(normalise,760);
      setTimeout(startAuto,900);
    };
    track.addEventListener("pointerup",end);
    track.addEventListener("pointercancel",end);

    track.addEventListener("click",e=>{
      if(moved){moved=false;return;}
      const card=e.target.closest("figure");
      if(!card)return;
      const c=card.offsetLeft+card.offsetWidth/2;
      const center=track.scrollLeft+track.clientWidth/2;
      if(Math.abs(c-center)>track.clientWidth*.12){
        scrollToCard(card);
        resetAuto();
      }
    });

    function stopAuto(){
      if(timer){clearInterval(timer);timer=null;}
    }
    function startAuto(){
      stopAuto();
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
      timer=setInterval(next,3000);
    }
    function resetAuto(){
      stopAuto();
      setTimeout(startAuto,3200);
    }

    function initial(){
      const target=centerStart();
      track.scrollLeft=target;
      updateCenter();
      setTimeout(normalise,50);
      startAuto();
    }

    if(document.fonts && document.fonts.ready){
      document.fonts.ready.then(()=>requestAnimationFrame(initial));
    }else{
      requestAnimationFrame(initial);
    }

    window.addEventListener("resize",()=>{
      const center=track.scrollLeft+track.clientWidth/2;
      requestAnimationFrame(()=>{
        let best=null,bd=Infinity;
        [...track.children].forEach(card=>{
          const c=card.offsetLeft+card.offsetWidth/2,d=Math.abs(c-center);
          if(d<bd){bd=d;best=card;}
        });
        if(best)scrollToCard(best,"auto");
      });
    },{passive:true});
  }

  if(document.readyState==="loading"){
    document.addEventListener("DOMContentLoaded",initNativeGallery,{once:true});
  }else{
    initNativeGallery();
  }
})();
