/* ==========================================================================
   3D CARD TILT EFFECT MODULE
   Subtle tilt with gentle translateZ depth on all cards
   ========================================================================== */

export function initTiltEffects() {
  const tiltCards = document.querySelectorAll('.project-card, .hero-image-card, .glass-card');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Softened tilt: ±6 degree max rotation
      const rotX = ((y - centerY) / centerY) * -6;
      const rotY = ((x - centerX) / centerX) * 6;

      card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`;
      card.style.transition = 'transform 0.1s ease-out';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      card.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });
}
