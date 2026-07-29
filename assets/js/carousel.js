/* ==========================================================================
   CAROUSEL & AUTOMATED SLIDESHOW MODULE
   Top hero photo highlights (5s) & Formal photos grid carousel (3s)
   ========================================================================== */

export function initCarousels() {
  initHeroCarousel(5000);
  initFormalCarousel(3000);
}

/* Hero Top Photos Carousel (5 Seconds) */
function initHeroCarousel(intervalMs) {
  const heroImg = document.getElementById('heroProfileImg');
  const thumbBtns = document.querySelectorAll('.photo-thumb-btn');
  const heroCard = document.getElementById('heroImageCard');

  if (!heroImg || thumbBtns.length === 0) return;

  let currentIndex = 0;
  let timer = null;
  let isHovered = false;

  function switchPhoto(index) {
    currentIndex = index;
    thumbBtns.forEach((b, i) => b.classList.toggle('active', i === index));

    const newSrc = thumbBtns[index].getAttribute('data-src');
    heroImg.style.opacity = '0';
    setTimeout(() => {
      heroImg.src = newSrc;
      heroImg.style.opacity = '1';
    }, 200);
  }

  function nextPhoto() {
    if (isHovered) return;
    const nextIdx = (currentIndex + 1) % thumbBtns.length;
    switchPhoto(nextIdx);
  }

  function startTimer() {
    stopTimer();
    timer = setInterval(nextPhoto, intervalMs);
  }

  function stopTimer() {
    if (timer) clearInterval(timer);
  }

  // Thumbnail click listener
  thumbBtns.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      switchPhoto(idx);
      startTimer(); // Reset auto timer on click
    });
  });

  // Pause auto-play on card hover
  if (heroCard) {
    heroCard.addEventListener('mouseenter', () => { isHovered = true; });
    heroCard.addEventListener('mouseleave', () => { isHovered = false; });
  }

  startTimer();
}

/* Formal Photos Carousel (3 Seconds) */
function initFormalCarousel(intervalMs) {
  const formalItems = document.querySelectorAll('#achievements .gallery-wrapper:nth-of-type(2) .gallery-item');
  if (formalItems.length === 0) return;

  let currentFormalIdx = 0;
  let formalTimer = null;
  let isFormalHovered = false;

  function highlightFormalPhoto(index) {
    formalItems.forEach((item, i) => {
      if (i === index) {
        item.style.transform = 'scale(1.06)';
        item.style.borderColor = 'var(--accent-purple)';
        item.style.boxShadow = '0 0 20px rgba(168, 85, 247, 0.4)';
        item.style.zIndex = '2';
      } else {
        item.style.transform = '';
        item.style.borderColor = '';
        item.style.boxShadow = '';
        item.style.zIndex = '';
      }
    });
  }

  function nextFormal() {
    if (isFormalHovered) return;
    highlightFormalPhoto(currentFormalIdx);
    currentFormalIdx = (currentFormalIdx + 1) % formalItems.length;
  }

  const container = document.querySelector('#achievements .gallery-wrapper:nth-of-type(2)');
  if (container) {
    container.addEventListener('mouseenter', () => { isFormalHovered = true; });
    container.addEventListener('mouseleave', () => { isFormalHovered = false; });
  }

  formalTimer = setInterval(nextFormal, intervalMs);
}
