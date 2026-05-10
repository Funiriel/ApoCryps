document.addEventListener("DOMContentLoaded", () => {

  // ─── HERO SLIDER ───────────────────────────────────────
  const images = ["image.jpg", "image2.jpg", "image3.png"];
  const slides = document.querySelectorAll(".hero-bg");

  slides.forEach((slide, i) => {
    if (images[i]) slide.style.backgroundImage = `url('${images[i]}')`;
  });

  let index = 0;
  setInterval(() => {
    if (!slides.length) return;
    const current = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const next = slides[nextIndex];

    next.classList.add("active");
    current.classList.remove("active");
    current.classList.add("prev");

    setTimeout(() => current.classList.remove("prev"), 1000);
    index = nextIndex;
  }, 5000);

  // ─── REVEAL ON SCROLL ──────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  // ─── STATS COUNTER ─────────────────────────────────────
  const statNumbers = document.querySelectorAll(".stat-number[data-target]");
  let statsAnimated = false;

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;

          statNumbers.forEach((el) => {
            const target = parseInt(el.getAttribute("data-target"), 10);
            const duration = 2000;
            const startTime = performance.now();

            const animate = (time) => {
              const progress = Math.min((time - startTime) / duration, 1);
              const eased = 1 - Math.pow(1 - progress, 3);
              el.textContent = Math.floor(eased * target).toLocaleString("uk-UA");
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                el.textContent = target.toLocaleString("uk-UA");
              }
            };

            requestAnimationFrame(animate);
          });

          statsObserver.disconnect();
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector(".stats");
  if (statsSection) statsObserver.observe(statsSection);

  // ─── CONTACT FORM ──────────────────────────────────────
  const form = document.getElementById("contact-form");
  if (form) {
    const button = form.querySelector("button");

    form.addEventListener("input", () => {
      if (form.checkValidity()) {
        button.classList.add("ready");
      } else {
        button.classList.remove("ready");
      }
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      button.textContent = "✓ Надіслано!";
      button.style.background = "linear-gradient(135deg, #4db87a, #7adba0)";
      setTimeout(() => {
        form.reset();
        button.textContent = "Надіслати повідомлення";
        button.style.background = "";
        button.classList.remove("ready");
      }, 3000);
    });
  }

});
