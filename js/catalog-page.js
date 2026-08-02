const CATALOG_SHAPE_CLASS = {
  square: "w-32 h-32",
  plank: "w-24 h-48",
  "square-sm": "w-28 h-28",
  slab: "w-24 h-52",
  rect: "w-20 h-40",
  "square-xs": "w-20 h-20",
  "square-md": "w-24 h-24",
  "square-lg": "w-36 h-36",
  "slab-xl": "w-20 h-56",
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const formatKey = params.get("format");
  const title = document.getElementById("catalog-title");
  const count = document.getElementById("catalog-count");
  const grid = document.getElementById("catalog-grid");

  if (!window.DS_CATALOG || !grid) return;

  if (!formatKey || !DS_CATALOG.byFormat.hasOwnProperty(formatKey)) {
    title.textContent = "Format not found";
    count.textContent = "Please choose a format from Materials.";
    grid.innerHTML = `
      <li class="col-span-full py-20 text-center text-on-surface-variant">
        <a class="underline" href="materials.html">Return to Material List</a>
      </li>
    `;
    return;
  }

  const products = DS_CATALOG.productsFor(formatKey);
  const formatMeta = DS_CATALOG.formats.find((f) => f.key === formatKey);
  const label = DS_CATALOG.formatLabel(formatKey);
  const shape = CATALOG_SHAPE_CLASS[formatMeta?.shape] || "w-28 h-28";
  title.textContent = label;
  count.textContent = `${products.length} products`;
  document.title = `${label} — DS Catalogue`;

  if (!products.length) {
    grid.innerHTML = `
      <li class="col-span-full py-24 text-center border border-outline-variant/40 bg-surface-container-low">
        <p class="font-headline-sm text-headline-sm mb-3">등록된 제품이 없습니다.</p>
        <p class="text-on-surface-variant font-body-md mb-8">이 규격의 카탈로그는 준비 중입니다.</p>
        <a href="materials.html" class="inline-flex items-center gap-2 font-label-caps text-label-caps px-8 py-4 bg-primary text-on-primary">
          다른 규격 보기
        </a>
      </li>
    `;
    return;
  }

  grid.innerHTML = products
    .map((product) => {
      const originLabel = product.origin
        ? `<span class="absolute bottom-3 right-3 font-label-caps text-[10px] tracking-[0.14em] uppercase text-on-surface-variant/80">${product.origin}</span>`
        : "";
      return `
      <li>
        <a href="product.html?format=${encodeURIComponent(formatKey)}&product=${encodeURIComponent(product.name)}"
           class="group block bg-surface-container-lowest border border-outline-variant/30 hover:border-primary transition-colors">
          <div class="format-tile-stage relative flex justify-center items-center py-14 bg-surface-container-low">
            <div class="format-tile ${shape}" style="background-image: url('${product.image}')" role="img" aria-label="${product.name}"></div>
            ${originLabel}
          </div>
          <div class="p-6">
            <p class="font-label-caps text-label-caps text-on-surface-variant mb-2">${product.brand}</p>
            <h2 class="font-headline-sm text-headline-sm group-hover:text-secondary transition-colors">${product.name}</h2>
            <p class="mt-2 text-on-surface-variant font-body-md">${product.finish} · ${label}</p>
          </div>
        </a>
      </li>
    `;
    })
    .join("");
});
