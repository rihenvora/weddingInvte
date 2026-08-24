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
   else{audio.pause();musicBtn.textContent="♫";}
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
const c=$("#scratch"),x=c.getContext("2d");function initScratch(){let d=devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);let g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,"#8e623c");g.addColorStop(.25,"#e4c17e");g.addColorStop(.5,"#9d6d40");g.addColorStop(.75,"#efd99e");g.addColorStop(1,"#8d6039");x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle="#5e4436";x.font="16px serif";x.textAlign="center";x.fillText("✦  SCRATCH TO REVEAL  ✦",w/2,h/2);x.globalCompositeOperation="destination-out"}initScratch();let down=false;function scratch(e){if(!down)return;let r=c.getBoundingClientRect();x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,30,0,Math.PI*2);x.fill()}c.onpointerdown=e=>{down=true;scratch(e)};c.onpointermove=scratch;addEventListener("pointerup",()=>down=false);
let idx=0,track=$("#track");function move(){let w=track.querySelector("figure").getBoundingClientRect().width+24, max=track.children.length-1;idx=Math.max(0,Math.min(max,idx));track.style.transform=`translateX(${-idx*w}px)`}$("#next").onclick=()=>{idx++;move()};$("#prev").onclick=()=>{idx--;move()};let sx=0;track.onpointerdown=e=>sx=e.clientX;track.onpointerup=e=>{if(Math.abs(e.clientX-sx)>40){idx+=e.clientX<sx?1:-1;move()}};
for(let i=0;i<28;i++){let q=document.createElement("i");q.className="spark";q.style.left=Math.random()*100+"%";q.style.animationDuration=5+Math.random()*7+"s";q.style.animationDelay=-Math.random()*8+"s";$("#sparks").appendChild(q)}
if(legacyBackTop) legacyBackTop.onclick=()=>{scrollTo({top:0,behavior:"smooth"});setTimeout(closeLanding,700)};
/* Carousel is controlled by the seamless infinite-loop controller below. */
/* subtle pointer parallax for desktop */
addEventListener("pointermove",e=>{
  if(innerWidth<800)return;
  const dx=(e.clientX/innerWidth-.5),dy=(e.clientY/innerHeight-.5);
  document.documentElement.style.setProperty("--mx",dx);
  document.documentElement.style.setProperty("--my",dy);
});


/* ===== requested refinements; original V2 UI untouched ===== */

// Auto-finish scratch after a meaningful partial scratch.
(function(){
 const cv=document.querySelector("#scratch"), wrap=document.querySelector(".scratchWrap");
 if(!cv||!wrap)return;
 let finished=false, scratchMoves=0;
 const autoFinish=()=>{
   if(finished)return; finished=true;
   wrap.classList.add("autoDone");
   cv.style.transition="opacity .72s ease,transform .85s cubic-bezier(.16,1,.3,1)";
   cv.style.opacity="0";cv.style.transform="scale(1.07)";
   setTimeout(()=>cv.style.pointerEvents="none",750);
 };
 cv.addEventListener("pointermove",()=>{
   if(!down||finished)return;
   scratchMoves++;
   // Existing scratch brush is retained; after enough genuine movement,
   // finish the reveal automatically instead of forcing the whole card.
   if(scratchMoves>=26)autoFinish();
 });
})();

// Replace finite/autoplay controller with one seamless infinite strip.
(function(){
 const tr=document.querySelector("#track");
 if(!tr || tr.dataset.seamless==="1")return;
 tr.dataset.seamless="1";

 // Stop any legacy transform that may have been left by the V2 carousel.
 try{ clearInterval(carouselTimer); }catch(e){}
 tr.style.transform="";

 const originals=[...tr.children];
 originals.forEach(card=>tr.appendChild(card.cloneNode(true)));

 requestAnimationFrame(()=>{
   const gap=parseFloat(getComputedStyle(tr).gap)||24;
   let width=0;
   originals.forEach(card=>width+=card.getBoundingClientRect().width+gap);
   tr.style.setProperty("--loopWidth",width+"px");
   tr.style.setProperty("--loopDuration",Math.max(28,originals.length*6.5)+"s");
   tr.classList.add("seamless");
 });

 // Arrows briefly nudge the animation speed rather than reaching an endpoint.
 const prev=document.querySelector("#prev"), next=document.querySelector("#next");
 const nudge=(dir)=>{
   tr.style.animationDuration=dir>0?"18s":"46s";
   setTimeout(()=>tr.style.animationDuration="",1200);
 };
 if(prev) prev.onclick=()=>nudge(-1);
 if(next) next.onclick=()=>nudge(1);
})();

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
      h.className="flyingHeart"; h.textContent=i%5===0?"♡":"♥";
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
   const chars=["♡","♥","♡","♥","♡"];
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

/* ===== TRUE CIRCULAR INFINITE GALLERY — MOBILE SWIPE FIX ===== */
(function(){
  const tr=document.getElementById("track");
  if(!tr || tr.dataset.circularReady==="1") return;
  tr.dataset.circularReady="1";

  tr.classList.remove("seamless");
  tr.style.animation="none";
  tr.style.removeProperty("--loopWidth");
  tr.style.removeProperty("--loopDuration");

  const originals=[...tr.children];
  if(originals.length<2) return;

  const before=originals.map(el=>el.cloneNode(true));
  const after=originals.map(el=>el.cloneNode(true));

  before.reverse().forEach(el=>tr.insertBefore(el,tr.firstChild));
  after.forEach(el=>tr.appendChild(el));

  const N=originals.length;

  let current=N;
  let busy=false;
  let auto=null;

  /* Pointer state */
  let pointerStartX=null;
  let pointerStartY=null;
  let pointerActive=false;
  let pointerMoved=false;

  /* Touch state — kept separate for iPhone Safari reliability */
  let touchStartX=null;
  let touchStartY=null;
  let touchMoved=false;

  function metrics(){
    const f=tr.querySelector("figure");
    if(!f) return {step:1};

    const cs=getComputedStyle(tr);
    const gap=parseFloat(cs.columnGap || cs.gap) || 24;

    return {
      step:f.getBoundingClientRect().width + gap
    };
  }

  function paint(animate=true){

    const {step}=metrics();

    tr.style.transition=animate
      ? "transform .65s cubic-bezier(.22,.61,.36,1)"
      : "none";

    tr.style.transform=
      `translate3d(${-current*step}px,0,0)`;
  }

  function normalize(){

    if(current>=N*2){
      current-=N;
      paint(false);
    }

    else if(current<N){
      current+=N;
      paint(false);
    }

    busy=false;
  }

  function go(dir){

    if(busy) return;

    busy=true;

    current+=dir;

    paint(true);
  }

  tr.addEventListener(
    "transitionend",
    normalize
  );

  window.addEventListener(
    "resize",
    ()=>paint(false),
    {passive:true}
  );


  /* =====================================================
     BUTTONS
     ===================================================== */

  const next=document.getElementById("next");
  const prev=document.getElementById("prev");

  if(next){
    next.onclick=()=>{
      go(1);
      restart();
    };
  }

  if(prev){
    prev.onclick=()=>{
      go(-1);
      restart();
    };
  }


  /* =====================================================
     POINTER — DESKTOP
     ===================================================== */

  tr.addEventListener("pointerdown",e=>{

    if(e.pointerType==="touch") return;

    pointerActive=true;
    pointerMoved=false;

    pointerStartX=e.clientX;
    pointerStartY=e.clientY;

    clearInterval(auto);

  });

  tr.addEventListener("pointermove",e=>{

    if(!pointerActive) return;

    if(
      Math.abs(e.clientX-pointerStartX)>8 ||
      Math.abs(e.clientY-pointerStartY)>8
    ){
      pointerMoved=true;
    }

  });

  tr.addEventListener("pointerup",e=>{

    if(!pointerActive) return;

    const dx=e.clientX-pointerStartX;
    const dy=e.clientY-pointerStartY;

    pointerActive=false;

    if(
      pointerMoved &&
      Math.abs(dx)>45 &&
      Math.abs(dx)>Math.abs(dy)
    ){
      go(dx<0 ? 1 : -1);
    }

    restart();

  });

  tr.addEventListener(
    "pointercancel",
    ()=>{
      pointerActive=false;
      restart();
    }
  );


  /* =====================================================
     TOUCH — IPHONE / ANDROID
     ===================================================== */

  tr.addEventListener(
    "touchstart",
    e=>{

      if(!e.touches.length) return;

      const touch=e.touches[0];

      touchStartX=touch.clientX;
      touchStartY=touch.clientY;

      touchMoved=false;

      clearInterval(auto);

    },
    {passive:true}
  );


  tr.addEventListener(
    "touchmove",
    e=>{

      if(
        touchStartX===null ||
        !e.touches.length
      ) return;

      const touch=e.touches[0];

      const dx=touch.clientX-touchStartX;
      const dy=touch.clientY-touchStartY;

      /*
       * We deliberately do NOT preventDefault().
       *
       * This allows normal vertical page scrolling.
       * A predominantly horizontal gesture becomes a
       * gallery swipe.
       */

      if(
        Math.abs(dx)>10 &&
        Math.abs(dx)>Math.abs(dy)
      ){
        touchMoved=true;
      }

    },
    {passive:true}
  );


  tr.addEventListener(
    "touchend",
    e=>{

      if(
        touchStartX===null
      ){
        restart();
        return;
      }

      const touch=e.changedTouches[0];

      const dx=touch.clientX-touchStartX;
      const dy=touch.clientY-touchStartY;

      if(
        touchMoved &&
        Math.abs(dx)>=45 &&
        Math.abs(dx)>Math.abs(dy)
      ){

        /*
         * Left swipe  = next
         * Right swipe = previous
         */

        go(dx<0 ? 1 : -1);
      }

      touchStartX=null;
      touchStartY=null;
      touchMoved=false;

      restart();

    },
    {passive:true}
  );


  tr.addEventListener(
    "touchcancel",
    ()=>{
      touchStartX=null;
      touchStartY=null;
      touchMoved=false;
      restart();
    },
    {passive:true}
  );


  /* =====================================================
     AUTO PLAY
     ===================================================== */

  function restart(){

    clearInterval(auto);

    auto=setInterval(
      ()=>go(1),
      3200
    );

  }

  tr.addEventListener(
    "mouseenter",
    ()=>clearInterval(auto)
  );

  tr.addEventListener(
    "mouseleave",
    restart
  );


  /*
   * Prevent browser image dragging from stealing the gesture.
   */
  tr.querySelectorAll("img").forEach(img=>{
    img.draggable=false;

    img.addEventListener(
      "dragstart",
      e=>e.preventDefault()
    );
  });


  requestAnimationFrame(
    ()=>paint(false)
  );

  restart();

})();
