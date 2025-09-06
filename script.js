// Smooth scroll + scrollspy
const header=document.querySelector('header');
const links=document.querySelectorAll('nav a[href^="#"]');
function smoothTo(id){const el=document.querySelector(id);if(!el)return;const top=el.getBoundingClientRect().top+window.pageYOffset-(header?.offsetHeight||0)-8;window.scrollTo({top,behavior:'smooth'});}
links.forEach(a=>{a.addEventListener('click',e=>{e.preventDefault();smoothTo(a.getAttribute('href'));});});
const sections=[...links].map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
function onScrollSpy(){const y=window.scrollY+(header?.offsetHeight||0)+16;let current=sections[0]?.id;sections.forEach(sec=>{if(sec.offsetTop<=y)current=sec.id;});links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+current));}
window.addEventListener('scroll',onScrollSpy);onScrollSpy();

// Reveal on scroll
const io=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target);}})},{threshold:.12});
document.querySelectorAll('section, .card, .grid img, .team > div, .hero img, video').forEach(el=>{el.classList.add('reveal');io.observe(el);});

// Mobile menu toggle
const toggleBtn=document.querySelector('.nav-toggle');
const nav=document.getElementById('primary-nav');
toggleBtn?.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggleBtn.setAttribute('aria-expanded',open);});

// Tabs
document.querySelectorAll('.tab').forEach(t=>t.addEventListener('click',()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  t.classList.add('active');['auto','remote','quick'].forEach(id=>{const pane=document.getElementById('pane-'+id);if(pane)pane.style.display=(t.dataset.pane===id)?'block':'none';});
}));

// Stepper
const steps=document.querySelectorAll('.step');let idx=0;setInterval(()=>{steps.forEach(s=>s.classList.remove('active'));if(steps.length){steps[idx%steps.length].classList.add('active');idx++;}},2200);

// Ecosystem: click toggles image <-> description
document.getElementById('eco-pop')?.remove();
document.querySelectorAll('.eco-tile').forEach(tile=>{
  tile.tabIndex=0;
  // crea overlay si no existe
  if(!tile.querySelector('.eco-desc')){
    const overlay=document.createElement('div');overlay.className='eco-desc';
    const h=document.createElement('h4');h.textContent=tile.dataset.title||'';
    const p=document.createElement('p');p.textContent=tile.dataset.desc||'';
    overlay.append(h,p);tile.appendChild(overlay);
  }
  tile.dataset.state='img';
  const toggle=()=>{tile.dataset.state=(tile.dataset.state==='img'?'desc':'img');};
  tile.addEventListener('click',toggle);
  tile.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggle();}});
});
