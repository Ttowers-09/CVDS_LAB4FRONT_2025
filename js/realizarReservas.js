document.addEventListener("DOMContentLoaded", function () {
    const botonesAgendar = document.querySelectorAll(".agendar");

    botonesAgendar.forEach(boton => {
        boton.addEventListener("click", function () {
            const fila = this.closest("tr");
            const idLab = fila.children[1].textContent; // ID del laboratorio
            const nombreLab = fila.children[2].textContent; // Nombre del laboratorio
            const locacion = fila.children[3].textContent; // Ubicación
            const capacidad = fila.children[4].textContent; // Capacidad
            const disponibilidad = fila.children[5].textContent; // Disponibilidad
            const fecha = document.getElementById("fecha").value; // Fecha seleccionada
            const hora = document.getElementById("hora").value; // Hora seleccionada

            if (!fecha || !hora) {
                alert("Por favor selecciona una fecha y una hora antes de agendar.");
                return;
            }

            let reservas = JSON.parse(localStorage.getItem("reservas")) || [];

            // Guardamos la información en un objeto
            const nuevaReserva = {
                id: idLab,
                nombre: nombreLab,
                locacion: locacion,
                capacidad: capacidad,
                disponibilidad: disponibilidad,
                fecha: fecha,
                hora: hora
            };

            reservas.push(nuevaReserva);
            localStorage.setItem("reservas", JSON.stringify(reservas));

            alert("Reserva realizada con éxito 🎉");
        });
    });
});
