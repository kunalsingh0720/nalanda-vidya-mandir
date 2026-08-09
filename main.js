// ==========================================================================
// Nalanda Vidya Mandir — site behaviour
// ==========================================================================

// Mobile nav toggle
var navToggle = document.getElementById('navToggle');
var mainNav = document.getElementById('mainNav');
navToggle.addEventListener('click', function () {
  var open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.getElementById('navToggleIcon').innerHTML = open
    ? '<path d="M6 6l12 12M18 6 6 18"/>'
    : '<path d="M4 7h16M4 12h16M4 17h16"/>';
});
document.querySelectorAll('#mainNav a').forEach(function (a) {
  a.addEventListener('click', function () {
    mainNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.getElementById('navToggleIcon').innerHTML = '<path d="M4 7h16M4 12h16M4 17h16"/>';
  });
});

// Sticky header shadow
var header = document.getElementById('siteHeader');
window.addEventListener('scroll', function () {
  header.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });

// Scroll-spy active nav link
var navLinks = Array.from(document.querySelectorAll('#mainNav a'));
var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute('href')); }).filter(Boolean);
var spy = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var id = '#' + entry.target.id;
      navLinks.forEach(function (a) { a.classList.toggle('active', a.getAttribute('href') === id); });
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(function (s) { spy.observe(s); });

// Reveal on scroll
var reveals = document.querySelectorAll('.reveal');
var ro = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) { entry.target.classList.add('in'); ro.unobserve(entry.target); }
  });
}, { threshold: 0.12 });
reveals.forEach(function (el) { ro.observe(el); });

// Animated counters
var counters = document.querySelectorAll('.stat b[data-count]');
var counted = new WeakSet();
var co = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (!entry.isIntersecting || counted.has(entry.target)) return;
    var el = entry.target;
    counted.add(el);
    if (el.dataset.plain) { return; }
    var target = parseInt(el.dataset.count, 10);
    var suffix = el.dataset.suffix || '';
    var duration = 1100;
    var t0 = performance.now();
    function tick(t) {
      var p = Math.min(1, (t - t0) / duration);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(eased * target).toLocaleString('en-IN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}, { threshold: 0.5 });
counters.forEach(function (el) { co.observe(el); });

// Portal role tabs (visual only)
document.querySelectorAll('.role-tabs button').forEach(function (btn) {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.role-tabs button').forEach(function (b) { b.classList.remove('active'); });
    btn.classList.add('active');
  });
});

// Demo form handlers
document.getElementById('portalForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('portalNote').textContent = 'Not connected yet — wire this form up to your school’s SIS/LMS to enable real logins.';
});
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  document.getElementById('contactNote').textContent = 'Thanks — in a live version this would send now. Connect a form service or backend to activate it.';
});

document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Lightbox for gallery + Instagram tiles ----------
var lightbox = document.getElementById('lightbox');
var lightboxImg = document.getElementById('lightboxImg');
var lightboxCaption = document.getElementById('lightboxCaption');

function openLightbox(src, caption) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightboxImg.alt = caption || '';
  lightboxCaption.textContent = caption || '';
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
document.querySelectorAll('[data-lightbox]').forEach(function (tile) {
  tile.addEventListener('click', function () {
    var img = tile.querySelector('img');
    if (!img) return; // placeholder tile with no real photo yet
    openLightbox(img.src, tile.dataset.caption || img.alt);
  });
});
document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLightbox(); });
