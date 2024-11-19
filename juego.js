// Datos del juego
const preguntas = [
    {
        imagen: "imagen1.jpg", // Cambia esto con la imagen correcta
        titulo: "Pregunta 1: ¿Qué harías en caso de temblor?",
        descripcion: "Escoge una de las siguientes opciones:",
        opciones: [
            {
                texto: "Opción 1: Evacuar el aula",
                resultado: "Descripción de la opción 1...",
            },
            {
                texto: "Opción 2: Quedarse en el aula",
                resultado: "Descripción de la opción 2...",
            },
            {
                texto: "Opción 3: Buscar refugio bajo la mesa",
                resultado: "Descripción de la opción 3...",
            },
        ],
    },
    {
        imagen: "imagen2.jpg", // Cambia esto con la imagen correcta
        titulo: "Pregunta 2: ¿Quieres ver más detalles?",
        descripcion: "¿Sí o No?",
        opciones: [
            { texto: "Sí", resultado: "Explicación de cada opción anterior." },
            { texto: "No", resultado: "Explicación de cada opción anterior." },
        ],
    },
    {
        imagen: "imagen3.jpg", // Cambia esto con la imagen correcta
        titulo: "Pregunta 3: ¿Qué hacer después del temblor?",
        descripcion: "Escoge una opción:",
        opciones: [
            {
                texto: "Opción 1: Llamar a los servicios de emergencia",
                resultado: "Explicación de la opción 1...",
            },
            {
                texto: "Opción 2: Comprobar que todos estén bien",
                resultado: "Explicación de la opción 2...",
            },
        ],
    },
];

let indicePreguntaActual = 0;
let respuestasSeleccionadas = []; // Array para almacenar las respuestas seleccionadas

// Función para cargar la pregunta
function cargarPregunta(indice) {
    const pregunta = preguntas[indice];
    document.getElementById("imagen-pregunta").src = pregunta.imagen;
    document.getElementById("titulo-pregunta").textContent = pregunta.titulo;
    document.getElementById("descripcion-pregunta").textContent =
        pregunta.descripcion;

    const contenedorOpciones = document.getElementById("contenedor-opciones");
    contenedorOpciones.innerHTML = ""; // Limpiar opciones anteriores

    pregunta.opciones.forEach((opcion) => {
        const boton = document.createElement("button");
        boton.textContent = opcion.texto;
        boton.onclick = () =>
            seleccionarRespuesta(opcion.texto, opcion.resultado);
        contenedorOpciones.appendChild(boton);
    });
}

// Función para seleccionar la respuesta y guardar el resultado
function seleccionarRespuesta(textoRespuesta, textoResultado) {
    respuestasSeleccionadas.push({
        respuesta: textoRespuesta,
        resultado: textoResultado,
    });

    // Ocultamos las preguntas y mostramos el resultado
    document.getElementById("contenedor-pregunta").style.display = "none";
    const contenedorResultados = document.getElementById(
        "contenedor-resultados"
    );
    document.getElementById("resultado-final").textContent = textoResultado;
    contenedorResultados.style.display = "block";
    document.getElementById("btn-siguiente").style.display = "inline-block"; // Mostrar botón siguiente
}

// Función para avanzar a la siguiente pregunta
function siguientePregunta() {
    // Aumentamos el índice de la pregunta
    indicePreguntaActual++;

    // Si hay más preguntas, cargamos la siguiente
    if (indicePreguntaActual < preguntas.length) {
        document.getElementById("contenedor-resultados").style.display = "none";
        document.getElementById("contenedor-pregunta").style.display = "block";
        cargarPregunta(indicePreguntaActual);
    } else {
        // Si ya no hay más preguntas, mostramos el resumen con todas las respuestas
        mostrarResumen();
    }
}

// Función para mostrar el resumen al final del juego
function mostrarResumen() {
    document.getElementById("contenedor-resultados").style.display = "none";
    document.getElementById("contenedor-pregunta").style.display = "none";
    document.getElementById("contenedor-resumen").style.display = "block";

    // Mostramos todas las respuestas seleccionadas
    const listaRespuestas = document.getElementById("lista-respuestas");
    listaRespuestas.innerHTML = ""; // Limpiar la lista antes de mostrar el resumen
    respuestasSeleccionadas.forEach((respuesta) => {
        const li = document.createElement("li");
        li.textContent = `Respuesta: ${respuesta.respuesta} - Explicación: ${respuesta.resultado}`;
        listaRespuestas.appendChild(li);
    });
}

// Función para reiniciar el juego
function reiniciarJuego() {
    // Reiniciamos los valores
    document.getElementById("contenedor-resumen").style.display = "none";
    document.getElementById("contenedor-pregunta").style.display = "block";
    indicePreguntaActual = 0;
    respuestasSeleccionadas = [];
    cargarPregunta(indicePreguntaActual);
}

// Inicializar el juego
cargarPregunta(indicePreguntaActual);
