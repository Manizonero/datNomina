// Guardar En Hoja De Calculo
document.getElementById("guardar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    
    let placa = document.getElementById("placa").value.toUpperCase();
    let orden = document.getElementById("orden").value;
    let trabajo = document.getElementById("trabajo").value;
    
    let data = { placa: placa, orden: orden, trabajo: trabajo };
    
    fetch("https://script.google.com/macros/s/AKfycbz3zKpkGYCErgbGsFGz2d6Z07c8DgzgvZYWfPcswUAJOnj7Zt1q-Vh5RH-dNALCPtj0bA/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    }).then(() => {
        alert("Datos Enviados");
        document.getElementById("registroTrabajo").reset();
    }).catch(error => console.error("Error:", error));
});

document.addEventListener("DOMContentLoaded", function () {
    const btnActualizar = document.querySelector(".btnactu");
    const horasNoFacturadas = document.getElementById("hfac");
    const horasFacturadas = document.getElementById("hnofac");

    // URL del Web App de Google Apps Script (reemplázala con la tuya)
    const webAppURL = "https://script.google.com/macros/s/AKfycby5-bZZfBQc5CgRPA_kpy2WxpRla83tGA0iFyfPapJ6-qCVGnFawefCiGmEqpkZnCtDAA/exec";

    async function actualizarDatos() {
        try {
            const response = await fetch(webAppURL);
            const data = await response.json();

            // Mostrar datos en los inputs
            horasFacturadas.value = data.horas_facturadas;
            horasNoFacturadas.value = data.horas_no_facturadas;

        } catch (error) {
            console.error("Error al obtener datos:", error);
        }
    }

    btnActualizar.addEventListener("click", function (event) {
        event.preventDefault();
        actualizarDatos();
    });
});
