document$.subscribe(() => {
  const oldPanel = document.querySelector(".saros-connections-panel");
  if (oldPanel) oldPanel.remove();

  const mainInner = document.querySelector(".md-main__inner");
  const content = document.querySelector(".md-content");
  if (!mainInner || !content) return;

  const links = Array.from(content.querySelectorAll(".md-content__inner a[href]"))
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

  const panel = document.createElement("aside");
  panel.className = "saros-connections-panel";
  panel.innerHTML = `
    <div class="saros-connections">
      <div class="saros-connections__title">Connections</div>
      <ul class="saros-connections__list"></ul>
    </div>
  `;

  const list = panel.querySelector(".saros-connections__list");

  unique.slice(0, 12).forEach((link) => {
    const item = document.createElement("li");
    item.className = "saros-connections__item";

    const anchor = document.createElement("a");
    anchor.className = "saros-connections__link";
    anchor.href = link.href;
    anchor.textContent = link.text;

    item.appendChild(anchor);
    list.appendChild(item);
  });

  mainInner.appendChild(panel);
});
