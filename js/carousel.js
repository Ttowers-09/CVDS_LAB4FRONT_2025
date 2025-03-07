let slideIndex = 0;
const slides = document.getElementsByClassName("carousel-slide");

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active"); // Elimina la clase activa
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].classList.add("active"); // Agrega la clase activa

  setTimeout(showSlides, 8000); // Cambia cada 5 segundos
}

// Permitir navegación manual con botones
function moveSlide(n) {
  slideIndex += n - 1;
  showSlides();
}

showSlides();
