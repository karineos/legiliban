// --------- FOOTER: YEAR + VISITOR COUNTER ---------
// --------- FOOTER: YEAR + PAGE VIEW COUNTER (increments on every refresh) ---------
function initVisitorCounter() {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  const viewEl = document.getElementById("viewCount");
  if (!viewEl) return;

  const VIEWS_KEY = "legiliban_totalViews";

  // get current count, default 0
  let views = parseInt(localStorage.getItem(VIEWS_KEY) || "0", 10);

  // ALWAYS increment on page load
    views++;

  // save new total
  localStorage.setItem(VIEWS_KEY, String(views));

  // display it
  viewEl.textContent = views;
}


async function loadPartial(id, file) {
  const container = document.getElementById(id);
  if (!container) return;
  try {
    const res = await fetch(file);
    const html = await res.text();
    container.innerHTML = html;
  } catch (e) {
    console.error("Error loading partial:", file, e);
  }
}

function initHeaderBehavior() {
  const mainNav = document.querySelector(".main-nav");
  const navToggle = document.querySelector(".nav-toggle");
  let lastScroll = window.scrollY;

  // mobile toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });
  }

  // hide nav line on scroll down (desktop)
  if (mainNav) {
    window.addEventListener("scroll", () => {
      const current = window.scrollY;
      const isMobile = window.innerWidth <= 768;

      if (!isMobile) {
        if (current > lastScroll && current > 80) {
          mainNav.classList.add("nav-hidden");
        } else {
          mainNav.classList.remove("nav-hidden");
        }
      }
      lastScroll = current;
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // load header & footer into each page
  await loadPartial("site-header", "header.html");
  await loadPartial("site-footer", "footer.html");

  // now that header/footer HTML is in DOM, init behaviors
  initHeaderBehavior();
  initVisitorCounter();

  // your scroll reveal logic (optional, you already have it)
  const reveals = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  reveals.forEach(el => observer.observe(el));
});
