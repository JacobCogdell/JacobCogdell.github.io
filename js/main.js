/* ═══════════════════════════════════════════════════════
   Jacob Cogdell — Portfolio  |  main.js
   ═══════════════════════════════════════════════════════ */

'use strict';

/* ── Scroll Progress Bar ─────────────────────────────── */
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = document.documentElement.scrollTop || document.body.scrollTop;
    const total    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progressBar.style.width = total > 0 ? (scrolled / total * 100) + '%' : '0%';
  }, { passive: true });
}

/* ── Active Nav Highlight on Scroll ─────────────────── */
const navLinks = document.querySelectorAll('.nav-links a:not(.nav-resume)');
const sections = document.querySelectorAll('section[id]');

function setActiveNav() {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
}
window.addEventListener('scroll', setActiveNav, { passive: true });
setActiveNav();

/* ── Hamburger / Mobile Nav ─────────────────────────── */
const hamburger         = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('nav-links');

if (hamburger && navLinksContainer) {
  hamburger.addEventListener('click', () => {
    const isOpen = navLinksContainer.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
  document.addEventListener('click', e => {
    if (!hamburger.contains(e.target) && !navLinksContainer.contains(e.target)) {
      navLinksContainer.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    }
  });
}

/* ── Smooth Scroll ───────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

/* ── Reveal on Scroll ────────────────────────────────── */
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); obs.unobserve(entry.target); }
    });
  }, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => obs.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('visible'));
}

/* ── Project Filter ─────────────────────────────────── */
const filterBar   = document.getElementById('filter-bar');
const projectGrid = document.getElementById('project-grid');

if (filterBar && projectGrid) {
  const cards      = Array.from(projectGrid.querySelectorAll('.project-card'));
  const filterBtns = Array.from(filterBar.querySelectorAll('.filter-btn'));

  // Inject filter animation style
  const s = document.createElement('style');
  s.textContent = `
    @keyframes filterPop { from { opacity:0; transform:translateY(10px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
    .project-card.filter-pop { animation: filterPop .28s ease forwards; }
    .project-card.hidden { display: none !important; }
  `;
  document.head.appendChild(s);

  function applyFilter(filter) {
    cards.forEach(card => {
      const skills = (card.dataset.skills || '').split(' ');
      const show   = filter === 'all' || skills.includes(filter);
      card.classList.toggle('hidden', !show);
    });
    cards.filter(c => !c.classList.contains('hidden')).forEach((card, i) => {
      card.classList.remove('filter-pop');
      void card.offsetWidth; // reflow
      card.style.animationDelay = (i * 0.05) + 's';
      card.classList.add('filter-pop');
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilter(btn.dataset.filter);
    });
    btn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });
}

/* ── Navbar shadow on scroll ─────────────────────────── */
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 20px rgba(0,0,0,.5)' : 'none';
  }, { passive: true });
}

/* ── Footer Year ─────────────────────────────────────── */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();
