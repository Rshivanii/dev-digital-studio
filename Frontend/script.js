emailjs.init("lstms8ahQMvn4poeQ");

// ===== AOS INIT =====
AOS.init({ duration: 1000, once: true });

// ===== TYPING ANIMATION =====
const words = [
  "Wedding Moments",
  "Pre-Wedding Shoots",
  "Birthday Memories",
  "Haldi Celebrations",
  "Mehndi Ceremonies",
  "Cocktail Nights",
  "Corporate Events",
  "Every Special Moment"
];

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-text");

function type() {
  const current = words[wordIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
  }
  if (!isDeleting && charIndex === current.length + 1) {
    setTimeout(() => isDeleting = true, 1500);
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }
  setTimeout(type, isDeleting ? 60 : 100);
}
type();

// ===== NAVBAR SCROLL EFFECT =====
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(5,5,5,0.98)";
    navbar.style.padding = "12px 60px";
  } else {
    navbar.style.background = "rgba(10,10,10,0.85)";
    navbar.style.padding = "18px 60px";
  }
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

// ===== GALLERY DATA =====
const galleryData = [
  { id: 1,  src: "https://dev-digital-studio.onrender.com/images/shoot1.jpeg", title: "Pre Wedding Shoot",     category: "pre-wedding" },
  { id: 2,  src: "https://dev-digital-studio.onrender.com/images/shoot2.jpeg", title: "Pre Wedding Shoot",     category: "pre-wedding" },
  { id: 3,  src: "https://dev-digital-studio.onrender.com/images/shoot3.jpeg", title: "Pre Wedding Shoot",     category: "pre-wedding" },
  { id: 4,  src: "https://dev-digital-studio.onrender.com/images/shoot4.jpeg", title: "Pre Wedding Shoot",     category: "pre-wedding" },
  { id: 5,  src: "https://dev-digital-studio.onrender.com/images/shoot5.jpg",  title: "Couple Party",          category: "cocktail" },
  { id: 6,  src: "https://dev-digital-studio.onrender.com/images/shoot6.jpg",  title: "Couple Party",          category: "cocktail" },
  { id: 7,  src: "https://dev-digital-studio.onrender.com/images/shoot7.jpg",  title: "Bridal Shoot",          category: "bridal" },
  { id: 8,  src: "https://dev-digital-studio.onrender.com/images/shoot8.jpg",  title: "Party Hall Decoration", category: "wedding" },
  { id: 9,  src: "https://dev-digital-studio.onrender.com/images/shoot9.jpg",  title: "Party Hall Decoration", category: "wedding" },
  { id: 10, src: "https://dev-digital-studio.onrender.com/images/shoot10.jpg", title: "Groom Entry",           category: "groom" },
  { id: 11, src: "https://dev-digital-studio.onrender.com/images/shoot11.jpg", title: "Bridal Shoot",          category: "bridal" },
  { id: 12, src: "https://dev-digital-studio.onrender.com/images/shoot12.jpg", title: "Bridal Shoot",          category: "bridal" },
];

// ===== RENDER GALLERY =====
let currentImages = [...galleryData];

function renderGallery(data, containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";
  data.forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "gallery-item";
    div.setAttribute("data-aos", "fade-up");
    div.setAttribute("data-aos-delay", (index % 4) * 80);
    div.innerHTML = `
      <img src="${item.src}" alt="${item.title}" loading="lazy">
      <div class="overlay-label">${item.title}</div>
    `;
    div.addEventListener("click", () => openLightbox(index, data));
    container.appendChild(div);
  });
  AOS.refresh();
}

renderGallery(galleryData, "gallery-grid");
renderGallery(galleryData, "portfolio-grid");

// ===== FILTER GALLERY =====
function filterGallery(category) {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.classList.remove("active");
    if (
      (category === "all" && btn.textContent.trim() === "All") ||
      btn.textContent.trim().toLowerCase().replace(" ", "-") === category
    ) {
      btn.classList.add("active");
    }
  });

  const filtered = category === "all"
    ? galleryData
    : galleryData.filter(item => item.category === category);

  currentImages = filtered;
  renderGallery(filtered, "gallery-grid");
}

// ===== LIGHTBOX =====
let currentIndex = 0;
let currentData = [];

function openLightbox(index, data) {
  currentIndex = index;
  currentData = data;
  document.getElementById("lb-img").src = data[index].src;
  document.getElementById("lightbox").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  document.getElementById("lightbox").classList.remove("active");
  document.body.style.overflow = "";
}

function changeLightbox(direction) {
  currentIndex = (currentIndex + direction + currentData.length) % currentData.length;
  document.getElementById("lb-img").src = currentData[currentIndex].src;
}

document.getElementById("lightbox").addEventListener("click", function (e) {
  if (e.target === this) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (document.getElementById("lightbox").classList.contains("active")) {
    if (e.key === "ArrowRight") changeLightbox(1);
    if (e.key === "ArrowLeft") changeLightbox(-1);
    if (e.key === "Escape") closeLightbox();
  }
});

// ===== BOOKING FORM =====
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name    = document.getElementById("fname").value.trim();
  const phone   = document.getElementById("fphone").value.trim();
  const event   = document.getElementById("fevent").value;
  const date    = document.getElementById("fdate").value;
  const message = document.getElementById("fmessage").value.trim();
  const status  = document.getElementById("form-status");

  if (!name || !phone) {
    status.textContent = "Please fill name and phone number!";
    status.style.color = "#ff4d4d";
    return;
  }

  status.textContent = "Sending...";
  status.style.color = "#d4af37";

  const templateParams = {
    from_name: name,
    phone: phone,
    event: event || "Not specified",
    date: date || "Not specified",
    message: message || "None"
  };

  emailjs.send("service_methpmi", "template_8fkw6ql", templateParams)
    .then(() => {
      status.textContent = "✅ Enquiry sent! We will contact you soon.";
      status.style.color = "#d4af37";
      const waText = `🎯 *New Booking Enquiry — Dev Studio*\n\n👤 *Name:* ${name}\n📞 *Phone:* ${phone}\n🎉 *Event:* ${event || "Not specified"}\n📅 *Date:* ${date || "Not specified"}\n💬 *Message:* ${message || "None"}`;
      window.open(`https://wa.me/919810675960?text=${encodeURIComponent(waText)}`, "_blank");
      this.reset();
    })
    .catch((error) => {
      status.textContent = "❌ Something went wrong. Please try again!";
      status.style.color = "#ff4d4d";
      console.error(error);
    });
});

// ===== FILTER AND GO =====
function filterAndGo(category) {
  filterGallery(category);
  document.getElementById("events").scrollIntoView({ behavior: "smooth" });
}