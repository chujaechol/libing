const SHAPE_CLASS = {
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

/** 포맷별 타일 텍스처 — 지정된 포맷에만 적용 */
const TILE_IMAGE = {
  "800x800": "assets/tile-texture.png",
  "600x1200": "assets/tile-600x1200.png",
  "600x600": "assets/tile-600x600.png",
  "800x1600": "assets/tile-800x1600.png",
  "300x600": "assets/tile-300x600.png",
  "300x300": "assets/tile-300x300.png",
  "400x400": "assets/tile-400x400.png",
  "1200x1200": "assets/tile-1200x1200.png",
};

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("format-grid");
  if (!grid || !window.DS_CATALOG) return;

  grid.innerHTML = DS_CATALOG.formats
    .map((format) => {
      const count = DS_CATALOG.productsFor(format.key).length;
      const shape = SHAPE_CLASS[format.shape] || "w-28 h-28";
      const tileSrc = TILE_IMAGE[format.key];
      const bgStyle = tileSrc ? `background-image: url('${tileSrc}')` : "";
      const tileClass = tileSrc ? "format-tile" : "format-tile format-tile--blank";

      return `
        <a href="catalog.html?format=${encodeURIComponent(format.key)}"
           class="group relative bg-surface-container-low p-gutter transition-all duration-500 hover:bg-surface-container-highest flex flex-col justify-between aspect-[3/4]">
          <div class="flex justify-between items-start">
            <span class="font-label-caps text-label-caps text-on-surface-variant">FORMAT ${format.number}</span>
            <span class="material-symbols-outlined text-on-surface-variant group-hover:text-primary transition-colors">open_in_full</span>
          </div>
          <div class="format-tile-stage relative flex justify-center items-center py-14">
            <div class="${tileClass} ${shape}" style="${bgStyle}" role="img" aria-label="${format.label} 타일 샘플"></div>
          </div>
          <div>
            <h4 class="font-headline-sm text-headline-sm text-on-surface mb-2">${DS_CATALOG.formatLabel(format.key)}</h4>
            <p class="font-label-caps text-label-caps text-on-tertiary-container uppercase">${format.subtitle}</p>
            <p class="mt-3 text-[11px] font-label-caps tracking-widest text-on-surface-variant">${count} PRODUCTS</p>
          </div>
        </a>
      `;
    })
    .join("");
});
