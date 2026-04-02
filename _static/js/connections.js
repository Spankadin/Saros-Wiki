document$.subscribe(() => {
  const oldPanel = document.querySelector(".saros-connections-panel");
  if (oldPanel) oldPanel.remove();

  const contentInner = document.querySelector(".md-content__inner");
  if (!contentInner) return;

  const tocContainer =
    document.querySelector(".md-sidebar--secondary .md-sidebar__scrollwrap") ||
    document.querySelector(".md-sidebar--secondary .md-sidebar__inner") ||
    document.querySelector(".md-sidebar--secondary");

  if (!tocContainer) return;

  const links = Array.from(contentInner.querySelectorAll("a[href]"))
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
      if (link.href.includes(".png") || link.href.includes(".jpg") || link.href.includes(".jpeg") || link.href.includes(".svg")) return false;
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
  panel.className = "saros-connections-panel";
  panel.innerHTML = `
    <nav class="saros-connections md-nav md-nav--secondary" aria-label="Connections">
      <label class="md-nav__title saros-connections__title">
        Connections
      </label>
      <ul class="md-nav__list saros-connections__list"></ul>
    </nav>
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

  tocContainer.appendChild(panel);
});
