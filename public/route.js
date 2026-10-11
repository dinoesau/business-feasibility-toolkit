/* Progreso de la ruta (diseno C): localStorage, sin dependencias. */
(function () {
  "use strict";
  var KEY = "ruta-pasos-c";
  function load() {
    try {
      var v = JSON.parse(localStorage.getItem(KEY) || "[]");
      return Array.isArray(v) ? v : [];
    } catch (e) { return []; }
  }
  function save(list) { try { localStorage.setItem(KEY, JSON.stringify(list)); } catch (e) {} }
  function paint() {
    var done = load();
    document.querySelectorAll("#steps li[data-step]").forEach(function (li) {
      var n = Number(li.getAttribute("data-step"));
      var isDone = done.indexOf(n) !== -1;
      li.classList.toggle("rts-done", isDone);
      var b = li.querySelector("button");
      if (b) b.textContent = isDone ? (document.documentElement.lang === "en" ? "Done ✓ — undo" : "Listo ✓ — desmarcar") : (document.documentElement.lang === "en" ? "Mark done" : "Marcar listo");
    });
    var nav = document.getElementById("nav-progress");
    if (nav) nav.textContent = done.length + " / 10";
    var bar = document.getElementById("bar"), pct = document.getElementById("pct");
    if (bar) bar.style.width = done.length * 10 + "%";
    if (pct) pct.textContent = done.length * 10 + "%";
  }
  document.querySelectorAll("#steps li[data-step] button").forEach(function (b) {
    b.addEventListener("click", function () {
      var li = b.closest("li");
      if (!li) return;
      var n = Number(li.getAttribute("data-step"));
      var done = load();
      var i = done.indexOf(n);
      if (i === -1) done.push(n); else done.splice(i, 1);
      save(done); paint();
    });
  });
  var navOnly = document.getElementById("nav-progress");
  if (navOnly && !document.getElementById("steps")) navOnly.textContent = load().length + " / 10";
  document.querySelectorAll("#btn-done[data-step]").forEach(function (b) {
    b.addEventListener("click", function () {
      var n = Number(b.getAttribute("data-step"));
      var done = load();
      if (done.indexOf(n) === -1) { done.push(n); save(done); }
      b.textContent = document.documentElement.lang === "en" ? "Step done ✓" : "Paso listo ✓";
      var nav2 = document.getElementById("nav-progress");
      if (nav2) nav2.textContent = load().length + " / 10";
    });
  });
  paint();
})();
