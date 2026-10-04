/* =====================================================================
   CONVERGENCE — PROFILES AND RULES
   Public view of the data. Reads EVERYTHING from data.js (FACTIONS,
   TIERS, IMGS): no profile is hand-written in the HTML.
   ===================================================================== */
(function(){
  "use strict";

  const $  = s => document.querySelector(s);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

  /* ---------- Flattening: one row per profile ----------
     Heroes, warriors and mounts share one table; what does not apply is left blank. */
  function rows(){
    const out = [];
    const mountMap = {};   // MOUNTS key -> {fac, cost} of whoever offers it

    Object.values(FACTIONS).forEach(f => {
      (f.heroes || []).forEach(h => {
        out.push({
          def:h, faction:f, type:"hero",
          tier:h.tier, tierName:TIERS[h.tier] ? TIERS[h.tier].name : "",
          rank:TIERS[h.tier] ? TIERS[h.tier].rank : 0
        });
        /* A mount has no cost of its own: it comes from the option that offers it */
        (h.options || []).forEach(o => {
          if(o.mount && !mountMap[o.mount]) mountMap[o.mount] = { faction:f, cost:o.cost };
        });
      });
      (f.warriors || []).forEach(w => out.push({
        def:w, faction:f, type:"war", tier:null, tierName:"", rank:0
      }));
    });

    Object.keys(mountMap).forEach(k => {
      const m = MOUNTS[k];
      if(!m) return;
      out.push({
        def:{ id:k, name:m.name, cost:mountMap[k].cost, race:"Mount",
              keywords:["Mount"], stats:m.stats, rules:m.rules, options:[] },
        faction:mountMap[k].faction, type:"mount", tier:null, tierName:"", rank:0
      });
    });

    return out;
  }

  const ALL_ROWS = rows();

  /* Text the search box looks through: name, keywords, wargear,
     special rules and heroic actions. */
  function searchTextFor(r){
    const d = r.def;
    return [
      d.name, r.faction.name, d.race, (d.keywords || []).join(" "), d.wargear,
      (d.rules   || []).map(x => x.name + " " + x.desc).join(" "),
      (d.heroic  || []).map(x => x.name + " " + x.desc).join(" "),
      (d.options || []).map(x => x.name).join(" "),
      r.tierName
    ].filter(Boolean).join(" ").toLowerCase();
  }
  ALL_ROWS.forEach(r => { r._txt = searchTextFor(r); });

  const MAX_COST = Math.max(...ALL_ROWS.map(r => r.def.cost), 0);

  /* ---------- View state ---------- */
  const F = { faction:"", type:"", tier:"", cost:MAX_COST, q:"" };
  let sortState = { col:"cost", dir:-1 };

  /* ---------- Populating the selectors ---------- */
  function initFilters(){
    $("#filterFaction").innerHTML = '<option value="">All</option>' +
      Object.values(FACTIONS).map(f => `<option value="${f.id}">${esc(f.name)}</option>`).join("");

    /* Only the tiers present in the data, highest to lowest */
    const tiers = [...new Set(ALL_ROWS.filter(r => r.tier).map(r => r.tier))]
      .sort((a,b) => TIERS[b].rank - TIERS[a].rank);
    $("#filterTier").innerHTML = '<option value="">All</option>' +
      tiers.map(t => `<option value="${t}">${esc(TIERS[t].name)}</option>`).join("");

    const sl = $("#filterCost");
    sl.max = MAX_COST; sl.value = MAX_COST;
    $("#filterCostVal").textContent = MAX_COST;

    /* Direct link from factions.html: profiles.html?fac=bolton */
    const q = new URLSearchParams(location.search).get("fac");
    if(q && FACTIONS[q]){ F.faction = q; $("#filterFaction").value = q; }
  }

  /* ---------- Filtering ---------- */
  function visibleRows(){
    return ALL_ROWS.filter(r => {
      if(F.faction  && r.faction.id !== F.faction)  return false;
      if(F.type && r.type   !== F.type) return false;
      if(F.tier && r.tier   !== F.tier) return false;
      if(r.def.cost > F.cost)          return false;
      if(F.q && r._txt.indexOf(F.q) === -1) return false;
      return true;
    });
  }

  /* ---------- Sorting ----------
     Mv and "4+" values are text: they sort by their numeric part. */
  function sortValue(r, col){
    const d = r.def;
    if(col === "name") return d.name.toLowerCase();
    if(col === "cost") return d.cost;
    if(col === "might" || col === "will" || col === "fate") return d[col] != null ? d[col] : -1;
    const v = d.stats[col];
    if(typeof v === "number") return v;
    const n = parseFloat(String(v).replace(/[^\d.]/g, ""));
    return isNaN(n) ? -1 : n;
  }
  function sortRows(rs){
    return rs.slice().sort((a,b) => {
      const va = sortValue(a, sortState.col), vb = sortValue(b, sortState.col);
      if(va < vb) return -sortState.dir;
      if(va > vb) return  sortState.dir;
      return a.def.name.localeCompare(b.def.name);
    });
  }

  /* ---------- Table ---------- */
  function cell(v){
    return (v === undefined || v === null || v === "")
      ? '<td class="empty">&mdash;</td>'
      : `<td>${esc(v)}</td>`;
  }

  function renderTable(){
    const rs = sortRows(visibleRows());
    const tb = $("#profilesBody");

    if(!rs.length){
      tb.innerHTML = `<tr><td colspan="14" class="no-data">
        No profile matches these filters.</td></tr>`;
    } else {
      tb.innerHTML = rs.map((r, i) => {
        const d = r.def, s = d.stats;
        return `<tr data-profile="${i}" tabindex="0">
          <td class="col-nm" style="--faction:${r.faction.color}">
            <div class="p-name">
              ${IMGS[d.id] ? `<img src="${IMGS[d.id]}" alt="" loading="lazy">` : ""}
              <div>
                <div class="n">${esc(d.name)}</div>
                <div class="m">${esc(r.faction.name)} &middot; ${r.type === "hero" ? esc(r.tierName) : esc((d.keywords||[]).join(" · "))}</div>
              </div>
            </div>
          </td>
          <td class="col-cost">${d.cost}</td>
          ${cell(s.mv)}${cell(s.fv)}${cell(s.sv)}${cell(s.s)}${cell(s.d)}
          ${cell(s.a)}${cell(s.w)}${cell(s.c)}${cell(s.i)}
          ${cell(d.might)}${cell(d.will)}${cell(d.fate)}
        </tr>`;
      }).join("");
      /* The data-attribute index points into the already-sorted list */
      tb._rows = rs;
    }

    const total = ALL_ROWS.length;
    $("#filterInfo").innerHTML = rs.length === total
      ? `Showing all <b>${total}</b> loaded profiles.`
      : `Showing <b>${rs.length}</b> of <b>${total}</b> profiles.`;

    document.querySelectorAll("#profilesTable th[data-sort]").forEach(th => {
      if(th.dataset.sort === sortState.col) th.setAttribute("aria-sort", sortState.dir === 1 ? "ascending" : "descending");
      else th.removeAttribute("aria-sort");
    });
  }

  /* ---------- Full profile card ----------
     Same content the army builder expands, shown in a modal. */
  function block(title, items){
    if(!items || !items.length) return "";
    return `<div class="blk"><div class="lb">${title}</div>` +
      items.map(a => `<div class="rule"><b>${esc(a.name)}:</b> ${esc(a.desc)}</div>`).join("") +
      `</div>`;
  }

  /* Heroic actions as chips: hover=desktop tooltip, click=mobile toggle */
  function heroicBlock(items){
    if(!items || !items.length) return "";
    const chips = items.map(a =>
      `<button class="ha-chip" type="button"
         data-name="${esc(a.name)}" data-desc="${esc(a.desc)}"
         aria-label="${esc(a.name)}: ${esc(a.desc)}">
        ${esc(a.name)}
      </button>`
    ).join("");
    return `<div class="blk"><div class="lb">Heroic Actions</div>
      <div class="ha-chips">${chips}</div></div>`;
  }

  function openProfileCard(r){
    const d = r.def, s = d.stats;
    const k  = ["mv","fv","sv","s","d","a","w","c","i"];
    const lb = {mv:"Mv",fv:"Fv",sv:"Sv",s:"S",d:"D",a:"A",w:"W",c:"C",i:"I"};

    let table = `<table class="st"><tr>${k.map(x=>`<th>${lb[x]}</th>`).join("")}</tr>` +
                `<tr>${k.map(x=>`<td>${esc(s[x])}</td>`).join("")}</tr></table>`;

    let shields = "";
    if(r.type === "hero"){
      shields = `<div class="shields">
        <div class="shield"><div class="v">${d.might}</div><div class="l">Might</div></div>
        <div class="shield"><div class="v">${d.will}</div><div class="l">Will</div></div>
        <div class="shield"><div class="v">${d.fate}</div><div class="l">Fate</div></div>
      </div>`;
    }

    let options = "";
    if(d.options && d.options.length){
      options = `<div class="blk"><div class="lb">Options</div><ul class="card-options">` +
        d.options.map(o => `<li><span>${esc(o.name)}
          ${o.desc ? `<span class="od">${esc(o.desc)}</span>` : ""}</span>
          <span class="oc">+${o.cost}</span></li>`).join("") +
        `</ul></div>`;
    }

    /* Mount sub-profile, same as the army builder shows */
    let mountBlocks = "";
    (d.options || []).forEach(o => {
      const m = o.mount && MOUNTS[o.mount];
      if(!m) return;
      mountBlocks += `<div class="blk sub-mount">
        <div class="lb">Mount &middot; ${esc(m.name)}</div>
        ${IMGS[o.mount] ? `<img class="sub-mount-img" src="${IMGS[o.mount]}" alt="${esc(m.name)}" loading="lazy">` : ""}
        <table class="st"><tr>${k.map(x=>`<th>${lb[x]}</th>`).join("")}</tr>
        <tr>${k.map(x=>`<td>${esc(m.stats[x])}</td>`).join("")}</tr></table>
        ${(m.rules||[]).map(x=>`<div class="rule"><b>${esc(x.name)}:</b> ${esc(x.desc)}</div>`).join("")}
      </div>`;
    });

    $("#cardBody").innerHTML = `
      <div class="card-head">
        ${IMGS[d.id] ? `<img src="${IMGS[d.id]}" alt="${esc(d.name)}">` : ""}
        <div class="card-info">
          <h2 id="cardTitle">${esc(d.name)}</h2>
          <div class="card-meta">${esc(r.faction.name)} &middot; ${esc(d.race)} &middot;
            ${esc((d.keywords||[]).join(" · "))}${r.tierName ? " &middot; " + esc(r.tierName) : ""}</div>
          <div class="card-cost">${d.cost}<span>POINTS</span></div>
        </div>
      </div>
      ${table}
      ${shields}
      ${d.wargear ? `<div class="blk"><div class="lb">Wargear</div><p>${esc(d.wargear)}</p></div>` : ""}
      ${options}
      ${mountBlocks}
      ${heroicBlock(d.heroic)}
      ${block("Special Rules", d.rules)}
      ${d.flavor ? `<div class="flavor">“${esc(d.flavor)}”</div>` : ""}
    `;
    $("#card").style.setProperty("--faction", r.faction.color);
    $("#cardBackdrop").hidden = false;
    document.body.style.overflow = "hidden";
    $("#cardClose").focus();
  }

  function closeProfileCard(){
    $("#cardBackdrop").hidden = true;
    document.body.style.overflow = "";
  }

  /* ---------- Events ---------- */
  function initEvents(){
    $("#filterFaction").addEventListener("change", e => { F.faction = e.target.value; renderTable(); });
    $("#filterType").addEventListener("change", e => { F.type = e.target.value; renderTable(); });
    $("#filterTier").addEventListener("change", e => {
      F.tier = e.target.value;
      /* Filtering by tier only makes sense for heroes */
      if(F.tier){ F.type = "hero"; $("#filterType").value = "hero"; }
      renderTable();
    });
    $("#filterCost").addEventListener("input", e => {
      F.cost = parseInt(e.target.value, 10);
      $("#filterCostVal").textContent = F.cost;
      renderTable();
    });
    $("#filterSearch").addEventListener("input", e => {
      F.q = e.target.value.trim().toLowerCase();
      renderTable();
    });
    $("#filterReset").addEventListener("click", () => {
      F.faction = ""; F.type = ""; F.tier = ""; F.cost = MAX_COST; F.q = "";
      $("#filterFaction").value = ""; $("#filterType").value = ""; $("#filterTier").value = "";
      $("#filterCost").value = MAX_COST; $("#filterCostVal").textContent = MAX_COST;
      $("#filterSearch").value = "";
      renderTable();
    });

    document.querySelectorAll("#profilesTable th[data-sort]").forEach(th => {
      th.addEventListener("click", () => {
        const col = th.dataset.sort;
        if(sortState.col === col) sortState.dir = -sortState.dir;
        else sortState = { col:col, dir: col === "name" ? 1 : -1 };
        renderTable();
      });
    });

    const tb = $("#profilesBody");
    function openFrom(el){
      const tr = el.closest("[data-profile]");
      if(!tr || !tb._rows) return;
      openProfileCard(tb._rows[parseInt(tr.dataset.profile, 10)]);
    }
    tb.addEventListener("click", e => openFrom(e.target));
    tb.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openFrom(e.target); }
    });

    $("#cardClose").addEventListener("click", closeProfileCard);
    $("#cardBackdrop").addEventListener("click", e => {
      if(e.target === $("#cardBackdrop")) closeProfileCard();
    });
    document.addEventListener("keydown", e => {
      if(e.key === "Escape" && !$("#cardBackdrop").hidden) closeProfileCard();
    });

    /* --- Heroic action chip tooltip --- */
    /* Create the singleton tooltip element once */
    let haTooltip = document.getElementById("ha-tooltip");
    if(!haTooltip){
      haTooltip = document.createElement("div");
      haTooltip.id = "ha-tooltip";
      haTooltip.setAttribute("role","tooltip");
      haTooltip.setAttribute("hidden","");
      haTooltip.innerHTML = '<div class="tt-name"></div><p class="tt-desc"></p>';
      document.body.appendChild(haTooltip);
    }
    const ttName = haTooltip.querySelector(".tt-name");
    const ttDesc = haTooltip.querySelector(".tt-desc");

    const isTouch = () => window.matchMedia("(pointer:coarse)").matches || "ontouchstart" in window;

    function positionTooltip(chip){
      const r   = chip.getBoundingClientRect();
      const vw  = window.innerWidth;
      const vh  = window.innerHeight;
      const ttW = Math.min(320, vw - 32);
      haTooltip.style.maxWidth = ttW + "px";

      /* Prefer below the chip; fall back to above */
      let top  = r.bottom + 8;
      let left = r.left;
      if(top + 140 > vh) top = r.top - 140 - 8;  /* rough height estimate */
      if(left + ttW > vw - 12) left = vw - ttW - 12;
      if(left < 12) left = 12;

      haTooltip.style.top  = top  + "px";
      haTooltip.style.left = left + "px";
    }

    function showTooltip(chip){
      ttName.textContent = chip.dataset.name;
      ttDesc.textContent = chip.dataset.desc;
      haTooltip.removeAttribute("hidden");
      positionTooltip(chip);
    }
    function hideTooltip(){
      haTooltip.setAttribute("hidden","");
      document.querySelectorAll(".ha-chip.is-open").forEach(c => c.classList.remove("is-open"));
    }

    /* Desktop: hover */
    document.addEventListener("mouseover", e => {
      if(isTouch()) return;
      const chip = e.target.closest(".ha-chip");
      if(chip){ showTooltip(chip); return; }
      if(!haTooltip.contains(e.target)) hideTooltip();
    });
    document.addEventListener("mouseout", e => {
      if(isTouch()) return;
      if(!e.target.closest(".ha-chip") && !haTooltip.contains(e.relatedTarget)){
        hideTooltip();
      }
    });

    /* Mobile: tap toggle */
    document.addEventListener("click", e => {
      if(!isTouch()) return;
      const chip = e.target.closest(".ha-chip");
      if(chip){
        const alreadyOpen = chip.classList.contains("is-open");
        hideTooltip();
        if(!alreadyOpen){
          chip.classList.add("is-open");
          showTooltip(chip);
        }
        e.stopPropagation();
        return;
      }
      hideTooltip();
    });

    /* Keyboard: Enter/Space on chip */
    document.addEventListener("keydown", e => {
      if((e.key === "Enter" || e.key === " ") && e.target.closest(".ha-chip")){
        e.preventDefault();
        const chip = e.target.closest(".ha-chip");
        const alreadyOpen = chip.classList.contains("is-open");
        hideTooltip();
        if(!alreadyOpen){ chip.classList.add("is-open"); showTooltip(chip); }
      }
      if(e.key === "Escape") hideTooltip();
    });

    /* Hide tooltip when the profile card closes */
    $("#cardClose").addEventListener("click", hideTooltip);
    $("#cardBackdrop").addEventListener("click", e => {
      if(e.target === $("#cardBackdrop")) hideTooltip();
    });
  }

  function init(){
    initFilters();
    initEvents();
    renderTable();
  }

  if(document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
