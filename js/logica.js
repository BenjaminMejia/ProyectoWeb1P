// Obtener referencias a los elementos del DOM
const listaTareas = document.getElementById('lista-tareas');
const nuevaTarea = document.getElementById('nueva-tarea');
const btnAgregar = document.getElementById('btn-agregar');
const fechaAsignacion = document.getElementById('fecha-asignacion');
const fechaVencimiento = document.getElementById('fecha-vencimiento');

// Función para obtener las tareas del almacenamiento local
function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  if (!tareas) {
    tareas = []; // Si no hay tareas, inicializa un arreglo vacío
  }
  return tareas;
}

// Función para agregar una nueva tarea
// Función para obtener las tareas del almacenamiento local
function obtenerTareas() {
  let tareas = JSON.parse(localStorage.getItem('tareas'));
  if (!tareas) {
    tareas = []; // Si no hay tareas, inicializa un arreglo vacío
  }
  return tareas;
}
// Función para agregar una nueva tarea con fechas de asignación y vencimiento
function agregarTarea(tarea, fechaAsignacion, fechaVencimiento) {
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

  // Span para mostrar la fecha de asignación
  const spanFechaAsignacion = document.createElement('span');
  spanFechaAsignacion.textContent = 'Asignada el: ' + fechaAsignacion;
  spanFechaAsignacion.classList.add('fecha-asignacion');

  // Span para mostrar la fecha de vencimiento
  const spanFechaVencimiento = document.createElement('span');
  spanFechaVencimiento.textContent = 'Vence el: ' + fechaVencimiento;
  spanFechaVencimiento.classList.add('fecha-vencimiento');

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
  elementoTarea.appendChild(spanFechaAsignacion);
  elementoTarea.appendChild(spanFechaVencimiento);
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
      completada: tareaElemento.classList.contains('completada'),
      fechaAsignacion: tareaElemento.querySelector('.fecha-asignacion').textContent,
      fechaVencimiento: tareaElemento.querySelector('.fecha-vencimiento').textContent,
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


// Agregar una nueva tarea
btnAgregar.addEventListener('click', function() {
  const tareaTexto = nuevaTarea.value.trim(); // Eliminar espacios en blanco al inicio y al final del texto
  const fechaAsignacion = new Date(document.getElementById('fecha-asignacion').value);
  const fechaVencimiento = new Date(document.getElementById('fecha-vencimiento').value);
  const fechaActual = new Date(); // Fecha actual

  // Verificar si el campo de nombre de tarea está vacío
  if (!tareaTexto) {
    alert("Agregue el nombre de la nueva tarea");
    return; // Salir de la función si el campo de nombre de tarea está vacío
  }

  // Verificar si la fecha de asignación está vacía o es anterior a la fecha actual
  if (!fechaAsignacion || fechaAsignacion < fechaActual) {
    alert("La fecha de asignación debe ser del día actual en adelante");
    return; // Salir de la función si la fecha de asignación está vacía o es anterior a la fecha actual
  }

  // Verificar si la fecha de vencimiento está vacía o es anterior a la fecha de asignación
  if (!fechaVencimiento || fechaVencimiento < fechaAsignacion) {
    alert("La fecha de vencimiento debe ser posterior a la fecha de asignación");
    return; // Salir de la función si la fecha de vencimiento está vacía o es anterior a la fecha de asignación
  }

  // Si todos los campos están llenos y las fechas son válidas, agregar la tarea
  agregarTarea(tareaTexto, fechaAsignacion.toLocaleDateString(), fechaVencimiento.toLocaleDateString());
});



// Mostrar las tareas al cargar la página
mostrarTareas();