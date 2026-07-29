/* ==========================================================================
   TIME-BASED AUTO THEME SWITCHER MODULE
   - Morning (6:00 - 11:59): Colourful Theme
   - Afternoon / Evening (12:00 - 18:59): Light Theme
   - Night / Late Night (19:00 - 5:59): Dark Theme
   - Remembers manual user preference if clicked
   ========================================================================== */

export function initThemeSwitcher() {
  const themeBtns = document.querySelectorAll('.theme-btn');
  const savedTheme = localStorage.getItem('portfolio-theme');

  // Determine initial theme: use saved preference if user clicked one, otherwise calculate time-based
  const initialTheme = savedTheme ? savedTheme : getTimeBasedTheme();

  setTheme(initialTheme);

  themeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const theme = btn.getAttribute('data-theme-val');
      setTheme(theme);
      localStorage.setItem('portfolio-theme', theme);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    themeBtns.forEach(btn => {
      if (btn.getAttribute('data-theme-val') === theme) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function getTimeBasedTheme() {
    const currentHour = new Date().getHours();

    // Morning: 06:00 to 11:59 -> Colourful mode
    if (currentHour >= 6 && currentHour < 12) {
      return 'colourful';
    }
    // Afternoon / Evening: 12:00 to 18:59 -> Light mode
    else if (currentHour >= 12 && currentHour < 19) {
      return 'light';
    }
    // Night: 19:00 to 05:59 -> Dark mode
    else {
      return 'dark';
    }
  }
}
