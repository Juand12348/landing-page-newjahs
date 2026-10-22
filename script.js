// New Jahs · Landing
(function () {
  "use strict";

  // ---------- Año del footer ----------
  document.getElementById("year").textContent = new Date().getFullYear();

  // ---------- Header: sombra al hacer scroll + menú móvil ----------
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-stuck", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");
  const closeMenu = () => {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));

  // ---------- Animación de entrada al hacer scroll ----------
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el, i) => {
      el.style.transitionDelay = (i % 3) * 80 + "ms";
      io.observe(el);
    });
  } else {
    reveals.forEach((el) => el.classList.add("is-in"));
  }

  // ---------- Contadores del hero ----------
  document.querySelectorAll("[data-count]").forEach((el) => {
    const target = Number(el.dataset.count);
    let n = 0;
    const step = () => {
      n += 1;
      el.textContent = n;
      if (n < target) setTimeout(step, 140);
    };
    setTimeout(step, 500);
  });

  // ---------- Sprints (pestañas) ----------
  // Texto tomado del póster; la descripción corta es de apoyo.
  const sprints = [
    { t: "Sprint 1 · Análisis y Diseño", d: "Se levantan los requerimientos de New Jahs, se identifican las necesidades del negocio y se diseña la solución." },
    { t: "Sprint 2 · Autenticación, usuarios y catálogo", d: "Registro e inicio de sesión, manejo de usuarios según su rol y el catálogo de prendas que ven los clientes." },
    { t: "Sprint 3 · Carrito, pedidos, checkout", d: "El flujo de compra completo: agregar al carrito, crear el pedido y finalizar la compra en la tienda virtual." },
    { t: "Sprint 4 · Inventario y Movimientos", d: "Control del stock de la empresa y registro de los movimientos de mercancía, con reportes de ventas y proyecciones." },
    { t: "Sprint 5 · Chat Bot con IA", d: "Un asistente disponible las 24 horas para consultar productos y analizar ventas." },
    { t: "Sprint 7 · Integración, pruebas y despliegue", d: "Se unen los tres módulos, se prueba el sistema completo y se publica la aplicación." }
  ];
  const tabs = document.querySelectorAll(".sprints__tabs button");
  const title = document.getElementById("sprintTitle");
  const text = document.getElementById("sprintText");
  const fill = document.getElementById("sprintFill");

  function showSprint(i) {
    tabs.forEach((b, k) => {
      const on = k === i;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", String(on));
    });
    title.textContent = sprints[i].t;
    text.textContent = sprints[i].d;
    fill.style.width = ((i + 1) / sprints.length) * 100 + "%";
  }
  tabs.forEach((b) => b.addEventListener("click", () => showSprint(Number(b.dataset.i))));
  showSprint(0);

  // ---------- Demo del Chat Bot (respuestas de ejemplo, sin IA real) ----------
  const answers = {
    "¿Qué camisas tienen?":
      "Tenemos camisas formales (desde $75.000), casuales (desde $70.000) y deportivas (desde $65.000).",
    "¿Hay envíos a toda Colombia?":
      "Sí, enviamos a toda Colombia. Las compras mayores a $150.000 tienen envío gratis.",
    "¿Cómo van las ventas?":
      "Esta semana la categoría con más ventas es camisas casuales. Te puedo mostrar un reporte detallado y la proyección del mes."
  };
  const log = document.getElementById("chatLog");
  const chips = document.querySelectorAll("#chatChips button");

  function addMsg(text, cls) {
    const m = document.createElement("div");
    m.className = "msg " + cls;
    m.textContent = text;
    log.appendChild(m);
    log.scrollTop = log.scrollHeight;
    return m;
  }

  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const q = chip.dataset.q;
      chips.forEach((c) => (c.disabled = true));
      addMsg(q, "msg--user");
      const typing = addMsg("● ● ●", "msg--bot msg--typing");
      setTimeout(() => {
        typing.remove();
        addMsg(answers[q], "msg--bot");
        chips.forEach((c) => (c.disabled = false));
      }, 900);
    });
  });
})();