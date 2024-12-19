document.addEventListener("DOMContentLoaded", () => {

    // ===========================================
    // SECCIÓN 3:Filtro y presentacion de eventos 
    // ===========================================

    const eventContainer = document.getElementById("lista-eventos");
    const busquedaInput = document.getElementById("busqueda");

    // Función para cargar eventos desde localStorage
    function cargarEventos() {
        const eventosGuardados = localStorage.getItem("eventos");
        return eventosGuardados ? JSON.parse(eventosGuardados) : [];
    }

    // Función para guardar los eventos en localStorage
    function guardarEventos(eventos) {
        localStorage.setItem("eventos", JSON.stringify(eventos));
    }


    // Función para ordenar los eventos por fecha
    function ordenarEventosPorFecha(eventos) {
        return eventos.sort((a, b) => {
            const fechaA = new Date(a.fecha); // Crear objeto Date para la fecha del evento A
            const fechaB = new Date(b.fecha); // Crear objeto Date para la fecha del evento B
            return fechaA - fechaB; // Ordenar de menor a mayor (por fecha)
        });
    }

    // Función para mostrar los eventos
    function mostrarEventos(eventos) {
        eventContainer.innerHTML = ""; // Limpiar el contenedor de eventos

        if (eventos.length === 0) {
            eventContainer.innerHTML = "<p>No hay eventos creados.</p>";
            return;
        }

        eventos.forEach(evento => {
            const eventoCard = document.createElement("div");
            eventoCard.classList.add("evento-card");
            eventoCard.innerHTML = `
                <h3>${evento.nombre}</h3>
                <p><strong>Fecha:</strong> ${evento.fecha} - <strong>Hora:</strong> ${evento.hora}</p>
                <p><strong>Lugar:</strong> ${evento.lugar}</p>
                <p><strong>Descripción:</strong> ${evento.descripcion}</p>
                <button class="btn btn-danger eliminar-evento">
                    <i class="bi bi-trash"></i>
                </button>
            `;
            eventContainer.appendChild(eventoCard);

            // Agregar el evento de eliminación
            const eliminarBtn = eventoCard.querySelector(".eliminar-evento");
            eliminarBtn.addEventListener("click", () => {
                eliminarEvento(evento.nombre); // Pasamos el nombre para identificar el evento
            });
        });
    }

    // Función para eliminar un evento
    function eliminarEvento(nombreEvento) {
        let eventos = cargarEventos();
        // Filtramos el evento con el nombre específico
        eventos = eventos.filter(evento => evento.nombre !== nombreEvento);
        guardarEventos(eventos);  // Actualizar los eventos en localStorage
        const eventosOrdenados = ordenarEventosPorFecha(eventos);
        mostrarEventos(eventosOrdenados);  // Mostrar los eventos ordenados
    }

    // Función para filtrar eventos por nombre, lugar o fecha
    function filtrarEventos() {
        const query = busquedaInput.value.toLowerCase();
        const eventos = cargarEventos();
        const eventosFiltrados = eventos.filter(evento => {
            const fecha = evento.fecha.toLowerCase();
            return (
                evento.nombre.toLowerCase().includes(query) ||
                evento.lugar.toLowerCase().includes(query) ||
                fecha.includes(query) // Filtrar también por la fecha
            );
        });
        mostrarEventos(eventosFiltrados);
    }


    // Cargar los eventos guardados desde localStorage, ordenarlos por fecha y mostrarlos
    const eventos = cargarEventos();
    const eventosOrdenados = ordenarEventosPorFecha(eventos);
    mostrarEventos(eventosOrdenados);

    // Filtrar eventos cuando se escribe en el campo de búsqueda
    busquedaInput.addEventListener("input", filtrarEventos);
});