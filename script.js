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
    if(window.__rihenElasticGalleryBooted) return;
    window.__rihenElasticGalleryBooted=true;

    const gallery=document.querySelector(".gallery");
    const track=document.getElementById("track");
    if(!gallery || !track) return;

  /* Replace the current track once, so any older carousel listeners
     attached by legacy inline code cannot fight this controller. */
  const fresh=track.cloneNode(true);
  track.replaceWith(fresh);

  const rail=document.getElementById("track");
  const originalCards=[...rail.children];

  if(originalCards.length<2) return;

  const cards=originalCards.map((card,i)=>{
    card.dataset.elasticIndex=i;
    card.setAttribute("draggable","false");
    const img=card.querySelector("img");
    if(img){
      img.draggable=false;
      img.addEventListener("dragstart",e=>e.preventDefault());
    }
    return card;
  });

  /* Make a small progress indicator without changing the HTML layout. */
  if(!gallery.querySelector(".elasticProgress")){
    const p=document.createElement("div");
    p.className="elasticProgress";
    p.setAttribute("aria-hidden","true");
    p.innerHTML="<i></i>";
    gallery.appendChild(p);
  }

  const N=cards.length;

  let position=0;
  let velocity=.17;          // cards per frame-ish, converted by dt
  let autoVelocity=.17;
  let targetVelocity=.17;

  let dragging=false;
  let pointerId=null;
  let startX=0;
  let startPosition=0;
  let lastX=0;
  let lastTime=0;
  let dragVelocity=0;
  let dragDistance=0;
  let spring=0;

  let raf=0;
  let lastFrame=performance.now();
  let paused=false;

  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)");

  function wrap(v){
    return ((v%N)+N)%N;
  }

  function distance(i){
    let d=i-position;
    while(d>N/2)d-=N;
    while(d<-N/2)d+=N;
    return d;
  }

  function render(){
    const width=gallery.clientWidth;
    const mobile=window.innerWidth<810;

    const cardWidth=mobile
      ? Math.min(width*.72,330)
      : Math.min(width*.27,360);

    rail.style.setProperty("--elastic-card",cardWidth+"px");

    const gap=mobile
      ? Math.min(18,width*.045)
      : Math.min(30,width*.022);

    const step=cardWidth+gap;

    const centerY=rail.clientHeight*.50;

    cards.forEach((card,i)=>{
      const d=distance(i);
      const ad=Math.abs(d);

      if(ad>3.2){
        card.style.opacity="0";
        card.style.pointerEvents="none";
        card.classList.remove("is-center");
        return;
      }

      const sign=d<0?-1:1;

      /* The elastic part: dragging slightly stretches the spacing. */
      const stretch=dragging
        ? Math.min(.22,Math.abs(dragDistance)/(width||1)*.18)
        : spring*.04;

      const spread=step*(1+stretch);

      const x=d*spread;

      const depth=Math.max(0,1-ad/3.2);
      const scale=
        ad<.55
          ? 1 + (.08*(1-ad/.55))*Math.min(1,Math.abs(spring)*2+.15)
          : .82 + depth*.18;

      const rotateY=
        d===0
          ? 0
          : sign*Math.min(18,ad*7.2);

      const rotateZ=
        d===0
          ? 0
          : sign*Math.min(3.5,ad*1.4);

      const y=
        d===0
          ? 0
          : Math.min(34,ad*12);

      const opacity=
        ad<2.25
          ? 1
          : Math.max(0,(3.2-ad)/.95);

      const blur=
        ad<1.2
          ? 0
          : Math.min(1.7,(ad-1.2)*.85);

      card.style.transform=
        `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0) `+
        `perspective(1100px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`;

      card.style.opacity=opacity;
      card.style.filter=`blur(${blur}px)`;

      card.style.zIndex=String(100-Math.round(ad*10));
      card.style.pointerEvents=ad<.75?"auto":"none";

      card.classList.toggle("is-center",Math.abs(d)<.5);
    });
  }

  function frame(now){
    const dt=Math.min(40,now-lastFrame);
    lastFrame=now;

    if(!dragging && !paused){
      if(!reduce.matches){
        velocity += (targetVelocity-velocity)*Math.min(1,dt*.0025);

        /* Inertial movement after release. */
        if(Math.abs(velocity)>0.0001){
          position += velocity*dt*.06;
        }
      }
    }

    /* Elastic spring eases back after the gesture. */
    spring += (0-spring)*Math.min(1,dt*.012);

    render();
    raf=requestAnimationFrame(frame);
  }

  function stopAuto(){
    targetVelocity=0;
  }

  function resumeAuto(){
    targetVelocity=reduce.matches?0:.17;
  }

  function pointerDown(e){
    if(e.button!==undefined && e.button!==0) return;

    dragging=true;
    pointerId=e.pointerId;
    startX=e.clientX;
    lastX=e.clientX;
    startPosition=position;
    lastTime=performance.now();
    dragVelocity=0;
    dragDistance=0;

    stopAuto();

    rail.classList.add("is-elastic-dragging");

    try{rail.setPointerCapture(pointerId)}catch(_){}
  }

  function pointerMove(e){
    if(!dragging || e.pointerId!==pointerId) return;

    const now=performance.now();
    const dx=e.clientX-startX;
    const dt=Math.max(8,now-lastTime);
    const step=Math.max(
      1,
      (window.innerWidth<810
        ? Math.min(gallery.clientWidth*.72,330)
        : Math.min(gallery.clientWidth*.27,360))
      + (window.innerWidth<810?18:30)
    );

    position=startPosition-dx/step;

    dragDistance=dx;
    dragVelocity=-(e.clientX-lastX)/dt/step;

    lastX=e.clientX;
    lastTime=now;

    /* Slightly overdrive the spring while being dragged. */
    spring=Math.max(-1,Math.min(1,dx/(gallery.clientWidth*.8)));

    render();
  }

  function pointerUp(e){
    if(!dragging || e.pointerId!==pointerId) return;

    dragging=false;
    rail.classList.remove("is-elastic-dragging");

    /* Convert the release velocity into a tasteful momentum burst. */
    velocity=Math.max(-.55,Math.min(.55,dragVelocity*18));

    if(Math.abs(velocity)<.035){
      velocity=dragDistance<0?.06:-.06;
    }

    spring=dragDistance/(gallery.clientWidth||1);

    resumeAuto();

    try{rail.releasePointerCapture(pointerId)}catch(_){}
    pointerId=null;
  }

  rail.addEventListener("pointerdown",pointerDown);
  rail.addEventListener("pointermove",pointerMove);
  rail.addEventListener("pointerup",pointerUp);
  rail.addEventListener("pointercancel",pointerUp);

  /* Keyboard accessibility */
  rail.tabIndex=0;
  rail.setAttribute("aria-label","Our Little World photo carousel");

  rail.addEventListener("keydown",e=>{
    if(e.key==="ArrowRight"){
      e.preventDefault();
      position+=1;
      velocity=0;
      spring=.18;
    }

    if(e.key==="ArrowLeft"){
      e.preventDefault();
      position-=1;
      velocity=0;
      spring=-.18;
    }
  });

  /* Clicking a side card brings it naturally to the centre. */
  rail.addEventListener("click",e=>{
    const card=e.target.closest("figure");
    if(!card) return;

    const i=Number(card.dataset.elasticIndex);
    const d=distance(i);

    if(Math.abs(d)>.45){
      position+=d;
      velocity=0;
      spring=d>0?.28:-.28;
    }
  });

  /* Existing navigation buttons are retained. */
  const prev=document.getElementById("prev");
  const next=document.getElementById("next");

  if(prev){
    prev.onclick=e=>{
      e.preventDefault();
      position-=1;
      velocity=0;
      spring=-.2;
      resumeAuto();
    };
  }

  if(next){
    next.onclick=e=>{
      e.preventDefault();
      position+=1;
      velocity=0;
      spring=.2;
      resumeAuto();
    };
  }

  gallery.addEventListener("mouseenter",()=>{
    if(window.innerWidth>=810) paused=true;
  });

  gallery.addEventListener("mouseleave",()=>{
    paused=false;
    resumeAuto();
  });

  document.addEventListener("visibilitychange",()=>{
    paused=document.hidden;
    if(!paused)resumeAuto();
  });

  window.addEventListener("resize",render,{passive:true});

  /* Preload all gallery images before starting the motion. */
  let loaded=0;

  function start(){
    render();
    resumeAuto();
    cancelAnimationFrame(raf);
    raf=requestAnimationFrame(frame);
  }

  const imgs=cards
    .map(c=>c.querySelector("img"))
    .filter(Boolean);

  if(!imgs.length){
    start();
  }else{
    imgs.forEach(img=>{
      if(img.complete) loaded++;
      else img.addEventListener("load",()=>{
        loaded++;
        if(loaded===imgs.length)start();
      },{once:true});
    });

    if(loaded===imgs.length)start();
  }

  }
  /* Start normally after the DOM is ready. */
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded",boot,{once:true});
  }else{
    boot();
  }
})();
