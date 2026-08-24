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

  /* Fresh track = no legacy listeners can interfere. */
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

  let position=0;
  let dragStartPosition=0;
  let startX=0;
  let lastX=0;
  let dragging=false;
  let pointerId=null;
  let moved=false;
  let autoTimer=null;
  let resumeTimer=null;

  function wrap(v){
    return ((v%N)+N)%N;
  }

  function distance(i){
    let d=i-position;
    while(d>N/2)d-=N;
    while(d<-N/2)d+=N;
    return d;
  }

  function getMetrics(){
    const w=gallery.clientWidth;
    const mobile=window.innerWidth<=760;
    const cardW=mobile ? Math.min(w*.76,330) : Math.min(w*.28,360);
    const gap=mobile ? Math.min(18,w*.045) : Math.min(30,w*.022);
    return {w,mobile,cardW,step:cardW+gap};
  }

  function render(animate=true){
    const {mobile,cardW,step}=getMetrics();
    const gr=gallery.getBoundingClientRect();
    const tr=track.getBoundingClientRect();
    const cx=(gr.left+gr.width/2)-tr.left;

    track.style.setProperty("--elastic-center-x",cx+"px");
    track.style.setProperty("--elastic-card",cardW+"px");

    cards.forEach((card,i)=>{
      const d=distance(i);
      const ad=Math.abs(d);

      if(ad>3.25){
        card.style.opacity="0";
        card.style.pointerEvents="none";
        return;
      }

      const sign=d<0?-1:1;
      const x=d*step;
      const scale=ad<.5 ? 1.05 : .80+Math.max(0,1-ad/3.25)*.20;
      const y=ad===0 ? 0 : Math.min(mobile?16:30,ad*(mobile?7:10));
      const rotate=sign*Math.min(mobile?8:16,ad*(mobile?4:6));
      const opacity=ad<2.35 ? 1 : Math.max(0,(3.25-ad)/.9);

      card.style.left=cx+"px";
      card.style.top="50%";
      card.style.transition=animate
        ? "transform .72s cubic-bezier(.22,1,.36,1),opacity .5s ease,filter .5s ease"
        : "none";

      card.style.transform=
        `translate3d(calc(-50% + ${x}px),calc(-50% + ${y}px),0) `+
        `perspective(1200px) rotateY(${rotate}deg) scale(${scale})`;

      card.style.opacity=String(opacity);
      card.style.filter="none";
      card.style.zIndex=String(100-Math.round(ad*10));
      card.style.pointerEvents=ad<.8 ? "auto" : "none";
      card.classList.toggle("is-center",ad<.5);
    });
  }

  function stopAuto(){
    if(autoTimer){
      clearInterval(autoTimer);
      autoTimer=null;
    }
    if(resumeTimer){
      clearTimeout(resumeTimer);
      resumeTimer=null;
    }
  }

  function startAuto(delay=2200){
    stopAuto();

    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
      render(false);
      return;
    }

    autoTimer=setInterval(()=>{
      if(!dragging){
        position=wrap(Math.round(position)+1);
        render(true);
      }
    },delay);
  }

  function moveTo(delta){
    position=wrap(Math.round(position)+delta);
    render(true);
    startAuto(2800);
  }

  function pointerDown(x,y,id){
    dragging=true;
    pointerId=id;
    startX=x;
    lastX=x;
    dragStartPosition=position;
    moved=false;
    stopAuto();
    track.classList.add("is-elastic-dragging");
    render(false);
  }

  function pointerMove(x,y){
    if(!dragging) return;

    const dx=x-startX;
    if(Math.abs(dx)>6) moved=true;

    const {step}=getMetrics();
    position=dragStartPosition-dx/step;
    lastX=x;

    render(false);
  }

  function pointerUp(){
    if(!dragging) return;

    dragging=false;
    track.classList.remove("is-elastic-dragging");

    /* Snap to the nearest image after the gesture. */
    position=wrap(Math.round(position));
    render(true);

    pointerId=null;
    startAuto(2800);
  }

  /* Pointer Events: mouse, trackpad and modern touch browsers. */
  track.addEventListener("pointerdown",e=>{
    if(e.pointerType==="mouse" && e.button!==0) return;
    pointerDown(e.clientX,e.clientY,e.pointerId);
    try{track.setPointerCapture(e.pointerId)}catch(_){}
  });

  track.addEventListener("pointermove",e=>{
    if(!dragging || pointerId!==e.pointerId) return;
    pointerMove(e.clientX,e.clientY);
  });

  track.addEventListener("pointerup",e=>{
    if(pointerId!==e.pointerId) return;
    pointerUp();
    try{track.releasePointerCapture(e.pointerId)}catch(_){}
  });

  track.addEventListener("pointercancel",pointerUp);

  /*
   * Direct touch fallback for iPhone Safari.
   * Horizontal movement is handled here; vertical movement is left to
   * the browser so the page can still scroll normally.
   */
  track.addEventListener("touchstart",e=>{
    const t=e.touches[0];
    if(t) pointerDown(t.clientX,t.clientY,"touch");
  },{passive:true});

  track.addEventListener("touchmove",e=>{
    if(!dragging) return;
    const t=e.touches[0];
    if(!t) return;

    const dx=t.clientX-startX;
    const dy=t.clientY-(e.touches[0].clientY || 0);

    if(Math.abs(dx)>8){
      e.preventDefault();
      pointerMove(t.clientX,t.clientY);
    }
  },{passive:false});

  track.addEventListener("touchend",pointerUp,{passive:true});
  track.addEventListener("touchcancel",pointerUp,{passive:true});

  const prev=document.getElementById("prev");
  const next=document.getElementById("next");

  if(prev){
    prev.onclick=e=>{
      e.preventDefault();
      moveTo(-1);
    };
  }

  if(next){
    next.onclick=e=>{
      e.preventDefault();
      moveTo(1);
    };
  }

  track.addEventListener("click",e=>{
    if(moved){
      moved=false;
      return;
    }

    const card=e.target.closest("figure");
    if(!card) return;

    const i=Number(card.dataset.elasticIndex);
    const d=distance(i);

    if(Math.abs(d)>.45){
      position=wrap(Math.round(position+d));
      render(true);
      startAuto(2800);
    }
  });

  track.tabIndex=0;
  track.setAttribute("aria-label","Our Little World photo carousel");

  track.addEventListener("keydown",e=>{
    if(e.key==="ArrowLeft"){
      e.preventDefault();
      moveTo(-1);
    }
    if(e.key==="ArrowRight"){
      e.preventDefault();
      moveTo(1);
    }
  });

  window.addEventListener("resize",()=>render(false),{passive:true});

  /*
   * IMPORTANT:
   * No requestAnimationFrame, no image-load dependency, no hover pause.
   * A simple timer drives the carousel so it cannot silently stop.
   */
  render(false);
  startAuto(2200);
}

if(document.readyState==="loading"){
  document.addEventListener("DOMContentLoaded",boot,{once:true});
}else{
  boot();
}

})();
