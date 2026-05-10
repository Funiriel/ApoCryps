document.addEventListener("DOMContentLoaded", () => {
  // HERO SLIDER
  const images = ["image.jpg", "image2.jpg", "image3.png"];
  const slides = document.querySelectorAll(".hero-bg");

  slides.forEach((slide, i) => {
    if (images[i]) {
      slide.style.backgroundImage = `url('${images[i]}')`;
    }
  });

  let index = 0;
  setInterval(() => {
    if (slides.length === 0) return;

    const current = slides[index];
    const nextIndex = (index + 1) % slides.length;
    const next = slides[nextIndex];

    next.classList.add("active");
    current.classList.remove("active");
    current.classList.add("prev");

    setTimeout(() => {
      current.classList.remove("prev");
    }, 1000);

    index = nextIndex;
  }, 5000);

  // REVEAL ON SCROLL
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  // MARS MAP FADE-IN
  const marsMap = document.querySelector(".mars-map");
  if (marsMap) {
    const mapObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            marsMap.classList.add("in-view");
            mapObserver.unobserve(marsMap);
          }
        });
      },
      { threshold: 0.05 }
    );
    mapObserver.observe(marsMap);
  }
});
