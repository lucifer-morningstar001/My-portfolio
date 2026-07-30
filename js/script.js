gsap.registerPlugin(ScrollTrigger);

/* ---------- Custom cursor ---------- */
const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if(window.matchMedia('(min-width: 992px)').matches){
  window.addEventListener('mousemove', e=>{
    gsap.to(dot, {x:e.clientX, y:e.clientY, duration:.05});
    gsap.to(ring, {x:e.clientX, y:e.clientY, duration:.25});
  });
  document.querySelectorAll('a, button, .proj-card, .skill-card, .filter-btn').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
  });
}

/* ---------- Nav toggle ---------- */
document.getElementById('navToggle').addEventListener('click', ()=>{
  document.getElementById('navLinks').classList.toggle('show');
});
document.querySelectorAll('.nav-links a').forEach(a=>{
  a.addEventListener('click', ()=> document.getElementById('navLinks').classList.remove('show'));
});

/* ---------- Terminal typing effect ---------- */
const codeLines = [
"<span class='kw'>const</span> <span class='fn'>developer</span> = {",
"  name: <span class='str'>'Vansh'</span>,",
"  stack: [<span class='str'>'React'</span>, <span class='str'>'Node'</span>, <span class='str'>'PHP'</span>],",
"  passion: <span class='str'>'crafting UI'</span>,",
"  status: <span class='str'>'building...'</span>",
"};",
"",
"<span class='fn'>deploy</span>(developer.stack);",
"<span class='kw'>export default</span> success;"
];
const typedEl = document.getElementById('typedCode');
let li=0, ci=0, out='';
function typeLoop(){
  if(li < codeLines.length){
    const line = codeLines[li];
    if(ci <= line.length){
      typedEl.innerHTML = out + line.slice(0, ci) + '<span style="opacity:.6">▍</span>';
      ci++;
      setTimeout(typeLoop, 16);
    } else {
      out += line + '\n';
      li++; ci=0;
      setTimeout(typeLoop, 120);
    }
  } else {
    setTimeout(()=>{ out=''; li=0; ci=0; typeLoop(); }, 2200);
  }
}
typeLoop();

/* ---------- Duplicate marquee for seamless loop ---------- */
const track = document.getElementById('marqueeTrack');
track.innerHTML += track.innerHTML;

/* ---------- Counters ---------- */
document.querySelectorAll('.counter').forEach(counter=>{
  ScrollTrigger.create({
    trigger: counter,
    start: 'top 90%',
    once: true,
    onEnter: ()=>{
      const target = +counter.dataset.target;
      gsap.to(counter, {
        innerText: target,
        duration: 1.6,
        ease: 'power2.out',
        snap: {innerText: 1},
        onUpdate: function(){ counter.innerText = Math.floor(counter.innerText); }
      });
    }
  });
});

/* ---------- Skill bars ---------- */
document.querySelectorAll('.bar-fill').forEach(bar=>{
  ScrollTrigger.create({
    trigger: bar,
    start: 'top 90%',
    once: true,
    onEnter: ()=>{ bar.style.width = bar.dataset.width + '%'; }
  });
});

/* ---------- Reveal animations ---------- */
gsap.utils.toArray('.reveal').forEach((el, i)=>{
  gsap.to(el, {
    opacity:1, y:0, duration:.9, ease:'power3.out',
    scrollTrigger:{ trigger:el, start:'top 88%', once:true }
  });
});

/* ---------- Hero entrance timeline ---------- */
gsap.timeline({defaults:{ease:'power3.out'}})
  .from('.badge-live', {opacity:0, y:-20, duration:.6})
  .from('.hero-title', {opacity:0, y:40, duration:.8}, '-=.3')
  .from('.hero-desc', {opacity:0, y:20, duration:.7}, '-=.4')
  .from('.hero-in .d-flex.flex-wrap', {opacity:0, y:20, duration:.7}, '-=.5')
  .from('.hud-frame', {opacity:0, scale:.9, duration:.8}, '-=.6')
  .from('.term', {opacity:0, duration:.6}, '-=.5')
  .from('.float-badge', {opacity:0, scale:.7, stagger:.15, duration:.6}, '-=.4');

/* Floating badges idle animation */
gsap.to('.fb-1', {y:14, duration:3, yoyo:true, repeat:-1, ease:'sine.inOut'});
gsap.to('.fb-2', {y:-14, duration:3.4, yoyo:true, repeat:-1, ease:'sine.inOut'});
gsap.to('.fb-3', {y:12, duration:2.8, yoyo:true, repeat:-1, ease:'sine.inOut'});
gsap.to('.fb-4', {y:-10, duration:3.2, yoyo:true, repeat:-1, ease:'sine.inOut'});

/* ---------- Project filter ---------- */
document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    document.querySelectorAll('.proj-item').forEach(item=>{
      const show = filter === 'all' || item.dataset.cat === filter;
      gsap.to(item, {
        opacity: show ? 1 : 0,
        scale: show ? 1 : .9,
        duration:.35,
        onStart:()=>{ if(show) item.style.display='block'; },
        onComplete:()=>{ if(!show) item.style.display='none'; }
      });
    });
  });
});

/* ---------- Contact form ---------- */
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  document.getElementById('formSuccess').style.display = 'block';
  this.reset();
  setTimeout(()=>{ document.getElementById('formSuccess').style.display = 'none'; }, 4000);
});

/* ---------- Navbar shrink on scroll ---------- */
ScrollTrigger.create({
  start: 'top -80',
  end: 99999,
  toggleClass: {targets: '.navbar-glass', className: 'scrolled'}
});
