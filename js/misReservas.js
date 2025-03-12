document.addEventListener("DOMContentLoaded", function () {
    cargarReservas();
    
    document.getElementById("filtro-reservas").addEventListener("change", function () {
        filtrarReservas(this.value);
    });
});

function cargarReservas() {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let tabla = document.getElementById("tabla-reservas");

    tabla.innerHTML = "";

    if (reservas.length === 0) {
        tabla.innerHTML = "<tr><td colspan='4'>No hay reservas activas</td></tr>";
        return;
    }

    reservas.forEach(reserva => {
        let fila = `
            <tr>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.nombreLaboratorio}</td>
                <td>${reserva.ubicacion}</td>
            </tr>
        `;
        tabla.innerHTML += fila;
    });
}

function filtrarReservas(filtro) {
    let reservas = JSON.parse(localStorage.getItem("reservas")) || [];
    let tabla = document.getElementById("tabla-reservas");

    tabla.innerHTML = "";

    let reservasFiltradas = reservas.filter(reserva => {
        let fechaReserva = new Date(reserva.fecha);
        let hoy = new Date();
        let semanaActual = new Date();
        semanaActual.setDate(hoy.getDate() - 7);
        let mesActual = new Date();
        mesActual.setMonth(hoy.getMonth() - 1);

        if (filtro === "Hoy") return fechaReserva.toDateString() === hoy.toDateString();
        if (filtro === "Esta Semana") return fechaReserva >= semanaActual;
        if (filtro === "Este Mes") return fechaReserva >= mesActual;
        return true; // "Todos"
    });

    if (reservasFiltradas.length === 0) {
        tabla.innerHTML = "<tr><td colspan='4'>No hay reservas activas</td></tr>";
        return;
    }

    reservasFiltradas.forEach(reserva => {
        let fila = `<tr>
                <td>${reserva.fecha}</td>
                <td>${reserva.hora}</td>
                <td>${reserva.nombreLaboratorio}</td>
                <td>${reserva.ubicacion}</td>
            </tr>`;
        tabla.innerHTML += fila;
    });
}
