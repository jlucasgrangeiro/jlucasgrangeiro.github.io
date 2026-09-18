document.getElementById("year").textContent = new Date().getFullYear();

const navToggle = document.getElementById("navToggle");
const mainNav = document.getElementById("mainNav");

navToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in-view"));
}

const EMAIL = "jaozim2@gmail.com";

function copyEmail() {
  if (navigator.clipboard) {
    return navigator.clipboard.writeText(EMAIL);
  }
  return Promise.reject();
}

const emailContactLink = document.querySelector('.contact-link[href^="mailto:"]');
if (emailContactLink) {
  const valueSpan = emailContactLink.querySelector("span:last-child");
  emailContactLink.addEventListener("click", () => {
    if (!valueSpan) return;
    const original = valueSpan.textContent;
    copyEmail().then(() => {
      valueSpan.textContent = "Copiado!";
      setTimeout(() => {
        valueSpan.textContent = original;
      }, 2000);
    }).catch(() => {});
  });
}
