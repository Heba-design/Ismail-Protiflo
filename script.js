/* ── SMOOTH SCROLL ─── */
function scrollToSection(e, id) {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const offset = 64;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

/* ── NAVBAR ACTIVE + SCROLL ─── */
window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  nav.classList.toggle('scrolled', window.scrollY > 20);

  const sections = ['about','skills','services','projects','experience','contact'];
  let current = 'about';
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el && window.scrollY >= el.offsetTop - 100) current = id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
});

/* ── REVEAL ON SCROLL ─── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // animate skill bars
      e.target.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 200);
      });
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal').forEach(el => {
  observer.observe(el);
  // also animate bars if already in view on page load
  el.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
    bar.style.width = '0%';
  });
});

/* also trigger bars for non-reveal skill cards */
const skillObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar[data-w]').forEach(bar => {
        setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, 300);
      });
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-card').forEach(c => skillObs.observe(c));

/* ── MOBILE MENU ─── */
let menuOpen = false;
function toggleMobileMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobileNav').classList.toggle('open', menuOpen);
  const [b1, b2, b3] = [document.getElementById('mb1'), document.getElementById('mb2'), document.getElementById('mb3')];
  if (menuOpen) {
    b1.style.cssText = 'transform:rotate(45deg) translate(5px,5px)';
    b2.style.cssText = 'opacity:0';
    b3.style.cssText = 'transform:rotate(-45deg) translate(5px,-5px)';
  } else {
    b1.style.cssText = b2.style.cssText = b3.style.cssText = '';
  }
}
function closeMobileMenu() {
  menuOpen = false;
  document.getElementById('mobileNav').classList.remove('open');
  [document.getElementById('mb1'), document.getElementById('mb2'), document.getElementById('mb3')].forEach(b => b.style.cssText = '');
}
/* ── CONTACT FORM ─── */
function handleSubmit(e) {
  const form = e.target;
  const name    = form.querySelector('input[type="text"]').value.trim();
  const email   = form.querySelector('input[type="email"]').value.trim();
  const message = form.querySelector('textarea').value.trim();

  const subject = encodeURIComponent('New Message from Portfolio - ' + name);
  const body    = encodeURIComponent(
    'Name: ' + name + '\n' +
    'Email: ' + email + '\n\n' +
    'Message:\n' + message
  );

  window.location.href =
    'mailto:ismail.mohamed.data@gmail.com?subject=' + subject + '&body=' + body;

  // Show success feedback
  const btn = form.querySelector('.form-submit');
  btn.textContent = '✓ Opening Email App...';
  btn.style.background = '#22c55e';
  setTimeout(() => {
    btn.textContent = 'Send Message';
    btn.style.background = '';
    form.reset();
  }, 3000);
}
