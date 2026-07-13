const revealItems = document.querySelectorAll(".reveal");
const form = document.querySelector("#contact-form");
const note = document.querySelector("#form-note");

document.documentElement.classList.add("js");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

if (form && note) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const name = data.get("name") || "Cliente";
    const job = data.get("job") || "Trabajo de pladur";
    const message = data.get("message") || "Quiero pedir presupuesto.";

    const text = `Hola, soy ${name}. Necesito presupuesto para: ${job}. ${message}`;
    note.textContent = `Mensaje preparado: "${text}"`;
  });
}
