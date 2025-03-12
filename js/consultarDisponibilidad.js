document.addEventListener("DOMContentLoaded", function () {
    const availabilityForm = document.getElementById("availability-form");
    const tableBody = document.getElementById("availability-table-body");

    // Datos de ejemplo de laboratorios disponibles
    const laboratorios = [
        { nombre: "Lab Desarrollo", ubicacion: "Bloque B", capacidad: 30 },
        { nombre: "Lab Redes", ubicacion: "Bloque C", capacidad: 25 },
        { nombre: "Lab Computación", ubicacion: "Bloque A", capacidad: 35 },
    ];

    availabilityForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const fecha = document.getElementById("fecha").value;
        const hora = document.getElementById("hora").value;

        // Simulación de consulta de disponibilidad
        tableBody.innerHTML = "";
        laboratorios.forEach(lab => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${lab.nombre}</td>
                <td>${lab.ubicacion}</td>
                <td>${lab.capacidad}</td>
                <td style="color: green; font-weight: bold;">Disponible</td>
            `;
            tableBody.appendChild(row);
        });
    });
});
