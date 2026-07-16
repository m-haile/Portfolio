// Highlight the current section link in the nav while scrolling
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".main-nav a");

const setActive = () => {
  let current = "";
  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute("href") === `#${current}` ? "var(--text)" : "";
  });
};

window.addEventListener("scroll", setActive, { passive: true });
setActive();