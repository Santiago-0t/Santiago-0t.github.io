// Theme toggle (persists per visitor) and scroll reveal.
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme');

  const currentTheme = () =>
    root.dataset.theme ||
    (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');

  button?.addEventListener('click', () => {
    const next = currentTheme() === 'dark' ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
  });

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const targets = document.querySelectorAll('.section-head, .card, .paper, .awards li, .timeline li, .callout');
  if (!('IntersectionObserver' in window)) return;
  targets.forEach((el) => el.classList.add('reveal'));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  targets.forEach((el) => observer.observe(el));
})();
