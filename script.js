/* ─── NAVBAR SCROLL ──────────────────────────────────────── */
const navbar = document.querySelector('.navbar');
const scrollHint = document.querySelector('.scroll-hint');
let lastY = 0;

window.addEventListener('scroll', () => {
  const y = window.scrollY;
  navbar.classList.toggle('scrolled', y > 30);
  if (scrollHint && y > 40) scrollHint.style.opacity = '0';
  lastY = y;
}, { passive: true });

/* ─── NAV ACTIVE LINKS ───────────────────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
sections.forEach(s =>
  new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting)
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
    });
  }, { rootMargin: '-30% 0px -60% 0px' }).observe(s)
);

/* ─── SCROLL ANIMATIONS ──────────────────────────────────── */
const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      animObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '-50px' });

document.querySelectorAll('.service-card, .portfolio-card, .why-card, .reveal-on-scroll').forEach(el => animObserver.observe(el));

/* ─── HAMBURGER MENU ─────────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    mobileMenu.setAttribute('aria-hidden', !isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  mobileMenu.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* ─── COPIER EMAIL ───────────────────────────────────────── */
const copyBtn = document.getElementById('copy-btn');
const copyText = document.getElementById('copy-text');
if (copyBtn) {
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText('adrianocorrenti45@gmail.com').then(() => {
      copyText.textContent = '✓ Email copié !';
      copyBtn.classList.add('copied');
      setTimeout(() => {
        copyText.textContent = 'adrianocorrenti45@gmail.com';
        copyBtn.classList.remove('copied');
      }, 2500);
    });
  });
}

/* ─── FORMULAIRE → mailto ────────────────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name        = document.getElementById('name').value.trim();
    const email       = document.getElementById('email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const message     = document.getElementById('message').value.trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent('Nouveau projet — ' + (projectType || 'Site web') + ' | CrtDev');
    const body    = encodeURIComponent(
      'Prénom : ' + name +
      '\nEmail : ' + email +
      '\nType de projet : ' + (projectType || 'Non précisé') +
      '\n\n' + message
    );

    window.location.href = 'mailto:adrianocorrenti45@gmail.com?subject=' + subject + '&body=' + body;

    const btn = form.querySelector('button[type="submit"]');
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Votre appli mail s\'ouvre…';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = original;
      btn.style.background = '';
      btn.disabled = false;
      form.reset();
    }, 4000);
  });
}

/* ─── SMOOTH SCROLL ──────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ─── APPLE SCROLL ANIMATION ─────────────────────────────── */
const appleSection = document.querySelector('.apple-scroll-section');
if (appleSection) {
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const rect = appleSection.getBoundingClientRect();
        const maxScroll = rect.height - window.innerHeight;
        const currentScroll = -rect.top;
        let progress = currentScroll > 0 ? currentScroll / maxScroll : 0;
        progress = Math.max(0, Math.min(1, progress));
        appleSection.style.setProperty('--progress', progress.toFixed(3));
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}
