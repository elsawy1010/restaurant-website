// assets/js/main.js

// NAV TOGGLE (محمول)
document.addEventListener('DOMContentLoaded', () => {
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  navToggle?.addEventListener('click', () => {
    const showing = getComputedStyle(navLinks).display !== 'none';
    if (showing) navLinks.style.display = 'none';
    else navLinks.style.display = 'flex';
  });

  // Reveal on scroll (IntersectionObserver)
  const reveals = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // optional: unobserve after reveal
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(r => obs.observe(r));

  // Simple horizontal carousel controls
  const carousel = document.getElementById('offers-carousel');
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (carousel && prevBtn && nextBtn) {
    const step = 300; // pixels to move
    prevBtn.addEventListener('click', () => carousel.scrollBy({ left: -step, behavior: 'smooth' }));
    nextBtn.addEventListener('click', () => carousel.scrollBy({ left: step, behavior: 'smooth' }));
  }

  // small hover tilt effect for offer cards
  document.querySelectorAll('.offer-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width/2;
      const y = e.clientY - rect.top - rect.height/2;
      card.style.transform = `translateY(-6px) perspective(600px) rotateX(${(-y/20)}deg) rotateY(${(x/20)}deg)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
});
