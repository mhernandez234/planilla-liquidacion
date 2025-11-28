import "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
import "https://cdn.jsdelivr.net/npm/html2canvas@1.4.1/dist/html2canvas.min.js";

const nombre = sessionStorage.getItem('nombre');
const fecha = sessionStorage.getItem('fecha');

export async function convertPdf(contenedor) {
    const { jsPDF } = window.jspdf;

    const element = document.getElementById(contenedor);

    const canvas = await window.html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "pt", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Solo agregar la imagen una vez, sin ciclo while
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    const [año, mes, dia] = fecha.split('-');
    const fechaFormateada = `${dia}-${mes}-${año}`;

    const nombreLimpio = nombre.trim().replace(/\s+/g, '_');
    pdf.save(`liquidacion_${nombreLimpio}_${fechaFormateada}.pdf`);
}