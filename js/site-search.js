(function initSiteSearch() {
  const STYLE = `
    .site-search{position:fixed;inset:0;z-index:4000;display:none;align-items:flex-start;justify-content:center;padding:12vh 20px 40px;font-family:"DM Sans",sans-serif;}
    .site-search.is-open{display:flex;}
    .site-search__backdrop{position:absolute;inset:0;background:rgba(26,28,28,.45);backdrop-filter:blur(8px);}
    .site-search__panel{position:relative;width:min(640px,100%);background:#f9f9f8;border:1px solid #ddd;box-shadow:0 24px 60px rgba(0,0,0,.18);}
    .site-search__row{display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #e6e6e3;}
    .site-search__row .material-symbols-outlined{font-size:22px;color:#434747;}
    .site-search__input{flex:1;border:0;outline:none;background:transparent;font-size:16px;letter-spacing:.02em;color:#1a1c1c;}
    .site-search__input::placeholder{color:#8a8d8d;}
    .site-search__hint{padding:8px 16px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:#838483;}
    .site-search__results{max-height:min(48vh,420px);overflow:auto;margin:0;padding:0;list-style:none;}
    .site-search__item{display:block;width:100%;text-align:left;border:0;background:transparent;padding:12px 16px;cursor:pointer;border-top:1px solid #eee;}
    .site-search__item:hover,.site-search__item.is-active{background:#eee;}
    .site-search__item-title{display:block;font-size:14px;color:#1a1c1c;}
    .site-search__item-path{display:block;margin-top:4px;font-size:11px;letter-spacing:.08em;color:#838483;}
    .site-search-trigger{width:40px;height:40px;border:0;background:transparent;color:inherit;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;flex-shrink:0;}
    .top-nav .site-search-trigger{margin-left:auto;}
    mark.ds-search-hit,.ds-search-hit{background:#ffe08a;color:inherit;box-shadow:0 0 0 4px #ffe08a;}
  `;

  function normalize(value) {
    return String(value || "")
      .toLowerCase()
      .replace(/\s+/g, " ")
      .trim();
  }

  function currentPageName() {
    return (location.pathname.split("/").pop() || "index.html").replace(/\\/g, "/");
  }

  function samePage(url) {
    try {
      const target = new URL(url, location.href);
      return target.pathname.replace(/\\/g, "/") === location.pathname.replace(/\\/g, "/");
    } catch (err) {
      return false;
    }
  }

  function scrollToQuery(query) {
    const needle = normalize(query);
    if (!needle) return false;
    document.querySelectorAll(".ds-search-hit, mark.ds-search-hit").forEach((el) => {
      if (el.tagName === "MARK") {
        const parent = el.parentNode;
        parent.replaceChild(document.createTextNode(el.textContent), el);
        parent.normalize();
      } else {
        el.classList.remove("ds-search-hit");
      }
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style,noscript,.site-search,.top-nav,header,nav")) {
          return NodeFilter.FILTER_REJECT;
        }
        return normalize(node.nodeValue).includes(needle) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
      },
    });

    const node = walker.nextNode();
    if (!node) return false;
    const raw = node.nodeValue;
    const idx = normalize(raw).indexOf(needle);
    if (idx < 0) {
      node.parentElement.classList.add("ds-search-hit");
      node.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }
    const start = raw.toLowerCase().indexOf(query.trim().toLowerCase());
    const length = query.trim().length;
    if (start < 0) {
      node.parentElement.classList.add("ds-search-hit");
      node.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, start + length);
    const mark = document.createElement("mark");
    mark.className = "ds-search-hit";
    try {
      range.surroundContents(mark);
    } catch (err) {
      node.parentElement.classList.add("ds-search-hit");
      node.parentElement.scrollIntoView({ behavior: "smooth", block: "center" });
      return true;
    }
    mark.scrollIntoView({ behavior: "smooth", block: "center" });
    return true;
  }

  function collectLiveIndex() {
    const items = [];
    const catalog = window.DS_CATALOG;
    if (catalog?.byFormat) {
      Object.entries(catalog.byFormat).forEach(([format, products]) => {
        (products || []).forEach((product) => {
          if (!product?.name) return;
          const href = product.href || `product.html?format=${encodeURIComponent(format)}&product=${encodeURIComponent(product.name)}`;
          items.push({
            title: product.name,
            path: catalog.formatLabel ? catalog.formatLabel(format) : format,
            url: href,
          });
        });
      });
    }
    if (window.MOSAIC_CATALOG?.products) {
      window.MOSAIC_CATALOG.products.forEach((product) => {
        if (!product?.name) return;
        items.push({
          title: product.name,
          path: product.category ? `모짜이크 · ${product.category}` : "모짜이크",
          url: `product.html?format=mosaic&product=${encodeURIComponent(product.name)}`,
        });
      });
    }
    return items;
  }

  function allIndex() {
    return [...(window.DS_SEARCH_INDEX || []), ...collectLiveIndex()];
  }

  function search(query) {
    const needle = normalize(query);
    if (needle.length < 1) return [];
    const seen = new Set();
    const hits = [];
    for (const item of allIndex()) {
      const hay = normalize(`${item.title} ${item.path || ""} ${item.text || ""}`);
      if (!hay.includes(needle)) continue;
      const key = `${item.url}|${item.title}`;
      if (seen.has(key)) continue;
      seen.add(key);
      hits.push(item);
      if (hits.length >= 40) break;
    }
    return hits;
  }

  function goTo(item, query) {
    closePanel();
    if (samePage(item.url) && !item.url.includes("product.html")) {
      if (scrollToQuery(query)) return;
    }
    const target = new URL(item.url, location.href);
    target.searchParams.set("find", query);
    location.href = target.href;
  }

  let panel;
  let input;
  let list;
  let active = -1;
  let lastHits = [];

  function render(hits, query) {
    active = hits.length ? 0 : -1;
    lastHits = hits;
    if (!query.trim()) {
      list.innerHTML = "";
      return;
    }
    if (!hits.length) {
      list.innerHTML = `<li class="site-search__hint">일치하는 문구가 없습니다</li>`;
      return;
    }
    list.innerHTML = hits
      .map(
        (item, i) => `
      <li>
        <button class="site-search__item${i === 0 ? " is-active" : ""}" type="button" data-i="${i}">
          <span class="site-search__item-title">${item.title}</span>
          <span class="site-search__item-path">${item.path || item.url}</span>
        </button>
      </li>`
      )
      .join("");
  }

  function setActive(index) {
    const buttons = list.querySelectorAll(".site-search__item");
    if (!buttons.length) return;
    active = (index + buttons.length) % buttons.length;
    buttons.forEach((btn, i) => btn.classList.toggle("is-active", i === active));
    buttons[active].scrollIntoView({ block: "nearest" });
  }

  function openPanel() {
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
    input.value = "";
    list.innerHTML = "";
    active = -1;
    setTimeout(() => input.focus(), 20);
  }

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
  }

  function ensureTrigger() {
    const existing = document.querySelector('[aria-label="Search"]');
    if (existing) return existing;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "icon-btn site-search-trigger";
    button.setAttribute("aria-label", "Search");
    button.innerHTML = '<span class="material-symbols-outlined">search</span>';

    const actions = document.querySelector(".top-nav__actions");
    const nav = document.querySelector(".top-nav");
    const headerRow = document.querySelector("header .flex.items-center.justify-between");
    if (actions) {
      actions.insertBefore(button, actions.firstChild);
    } else if (nav) {
      nav.appendChild(button);
    } else if (headerRow) {
      headerRow.appendChild(button);
    } else {
      button.style.position = "fixed";
      button.style.top = "16px";
      button.style.right = "16px";
      button.style.zIndex = "3000";
      document.body.appendChild(button);
    }
    return button;
  }

  function setup() {
    if (document.querySelector(".site-search")) return;

    const style = document.createElement("style");
    style.textContent = STYLE;
    document.head.appendChild(style);

    panel = document.createElement("div");
    panel.className = "site-search";
    panel.setAttribute("aria-hidden", "true");
    panel.innerHTML = `
      <div class="site-search__backdrop" data-close="1"></div>
      <div class="site-search__panel" role="dialog" aria-label="사이트 검색">
        <div class="site-search__row">
          <span class="material-symbols-outlined" aria-hidden="true">search</span>
          <input class="site-search__input" type="search" placeholder="제품명이나 페이지 문구를 입력하세요" autocomplete="off" />
        </div>
        <div class="site-search__hint">Enter로 이동 · Esc로 닫기</div>
        <ul class="site-search__results"></ul>
      </div>
    `;
    document.body.appendChild(panel);
    input = panel.querySelector(".site-search__input");
    list = panel.querySelector(".site-search__results");

    panel.addEventListener("click", (event) => {
      if (event.target.dataset.close) closePanel();
    });

    input.addEventListener("input", () => {
      render(search(input.value), input.value);
    });

    input.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closePanel();
      } else if (event.key === "ArrowDown") {
        event.preventDefault();
        setActive(active + 1);
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        setActive(active - 1);
      } else if (event.key === "Enter") {
        event.preventDefault();
        const query = input.value.trim();
        if (!query) return;
        if (lastHits[active]) {
          goTo(lastHits[active], query);
          return;
        }
        if (scrollToQuery(query)) {
          closePanel();
          return;
        }
        const hits = search(query);
        if (hits[0]) goTo(hits[0], query);
      }
    });

    list.addEventListener("click", (event) => {
      const button = event.target.closest("[data-i]");
      if (!button) return;
      const item = lastHits[Number(button.dataset.i)];
      if (item) goTo(item, input.value.trim());
    });

    const trigger = ensureTrigger();
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      openPanel();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && panel.classList.contains("is-open")) closePanel();
    });

    const find = new URLSearchParams(location.search).get("find");
    if (find) {
      const tryScroll = () => scrollToQuery(find);
      tryScroll();
      setTimeout(tryScroll, 250);
      setTimeout(tryScroll, 700);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
