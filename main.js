// main.js — page transitions, nav active, parallax, preloader, contact demo
(function () {
  const page = document.getElementById('page');
  const preloader = document.getElementById('preloader');

  // ------- Preloader & Page Enter -------
  function onReady() {
    document.body.classList.add('page-ready');
    page.classList.add('entered');
    // hide preloader after slight delay
    setTimeout(() => {
      if (preloader) preloader.style.display = 'none';
    }, 450);
  }

  // simulate quick load; in production hook into window.onload if heavy assets
  window.addEventListener('load', onReady);

  // ------- Page transition for internal links -------
  // Intercept nav clicks and animate exit then navigate
  document.querySelectorAll('a[data-anim-link], .nav-links a').forEach(a => {
    a.addEventListener('click', function (ev) {
      const href = a.getAttribute('href');
      // if this is an external anchor or blank, let default
      if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('http')) return;
      ev.preventDefault();
      // add exiting animation
      page.classList.add('exiting');
      setTimeout(() => { window.location.href = href; }, 380);
    });
  });

  // ------- set active nav link -------
  (function setActiveNav() {
    const navs = document.querySelectorAll('[data-nav]');
    const path = location.pathname.split('/').pop() || 'index.html';
    navs.forEach(a => {
      const href = a.getAttribute('href');
      if (href && href.endsWith(path)) a.classList.add('active');
      else if (path === '' && href && href.includes('index.html')) a.classList.add('active');
      else a.classList.remove('active');
    });
  })();

  // ------- Simple parallax (data-parallax) -------
  const parallaxEls = Array.from(document.querySelectorAll('[data-parallax]'));
  function onScrollParallax() {
    const scrolled = window.scrollY;
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallaxSpeed) || 0.15;
      // calculate relative offset of element to viewport center for a subtle effect
      const rect = el.getBoundingClientRect();
      const offset = (rect.top - window.innerHeight / 2) * speed;
      el.style.transform = `translate3d(0, ${-offset}px, 0)`;
    });
  }
  window.addEventListener('scroll', onScrollParallax, { passive: true });
  window.addEventListener('resize', onScrollParallax);

  // initial parallax position
  requestAnimationFrame(onScrollParallax);

  // ------- Small appear-on-scroll using IntersectionObserver -------
  const fadeEls = document.querySelectorAll('[data-fade]');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = 1;
          e.target.style.transform = 'none';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.16 });
    fadeEls.forEach(el => io.observe(el));
  } else {
    // fallback: reveal all
    fadeEls.forEach(el => { el.style.opacity = 1; el.style.transform = 'none'; });
  }

  // ------- Contact demo form handling -------
  const contactForm = document.getElementById('contactForm');
  const contactStatus = document.getElementById('contactStatus');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      contactStatus.textContent = 'Sending...';
      contactStatus.style.color = 'var(--muted)';
      setTimeout(() => {
        contactStatus.textContent = 'Thanks — message sent (demo). We will contact you soon.';
        contactStatus.style.color = 'limegreen';
        contactForm.reset();
      }, 900);
    });
  }

})();
