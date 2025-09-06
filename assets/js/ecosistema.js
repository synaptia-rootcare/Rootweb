// ecosistema.js — popups para Ecosistema

(function () {
  const pop = document.getElementById('eco-pop');
  if (!pop) return;

  const tiles = document.querySelectorAll('.eco-tile');

  const show = (tile, x, y) => {
    pop.querySelector('h4').textContent = tile.dataset.title || '';
    pop.querySelector('p').textContent  = tile.dataset.desc  || '';
    pop.style.display = 'block';

    // posicionamiento cerca del cursor sin salirse del viewport
    const pad = 12;
    // primero mostrar para leer medidas reales
    const r = pop.getBoundingClientRect();
    let left = x + pad;
    let top  = y + pad;

    if (left + r.width > window.innerWidth - pad)  left = x - r.width - pad;
    if (top  + r.height > window.innerHeight - pad) top = y - r.height - pad;

    pop.style.left = left + 'px';
    pop.style.top  = top  + 'px';
    pop.setAttribute('aria-hidden', 'false');
  };

  const hide = () => {
    pop.style.display = 'none';
    pop.setAttribute('aria-hidden', 'true');
  };

  tiles.forEach((t) => {
    // Desktop
    t.addEventListener('mousemove', (e) => show(t, e.clientX, e.clientY));
    t.addEventListener('mouseenter', (e) => show(t, e.clientX, e.clientY));
    t.addEventListener('mouseleave', hide);

    // Móvil: tap para alternar
    t.addEventListener('click', (e) => {
      if (pop.style.display === 'block') hide();
      else show(t, e.clientX || window.innerWidth / 2, e.clientY || window.innerHeight / 2);
    });
  });

  // Cerrar si haces clic fuera
  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('eco-tile') && !pop.contains(e.target)) hide();
  });
})();
