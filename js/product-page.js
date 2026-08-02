document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const formatKey = params.get("format");
  const productName = params.get("product");
  const back = document.getElementById("product-back");

  if (!window.DS_CATALOG) return;

  if (formatKey) {
    back.href = `catalog.html?format=${encodeURIComponent(formatKey)}`;
    back.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> BACK TO CATALOGUE`;
  }

  const products = DS_CATALOG.productsFor(formatKey);
  const product = products.find((p) => p.name === productName);

  if (!product) {
    document.getElementById("product-title").textContent = "Product not found";
    document.getElementById("product-desc").textContent =
      "The selected product could not be located in this catalogue.";
    return;
  }

  const detail = DS_CATALOG.detailFor(product);
  document.title = `${detail.title} — DS`;
  document.getElementById("product-title").textContent = detail.title;
  document.getElementById("product-desc").textContent = detail.description;
  document.getElementById("product-image").src = detail.image;
  document.getElementById("product-image").alt = detail.title;
  document.getElementById("product-detail-image").src = detail.image;
  document.getElementById("product-character").textContent =
    `Each slab of ${detail.title} undergoes a rigorous calibration process. The surface is treated with a proprietary anti-reflective coating that maintains raw color integrity while providing superior slip resistance (R10) and scratch protection.`;
  document.getElementById("product-cta").textContent =
    `Elevate your architectural vision with ${detail.title}.`;

  document.getElementById("product-specs").innerHTML = Object.entries(detail.specs)
    .map(
      ([label, value]) => `
      <div class="flex justify-between items-end border-b border-outline-variant/10 pb-2">
        <span class="font-body-md text-on-surface-variant">${label}</span>
        <span class="font-headline-sm text-on-surface">${value}</span>
      </div>
    `
    )
    .join("");

  const labels = ["RESIDENTIAL PROJECT", "COMMERCIAL SPACE", "EXTERIOR LIVING"];
  const track = document.getElementById("preview-track");
  track.innerHTML = (detail.gallery || [])
    .map(
      (src, i) => `
      <div class="min-w-[80vw] md:min-w-[45%] flex-shrink-0">
        <div class="aspect-video bg-surface-container relative group overflow-hidden">
          <img class="w-full h-full object-cover" src="${src}" alt="Installation preview ${i + 1}" />
          <div class="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <span class="font-label-caps text-on-primary border border-on-primary/50 px-6 py-2 backdrop-blur-sm">${labels[i] || "PROJECT"}</span>
          </div>
        </div>
      </div>
    `
    )
    .join("");

  let index = 0;
  const updateCarousel = () => {
    const first = track.firstElementChild;
    if (!first) return;
    const cardWidth = first.offsetWidth + 24;
    track.style.transform = `translateX(-${index * cardWidth}px)`;
  };

  document.getElementById("next-preview")?.addEventListener("click", () => {
    if (index < track.children.length - 1) {
      index += 1;
      updateCarousel();
    }
  });

  document.getElementById("prev-preview")?.addEventListener("click", () => {
    if (index > 0) {
      index -= 1;
      updateCarousel();
    }
  });
});
