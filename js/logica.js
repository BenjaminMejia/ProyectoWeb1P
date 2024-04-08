const listaTareas = document.getElementById('lista-tareas');
const nuevaTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('btn-agregar');

// Función para obtener las tareas del almacenamiento local
function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  if (!tareas) {
    tareas = [];
  }
  return tareas;
}

// Función para agregar una nueva tarea
function agregarTarea(tarea) {
  const elementoTarea = document.createElement('li');
  elementoTarea.classList.add('tarea');

  // Checkbox para marcar tarea como completada
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('check');
  checkbox.addEventListener('change', function() {
    marcarTareaCompletada(this);
  });

  // Texto de la tarea
  const textoTarea = document.createElement('span');
  textoTarea.textContent = tarea;

  // Botón para eliminar tarea
  const btnEliminar = document.createElement('button');
  btnEliminar.classList.add('eliminar');
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
  tarea.classList.toggle('completada');

  // Guardar las tareas en el almacenamiento local
  guardarTareas();
}

function eliminarTarea(boton) {
  const tarea = boton.parentNode;
  const tareas = Array.from(listaTareas.querySelectorAll('.tarea')); // Convert NodeList to array
  const indiceTarea = tareas.indexOf(tarea);

  if (indiceTarea !== -1) { // Check if task is found before removing
    listaTareas.removeChild(tarea);

    // Eliminar la tarea del almacenamiento local
    const tareas = obtenerTareas();
    tareas.splice(indiceTarea, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
  } else {
    console.warn("Tarea no encontrada para eliminar"); // Handle case where task is not found
  }
}




// Función para guardar las tareas en el almacenamiento local
function guardarTareas() {
  const tareas = obtenerTareas();
  const tareaTexto = nuevaTarea.value;
  if (tareaTexto) {
    tareas.push({
      texto: tareaTexto,
      completada: false,
    });
    nuevaTarea.value = '';
  }
  localStorage.setItem('tareas', JSON.stringify(tareas));
}

// Mostrar las tareas al cargar la página
function mostrarTareas() {
  const tareas = obtenerTareas();
  tareas.forEach(tarea => {
    agregarTarea(tarea.texto, tarea.completada);
  });

  // Agregar una nueva tarea
  const tareaTexto = nuevaTarea.value;
  if (tareaTexto) {
    agregarTarea(tareaTexto);
  }
}

// Agregar eventos a los botones
btnAgregar.addEventListener('click', function() {
  const tareaTexto = nuevaTarea.value;
  if (tareaTexto) {
    agregarTarea(tareaTexto);
  }
});

mostrarTareas();
