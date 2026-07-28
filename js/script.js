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

// Menu burger mobile

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = mainNav.classList.toggle("is-open");
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", isOpen);
});

// Ferme le menu quand on clique un lien

mainNav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("is-open");
    menuToggle.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Formulaire de contact — envoi via EmailJS

emailjs.init({
  publicKey: "PHL_vUbubyr3nfa8m",
});
 
const contactForm = document.querySelector("#contact-form");
 
if (contactForm) {
  const formStatus = document.createElement("p");
  formStatus.className = "form-success";
  formStatus.style.display = "none";
  contactForm.insertAdjacentElement("afterend", formStatus);
 
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Envoi en cours...";
 
    try {
      await emailjs.sendForm("service_txvamvo", "template_f27anxl", contactForm);
 
      // Succès : on vide le formulaire et on affiche le message
      contactForm.reset();
      formStatus.textContent = "Merci, votre message a bien été envoyé !";
      formStatus.style.display = "block";
 
      // Le message disparaît après 5 secondes
      setTimeout(() => {
        formStatus.style.display = "none";
      }, 5000);
 
    } catch (error) {
      console.error("EmailJS error:", error?.text || error?.message || error);
      alert("Une erreur est survenue, réessayez.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Envoyer le message";
    }
  });
}