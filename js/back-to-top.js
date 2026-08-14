(function initBackToTop() {
  function setup() {
    if (document.querySelector(".back-to-top")) return;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "back-to-top";
    button.setAttribute("aria-label", "맨 위로 이동");
    button.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 14.5 12 8.5 18 14.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="square"/></svg>';

    button.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    document.body.appendChild(button);

    const toggle = () => {
      button.classList.toggle("is-visible", window.scrollY > 280);
    };

    window.addEventListener("scroll", toggle, { passive: true });
    toggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setup);
  } else {
    setup();
  }
})();
