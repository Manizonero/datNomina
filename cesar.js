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
