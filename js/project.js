/* ===================================================================
   Case-study page — renders one project from window.PROJECTS
   based on ?p=<slug>, plus an image lightbox.
   =================================================================== */
(function () {
  const projects = window.PROJECTS || [];
  const slug = new URLSearchParams(location.search).get("p");
  const i = Math.max(0, projects.findIndex((p) => p.slug === slug));
  const p = projects[i];
  if (!p) { location.replace("index.html#work"); return; }

  document.documentElement.style.setProperty("--accent-theme", p.theme);
  document.title = `${p.title} · Omar Mohammed`;
  document.getElementById("heroOrb").style.background = p.theme;

  /* badges */
  document.getElementById("detailBadges").innerHTML = `
    <span class="badge primary">${p.domain}</span>
    <span class="badge success"><span class="badge-dot"></span>${p.status}</span>
    <span class="badge"><span class="badge-dot" style="color:${p.theme}"></span>${p.role}</span>`;

  document.getElementById("detailTitle").textContent = p.title;
  document.getElementById("detailTagline").textContent = p.tagline;

  document.getElementById("detailMetrics").innerHTML = p.metrics
    .map((m) => `<div class="detail-metric"><div class="pm"><span class="pm-v">${m.value}</span><span class="pm-l">${m.label}</span></div></div>`)
    .join("");

  /* cover */
  const detailCover = document.getElementById("detailCover");
  detailCover.style.background = p.detailCoverBg || p.coverBg || "#ffffff";
  detailCover.innerHTML = `<img src="${p.detailCover || p.cover}" alt="${p.title}" />`;

  /* helpers */
  const list = (items) => `<ul class="detail-list">${items.map((x) => `<li>${x}</li>`).join("")}</ul>`;
  const section = (h, body) => `<section><h2 class="detail-h">${h}</h2>${body}</section>`;

  /* galleries */
  const galleries = (window.GALLERIES && window.GALLERIES[p.slug]) || p.galleries || [];
  let galleryHtml = "";
  let lbItems = [];
  galleries.forEach((g) => {
    const wide = g.wide === true || /flow|bpmn|diagram|process|use case/i.test(g.label);
    const cells = g.images.map((img) => {
      const idx = lbItems.length;
      lbItems.push(img);
      return `<figure class="shot" data-lb="${idx}">
                <img src="${img.src}" alt="${img.caption || ""}" loading="lazy" decoding="async" />
                ${img.caption ? `<figcaption>${img.caption}</figcaption>` : ""}
              </figure>`;
    }).join("");
    galleryHtml += `
      <div class="gallery-block">
        <div class="gallery-label">${g.label}<span class="count">${g.images.length} ${g.images.length === 1 ? "image" : "images"}</span></div>
        <div class="gallery-grid ${wide ? "wide" : ""}">${cells}</div>
      </div>`;
  });
  if (!galleryHtml) {
    galleryHtml = `<div class="gallery-empty">Wireframes, mockups &amp; diagrams for this project are being added.</div>`;
  }

  /* main column — rich `sections` array when present, else the default layout */
  const galleryHeading = /built solo/i.test(p.status || "") ? "The product" : "Wireframes &amp; artifacts";
  const gallerySection = () => section(galleryHeading, galleryHtml);
  let mainHtml;
  if (Array.isArray(p.sections) && p.sections.length) {
    mainHtml = p.sections
      .map((s) => (s.gallery ? gallerySection() : section(s.h, (s.p || "") + (s.list ? list(s.list) : ""))))
      .join("");
    if (!p.sections.some((s) => s.gallery)) mainHtml += gallerySection();
  } else {
    mainHtml =
      section("Overview", `<p class="detail-summary">${p.summary}</p>`) +
      section("The problem", list(p.problem)) +
      section("My role", list(p.responsibilities)) +
      section("What shipped", list(p.highlights)) +
      section("Impact", list(p.impact)) +
      gallerySection();
  }
  document.getElementById("detailMain").innerHTML = mainHtml;

  /* aside */
  const docIcon = '<svg viewBox="0 0 24 24" width="16" height="16"><path fill="currentColor" d="M6 2h8l4 4v16H6zm8 1.5V7h3.5z"/></svg>';
  const dlIcon = '<svg viewBox="0 0 24 24" width="15" height="15"><path fill="currentColor" d="M12 16 7 11l1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11zM5 18h14v2H5z"/></svg>';
  document.getElementById("detailAside").innerHTML = `
    <div class="aside-card">
      <h4>Tools &amp; techniques</h4>
      <div class="aside-tools">${p.tools.map((t) => `<span class="pill">${t}</span>`).join("")}</div>
    </div>
    <div class="aside-card">
      <h4>Documentation prepared</h4>
      <ul class="doc-list">
        ${p.documents.map((d) => {
          const inner = `<span class="doc-ic">${docIcon}</span><span class="doc-name">${d.name}</span><span class="doc-type">${d.type}</span>`;
          return d.file
            ? `<li class="doc-item is-link"><a class="doc-a" href="${d.file}" target="_blank" rel="noopener">${inner}<span class="doc-dl" aria-hidden="true">${dlIcon}</span></a></li>`
            : `<li class="doc-item">${inner}</li>`;
        }).join("")}
      </ul>
    </div>
    <div class="aside-card">
      <h4>Want the full artifacts?</h4>
      <p style="color:var(--muted);font-size:.92rem;margin-bottom:14px">Documents that are available open as full PDFs, just click. Need raw diagrams, user stories or anything else? Ask away.</p>
      <a href="mailto:omar.mo2403@gmail.com?subject=${encodeURIComponent(p.title + ' case study request')}" class="btn btn-primary btn-sm">Request documents</a>
    </div>`;

  /* prev / next */
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  document.getElementById("detailNav").innerHTML = `
    <a class="prev" href="project.html?p=${prev.slug}"><span class="nlabel">← Previous</span><span class="ntitle">${prev.title}</span></a>
    <a class="next" href="project.html?p=${next.slug}"><span class="nlabel">Next →</span><span class="ntitle">${next.title}</span></a>`;

  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- header: scroll state (reveals the avatar) + mobile menu ---------- */
  const header = document.getElementById("siteHeader");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  const tog = document.getElementById("navToggle");
  const menu = document.getElementById("mobileMenu");
  if (tog && menu) {
    tog.addEventListener("click", () => {
      const open = tog.getAttribute("aria-expanded") === "true";
      tog.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    menu.addEventListener("click", (e) => { if (e.target.closest("a")) { tog.setAttribute("aria-expanded", "false"); menu.hidden = true; } });
  }

  /* ---------- lightbox ---------- */
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  let cur = 0;
  function show(n) {
    cur = (n + lbItems.length) % lbItems.length;
    lbImg.src = lbItems[cur].src;
    lbImg.alt = lbItems[cur].caption || "";
    lbCap.textContent = lbItems[cur].caption || "";
  }
  function open(n) { if (!lbItems.length) return; show(n); lb.classList.add("open"); lb.setAttribute("aria-hidden", "false"); document.body.style.overflow = "hidden"; }
  function close() { lb.classList.remove("open"); lb.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

  document.getElementById("detailMain").addEventListener("click", (e) => {
    const cell = e.target.closest("[data-lb]");
    if (cell) open(Number(cell.dataset.lb));
  });
  lb.addEventListener("click", (e) => {
    if (e.target.hasAttribute("data-lb-close") || e.target === lb) close();
    if (e.target.hasAttribute("data-lb-prev")) show(cur - 1);
    if (e.target.hasAttribute("data-lb-next")) show(cur + 1);
  });
  document.addEventListener("keydown", (e) => {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(cur - 1);
    if (e.key === "ArrowRight") show(cur + 1);
  });
})();
