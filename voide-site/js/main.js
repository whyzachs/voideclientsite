/* ── Custom Cursor ── */
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');

let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
function animCursor() {
  cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
  cursor.style.left = cx + 'px'; cursor.style.top = cy + 'px';
  cursorDot.style.left = mx + 'px'; cursorDot.style.top = my + 'px';
  requestAnimationFrame(animCursor);
}
animCursor();
document.querySelectorAll('a, button, [data-hover]').forEach(el => {
  el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
  el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
});

/* ── Navbar scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Counter animation ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = el.dataset.target.includes('+') ? '+' : (el.dataset.target.includes('%') ? '%' : '');
  let current = 0;
  const step = target / 60;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) { current = target; clearInterval(timer); }
    el.textContent = Math.floor(current).toLocaleString() + suffix;
  }, 16);
}
const statsObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      statsObs.disconnect();
    }
  });
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObs.observe(statsEl);

/* ── Scroll reveal for feature cards ── */
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const delay = e.target.dataset.delay || 0;
      setTimeout(() => e.target.classList.add('visible'), parseInt(delay));
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.feature-card').forEach(el => revealObs.observe(el));

/* ── Parallax hero visual ── */
window.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 20;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  const visual = document.querySelector('.hero-visual');
  if (visual) visual.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  const orbs = document.querySelectorAll('.orb');
  orbs.forEach((o, i) => {
    const f = (i + 1) * 0.05;
    o.style.transform = `translate(${x * f}px, ${y * f}px)`;
  });
});
