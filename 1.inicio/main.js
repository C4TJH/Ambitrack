let datos = []; // Array para almacenar los objetos de datos
let editando = -1; // -1 significa que no estamos editando ningún elemento

// Función para mostrar los datos en la tabla
function mostrarDatos() {
    const tablaBody = document.querySelector("#listaNombres tbody");
    tablaBody.innerHTML = ""; // Limpiar la tabla antes de renderizar

    datos.forEach((item, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${item.nombre}</td>
                <td>${item.ubicacion}</td>
                <td>${item.tipoProblema}</td>
                <td class="acciones">
                    <button onclick="editarNombre(${index})" class="edit-btn">Editar</button>
                    <button onclick="eliminarNombre(${index})" class="delete-btn">Eliminar</button>
                </td>
            </tr>
        `;
        tablaBody.innerHTML += row;
    });
}

// Función para agregar o actualizar un nombre
function agregarNombre() {
    const inputNombre = document.getElementById("nombre");
    const inputUbicacion = document.getElementById("ubicacion");
    const selectTipoProblema = document.getElementById("tipoProblema");

    const nombre = inputNombre.value.trim();
    const ubicacion = inputUbicacion.value.trim();
    const tipoProblema = selectTipoProblema.value;

    if (nombre === "") {
        return alert("Por favor, escribe un nombre.");
    }
    if (ubicacion === "") {
        return alert("Por favor, escribe tu ubicación.");
    }
    if (tipoProblema === "") {
        return alert("Por favor, selecciona un tipo de problema.");
    }
    
    const nuevoRegistro = {
        nombre: nombre,
        ubicacion: ubicacion,
        tipoProblema: tipoProblema
    };

    if (editando === -1) {
        datos.push(nuevoRegistro);
    } else {
        // Modo Actualizar
        datos[editando] = nuevoRegistro;
        editando = -1; // Resetear el estado de edición
    }

    // Limpiar los campos del formulario
    inputNombre.value = "";
    inputUbicacion.value = "";
    selectTipoProblema.value = ""; // Restablecer el select
    
    mostrarDatos(); // Volver a mostrar los datos actualizados
}

// Función para editar un nombre
function editarNombre(index) {
    const inputNombre = document.getElementById("nombre");
    const inputUbicacion = document.getElementById("ubicacion");
    const selectTipoProblema = document.getElementById("tipoProblema");

    const itemAEditar = datos[index];
    inputNombre.value = itemAEditar.nombre;
    inputUbicacion.value = itemAEditar.ubicacion;
    selectTipoProblema.value = itemAEditar.tipoProblema;

    editando = index; // Establecer el índice del elemento que se está editando
}

// Función para eliminar un nombre
function eliminarNombre(index) {
    if (confirm("¿Estás seguro de eliminar este registro?")) {
        datos.splice(index, 1); // Eliminar 1 elemento desde la posición 'index'
        mostrarDatos(); // Volver a mostrar los datos actualizados
        // Si el elemento que se estaba editando es eliminado, resetear el estado de edición
        if (editando === index) {
            editando = -1;
            document.getElementById("nombre").value = "";
            document.getElementById("ubicacion").value = "";
            document.getElementById("tipoProblema").value = "";
        }
    }
}

// Inicializar la tabla al cargar la página
document.addEventListener("DOMContentLoaded", mostrarDatos);