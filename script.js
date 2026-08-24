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
const c=$("#scratch"),x=c.getContext("2d");function initScratch(){let d=devicePixelRatio||1,w=c.clientWidth,h=c.clientHeight;c.width=w*d;c.height=h*d;x.setTransform(d,0,0,d,0,0);let g=x.createLinearGradient(0,0,w,h);g.addColorStop(0,"#8e623c");g.addColorStop(.25,"#e4c17e");g.addColorStop(.5,"#9d6d40");g.addColorStop(.75,"#efd99e");g.addColorStop(1,"#8d6039");x.fillStyle=g;x.fillRect(0,0,w,h);x.fillStyle="#5e4436";x.font="16px serif";x.textAlign="center";x.fillText("✦  SCRATCH TO REVEAL  ✦",w/2,h/2);x.globalCompositeOperation="destination-out"}initScratch();let down=false;function scratch(e){if(!down)return;let r=c.getBoundingClientRect();x.beginPath();x.arc(e.clientX-r.left,e.clientY-r.top,30,0,Math.PI*2);x.fill()}c.onpointerdown=e=>{down=true;scratch(e)};c.onpointermove=scratch;addEventListener("pointerup",()=>down=false);
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
  const gallery=document.querySelector(".gallery");
  const originalTrack=document.getElementById("track");
  if(!gallery || !originalTrack) return;

  /* Remove any previous gallery listeners/controllers by replacing the track. */
  const track=originalTrack.cloneNode(true);
  originalTrack.replaceWith(track);

  const cards=[...track.querySelectorAll("figure")];
  const N=cards.length;
  if(N<2) return;

  cards.forEach((card,i)=>{
    card.dataset.elasticIndex=i;
    card.draggable=false;
    const img=card.querySelector("img");
    if(img){
      img.draggable=false;
      img.addEventListener("dragstart",e=>e.preventDefault());
    }
  });

  track.style.position="relative";
  track.style.touchAction="pan-y";

  let position=0;
  let velocity=0.22;
  let targetVelocity=0.22;
  let raf=0;
  let last=performance.now();
  let dragging=false;
  let pointerId=null;
  let startX=0;
  let startY=0;
  let startPosition=0;
  let lastX=0;
  let lastTime=0;
  let dragVelocity=0;
  let moved=false;
  let paused=false;
  let spring=0;

  const reduced=window.matchMedia("(prefers-reduced-motion: reduce)");

  function wrap(v){
    return ((v%N)+N)%N;
  }

  function distance(i){
    let d=i-position;
    while(d>N/2)d-=N;
    while(d<-N/2)d+=N;
    return d;
  }

  function metrics(){
    const w=gallery.clientWidth;
    const mobile=window.innerWidth<=760;
    const cardW=mobile
      ? Math.min(w*.76,330)
      : Math.min(w*.28,360);
    const gap=mobile ? Math.min(18,w*.045) : Math.min(30,w*.022);
    return {w,mobile,cardW,gap,step:cardW+gap};
  }

  function render(){
    const {w,mobile,cardW,step}=metrics();
    const grect=gallery.getBoundingClientRect();
    const trect=track.getBoundingClientRect();

    /* Centre cards against the visible gallery, not the document viewport. */
    const cx=(grect.left+grect.width/2)-trect.left;
    track.style.setProperty("--elastic-center-x",cx+"px");
    track.style.setProperty("--elastic-card",cardW+"px");

    cards.forEach((card,i)=>{
      const d=distance(i);
      const ad=Math.abs(d);

      if(ad>3.2){
        card.style.opacity="0";
        card.style.pointerEvents="none";
        return;
      }

      const sign=d<0?-1:1;
      const stretch=dragging
        ? Math.min(.16,Math.abs(position-startPosition)*.045)
        : Math.abs(spring)*.025;

      const x=d*step*(1+stretch);
      const depth=Math.max(0,1-ad/3.2);
      const scale=ad<.5 ? 1.045 : .80+depth*.20;
      const y=ad===0 ? 0 : Math.min(mobile?18:34,ad*(mobile?7:12));
      const rotate=sign*Math.min(mobile?9:18,ad*(mobile?4.5:7));
      const opacity=ad<2.35 ? 1 : Math.max(0,(3.2-ad)/.85);
      const blur=ad<1.1 ? 0 : Math.min(1.6,(ad-1.1)*.75);

      card.style.left=`${cx}px`;
      card.style.top="50%";
      card.style.transform=
        `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0) `+
        `perspective(1200px) rotateY(${rotate}deg) scale(${scale})`;
      card.style.opacity=String(opacity);
      card.style.filter=`blur(${blur}px)`;
      card.style.zIndex=String(100-Math.round(ad*10));
      card.style.pointerEvents=ad<.8 ? "auto" : "none";
      card.classList.toggle("is-center",ad<.5);
    });
  }

  function resumeAuto(){
    targetVelocity=reduced.matches?0:.22;
  }

  function pauseAuto(){
    targetVelocity=0;
  }

  function frame(now){
    const dt=Math.min(34,Math.max(0,now-last));
    last=now;

    if(!dragging && !paused){
      velocity += (targetVelocity-velocity)*Math.min(1,dt*.006);
      position += velocity*dt*.06;
      if(Math.abs(position)>100000){
        position=wrap(position);
      }
    }

    spring += (0-spring)*Math.min(1,dt*.012);
    render();
    raf=requestAnimationFrame(frame);
  }

  function beginDrag(x,y,id){
    dragging=true;
    pointerId=id;
    startX=x;
    startY=y;
    lastX=x;
    lastTime=performance.now();
    startPosition=position;
    dragVelocity=0;
    moved=false;
    pauseAuto();
    track.classList.add("is-elastic-dragging");
  }

  function moveDrag(x,y){
    if(!dragging) return;

    const dx=x-startX;
    const dy=y-startY;

    /* Don't steal a vertical page scroll. */
    if(!moved && Math.abs(dy)>Math.abs(dx) && Math.abs(dy)>8){
      dragging=false;
      pointerId=null;
      track.classList.remove("is-elastic-dragging");
      resumeAuto();
      return;
    }

    if(Math.abs(dx)>6) moved=true;

    const now=performance.now();
    const dt=Math.max(8,now-lastTime);
    const {step}=metrics();

    position=startPosition-dx/step;
    dragVelocity=-(x-lastX)/dt/step;
    lastX=x;
    lastTime=now;
    spring=Math.max(-1,Math.min(1,dx/(gallery.clientWidth||1)));
    render();
  }

  function endDrag(){
    if(!dragging) return;

    dragging=false;
    track.classList.remove("is-elastic-dragging");

    velocity=Math.max(-.65,Math.min(.65,dragVelocity*20));
    if(Math.abs(velocity)<.04){
      velocity=startX-lastX>0 ? .07 : -.07;
    }

    spring=Math.max(-1,Math.min(1,position-startPosition));
    pointerId=null;
    resumeAuto();
  }

  /* Pointer events for desktop and modern mobile browsers. */
  track.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse" && e.button!==0) return;
    beginDrag(e.clientX,e.clientY,e.pointerId);
    try{track.setPointerCapture(e.pointerId)}catch(_){}
  });

  track.addEventListener("pointermove",e=>{
    if(!dragging || pointerId!==e.pointerId) return;
    moveDrag(e.clientX,e.clientY);
  });

  track.addEventListener("pointerup",e=>{
    if(pointerId===e.pointerId){
      endDrag();
      try{track.releasePointerCapture(e.pointerId)}catch(_){}
    }
  });

  track.addEventListener("pointercancel",endDrag);

  /*
   * Native touch fallback.
   * This is deliberately non-passive so a horizontal gesture can be
   * prevented from becoming a browser/page gesture, while vertical
   * swipes remain normal page scrolling.
   */
  track.addEventListener("touchstart",e=>{
    if(!e.touches.length) return;
    const t=e.touches[0];
    beginDrag(t.clientX,t.clientY,"touch");
  },{passive:true});

  track.addEventListener("touchmove",e=>{
    if(!dragging || !e.touches.length) return;
    const t=e.touches[0];
    const dx=t.clientX-startX;
    const dy=t.clientY-startY;

    if(Math.abs(dx)>Math.abs(dy) && Math.abs(dx)>6){
      e.preventDefault();
      moveDrag(t.clientX,t.clientY);
    }
  },{passive:false});

  track.addEventListener("touchend",endDrag,{passive:true});
  track.addEventListener("touchcancel",endDrag,{passive:true});

  /* Buttons. */
  const prev=document.getElementById("prev");
  const next=document.getElementById("next");

  function stepTo(delta){
    position+=delta;
    velocity=delta*.08;
    spring=delta*.18;
    resumeAuto();
    render();
  }

  if(prev) prev.onclick=e=>{e.preventDefault();stepTo(-1)};
  if(next) next.onclick=e=>{e.preventDefault();stepTo(1)};

  /* Click a visible side image to bring it to centre. */
  track.addEventListener("click",e=>{
    if(moved){
      moved=false;
      return;
    }
    const card=e.target.closest("figure");
    if(!card) return;
    const i=Number(card.dataset.elasticIndex);
    const d=distance(i);
    if(Math.abs(d)>.45) stepTo(d);
  });

  track.tabIndex=0;
  track.setAttribute("aria-label","Our Little World photo carousel");

  track.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"){e.preventDefault();stepTo(-1)}
    if(e.key==="ArrowRight"){e.preventDefault();stepTo(1)}
  });

  gallery.addEventListener("mouseenter",()=>{
    if(window.innerWidth>760) paused=true;
  });
  gallery.addEventListener("mouseleave",()=>{
    paused=false;
    resumeAuto();
  });

  document.addEventListener("visibilitychange",()=>{
    paused=document.hidden;
    if(!paused) resumeAuto();
  });

  window.addEventListener("resize",render,{passive:true});

  /* Always start the animation loop immediately. */
  render();
  resumeAuto();
  last=performance.now();
  cancelAnimationFrame(raf);
  raf=requestAnimationFrame(frame);
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot,{once:true});
}else{
  boot();
}

})();
