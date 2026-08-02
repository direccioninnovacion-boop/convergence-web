/* =====================================================================
   CONVERGENCE — NAVEGACIÓN
   Estado al scrollear, menús hamburguesa y marcado de la página actual.
   Compartido por las siete páginas.
   ===================================================================== */
(function(){
  "use strict";

  /* ---------- Página actual ----------
     El enlace de la página en la que estás lleva el filete de oro fijo. */
  function marcarActiva(){
    var archivo = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if(!archivo) archivo = "index.html";
    document.querySelectorAll(".cv-navlink, .cv-menu a").forEach(function(a){
      var href = (a.getAttribute("href") || "").split("/").pop().split("#")[0].toLowerCase();
      if(href && href === archivo){
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Fondo de la barra al scrollear ----------
     La barra del hero nace transparente. Las interiores nacen opacas
     (clase is-fixed en el marcado) y no necesitan el listener. */
  function initScroll(){
    var nav = document.querySelector(".cv-nav");
    if(!nav || nav.classList.contains("is-fixed")) return;
    function onScroll(){
      nav.classList.toggle("is-scrolled", window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }

  /* ---------- Menús hamburguesa ---------- */
  function initMenus(){
    var pares = [
      { btn:document.getElementById("cv-hamburger-right"), menu:document.getElementById("cv-menu-right") },
      { btn:document.getElementById("cv-hamburger-main"),  menu:document.getElementById("cv-menu-main")  }
    ].filter(function(p){ return p.btn && p.menu; });

    if(!pares.length) return;

    function set(par, abierto){
      par.menu.classList.toggle("is-open", abierto);
      par.btn.setAttribute("aria-expanded", String(abierto));
    }
    function cerrarTodo(){ pares.forEach(function(p){ set(p, false); }); }

    pares.forEach(function(par){
      par.btn.addEventListener("click", function(e){
        e.stopPropagation();
        var abierto = par.menu.classList.contains("is-open");
        cerrarTodo();
        set(par, !abierto);
      });
    });

    document.addEventListener("click", function(e){
      var dentro = pares.some(function(p){
        return p.menu.contains(e.target) || p.btn.contains(e.target);
      });
      if(!dentro) cerrarTodo();
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") cerrarTodo();
    });
  }

  function init(){
    marcarActiva();
    initScroll();
    initMenus();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
