const parallax = document.getElementById("home-img-lg");
const parallax1 = document.getElementById("parallax1");
const parallax2 = document.getElementById("parallax2");

// Parallax guards so no errors if elements are missing
window.addEventListener("scroll", function () {
  if (!parallax) return;
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionX = offset * -0.3 - 100 + "px";
});

window.addEventListener("scroll", function () {
  if (!parallax1) return;
  let offset = window.pageYOffset;
  offset -= 3100;
  parallax1.style.backgroundPositionY = offset * 0.1 + "px";
});

window.addEventListener("scroll", function () {
  if (!parallax2) return;
  let offset = window.pageYOffset;
  offset -= 4800;
  parallax2.style.backgroundPositionY = offset * -0.1 + "px";
});

function myFunction() {
  const cb = document.getElementById("check");
  if (cb) cb.checked = false;
}

// Reveal on scroll
function reveal() {
  var reveals = document.querySelectorAll(".reveal");
  for (var i = 0; i < reveals.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = reveals[i].getBoundingClientRect().top;
    var elementVisible = 150;

    if (elementTop < windowHeight - elementVisible) {
      reveals[i].classList.add("active");
    } else {
      reveals[i].classList.remove("active");
    }
  }
}
window.addEventListener("scroll", reveal);

/* --------- Mobile/Tablet Clickable Carousel (≤1000px) --------- */
(function initGalleryCarousel() {
  const gallery = document.getElementById("gallery");
  if (!gallery) return;

  const imgs = Array.from(gallery.querySelectorAll(".gallery-img"));
  const prevBtn = document.getElementById("galPrev");
  const nextBtn = document.getElementById("galNext");
  const dotsWrap = document.getElementById("galDots");

  const isCarouselMode = () => window.innerWidth <= 1000;

  let current = 0;

  function renderDots() {
    dotsWrap.innerHTML = "";
    imgs.forEach((_, i) => {
      const b = document.createElement("button");
      b.className = "dot" + (i === current ? " active" : "");
      b.setAttribute("aria-label", `Go to image ${i + 1}`);
      b.addEventListener("click", () => {
        current = i;
        render();
      });
      dotsWrap.appendChild(b);
    });
  }

  function render() {
    if (isCarouselMode()) {
      gallery.classList.add("is-carousel");
      imgs.forEach((el, i) => {
        el.classList.toggle("active", i === current);
      });
      renderDots();
    } else {
      gallery.classList.remove("is-carousel");
      imgs.forEach((el) => el.classList.remove("active"));
      // Dots not shown on desktop
      dotsWrap.innerHTML = "";
    }
  }

  function next() {
    current = (current + 1) % imgs.length;
    render();
  }
  function prev() {
    current = (current - 1 + imgs.length) % imgs.length;
    render();
  }

  // Click image to go next (mobile/tablet only)
  imgs.forEach((el) => {
    el.addEventListener("click", () => {
      if (isCarouselMode()) next();
    });
  });

  // Buttons
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);

  // Re-render on resize to switch modes
  window.addEventListener("resize", render);

  // Initial
  render();
})();
