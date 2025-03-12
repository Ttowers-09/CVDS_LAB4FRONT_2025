document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.getElementById("tabla-eliminar");

    function cargarReservas() {
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

        tableBody.innerHTML = "";

        if (reservas.length === 0) {
            tableBody.innerHTML = "<tr><td colspan='5'>No hay reservas activas</td></tr>";
            return;
        }

        reservas.forEach((reserva, index) => {
            let row = `<tr>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.laboratorio}</td>
                <td>${reserva.ubicacion}</td>
                <td><button class="btn-eliminar" onclick="eliminarReserva(${index})">Eliminar</button></td>
            </tr>`;
            tableBody.innerHTML += row;
        });
    }

    function eliminarReserva(index) {
        let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
        let confirmacion = confirm("¿Seguro que deseas eliminar esta reserva?");
        
        if (confirmacion) {
            reservas.splice(index, 1);
            localStorage.setItem("reservas", JSON.stringify(reservas));
            cargarReservas();
            alert("Reserva eliminada con éxito.");
        }
    }

    cargarReservas();

    // --- ANIMACIÓN AL HACER SCROLL ---
    const elementosAnimados = document.querySelectorAll(".tabla-reservas");

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
});
