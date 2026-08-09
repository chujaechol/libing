document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.getElementById("hero-title");
  const heroLine = document.getElementById("hero-line");
  const heroSubtitle = document.getElementById("hero-subtitle");
  const topNav = document.getElementById("top-nav");

  window.setTimeout(() => {
    heroTitle?.classList.add("is-visible");
    heroLine?.classList.add("is-visible");
    heroSubtitle?.classList.add("is-visible");
  }, 300);

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  window.addEventListener("scroll", () => {
    if (!topNav) return;

    if (window.scrollY > 100) {
      topNav.classList.add("is-scrolled");
    } else {
      topNav.classList.remove("is-scrolled");
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id) return;

      const target = document.getElementById(id);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      target.querySelector(".reveal")?.classList.add("is-visible");
      history.pushState(null, "", `#${id}`);
    });
  });

  const galleryTrigger = document.getElementById("photo-gallery-trigger");
  const galleryMenu = document.getElementById("gallery-menu");

  const openGalleryMenu = () => {
    if (!galleryMenu) return;
    galleryMenu.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeGalleryMenu = () => {
    if (!galleryMenu) return;
    galleryMenu.hidden = true;
    document.body.style.overflow = "";
  };

  galleryTrigger?.addEventListener("click", openGalleryMenu);
  galleryMenu?.querySelectorAll("[data-gallery-close]").forEach((el) => {
    el.addEventListener("click", closeGalleryMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && galleryMenu && !galleryMenu.hidden) {
      closeGalleryMenu();
    }
  });
});
