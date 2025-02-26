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
    const horasNoFacturadas = document.getElementById("hnofac");
    const horasFacturadas = document.getElementById("hfac");
    
    // Crear elemento para el mensaje de carga
    const mensajeCarga = document.createElement("p");
    mensajeCarga.textContent = "Cargando Datos Por Favor Espere...";
    mensajeCarga.style.display = "none"; // Oculto por defecto
    mensajeCarga.style.color = "blue";
    mensajeCarga.style.fontWeight = "bold";
    
    // Insertar mensaje antes del botón actualizar
    btnActualizar.insertAdjacentElement("beforebegin", mensajeCarga);

    const webAppURL = "https://script.google.com/macros/s/AKfycby5-bZZfBQc5CgRPA_kpy2WxpRla83tGA0iFyfPapJ6-qCVGnFawefCiGmEqpkZnCtDAA/exec";

    async function actualizarDatos() {
        try {
            mensajeCarga.style.display = "block"; // Mostrar mensaje de carga

            const response = await fetch(webAppURL);
            const data = await response.json();

            // Mostrar datos en los inputs
            horasFacturadas.value = data.horas_facturadas;
            horasNoFacturadas.value = data.horas_no_facturadas;

        } catch (error) {
            console.error("Error al obtener datos:", error);
        } finally {
            // Ocultar mensaje de carga después de obtener la respuesta
            setTimeout(() => {
                mensajeCarga.style.display = "none";
            }, 1000); // Ocultar después de 1 segundo (opcional)
        }
    }

    btnActualizar.addEventListener("click", function (event) {
        event.preventDefault();
        actualizarDatos();
    });
});
