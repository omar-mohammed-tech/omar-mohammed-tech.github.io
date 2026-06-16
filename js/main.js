/* ===================================================================
   Homepage — render project cards, nav state, mobile menu, reveal
   =================================================================== */
(function () {
  const list = document.getElementById("projectList");
  const arrow = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M13.2 5.2 11.8 6.6 16.2 11H4v2h12.2l-4.4 4.4 1.4 1.4 6.8-6.8z"/></svg>';

  const all = window.PROJECTS || [];
  const isSolo = (p) => /built solo/i.test(p.status || "");
  const tags = (p, n) => (p.tools || []).slice(0, n).map((t) => `<li class="ptag">${t}</li>`).join("");

  /* Spotlight — the solo-built flagship products (large, brand-logo cover) */
  const spotlight = (p) => `
    <a class="spot-card reveal" href="project.html?p=${p.slug}" style="--t:${p.theme}">
      <div class="spot-media" style="background:${p.coverBg || '#ffffff'}">
        <span class="spot-flag">${p.status}</span>
        <img src="${p.cover}" alt="${p.title} logo" loading="lazy" decoding="async" />
      </div>
      <div class="spot-body">
        <p class="card-domain">${p.domain}</p>
        <h3 class="spot-title">${p.title}</h3>
        <p class="spot-tagline">${p.tagline}</p>
        <ul class="ptags">${tags(p, 3)}</ul>
        <div class="card-foot">
          <span class="project-cta">Read the case study ${arrow}</span>
        </div>
      </div>
    </a>`;

  /* Grid — the BA / Product Owner case studies (metadata-forward, scannable) */
  const gridCard = (p) => `
    <a class="grid-card reveal" href="project.html?p=${p.slug}">
      <div class="grid-body">
        <p class="card-domain">${p.domain}</p>
        <h3 class="grid-title">${p.title}</h3>
        <p class="grid-role">${p.role}</p>
        <p class="grid-tagline">${p.tagline}</p>
        <ul class="ptags">${tags(p, 3)}</ul>
        <div class="card-foot">
          <span class="grid-status">${p.status}</span>
          <span class="project-cta sm">Case study ${arrow}</span>
        </div>
      </div>
    </a>`;

  list.innerHTML =
    `<div class="spotlight-row">${all.filter(isSolo).map(spotlight).join("")}</div>` +
    `<div class="grid-row">${all.filter((p) => !isSolo(p)).map(gridCard).join("")}</div>`;

  /* nav state */
  const header = document.getElementById("siteHeader");
  const navLinks = Array.from(document.querySelectorAll(".nav .nav-link[href^='#']"));
  const sections = navLinks.map((l) => document.querySelector(l.getAttribute("href"))).filter(Boolean);
  function onScroll() {
    header.classList.toggle("scrolled", window.scrollY > 8);
    let cur = "";
    const off = window.scrollY + 120;
    for (const s of sections) if (s.offsetTop <= off) cur = "#" + s.id;
    navLinks.forEach((l) => l.classList.toggle("active", l.getAttribute("href") === cur));
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  const tog = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  tog.addEventListener("click", () => {
    const open = tog.getAttribute("aria-expanded") === "true";
    tog.setAttribute("aria-expanded", String(!open));
    menu.hidden = open;
  });
  menu.addEventListener("click", (e) => { if (e.target.closest("a")) { tog.setAttribute("aria-expanded", "false"); menu.hidden = true; } });

  /* reveal */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
  }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

  document.getElementById("year").textContent = new Date().getFullYear();

  /* hero — typewriter that rotates the role */
  (function () {
    const el = document.getElementById("typedRole");
    if (!el) return;
    const roles = ["Product Owner", "Business Analyst", "AI Product Builder"];
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) { el.textContent = roles[0]; return; }
    let ri = 0, ci = roles[0].length, deleting = true;   // start full, then backspace
    el.textContent = roles[0];
    function tick() {
      const word = roles[ri];
      if (deleting) {
        ci -= 1;
        el.textContent = word.slice(0, ci);
        if (ci <= 0) { deleting = false; ri = (ri + 1) % roles.length; return setTimeout(tick, 380); }
        return setTimeout(tick, 42);
      }
      ci += 1;
      el.textContent = word.slice(0, ci);
      if (ci >= word.length) { deleting = true; return setTimeout(tick, 1700); }   // hold, then delete
      return setTimeout(tick, 90);
    }
    setTimeout(tick, 1700);   // hold the first role, then start cycling
  })();
})();
