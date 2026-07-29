/* ==========================================================================
   MAIN JS ENTRY POINT
   Imports and initializes all modules for Md. Minhaj Rowfun Rabbi Anik E-Portfolio
   ========================================================================== */

import { initThemeSwitcher } from './theme.js';
import { initCursorEffects } from './cursor-effects.js';
import { initTiltEffects } from './tilt-effects.js';
import { initProjectFilters } from './projects-filter.js';
import { initGalleryLightbox } from './gallery-lightbox.js';
import { initContactForm } from './contact-form.js';
import { initCarousels } from './carousel.js';

document.addEventListener('DOMContentLoaded', () => {
  initThemeSwitcher();
  initCursorEffects();
  initTiltEffects();
  initProjectFilters();
  initGalleryLightbox();
  initContactForm();
  initCarousels();
  initMobileNav();
  initNavbarVisibilityToggle();
  initScrollSpy();
});

/* --------------------------------------------------------------------------
   Hide / Show Navigation Bar Toggle
   -------------------------------------------------------------------------- */
function initNavbarVisibilityToggle() {
  const navbar = document.getElementById('navbar');
  const hideBtn = document.getElementById('navHideBtn');
  const showBtn = document.getElementById('navShowBtn');

  if (!navbar || !hideBtn || !showBtn) return;

  hideBtn.addEventListener('click', () => {
    navbar.classList.add('hidden');
    showBtn.classList.add('visible');
  });

  showBtn.addEventListener('click', () => {
    navbar.classList.remove('hidden');
    showBtn.classList.remove('visible');
  });
}

/* --------------------------------------------------------------------------
   Mobile Navigation Menu Toggle
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-nav-toggle');
  const menu = document.querySelector('.mobile-nav-menu');
  if (!toggleBtn || !menu) return;

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('open');
    const icon = toggleBtn.querySelector('i');
    icon.className = menu.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
  });

  document.querySelectorAll('.mobile-nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggleBtn.querySelector('i').className = 'fas fa-bars';
    });
  });
}

/* --------------------------------------------------------------------------
   Active Nav Link Scroll Spy
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(s => observer.observe(s));
}
