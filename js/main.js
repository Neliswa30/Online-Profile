/* ==========================================================================
   Shared JavaScript utilities
   ========================================================================== */

// Simple DOM helpers
const $ = sel => document.querySelector(sel);
const $$ = sel => Array.from(document.querySelectorAll(sel));

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger?.addEventListener('click', () => {
  const isOpen = navLinks.style.display === 'flex';
  navLinks.style.display = isOpen ? '' : 'flex';
  navLinks.style.flexDirection = 'column';
  hamburger.setAttribute('aria-expanded', String(!isOpen));
});

// Close nav on link click (mobile)
$$('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    if (window.innerWidth < 720) {
      navLinks.style.display = '';
      hamburger?.setAttribute('aria-expanded', 'false');
    }
  });
});

/* ---------- Theme Toggle ---------- */
const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;

// Load saved theme
const storedTheme = localStorage.getItem('theme');
if (storedTheme) {
  root.setAttribute('data-theme', storedTheme);
}

// Theme toggle functionality
if (themeToggle) {
  // Set initial icon
  themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
  
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    
    root.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
  });
}

/* ---------- Intersection Observer for Animations ---------- */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// Observe all elements with 'reveal' class
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));