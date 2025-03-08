document.addEventListener("DOMContentLoaded", function () {
    // --- 1. FILTRAR LABORATORIOS SEGÚN LA SELECCIÓN ---
    const tipoLaboratorio = document.getElementById("tipo-laboratorio");
    const filtroHora = document.querySelector(".filtro select");
    const filasLaboratorio = document.querySelectorAll("tbody tr");

    function filtrarLaboratorios() {
        const tipoSeleccionado = tipoLaboratorio.value;
        const horaSeleccionada = filtroHora.value;

        filasLaboratorio.forEach(fila => {
            const nombreLab = fila.children[2].textContent;
            const disponibilidad = fila.children[5].textContent.toLowerCase().trim(); // Convierte a minúsculas para evitar errores
            const horaLab = fila.getAttribute("data-hora"); // Agregar atributo con la hora en el HTML

            const estaDisponible = disponibilidad === "true" || disponibilidad.includes("✅");
            const coincideHora = horaSeleccionada === "Filtrar por hora" || horaSeleccionada === horaLab;

            if ((nombreLab === tipoSeleccionado || tipoSeleccionado === "") && estaDisponible && coincideHora) {
                fila.style.display = "";
            } else {
                fila.style.display = "none";
            }
        });
    }

    tipoLaboratorio.addEventListener("change", filtrarLaboratorios);
    filtroHora.addEventListener("change", filtrarLaboratorios);

    // --- 2. MENSAJE DE CONFIRMACIÓN AL AGENDAR ---
    const botonesAgendar = document.querySelectorAll(".agendar");

    botonesAgendar.forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = this.closest("tr");
            const laboratorio = fila.children[2].textContent;
            const confirmacion = confirm(`¿Deseas agendar el laboratorio: ${laboratorio}?`);
            
            if (confirmacion) {
                alert("Reserva realizada con éxito 🎉");
                fila.children[5].textContent = "Reservado ❌"; // Marcar como no disponible
                filtrarLaboratorios(); // Refrescar la lista
            }
        });
    });

    // --- 3. ANIMACIÓN AL HACER SCROLL ---
    const elementosAnimados = document.querySelectorAll(".seleccion-container, .tabla-citas");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.2 });

    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = 0;
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition = "opacity 0.8s ease, transform 0.8s ease";
        observer.observe(elemento);
    });

    // --- 4. BOTÓN "VOLVER AL INICIO" CON SCROLL SUAVE ---
    const botonInicio = document.querySelector(".boton-flotante");

    botonInicio.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});
