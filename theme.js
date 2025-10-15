// theme.js — handles light/dark theme toggle & remembers preference
(function () {
  const toggles = document.querySelectorAll('.theme-toggle');
  const body = document.body;
  const key = 'af_theme_v2';

  // apply saved theme
  const saved = localStorage.getItem(key);
  if (saved === 'light') {
    body.classList.add('light');
    setIcons('☀️');
  } else {
    setIcons('🌙');
  }

  // add click listeners to all toggle buttons (present on each page)
  toggles.forEach(btn => {
    btn.addEventListener('click', () => {
      body.classList.toggle('light');
      body.classList.add('theme-transition');
      setTimeout(() => body.classList.remove('theme-transition'), 700);
      const isLight = body.classList.contains('light');
      localStorage.setItem(key, isLight ? 'light' : 'dark');
      setIcons(isLight ? '☀️' : '🌙');
    });
  });

  function setIcons(icon) {
    toggles.forEach(t => t.textContent = icon);
  }
})();
