/* ==========================================================================
   HIGH-INTENSITY CURSOR EFFECTS & CLICK RIPPLE MODULE
   Spotlight tracking, smooth glowing follower ring, and click pulse wave
   ========================================================================== */

export function initCursorEffects() {
  const follower = document.querySelector('.custom-cursor-follower');

  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  // Track raw mouse position for spotlight
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Update CSS vars for global spotlight glow
    const xPct = (e.clientX / window.innerWidth) * 100;
    const yPct = (e.clientY / window.innerHeight) * 100;
    document.documentElement.style.setProperty('--mouse-x', `${xPct}%`);
    document.documentElement.style.setProperty('--mouse-y', `${yPct}%`);

    // Per-card cursor tracking
    updateCardCursorPosition(e);
  });

  // Global Click Ripple Wave Effect (Delegated event listener)
  document.addEventListener('click', (e) => {
    createClickRipple(e.clientX, e.clientY);
  });

  function createClickRipple(x, y) {
    const ripple = document.createElement('div');
    ripple.className = 'click-ripple';
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.style.width = '44px';
    ripple.style.height = '44px';

    document.body.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 550);
  }

  // Smooth follower ring animation (lagging behind)
  function animateFollower() {
    followerX += (mouseX - followerX) * 0.14;
    followerY += (mouseY - followerY) * 0.14;

    if (follower) {
      follower.style.left = followerX + 'px';
      follower.style.top = followerY + 'px';
    }

    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  // Delegated Hover listener (works across dynamic elements and theme switches)
  document.addEventListener('mouseover', (e) => {
    const target = e.target.closest('a, button, .project-card, .glass-card, .gallery-item, .filter-btn, .theme-btn, .photo-thumb-btn, .skill-tag');
    if (target) {
      document.body.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', (e) => {
    const target = e.target.closest('a, button, .project-card, .glass-card, .gallery-item, .filter-btn, .theme-btn, .photo-thumb-btn, .skill-tag');
    if (target) {
      document.body.classList.remove('cursor-hover');
    }
  });

  // Magnetic button effect – buttons attract slightly toward cursor on hover
  document.addEventListener('mousemove', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-secondary');
    if (btn) {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * 0.2;
      const dy = (e.clientY - cy) * 0.2;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.03)`;
    }
  });

  document.addEventListener('mouseout', (e) => {
    const btn = e.target.closest('.btn-primary, .btn-secondary');
    if (btn) {
      btn.style.transform = '';
    }
  });
}

function updateCardCursorPosition(e) {
  const cards = document.querySelectorAll('.project-card, .glass-card');
  cards.forEach(card => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--card-mouse-x', `${x}px`);
    card.style.setProperty('--card-mouse-y', `${y}px`);
  });
}
