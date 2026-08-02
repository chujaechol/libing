document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const formatKey = params.get("format");
  const productName = params.get("product");
  const back = document.getElementById("product-back");

  if (!window.DS_CATALOG) return;

  if (formatKey === "daelim") {
    const basinProducts = ["CL-370", "CL-371", "CL-384", "CL-386", "CL-366", "CL-359", "VELO-M", "TGIR-M", "CL-910", "CL-332", "CL-347", "CL-336", "CL-826", "CL-506", "CL-509", "CL-501", "CL-605", "CL-604", "CL-603"];
    const faucetProducts = ["DL-B2113SN", "DL-B2113", "DL-L2110SN", "DL-L2110", "DL-B2312SN", "DL-B2312", "DL-L2310SN", "DL-L2310", "DL-2113", "BL-2312", "DL-2110", "DL-2310", "DL-7313", "DL-7310", "DL-B5612", "DL-5910", "DL-7313SN", "DL-8010", "DL-5513", "DL-5413", "DL-3016", "DL-3013", "DL-3011", "DL-8410J", "DL-9010", "DL-K1110", "DL-K3015", "DL-8013", "DL-L5612", "DL-L5612SN", "DL-B3010", "DL-B6010", "DL-B6210", "DL-B6211", "DL-B7010"];
    const urinalProducts = ["CU-511PU", "CU-600", "CU-505", "CU-511U", "CU-110", "CS-1"];
    let backCat = "toilet";
    if (basinProducts.includes(productName)) backCat = "basin";
    else if (faucetProducts.includes(productName)) backCat = "faucet";
    else if (urinalProducts.includes(productName)) backCat = "urinal";
    back.href = `brand-daelim.html?cat=${backCat}`;
    back.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> BACK TO DAELIM`;
  } else if (formatKey) {
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
  const productImage = document.getElementById("product-image");
  productImage.src = detail.image;
  productImage.alt = detail.title;
  const detailImage = document.getElementById("product-detail-image");
  if (detail.imageFit === "contain") {
    productImage.classList.remove("object-cover");
    productImage.classList.add("object-contain", "bg-surface-container-lowest");
    detailImage.classList.remove("object-cover", "grayscale", "opacity-80");
    detailImage.classList.add("object-contain", "bg-surface-container-lowest");
  }
  detailImage.src = detail.image;
  detailImage.alt = detail.title;
  document.getElementById("product-character").textContent =
    detail.character ||
    `Each slab of ${detail.title} undergoes a rigorous calibration process. The surface is treated with a proprietary anti-reflective coating that maintains raw color integrity while providing superior slip resistance (R10) and scratch protection.`;
  document.getElementById("product-cta").textContent =
    detail.cta || `Elevate your architectural vision with ${detail.title}.`;

  const characterSection = document.getElementById("product-character-section");
  const gallerySection = document.getElementById("product-gallery-section");
  const officialSection = document.getElementById("product-official-detail");
  const detailImagesEl = document.getElementById("product-detail-images");
  const sourceLink = document.getElementById("product-source-link");

  if (detail.detailImages?.length) {
    characterSection?.classList.add("hidden");
    gallerySection?.classList.add("hidden");
    officialSection?.classList.remove("hidden");
    if (sourceLink && detail.sourceUrl) {
      sourceLink.href = detail.sourceUrl;
      sourceLink.classList.remove("hidden");
    } else if (sourceLink) {
      sourceLink.classList.add("hidden");
    }
    detailImagesEl.innerHTML = detail.detailImages
      .map(
        (src, i) => `
        <img
          src="${src}"
          alt="${detail.title} 상세 ${i + 1}"
          class="w-full h-auto block"
          loading="${i < 2 ? "eager" : "lazy"}"
        />
      `
      )
      .join("");
  } else {
    officialSection?.classList.add("hidden");
    characterSection?.classList.remove("hidden");
    gallerySection?.classList.remove("hidden");
  }

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

  const track = document.getElementById("preview-track");
  if (track) {
    track.innerHTML = (detail.gallery || [])
      .map(
        (src, i) => `
      <div class="min-w-[80vw] md:min-w-[45%] flex-shrink-0">
        <div class="aspect-video bg-surface-container relative overflow-hidden">
          <img class="w-full h-full object-cover" src="${src}" alt="Installation preview ${i + 1}" />
        </div>
      </div>
    `
      )
      .join("");
  }
});
