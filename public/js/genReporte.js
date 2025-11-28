document.addEventListener("DOMContentLoaded", () => {
    const genero = document.getElementById('gen');
    const nombre = document.getElementById('nom');
    const fecha = document.getElementById('fec');
    const tipo = document.getElementById('tipo');
    const comision = document.getElementById('comision');

    const grilla = document.getElementById('grilla');

    //Agregar lineas a la grilla
    document.getElementById('btn-agrlin').addEventListener('click', () => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.innerHTML = `
                    <td data-label="Animal">
                        <select name="item" class="item">
                            <option value="novillo">Novillo</option>
                            <option value="ternero">Ternero</option>
                            <option value="vaca">Vaca</option>
                        </select>
                    </td>

                    <td data-label="Cantidad">
                        <input type="number" class="cant">
                    </td>

                    <td data-label="Peso" class="prepend-cell">
                        <span>Kg</span>
                        <input type="number" class="peso" step="0.01">
                    </td>

                    <td data-label="Precio" class="prepend-cell">
                        <span>U$D</span>
                        <input type="number" class="precio" step="0.01">
                    </td>
                    `;
        grilla.appendChild(nuevaFila);
    });

    //Guardar datos del reporte
    document.getElementById('form-rep').addEventListener('submit', (e) => {
        e.preventDefault();

        // Obtener todas las filas
        const items = [...document.querySelectorAll('.item')];
        const cantidades = [...document.querySelectorAll('.cant')];
        const pesos = [...document.querySelectorAll('.peso')];
        const precios = [...document.querySelectorAll('.precio')];

        // Validar campos básicos
        const camposBasicos = [genero, nombre, fecha, tipo, comision];
        if (camposBasicos.some(c => c.value.trim() === "")) {
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
        sessionStorage.setItem('genero', genero.value.trim());
        sessionStorage.setItem('nombre', nombre.value.trim());
        sessionStorage.setItem('fecha', fecha.value.trim());
        sessionStorage.setItem('tipo', tipo.value.trim());
        sessionStorage.setItem('comision', comision.value.trim());

        // Guardar lista completa como JSON
        const lineas = items.map((_, i) => ({
            item: items[i].value,
            cantidad: cantidades[i].value,
            peso: pesos[i].value,
            precio: precios[i].value
        }));

        sessionStorage.setItem('lineas', JSON.stringify(lineas));

        window.location.href = 'prevReporte.html';
    });
});
