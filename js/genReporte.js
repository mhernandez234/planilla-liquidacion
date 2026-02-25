document.addEventListener("DOMContentLoaded", () => {
  const genero = document.getElementById("gen");
  const nombre = document.getElementById("nom");
  const fecha = document.getElementById("fec");
  const tipo = document.getElementById("tipo");
  const comision = document.getElementById("comision");

  const grilla = document.getElementById("grilla");

  // Actualiza el estado del botón eliminar de todas las filas
  function actualizarBotonesEliminar() {
    const filas = grilla.querySelectorAll("tr");
    filas.forEach((fila) => {
      const btn = fila.querySelector(".btn-eliminar");
      if (btn) {
        btn.disabled = filas.length === 1;
      }
    });
  }

  // Delegar el click del botón eliminar en el tbody
  grilla.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const fila = e.target.closest("tr");
      fila.remove();
      actualizarBotonesEliminar();
    }
  });

  // Agregar líneas a la grilla
  document.getElementById("btn-agrlin").addEventListener("click", () => {
    const nuevaFila = document.createElement("tr");
    nuevaFila.innerHTML = `
      <td data-label="Animal">
        <select name="item" class="item">
          <option value="novillo">Novillos</option>
          <option value="ternero">Terneros</option>
          <option value="vaca">Vacas</option>
        </select>
      </td>

      <td data-label="Cantidad">
        <input type="number" class="cant" placeholder="0">
      </td>

      <td data-label="Peso" class="prepend-cell">
        <div class="cell-inner">
          <span>Kg</span>
          <input type="number" class="peso" step="0.01" placeholder="0.00">
        </div>
      </td>

      <td data-label="Precio" class="prepend-cell">
        <div class="cell-inner">
          <span>U$D</span>
          <input type="number" class="precio" step="0.01" placeholder="0.00">
        </div>
      </td>

      <td class="center">
        <button type="button" class="btn-eliminar" title="Eliminar fila">−</button>
      </td>
    `;
    grilla.appendChild(nuevaFila);
    actualizarBotonesEliminar();
  });

  // Guardar datos del reporte
  document.getElementById("form-rep").addEventListener("submit", (e) => {
    e.preventDefault();

    const items = [...document.querySelectorAll(".item")];
    const cantidades = [...document.querySelectorAll(".cant")];
    const pesos = [...document.querySelectorAll(".peso")];
    const precios = [...document.querySelectorAll(".precio")];

    // Validar campos básicos
    const camposBasicos = [genero, nombre, fecha, tipo, comision];
    if (camposBasicos.some((c) => c.value.trim() === "")) {
      alert("Falta completar campos");
      return;
    }

    // Validar filas
    for (let i = 0; i < items.length; i++) {
      if (
        cantidades[i].value.trim() === "" ||
        pesos[i].value.trim() === "" ||
        precios[i].value.trim() === ""
      ) {
        alert("Faltan datos en una de las líneas");
        return;
      }
    }

    // Guardar datos
    sessionStorage.setItem("genero", genero.value.trim());
    sessionStorage.setItem("nombre", nombre.value.trim());
    sessionStorage.setItem("fecha", fecha.value.trim());
    sessionStorage.setItem("tipo", tipo.value.trim());
    sessionStorage.setItem("comision", comision.value.trim());

    const lineas = items.map((_, i) => ({
      item: items[i].value,
      cantidad: cantidades[i].value,
      peso: pesos[i].value,
      precio: precios[i].value,
    }));

    sessionStorage.setItem("lineas", JSON.stringify(lineas));

    window.location.href = "prevReporte.html";
  });
});
