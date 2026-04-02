document$.subscribe(() => {
  const oldPanel = document.querySelector(".saros-connections");
  if (oldPanel) oldPanel.remove();

  const tocSidebar =
    document.querySelector(".md-sidebar--secondary .md-sidebar__scrollwrap") ||
    document.querySelector("[data-md-component='toc'] .md-sidebar__scrollwrap") ||
    document.querySelector(".md-sidebar--secondary");

  if (!tocSidebar) return;

  const content = document.querySelector(".md-content");
  if (!content) return;

  const links = Array.from(content.querySelectorAll("a[href]"))
    .map((a) => {
      const href = a.getAttribute("href") || "";
      const text = (a.textContent || "").trim();
      return { href, text };
    })
    .filter((link) => {
      if (!link.href || !link.text) return false;
      if (link.href.startsWith("http")) return false;
      if (link.href.startsWith("mailto:")) return false;
      if (link.href.startsWith("#")) return false;
      if (link.href.includes(".png") || link.href.includes(".jpg") || link.href.includes(".svg")) return false;
      return true;
    });

  const unique = [];
  const seen = new Set();

  for (const link of links) {
    const key = `${link.href}|${link.text}`;
    if (seen.has(key)) continue;
    seen.add(key);
    unique.push(link);
  }

  if (!unique.length) return;

  const panel = document.createElement("div");
  panel.className = "saros-connections md-nav md-nav--secondary";
  panel.innerHTML = `
    <label class="md-nav__title saros-connections__title">
      <span class="md-nav__icon md-icon"></span>
      Connections
    </label>
    <ul class="md-nav__list saros-connections__list"></ul>
  `;

  const list = panel.querySelector(".saros-connections__list");

  unique.slice(0, 12).forEach((link) => {
    const item = document.createElement("li");
    item.className = "md-nav__item saros-connections__item";

    const anchor = document.createElement("a");
    anchor.className = "md-nav__link saros-connections__link";
    anchor.href = link.href;
    anchor.textContent = link.text;

    item.appendChild(anchor);
    list.appendChild(item);
  });

  tocSidebar.appendChild(panel);
});
