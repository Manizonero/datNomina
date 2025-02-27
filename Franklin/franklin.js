// Guardar En Hoja De Calculo
document.getElementById("guardar").addEventListener("click", function(event) {
    event.preventDefault(); // Evita el envío predeterminado del formulario
    
    let placa = document.getElementById("placa").value.toUpperCase();
    let orden = document.getElementById("orden").value;
    let trabajo = document.getElementById("trabajo").value;
    
    let data = { placa: placa, orden: orden, trabajo: trabajo };
    
    fetch("https://script.google.com/macros/s/AKfycbz7zOK72LzFMLl5UzwpE3xEfhu8hxs6VO-4C_dyNzYPUdm1iMEzNU6QQT1A1hSEEdvvtQ/exec", {
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
    
    // Crear elemento para el mensaje de carga
    const mensajeCarga = document.createElement("p");
    mensajeCarga.textContent = "Cargando Datos Por Favor Espere...";
    mensajeCarga.style.display = "none"; // Oculto por defecto
    mensajeCarga.style.color = "blue";
    mensajeCarga.style.fontWeight = "bold";
    
    // Insertar mensaje antes del botón actualizar
    btnActualizar.insertAdjacentElement("beforebegin", mensajeCarga);

    const webAppURL = "https://script.google.com/macros/s/AKfycbzvz_9omkfvb18o6invsxACKLScErFXmYWZ4lZhH5gg-wAJOeptv0deOmSAY6kjEmJR6Q/exec";

    async function actualizarDatos() {
        try {
            mensajeCarga.style.display = "block"; // Mostrar mensaje de carga

            const response = await fetch(webAppURL);
            const data = await response.json();

            // Mostrar datos en los inputs, formateando a 2 decimales
            horasFacturadas.value = parseFloat(data.horas_facturadas).toFixed(2);
            horasNoFacturadas.value = parseFloat(data.horas_no_facturadas).toFixed(2);

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
