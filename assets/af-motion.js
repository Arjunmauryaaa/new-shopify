(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('[data-af-orbit]').forEach((hero) => {
    const stage = hero.querySelector('[data-af-tilt]');
    if (!stage || reducedMotion || !window.matchMedia('(pointer: fine)').matches) return;

    let frame = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;

    const render = () => {
      currentX += (pointerX - currentX) * 0.08;
      currentY += (pointerY - currentY) * 0.08;
      stage.style.setProperty('--af-tilt-x', `${currentX.toFixed(2)}deg`);
      stage.style.setProperty('--af-tilt-y', `${currentY.toFixed(2)}deg`);
      if (Math.abs(pointerX - currentX) + Math.abs(pointerY - currentY) > 0.02) {
        frame = window.requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    hero.addEventListener('pointermove', (event) => {
      const bounds = stage.getBoundingClientRect();
      pointerX = ((event.clientX - bounds.left) / bounds.width - 0.5) * 9;
      pointerY = ((event.clientY - bounds.top) / bounds.height - 0.5) * -7;
      if (!frame) frame = window.requestAnimationFrame(render);
    }, { passive: true });

    hero.addEventListener('pointerleave', () => {
      pointerX = 0;
      pointerY = 0;
      if (!frame) frame = window.requestAnimationFrame(render);
    });
  });

  const revealItems = document.querySelectorAll('[data-af-reveal]');
  if (reducedMotion || !('IntersectionObserver' in window)) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      entry.target.classList.remove('af-motion-pending');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => {
    item.classList.add('af-motion-pending');
    observer.observe(item);
  });
})();
