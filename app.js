/* KCSS — App Logic */
const S={lang:localStorage.getItem("kcss-lang")||"fr",filter:"all",sound:false,botReady:false};
function tr(k){return T[S.lang]?.[k]||T.fr[k]||k}
function localize(){
  document.documentElement.lang=S.lang;
  document.querySelectorAll("[data-i18n]").forEach(e=>e.innerHTML=tr(e.dataset.i18n));
  document.querySelectorAll("[data-i18n-placeholder]").forEach(e=>e.placeholder=tr(e.dataset.i18nPlaceholder));
  document.getElementById("langToggle").textContent=S.lang==="fr"?"FR / EN":"EN / FR";
}
function setLang(l){S.lang=l;localStorage.setItem("kcss-lang",l);localize();renderAll();}

/* ── STARS CANVAS ── */
function initStars(){
  const c=document.getElementById("starCanvas"),x=c.getContext("2d");
  let w,h;const stars=Array.from({length:200},()=>({x:Math.random(),y:Math.random(),s:Math.random()*.8+.2,sp:Math.random()*.3+.1}));
  function resize(){w=c.width=c.clientWidth;h=c.height=c.clientHeight}
  function draw(t){
    x.clearRect(0,0,w,h);
    stars.forEach(s=>{
      const px=s.x*w,py=s.y*h;
      const a=.3+Math.sin(t*.001+s.x*10)*.3;
      x.fillStyle=`rgba(141,244,255,${a})`;x.beginPath();x.arc(px,py,s.s*1.5,0,Math.PI*2);x.fill();
      s.y+=s.sp*.0003;if(s.y>1)s.y=0;
    });
    // constellation lines
    for(let i=0;i<stars.length;i+=5){
      const a=stars[i],b=stars[(i+7)%stars.length];
      const dx=(a.x-b.x)*w,dy=(a.y-b.y)*h;
      if(Math.sqrt(dx*dx+dy*dy)<200){
        x.strokeStyle="rgba(141,244,255,.06)";x.lineWidth=.5;
        x.beginPath();x.moveTo(a.x*w,a.y*h);x.lineTo(b.x*w,b.y*h);x.stroke();
      }
    }
    requestAnimationFrame(draw);
  }
  resize();window.addEventListener("resize",resize);requestAnimationFrame(draw);
}

/* ── PORTAL CLICK → TRANSITION → INSIDE ── */
function initPortal(){
  const portal=document.getElementById("portal");
  const overlay=document.getElementById("transitionOverlay");
  const inside=document.getElementById("inside");
  portal.addEventListener("click",()=>{
    overlay.classList.add("active");
    if(S.sound)playTransitionSound();
    setTimeout(()=>{
      portal.classList.add("hidden");
      overlay.classList.remove("active");
      inside.classList.add("active");
      inside.scrollIntoView();
      initGlobe();
    },3200);
  });
}

/* ── CABIN CLICK → PROFILE REVEAL ── */
function initCabin(){
  const glass=document.querySelector(".cabin-glass");
  const prompt=document.getElementById("cabinPrompt");
  const holo=document.getElementById("profileHolo");
  const dataEl=document.getElementById("profileData");
  const sumEl=document.getElementById("profileSummary");
  let revealed=false;
  glass.addEventListener("click",()=>{
    if(revealed)return;revealed=true;
    prompt.classList.add("hidden");
    holo.classList.add("active");
    // Type profile data
    const lines=[
      {l:tr("profile.scan"),cls:"scan"},
      {l:tr("profile.identity")+": Jahdiel Kinvi",cls:"label"},
      {l:tr("profile.role")+": "+tr("profile.roleVal"),cls:"label"},
      {l:tr("profile.org")+": "+tr("profile.orgVal"),cls:"label"},
      {l:tr("profile.edu")+": "+tr("profile.eduVal"),cls:"label"},
      {l:tr("profile.status")+": "+tr("profile.statusVal"),cls:"label"}
    ];
    let html="";
    lines.forEach((line,i)=>{
      setTimeout(()=>{
        html+=`<div class="holo-label" style="animation:holoIn .4s ease-out">${line.l}</div>`;
        dataEl.innerHTML=html;
      },i*400);
    });
    setTimeout(()=>{sumEl.innerHTML=`<p>${tr("profile.summary")}</p>`;},lines.length*400+200);
  });
}

/* ── THREE.JS GLOBE ── */
let globe;
function initGlobe(){
  const container=document.getElementById("globeContainer");
  if(!container||globe)return;
  if(typeof THREE==="undefined")return;
  globe=true;
  const w=container.clientWidth,h=container.clientHeight||400;
  const scene=new THREE.Scene();
  const camera=new THREE.PerspectiveCamera(50,w/h,.1,1000);camera.position.z=4;
  const renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setSize(w,h);renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  container.appendChild(renderer.domElement);

  // Wireframe sphere
  const geo=new THREE.IcosahedronGeometry(1.2,2);
  const mat=new THREE.MeshBasicMaterial({color:0x8df4ff,wireframe:true,transparent:true,opacity:.15});
  const mesh=new THREE.Mesh(geo,mat);scene.add(mesh);

  // Inner glow sphere
  const g2=new THREE.SphereGeometry(.8,32,32);
  const m2=new THREE.MeshBasicMaterial({color:0x6366f1,transparent:true,opacity:.08});
  scene.add(new THREE.Mesh(g2,m2));

  // Orbital ring
  const ring=new THREE.RingGeometry(1.6,1.65,64);
  const rm=new THREE.MeshBasicMaterial({color:0x8df4ff,transparent:true,opacity:.12,side:THREE.DoubleSide});
  const ringMesh=new THREE.Mesh(ring,rm);ringMesh.rotation.x=Math.PI/3;scene.add(ringMesh);

  // Second ring
  const ring2=new THREE.Mesh(new THREE.RingGeometry(1.9,1.93,64),new THREE.MeshBasicMaterial({color:0x6366f1,transparent:true,opacity:.08,side:THREE.DoubleSide}));
  ring2.rotation.x=-Math.PI/4;ring2.rotation.y=Math.PI/6;scene.add(ring2);

  // Particles
  const pGeo=new THREE.BufferGeometry();
  const pCount=300;const pos=new Float32Array(pCount*3);
  for(let i=0;i<pCount*3;i++)pos[i]=(Math.random()-.5)*5;
  pGeo.setAttribute("position",new THREE.BufferAttribute(pos,3));
  const pMat=new THREE.PointsMaterial({color:0x8df4ff,size:.02,transparent:true,opacity:.4});
  scene.add(new THREE.Points(pGeo,pMat));

  function animate(t){
    requestAnimationFrame(animate);
    mesh.rotation.y=t*.0003;mesh.rotation.x=t*.0001;
    ringMesh.rotation.z=t*.0002;
    ring2.rotation.z=-t*.00015;
    renderer.render(scene,camera);
  }
  animate(0);

  window.addEventListener("resize",()=>{
    const nw=container.clientWidth,nh=container.clientHeight||400;
    camera.aspect=nw/nh;camera.updateProjectionMatrix();renderer.setSize(nw,nh);
  });
}

/* ── RENDER PROJECTS ── */
function renderFilters(){
  const el=document.getElementById("projectFilters");el.innerHTML="";
  ["all","ai","data","business","industry"].forEach(k=>{
    const b=document.createElement("button");
    b.className="filter-btn"+(S.filter===k?" active":"");
    b.textContent=tr("filter."+k);
    b.onclick=()=>{S.filter=k;renderFilters();renderProjects()};
    el.appendChild(b);
  });
}
function renderProjects(){
  const grid=document.getElementById("projectGrid");grid.innerHTML="";
  PROJECTS.filter(p=>S.filter==="all"||p.filter===S.filter).forEach(p=>{
    const card=document.createElement("article");card.className="project-card fade-in";
    card.innerHTML=`
      <div class="project-media"><img src="${p.image}" alt="" loading="lazy"><span class="project-status">${p.status[S.lang]}</span></div>
      <div class="project-body">
        <div class="project-tags">${p.stack.slice(0,4).map(s=>`<span>${s}</span>`).join("")}</div>
        <h3>${p.title[S.lang]}</h3>
        <p>${p.subtitle[S.lang]}</p>
        <div class="project-links">
          <button class="primary" onclick="openModal('${p.id}')">${tr("card.open")}</button>
          ${p.links.filter(l=>l.label.includes("GitHub")).map(l=>`<a href="${l.href}" target="_blank" rel="noopener">${tr("card.github")}</a>`).join("")}
        </div>
      </div>`;
    grid.appendChild(card);
  });
  observeFadeIn();
}

/* ── MODAL ── */
function openModal(id){
  const p=PROJECTS.find(x=>x.id===id);if(!p)return;
  const modal=document.getElementById("projectModal");
  const content=document.getElementById("modalContent");
  content.innerHTML=`
    <div class="modal-hero" style="background-image:url('${p.image}')">
      <p class="kicker">${p.num} — ${p.status[S.lang]}</p>
      <h2>${p.title[S.lang]}</h2>
    </div>
    <div class="modal-body">
      <div class="modal-grid">
        <div>
          <h3>${tr("modal.context")}</h3><p>${p.context[S.lang]}</p>
          <h3>${tr("modal.objective")}</h3><p>${p.objective[S.lang]}</p>
          <h3>${tr("modal.result")}</h3><p>${p.result[S.lang]}</p>
          <h3>${tr("modal.links")}</h3>
          <div class="project-links">${p.links.map(l=>`<a href="${l.href.startsWith("http")?l.href:encodeURI(l.href)}" target="_blank" rel="noopener">${l.label}</a>`).join("")}</div>
        </div>
        <div>
          <h3>${tr("modal.result")}</h3>
          <div class="metric-grid">${p.metrics.map(m=>`<div class="metric"><strong>${m}</strong></div>`).join("")}</div>
          <h3>${tr("modal.stack")}</h3>
          <div class="project-tags">${p.stack.map(s=>`<span>${s}</span>`).join("")}</div>
        </div>
      </div>
    </div>`;
  if(modal.showModal)modal.showModal();
}
document.getElementById("modalClose").onclick=()=>{const m=document.getElementById("projectModal");if(m.open)m.close()};
document.getElementById("projectModal").addEventListener("click",e=>{if(e.target.id==="projectModal")document.getElementById("projectModal").close()});

/* ── SKILLS ── */
function renderSkills(){
  const el=document.getElementById("skillRings");el.innerHTML="";
  SKILLS.forEach(s=>{
    const card=document.createElement("div");card.className="skill-ring-card fade-in";
    card.innerHTML=`
      <h3>${s.title[S.lang]}</h3>
      <p>${s.desc[S.lang]}</p>
      <div class="skill-logos">${s.logos.map(l=>`<img src="Compétences images/${l}" alt="" class="skill-logo" loading="lazy">`).join("")}</div>
      <div class="skill-tags">${s.tags.map(t=>`<span>${t}</span>`).join("")}</div>`;
    el.appendChild(card);
  });
  observeFadeIn();
}

/* ── CERTS ── */
function renderCerts(){
  const el=document.getElementById("certsGrid");el.innerHTML="";
  CERTS.forEach(c=>{
    const card=document.createElement("div");card.className="cert-card fade-in";
    card.innerHTML=`<h4>${c.title[S.lang]}</h4><div class="cert-meta">${c.meta[S.lang]}</div>${c.href?`<a href="${encodeURI(c.href)}" target="_blank" rel="noopener">Ouvrir</a>`:""}`;
    el.appendChild(card);
  });
  observeFadeIn();
}

/* ── CHATBOT ── */
function initBot(){
  const panel=document.getElementById("botPanel"),log=document.getElementById("botLog");
  const form=document.getElementById("botForm"),input=document.getElementById("botInput");
  function addMsg(role,text){
    const d=document.createElement("div");d.className="bot-msg "+role;d.textContent=text;
    log.appendChild(d);log.scrollTop=log.scrollHeight;
  }
  function answer(q){
    const n=q.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
    if(/projet|project|module|mirakl|payfit|nba|olist|todo|safran/.test(n))return tr("bot.projects");
    if(/skill|comp|python|data|ia|ai|dust/.test(n))return tr("bot.skills");
    if(/contact|mail|linkedin|github/.test(n))return tr("bot.contact");
    return tr("bot.default");
  }
  document.getElementById("botToggle").onclick=()=>{
    panel.classList.add("open");
    if(!S.botReady){addMsg("bot",tr("bot.welcome"));S.botReady=true}
    input.focus();
  };
  document.getElementById("botClose").onclick=()=>panel.classList.remove("open");
  form.onsubmit=e=>{e.preventDefault();const v=input.value.trim();if(!v)return;input.value="";addMsg("user",v);setTimeout(()=>addMsg("bot",answer(v)),300)};
  document.querySelectorAll("[data-question]").forEach(b=>b.onclick=()=>{
    const q=b.dataset.question;addMsg("user",b.textContent);setTimeout(()=>addMsg("bot",answer(q)),300);
  });
}

/* ── SOUND ── */
function playTransitionSound(){
  try{
    const ctx=new(window.AudioContext||window.webkitAudioContext)();
    const osc=ctx.createOscillator();const gain=ctx.createGain();
    osc.connect(gain);gain.connect(ctx.destination);
    osc.type="sine";osc.frequency.setValueAtTime(100,ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800,ctx.currentTime+1.5);
    gain.gain.setValueAtTime(.1,ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(.001,ctx.currentTime+2);
    osc.start();osc.stop(ctx.currentTime+2);
  }catch(e){}
}
function initSound(){
  const btn=document.getElementById("soundToggle");
  btn.onclick=()=>{S.sound=!S.sound;btn.textContent=S.sound?"🔊":"🔇"};
}

/* ── FADE IN OBSERVER ── */
function observeFadeIn(){
  const obs=new IntersectionObserver((entries)=>{
    entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target)}});
  },{threshold:.1});
  document.querySelectorAll(".fade-in:not(.visible)").forEach(el=>obs.observe(el));
}

/* ── RENDER ALL ── */
function renderAll(){localize();renderFilters();renderProjects();renderSkills();renderCerts();}

/* ── INIT ── */
document.addEventListener("DOMContentLoaded",()=>{
  localize();initStars();initPortal();initCabin();initSound();initBot();
  renderFilters();renderProjects();renderSkills();renderCerts();
  document.getElementById("langToggle").onclick=()=>setLang(S.lang==="fr"?"en":"fr");
  observeFadeIn();
});
