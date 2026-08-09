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
  } else if (formatKey === "kyerim") {
    const basinProducts = ["L-345UF", "L-206UF", "L-208UF", "L-322UF", "L-325UF", "L-322UFD", "L-317ULF", "L-344UF", "L-329UF"];
    const backCat = basinProducts.includes(productName) ? "basin" : "toilet";
    back.href = `brand-kyerim.html?cat=${backCat}`;
    back.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> BACK TO KYERIM`;
  } else if (formatKey === "lauche") {
    const basinProducts = [
      "LL-822", "LL-821", "LL-823", "LL-813", "LL-813M", "LL-811", "LL-811M",
      "LL-812", "LL-812M", "LL-803M", "LL-802M", "LL-801M",
    ];
    const faucetProducts = ["MYSTIC-2127", "COIN-1075", "COIN-1275", "COIN-2375", "COIN-2005", "NEWCOIN-2008L", "NEWCOIN-2008S", "NEWCOIN-2338", "MYSTIC-1027", "MYSTIC-1227", "NEWMYSTIC-1037", "PINION-1017", "COIN-3075", "COIN-7075", "COIN-2775", "COIN-8115", "NEWCOIN-7078", "NEWCOIN-2778", "NEWCOIN-7338", "COIN-7115", "COIN-7375", "PIATTO-S50N-300", "NEWCOIN-S40N-350", "COIN2-S30N-600"];
    const bidetProducts = ["LC-500S"];
    let backCat = "toilet";
    if (basinProducts.includes(productName)) backCat = "basin";
    else if (faucetProducts.includes(productName)) backCat = "faucet";
    else if (bidetProducts.includes(productName)) backCat = "bidet";
    back.href = `brand-lauche.html?cat=${backCat}`;
    back.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> BACK TO LAUCHE`;
  } else if (formatKey === "600x600") {
    back.href = "gallery-600x600.html";
    back.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> BACK TO GALLERY`;
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

  const fromParam = params.get("from");
  const useShowcase =
    detail.layout === "showcase" &&
    (!detail.showcaseFrom || detail.showcaseFrom === fromParam);

  if (useShowcase) {
    renderShowcase(detail, formatKey);
    return;
  }

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

function renderShowcase(detail, formatKey) {
  const classicRoot = document.getElementById("product-root");
  const showcaseRoot = document.getElementById("product-showcase-root");
  classicRoot?.classList.add("hidden");
  showcaseRoot?.classList.remove("hidden");
  document.body.classList.add("is-product-showcase");

  const back = document.getElementById("showcase-back");
  if (back) {
    const from = new URLSearchParams(window.location.search).get("from");
    if (from === "kitchen") {
      back.href = "gallery-kitchen.html";
    } else if (from === "gallery") {
      back.href = formatKey === "300x600" ? "gallery-300x600.html" : "gallery-600x600.html";
    } else if (formatKey) {
      back.href = `catalog.html?format=${encodeURIComponent(formatKey)}`;
    }
  }

  const productSrc = detail.image;
  const lifestyleSrc = detail.lifestyleImage || (detail.gallery || []).find((src) => src !== productSrc) || productSrc;
  const thumbs = detail.thumbs?.length
    ? detail.thumbs
    : [
        { src: productSrc, fit: detail.imageFit === "contain" ? "contain" : "cover", label: "제품" },
        { src: lifestyleSrc, fit: "cover", label: "시공" },
        { src: productSrc, fit: "cover", zoom: true, label: "질감" },
      ];

  const festival = document.getElementById("showcase-festival");
  const badge = document.getElementById("showcase-badge");
  const mainImg = document.getElementById("showcase-main-image");
  const lifeImg = document.getElementById("showcase-lifestyle-image");
  const lifeTitle = document.getElementById("showcase-lifestyle-title");
  const lifeSub = document.getElementById("showcase-lifestyle-sub");
  const eventEl = document.getElementById("showcase-event");
  const offerEl = document.getElementById("showcase-offer");
  const fineEl = document.getElementById("showcase-fine");
  const characterEl = document.getElementById("showcase-character");
  const specsEl = document.getElementById("showcase-specs");
  const thumbsEl = document.getElementById("showcase-thumbs");

  if (festival) festival.textContent = detail.showcaseTitle || detail.title;
  if (badge) badge.textContent = detail.name || detail.specs?.품번 || "DS";
  if (mainImg) {
    mainImg.src = productSrc;
    mainImg.alt = detail.title;
    mainImg.style.objectFit = detail.imageFit === "contain" || detail.thumbs?.[0]?.fit === "contain" ? "contain" : "cover";
  }
  if (lifeImg) {
    lifeImg.src = lifestyleSrc;
    lifeImg.alt = `${detail.title} 시공`;
  }
  if (lifeTitle) lifeTitle.textContent = detail.lifestyleTitle || "Natural Stone Elegance.";
  if (lifeSub) lifeSub.textContent = detail.lifestyleSub || detail.description || "";
  if (eventEl) eventEl.textContent = detail.showcaseEvent || detail.specs?.규격 || "COLLECTION";
  if (offerEl) offerEl.textContent = detail.showcaseOffer || detail.description || "";
  if (fineEl) fineEl.textContent = detail.showcaseFine || "";
  if (characterEl) characterEl.textContent = detail.character || "";

  if (specsEl) {
    specsEl.innerHTML = Object.entries(detail.specs || {})
      .map(
        ([label, value]) => `
        <div class="product-showcase__spec-row">
          <span>${label}</span>
          <span>${value}</span>
        </div>`
      )
      .join("");
  }

  if (thumbsEl) {
    thumbsEl.innerHTML = thumbs
      .map((thumb, i) => {
        const fitClass = thumb.fit === "contain" ? " product-showcase__thumb--contain" : "";
        const zoomStyle = thumb.zoom ? ' style="object-fit:cover;transform:scale(1.35);transform-origin:center;"' : "";
        return `
          <button type="button" class="product-showcase__thumb${fitClass}${i === 0 ? " is-active" : ""}" data-src="${thumb.src}" data-fit="${thumb.fit || "cover"}" aria-label="${thumb.label || `미리보기 ${i + 1}`}">
            <img src="${thumb.src}" alt=""${zoomStyle} />
          </button>`;
      })
      .join("");

    thumbsEl.querySelectorAll(".product-showcase__thumb").forEach((btn) => {
      btn.addEventListener("click", () => {
        thumbsEl.querySelectorAll(".product-showcase__thumb").forEach((el) => el.classList.remove("is-active"));
        btn.classList.add("is-active");
        if (!mainImg) return;
        mainImg.src = btn.dataset.src;
        if (btn.dataset.fit === "contain") {
          mainImg.style.objectFit = "contain";
        } else {
          mainImg.style.objectFit = "cover";
        }
      });
    });
  }
}
