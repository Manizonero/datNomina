document.getElementById("guardar").addEventListener("click", function () {
    var placa = document.getElementById("placa").value.trim();
    var ot = document.getElementById("ot").value.trim();
    var trabajo = document.getElementById("trabajo").value.trim();
    var botonGuardar = document.getElementById("guardar");
    var indicadorCarga = document.getElementById("cargando");

    if (!placa || !ot || !trabajo) {
        alert("⚠️ Debes ingresar la placa, OT y el trabajo antes de guardar.");
        return;
    }

    // Mostrar indicador de carga y deshabilitar el botón
    indicadorCarga.style.display = "inline-block";
    botonGuardar.disabled = true;
    botonGuardar.textContent = "Guardando...";

    fetch("https://script.google.com/macros/s/AKfycbxPFciDgJb5K4russ5-aT6dmNduW7kzFkbM3AcBEMTRRMlHRXrtzlRunK5I0JCsh4w/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ placa: placa, OT: ot, trabajo: trabajo })
    })
    .then(() => {
        alert("✅ Datos Guardados en Hoja Cesar");
        document.getElementById("registroTrabajo").reset(); // Limpiar formulario
    })
    .catch(error => {
        console.error("❌ Error al guardar:", error);
        alert("❌ Error al guardar los datos.");
    })
    .finally(() => {
        // Ocultar indicador de carga y restaurar el botón
        indicadorCarga.style.display = "none";
        botonGuardar.disabled = false;
        botonGuardar.textContent = "Guardar";
    });
});

// Convertir la placa a mayúsculas automáticamente
document.getElementById("placa").addEventListener("input", function() {
    this.value = this.value.toUpperCase();
});
