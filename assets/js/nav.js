/* =====================================================================
   CONVERGENCE — NAVIGATION
   Scroll state, hamburger menus and current-page marking.
   Shared by all seven pages.
   ===================================================================== */
(function(){
  "use strict";

  /* ---------- Current page ----------
     The link for the page you are on keeps the gold rule permanently. */
  function markActive(){
    var currentPage = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    if(!currentPage) currentPage = "index.html";
    document.querySelectorAll(".cv-navlink, .cv-menu a").forEach(function(a){
      var href = (a.getAttribute("href") || "").split("/").pop().split("#")[0].toLowerCase();
      if(href && href === currentPage){
        a.classList.add("is-active");
        a.setAttribute("aria-current", "page");
      }
    });
  }

  /* ---------- Bar background on scroll ----------
     The hero bar starts transparent. Inner pages start opaque
     (is-fixed class in the markup) and do not need the listener. */
  function initScroll(){
    var nav = document.querySelector(".cv-nav");
    if(!nav || nav.classList.contains("is-fixed")) return;
    function onScroll(){
      nav.classList.toggle("is-scrolled", window.scrollY > 80);
    }
    window.addEventListener("scroll", onScroll, { passive:true });
    onScroll();
  }

  /* ---------- Hamburger menus ---------- */
  function initMenus(){
    var pairs = [
      { btn:document.getElementById("cv-hamburger-right"), menu:document.getElementById("cv-menu-right") },
      { btn:document.getElementById("cv-hamburger-main"),  menu:document.getElementById("cv-menu-main")  }
    ].filter(function(p){ return p.btn && p.menu; });

    if(!pairs.length) return;

    function set(pair, open){
      pair.menu.classList.toggle("is-open", open);
      pair.btn.setAttribute("aria-expanded", String(open));
    }
    function closeAll(){ pairs.forEach(function(p){ set(p, false); }); }

    pairs.forEach(function(pair){
      pair.btn.addEventListener("click", function(e){
        e.stopPropagation();
        var open = pair.menu.classList.contains("is-open");
        closeAll();
        set(pair, !open);
      });
    });

    document.addEventListener("click", function(e){
      var inside = pairs.some(function(p){
        return p.menu.contains(e.target) || p.btn.contains(e.target);
      });
      if(!inside) closeAll();
    });

    document.addEventListener("keydown", function(e){
      if(e.key === "Escape") closeAll();
    });
  }

  function init(){
    markActive();
    initScroll();
    initMenus();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
