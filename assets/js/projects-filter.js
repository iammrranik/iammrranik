/* ==========================================================================
   PROJECT CATEGORY FILTER MODULE
   ========================================================================== */

export function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const shouldShow = filter === 'all' || category.includes(filter);

        if (shouldShow) {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.92)';
          card.style.display = 'flex';
          requestAnimationFrame(() => {
            card.style.transition = 'opacity 0.35s ease, transform 0.35s cubic-bezier(0.34,1.56,0.64,1)';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          });
        } else {
          card.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => { card.style.display = 'none'; }, 260);
        }
      });
    });
  });
}
