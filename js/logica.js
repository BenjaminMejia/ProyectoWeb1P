// Obtener referencias a los elementos del DOM
const listaTareas = document.getElementById('lista-tareas');
const nuevaTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('btn-agregar');

// Función para obtener las tareas del almacenamiento local
function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  if (!tareas) {
    tareas = []; // Si no hay tareas, inicializa un arreglo vacío
  }
  return tareas;
}

// Función para agregar una nueva tarea
function agregarTarea(tarea) {
  const elementoTarea = document.createElement('li');
  elementoTarea.classList.add('tarea'); // Agrega la clase 'tarea' al elemento creado

  // Checkbox para marcar tarea como completada
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('check'); // Agrega la clase 'check' al checkbox
  checkbox.addEventListener('change', function() {
    marcarTareaCompletada(this);
  });

  // Texto de la tarea
  const textoTarea = document.createElement('span');
  textoTarea.textContent = tarea;
  textoTarea.setAttribute('contenteditable', true); // Hace el texto editable
  textoTarea.addEventListener('blur', function() {
    guardarTareas();
  });

  // Botón para eliminar tarea
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('eliminar'); // Agrega la clase 'eliminar' al botón
  btnEliminar.textContent = 'X';
  btnEliminar.addEventListener('click', function() {
    eliminarTarea(this);
  });

  // Agregar elementos a la lista
  elementoTarea.appendChild(checkbox);
  elementoTarea.appendChild(textoTarea);
  elementoTarea.appendChild(btnEliminar);
  listaTareas.appendChild(elementoTarea);

  // Guardar las tareas en el almacenamiento local
  guardarTareas();
}

// Función para marcar una tarea como completada
function marcarTareaCompletada(checkbox) {
  const tarea = checkbox.parentNode;
  tarea.classList.toggle('completada'); // Alterna la clase 'completada'

  // Guardar las tareas en el almacenamiento local
  guardarTareas();
}

// Función para eliminar una tarea
function eliminarTarea(boton) {
  const tarea = boton.parentNode;
  const tareas = Array.from(listaTareas.querySelectorAll('.tarea')); // Convertir NodeList a array
  const indiceTarea = tareas.indexOf(tarea);

  if (indiceTarea !== -1) { // Verificar si la tarea se encuentra antes de eliminar
    listaTareas.removeChild(tarea); // Eliminar la tarea del DOM

    // Eliminar la tarea del almacenamiento local
    const tareas = obtenerTareas();
    tareas.splice(indiceTarea, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  } else {
    console.warn("Tarea no encontrada para eliminar"); // Manejar el caso donde no se encuentra la tarea
  }
}

// Función para guardar las tareas en el almacenamiento local
function guardarTareas() {
  const tareas = obtenerTareas();
  const tareasActualizadas = Array.from(listaTareas.querySelectorAll('.tarea')).map(tareaElemento => {
    return {
      texto: tareaElemento.querySelector('span').textContent,
      completada: tareaElemento.classList.contains('completada')
    };
  });
  localStorage.setItem('tareas', JSON.stringify(tareasActualizadas));
}

// Función para mostrar las tareas al cargar la página
function mostrarTareas() {
  const tareas = obtenerTareas();
  tareas.forEach(tarea => {
    agregarTarea(tarea.texto);
  });

  // Agregar una nueva tarea si hay texto en el campo de entrada
  const tareaTexto = nuevaTarea.value;
  if (tareaTexto) {
    agregarTarea(tareaTexto);
  }
}

// Agregar eventos a los botones
btnAgregar.addEventListener('click', function() {
  const tareaTexto = nuevaTarea.value.trim(); // Eliminar espacios en blanco al inicio y al final del texto

  if (tareaTexto) {
    agregarTarea(tareaTexto);
  } else {
    alert("Agregue el nombre de la nueva tarea"); // Mostrar mensaje de alerta si el campo está vacío
  }
});


// Mostrar las tareas al cargar la página
mostrarTareas();
