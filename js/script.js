document.addEventListener('DOMContentLoaded', () => {

  /* ---- Hero entrance ---- */
  const hero = document.getElementById('hero');
  requestAnimationFrame(() => hero.classList.add('is-ready'));

  /* ---- Mobile nav toggle ---- */
  const navToggle = document.getElementById('navToggle');
  const sidebar = document.getElementById('sidebar');

  navToggle.addEventListener('click', () => {
    const isOpen = sidebar.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen);
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      sidebar.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', false);
    });
  });

  /* ---- Scroll-spy: active section + sliding nav indicator ---- */
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const navIndicator = document.getElementById('navIndicator');
  const sections = navLinks
    .map(link => document.getElementById(link.dataset.section))
    .filter(Boolean);

  function setActive(link) {
    if (!link) return;
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    const offset = link.offsetTop - navLinks[0].parentElement.offsetTop;
    navIndicator.style.transform = `translateY(${offset - 2}px)`;
    navIndicator.classList.add('active');
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const link = navLinks.find(l => l.dataset.section === entry.target.id);
          setActive(link);
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });

    sections.forEach(section => observer.observe(section));
  }

});
