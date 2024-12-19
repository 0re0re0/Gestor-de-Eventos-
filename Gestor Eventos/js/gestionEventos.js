document.addEventListener("DOMContentLoaded", () => {

    // ===========================================
    // SECCIÓN 2:Gestión de eventos - Formulario de creación de eventos
    // ===========================================

        // SECCIÓN 1: Creación de eventos
        const crearEventoForm = document.getElementById("crear-evento-form");
        const eventoCreadoDiv = document.getElementById("evento-creado");
    
        // Función para cargar eventos desde localStorage
        function cargarEventos() {
            const eventosGuardados = localStorage.getItem("eventos");
            return eventosGuardados ? JSON.parse(eventosGuardados) : [];
        }
    
        // Función para guardar eventos en localStorage
        function guardarEventos(eventos) {
            localStorage.setItem("eventos", JSON.stringify(eventos));
        }
    
        if (crearEventoForm) {
            crearEventoForm.addEventListener("submit", function (event) {
                event.preventDefault(); // Prevenir recarga de la página
    
                // Capturar los valores del formulario
                const nombreEvento = document.getElementById("nombre-evento").value.trim();
                const fecha = document.getElementById("fecha").value.trim();
                const hora = document.getElementById("hora").value.trim();
                const lugar = document.getElementById("lugar").value.trim();
                const descripcion = document.getElementById("descripcion").value.trim();
    
                // Verificar que todos los campos están llenos
                if (!nombreEvento || !fecha || !hora || !lugar || !descripcion) {
                    alert("Por favor, rellena todos los campos.");
                    return;
                }
    
                // Crear un objeto con los datos del evento
                const nuevoEvento = {
                    id: Date.now(),  // Usar el timestamp para asegurar que cada evento tiene un ID único
                    nombre: nombreEvento,
                    fecha: fecha,
                    hora: hora,
                    lugar: lugar,
                    descripcion: descripcion
                };
    
                // Obtener los eventos actuales desde localStorage y agregar el nuevo evento
                const eventos = cargarEventos();
                eventos.push(nuevoEvento);
                guardarEventos(eventos);
    
                // Asignar los valores al div de evento creado
                document.getElementById("evento-nombre").innerText = `Nombre del Evento: ${nombreEvento}`;
                document.getElementById("evento-fecha").innerText = `Fecha: ${fecha}`;
                document.getElementById("evento-hora").innerText = `Hora: ${hora}`;
                document.getElementById("evento-lugar").innerText = `Lugar: ${lugar}`;
                document.getElementById("evento-descripcion").innerText = `Descripción: ${descripcion}`;
    
                // Mostrar el div con la información del evento
                eventoCreadoDiv.style.display = "block";
    
                // Limpiar el formulario
                crearEventoForm.reset();
            });
        }
    });
    