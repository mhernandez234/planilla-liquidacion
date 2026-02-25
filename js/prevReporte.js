import { convertPdf } from "./convertPdf.js";

document.addEventListener("DOMContentLoaded", () => {
  // Datos generales
  const genero = sessionStorage.getItem("genero");
  const nombre = sessionStorage.getItem("nombre");
  const fecha = sessionStorage.getItem("fecha");
  const tipo = sessionStorage.getItem("tipo");
  const comision = Number(sessionStorage.getItem("comision"));

  // Array de líneas
  const lineas = JSON.parse(sessionStorage.getItem("lineas")) || [];

  // Campos generales
  document.getElementById("gen-rep").textContent = genero.trim();
  document.getElementById("nom-rep").textContent = nombre.trim();
  document.getElementById("tipo-rep").textContent = tipo.trim();
  document.getElementById("com-rep").textContent = comision.toString();

  // Formato de fecha
  function formatearFecha(fechaStr) {
    const [año, mes, dia] = fechaStr.split("-");
    const fecha = new Date(año, mes - 1, dia);

    const meses = [
      "Enero",
      "Febrero",
      "Marzo",
      "Abril",
      "Mayo",
      "Junio",
      "Julio",
      "Agosto",
      "Septiembre",
      "Octubre",
      "Noviembre",
      "Diciembre",
    ];

    return `${dia} de ${meses[parseInt(mes) - 1]} de ${año}`;
  }
  document.getElementById("fec-rep").textContent = formatearFecha(fecha.trim());

  // Tabla donde van las líneas
  const cuerpoTabla = document.getElementById("tabla-lineas");

  let totalSubtotales = 0;

  lineas.forEach((item) => {
    const { item: tipoItem, cantidad, peso, precio } = item;

    const subtotal = Number(peso) * Number(precio);
    totalSubtotales += subtotal;

    const tr = document.createElement("tr");

    tr.innerHTML = `
            <td>
                ${cantidad} ${tipoItem} con ${peso} Kg a U$D ${Number(precio).toFixed(2)}
            </td>
            <td>
                USD ${subtotal.toFixed(2)}
            </td>
        `;

    cuerpoTabla.appendChild(tr);
  });

  // Calcular comisión y total general
  const subtotalComision = totalSubtotales * (comision / 100);
  const totalFinal = totalSubtotales + subtotalComision;

  document.getElementById("subtot-com").textContent =
    subtotalComision.toFixed(2);
  document.getElementById("tot-rep").textContent = totalFinal.toFixed(2);

  // Botón PDF
  document
    .getElementById("btn-descargar")
    .addEventListener("click", () => convertPdf("cont-reporte"));
});
