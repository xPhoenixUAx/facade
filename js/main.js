/* ============================================================
   FACADEPRO SIDING - VANILLA JAVASCRIPT
   Premium interactions, animations, and form handling
   ============================================================ */

// ========== DOCUMENT READY =========
document.addEventListener("DOMContentLoaded", function () {
  initHeaderSticky();
  initMobileNav();
  initScrollAnimations();
  initCookieConsentBanner();
  initPromoDiscountBanner();
  initFormHandling();
  initMaterialCardHovers();
  initSmoothScroll();
  initHeroSlider();
});

// ========== HERO SLIDER (AUTOPLAY) =========
function initHeroSlider() {
  const sliders = document.querySelectorAll(".hero-slider");
  if (!sliders.length) return;

  sliders.forEach((slider) => {
    const slides = Array.from(slider.querySelectorAll(".hero-slide"));
    if (slides.length < 2) {
      if (slides[0]) slides[0].classList.add("is-active");
      return;
    }

    const figure = slider.closest("figure");
    const captionEl = figure
      ? figure.querySelector(".hero-slider-caption")
      : null;

    let index = 0;
    let timerId = null;
    const intervalMs = 4500;

    function showSlide(nextIndex) {
      index = nextIndex;
      slides.forEach((img, i) =>
        img.classList.toggle("is-active", i === index)
      );

      if (captionEl) {
        const caption = slides[index].getAttribute("data-caption");
        if (caption) captionEl.textContent = caption;
      }
    }

    function start() {
      if (timerId) return;
      timerId = window.setInterval(() => {
        showSlide((index + 1) % slides.length);
      }, intervalMs);
    }

    function stop() {
      if (!timerId) return;
      window.clearInterval(timerId);
      timerId = null;
    }

    // initial state
    showSlide(0);
    start();

    // pause on hover / focus
    slider.addEventListener("mouseenter", stop);
    slider.addEventListener("mouseleave", start);
    slider.addEventListener("focusin", stop);
    slider.addEventListener("focusout", start);
  });
}

// ========== STICKY HEADER =========
function initHeaderSticky() {
  const header = document.querySelector("header");
  let lastScrollPosition = 0;

  window.addEventListener(
    "scroll",
    function () {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }

      lastScrollPosition = currentScroll;
    },
    { passive: true }
  );
}

// ========== MOBILE NAVIGATION =========
function initMobileNav() {
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector("nav");
  const navLinks = document.querySelectorAll("nav a");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      nav.classList.toggle("active");

      // Animate hamburger icon
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = nav.classList.contains("active")
        ? "rotate(45deg) translateY(10px)"
        : "";
      spans[1].style.opacity = nav.classList.contains("active") ? "0" : "1";
      spans[2].style.transform = nav.classList.contains("active")
        ? "rotate(-45deg) translateY(-10px)"
        : "";
    });

    // Close nav when link clicked
    navLinks.forEach((link) => {
      link.addEventListener("click", function () {
        nav.classList.remove("active");
        navToggle.querySelectorAll("span").forEach((span) => {
          span.style.transform = "";
          span.style.opacity = "1";
        });
      });
    });
  }
}

// ========== SCROLL ANIMATIONS =========
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-on-scroll");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add animation to all sections
  document.querySelectorAll("section").forEach((section) => {
    observer.observe(section);
  });

  // Add animation to cards
  document.querySelectorAll(".card, .timeline-item").forEach((element) => {
    observer.observe(element);
  });
}

// ========== SMOOTH SCROLL =========
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
}

// ========== COOKIE CONSENT BANNER =========
function initCookieConsentBanner() {
  const storageKey = "facadepro_cookie_consent_v1";
  const acceptedValue = "accepted";
  const rejectedValue = "rejected";

  if (document.querySelector(".cookie-banner")) return;

  let storedValue = null;
  try {
    storedValue = window.localStorage.getItem(storageKey);
  } catch (_) {
    storedValue = null;
  }

  if (storedValue === acceptedValue || storedValue === rejectedValue) return;

  const banner = document.createElement("section");
  banner.className = "cookie-banner";
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-label", "Cookie preferences");
  banner.innerHTML = `
    <div class="cookie-banner__inner container">
      <p class="cookie-banner__text">
        We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of cookies.
      </p>
      <div class="cookie-banner__actions" role="group" aria-label="Cookie consent actions">
        <button class="btn btn-primary" type="button" data-cookie-action="accept">Accept</button>
        <button class="btn btn-secondary" type="button" data-cookie-action="reject">Reject</button>
        <a class="btn btn-tertiary" href="cookies.html" data-cookie-action="policy">Cookie Policy</a>
      </div>
    </div>
  `;

  function closeBanner() {
    banner.remove();
    document.body.classList.remove("has-cookie-banner");
  }

  banner.addEventListener("click", (e) => {
    const actionEl = e.target.closest("[data-cookie-action]");
    if (!actionEl) return;

    const action = actionEl.getAttribute("data-cookie-action");
    if (action !== "accept" && action !== "reject") return;

    try {
      window.localStorage.setItem(
        storageKey,
        action === "accept" ? acceptedValue : rejectedValue
      );
    } catch (_) {
      // Ignore storage errors (e.g., privacy mode)
    }

    closeBanner();
  });

  document.body.appendChild(banner);
  document.body.classList.add("has-cookie-banner");
}

// ========== PROMO DISCOUNT BANNER (50% SCROLL) =========
function initPromoDiscountBanner() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const excludedPages = new Set([
    "contact.html",
    "terms.html",
    "privacy.html",
    "cookies.html",
  ]);
  if (excludedPages.has(currentPage)) return;
  if (document.querySelector(".policy")) return;

  const dismissKey = "facadepro_promo_dismissed_v1";
  try {
    if (window.sessionStorage.getItem(dismissKey) === "1") return;
  } catch (_) {
    // Ignore storage errors
  }

  const bannerClass = "promo-banner";
  if (document.querySelector(`.${bannerClass}`)) return;

  let shown = false;
  let ticking = false;

  function getViewportProgress() {
    const scrollTop =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;
    const scrollHeight =
      document.documentElement.scrollHeight || document.body.scrollHeight || 0;
    const viewportHeight =
      window.innerHeight || document.documentElement.clientHeight || 0;

    if (scrollHeight <= 0) return 0;
    return (scrollTop + viewportHeight) / scrollHeight;
  }

  function showBanner() {
    if (shown) return;
    shown = true;

    const banner = document.createElement("div");
    banner.className = bannerClass;
    banner.setAttribute("role", "region");
    banner.setAttribute("aria-label", "Limited-time discount");

    banner.innerHTML = `
      <div class="promo-banner__inner container">
        <p class="promo-banner__text">
          Call now and get a <span class="promo-banner__discount">25%</span> discount on services
        </p>
        <a class="btn btn-primary promo-banner__cta" href="contact.html#project-form">Go to Contact Form</a>
        <button class="promo-banner__close" type="button" aria-label="Close banner" data-promo-action="close">×</button>
      </div>
    `;

    banner.addEventListener("click", (e) => {
      const actionEl = e.target.closest("[data-promo-action]");
      if (!actionEl) return;
      const action = actionEl.getAttribute("data-promo-action");
      if (action !== "close") return;

      try {
        window.sessionStorage.setItem(dismissKey, "1");
      } catch (_) {
        // Ignore storage errors
      }

      banner.remove();
      document.body.classList.remove("has-promo-banner");
    });

    document.body.appendChild(banner);
    document.body.classList.add("has-promo-banner");
  }

  function onScroll() {
    if (shown) return;
    if (ticking) return;

    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      if (getViewportProgress() >= 0.5) {
        showBanner();
        window.removeEventListener("scroll", onScroll);
      }
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  // In case the page loads already scrolled (e.g., refresh)
  onScroll();
}

// ========== MATERIAL CARD HOVER EFFECTS =========
function initMaterialCardHovers() {
  const materialCards = document.querySelectorAll(".material-card");

  materialCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "var(--color-copper)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "";
    });
  });
}

// ========== FORM HANDLING =========
function initFormHandling() {
  const contactForm = document.querySelector("#contact-form");
  const projectForm = document.querySelector("#project-form");
  const contractorForm = document.querySelector("#contractor-form");

  if (contactForm) {
    contactForm.addEventListener("submit", handleFormSubmit);
  }
  if (projectForm) {
    projectForm.addEventListener("submit", handleFormSubmit);
  }
  if (contractorForm) {
    contractorForm.addEventListener("submit", handleFormSubmit);
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  // Validate required fields
  const requiredFields = ["name", "email", "phone"];
  const isValid = requiredFields.every(
    (field) => data[field] && data[field].trim() !== ""
  );

  if (!isValid) {
    showNotification("Please fill in all required fields", "error");
    return;
  }

  // Validate email
  if (!isValidEmail(data.email)) {
    showNotification("Please enter a valid email address", "error");
    return;
  }

  // Validate phone (basic US format)
  if (!isValidPhone(data.phone)) {
    showNotification("Please enter a valid phone number", "error");
    return;
  }

  // Show success message
  showNotification("Thank you! We'll contact you shortly.", "success");

  // Log form data (in production, send to backend)
  console.log("Form submitted:", data);

  // Reset form
  e.target.reset();

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ========== VALIDATION HELPERS =========
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
}

// ========== NOTIFICATION SYSTEM =========
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background-color: ${
      type === "success" ? "var(--color-copper)" : "var(--color-dark-gray)"
    };
    color: var(--color-off-white);
    padding: 16px 24px;
    border-radius: 2px;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    font-weight: var(--font-weight-semibold);
  `;

  document.body.appendChild(notification);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = "slideInLeft 0.3s ease-out reverse";
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========== PARALLAX SCROLL EFFECT =========
function initParallaxEffect() {
  const parallaxElements = document.querySelectorAll("[data-parallax]");

  if (parallaxElements.length === 0) return;

  window.addEventListener(
    "scroll",
    function () {
      parallaxElements.forEach((element) => {
        const scrollPosition = window.pageYOffset;
        const elementPosition = element.offsetTop;
        const distance = scrollPosition - elementPosition;

        if (Math.abs(distance) < 1000) {
          element.style.transform = `translateY(${distance * 0.5}px)`;
        }
      });
    },
    { passive: true }
  );
}

// Initialize parallax on ready
document.addEventListener("DOMContentLoaded", initParallaxEffect);

// ========== COUNTER ANIMATION =========
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = target;
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(start);
    }
  }, 16);
}

// ========== SERVICE FILTER =========
function initServiceFilter() {
  const filterButtons = document.querySelectorAll("[data-filter]");
  const serviceItems = document.querySelectorAll("[data-service]");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter items
      serviceItems.forEach((item) => {
        const service = item.getAttribute("data-service");
        if (filter === "all" || service === filter) {
          item.style.display = "grid";
          item.classList.add("animate-on-scroll");
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", initServiceFilter);

// ========== MODAL FUNCTIONALITY =========
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";
    modal.classList.add("animate-on-scroll");
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

// Close modal when clicking outside
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("modal")) {
    e.target.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// ========== ACTIVE NAVIGATION LINK =========
function setActiveNavLink() {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("nav a");

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === currentPage || (currentPage === "" && href === "index.html")) {
      link.classList.add("active");
      link.style.color = "var(--color-copper)";
    }
  });
}

document.addEventListener("DOMContentLoaded", setActiveNavLink);

// ========== LAZY LOAD IMAGES =========
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-lazy]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.getAttribute("data-lazy");
        img.removeAttribute("data-lazy");
        observer.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

document.addEventListener("DOMContentLoaded", initLazyLoading);

// ========== WINDOW RESIZE OPTIMIZATION =========
let resizeTimer;
window.addEventListener(
  "resize",
  function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      // Recalculate layouts if needed
    }, 250);
  },
  { passive: true }
);

// ========== KEYBOARD ACCESSIBILITY =========
document.addEventListener("keydown", function (e) {
  // Close mobile menu with ESC
  if (e.key === "Escape") {
    const nav = document.querySelector("nav");
    if (nav && nav.classList.contains("active")) {
      nav.classList.remove("active");
    }
  }
});

// ========== FAQ ACCORDION =========
function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", function () {
      const isActive = item.classList.contains("active");

      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
        }
      });

      // Toggle current item
      if (isActive) {
        item.classList.remove("active");
      } else {
        item.classList.add("active");
      }
    });
  });
}

// Initialize FAQ accordion when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFaqAccordion);
} else {
  initFaqAccordion();
}
