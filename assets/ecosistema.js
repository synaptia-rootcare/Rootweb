// ecosistema.js
// Maneja los popups de la sección Ecosistema

(function () {
  const pop = document.getElementById("eco-pop");
  const tiles = document.querySelectorAll(".eco-tile");

  // Mostrar popup
  const show = (tile, x, y) => {
    pop.querySelector("h4").textContent = tile.dataset.title || "";
    pop.querySelector("p").textContent = tile.dataset.desc || "";
    pop.style.display = "block";

    // Calcular posición sin que se salga de la pantalla
    const pad = 12;
    const rect = pop.getBoundingClientRect();
    let left = x + pad;
    let top = y + pad;

    if (left + rect.width > window.innerWidth - pad) {
      left = x - rect.width - pad;
    }
    if (top + rect.height > window.innerHeight - pad) {
      top = y - rect.height - pad;
    }

    pop.style.left = left + "px";
    pop.style.top = top + "px";
    pop.setAttribute("aria-hidden", "false");
  };

  // Ocultar popup
  const hide = () => {
    pop.style.display = "none";
    pop.setAttribute("aria-hidden", "true");
  };

  // Eventos por cada tarjeta
  tiles.forEach((t) => {
    t.addEventListener("mousemove", (e) =>
      show(t, e.clientX, e.clientY)
    );
    t.addEventListener("mouseenter", (e) =>
      show(t, e.clientX, e.clientY)
    );
    t.addEventListener("mouseleave", hide);

    // Soporte móvil: un toque muestra, otro toque oculta
    t.addEventListener("click", (e) => {
      if (pop.style.display === "block") {
        hide();
      } else {
        show(
          t,
          e.clientX || window.innerWidth / 2,
          e.clientY || window.innerHeight / 2
        );
      }
    });
  });

  // Cerrar popup si se hace clic fuera
  document.addEventListener("click", (e) => {
    if (
      !e.target.classList.contains("eco-tile") &&
      !pop.contains(e.target)
    ) {
      hide();
    }
  });
})();
