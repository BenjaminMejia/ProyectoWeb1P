### Descripción del Proyecto

Es una página web con diseño responsivo para usuarios que ingresen desde su PC o dispositivos móviles que les permite a los usuarios crear tareas, modificar su estado y eliminarlas.


### Tecnologías Utilizadas
- HTML5
- CSS3
- JS
- GitHub
- GitHub Pages
- Visual Studio Code
- Editor.md

### Como Clonar el Repositorio

Se hace clic en la pestaña "Code" y se copia la URL del repositorio en el portapapeles.

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Clonar1.jpg?raw=true)

Después se debe entrar en la carpeta donde se desea clonar el repositorio y abrir Git Bash (ya se debe contar con Git instalado).

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Clonar2.jpg?raw=true)

Dentro de la consola de Git, se debe inicializar el repositorio con el comando "$ git init". Una vez dentro de la rama master, se debe ejecutar "$ git clone https://github.com/BenjaminMejia/ProyectoWeb1P.git" (URL previamente copiada en el portapapeles), lo que copiará el repositorio dentro de la carpeta especificada.


![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Clonar3.jpg?raw=true)

Finalmente, se accede al repositorio que se copió en la carpeta y se abre el archivo HTML para ejecutar la página localmente.

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Clonar4.jpg?raw=true)

###Código Fuente
####HTML

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lista de tareas</title>
  <!-- Se carga un archivo CSS para los estilos -->
  <link rel="stylesheet" type="text/css" href="./css/estilos.css">
</head>
<body>
    <!-- Contenedor principal -->
    <div class="contenedor">
      <!-- Título de la página -->
      <h1>Lista de tareas</h1>
      <!-- Formulario para agregar nueva tarea -->
      <br><br>
      <input type="text" id="nueva-tarea" placeholder="Agregar nueva tarea">
      <button id="btn-agregar">Agregar</button>
      <br><br>
      <!-- Lista de tareas -->
      <ul id="lista-tareas"></ul>
    </div>
  <!-- Se carga un archivo JavaScript -->
  <script type="text/javascript" src="./js/logica.js"></script>
</body>
<!-- Pie de página -->
<footer>
  <!-- Nombre del primer colaborador -->
  <p>Mejia Fuerte Benjamin</p>
  <!-- Nombre del segundo colaborador -->
  <p>Preciado Soto Axel Giovany</p>
</footer>
</html>
```
####CSS

```css
/* Estilos generales para el cuerpo de la página */
body {
  font-family: sans-serif; /* Tipo de fuente para todo el cuerpo */
  margin: 20px; /* Margen alrededor del cuerpo */
  background-image: url("../img/fondo.png"); /* Imagen de fondo */
}

/* Estilos para el título principal */
h1 {
  margin-top: 0; /* Elimina el margen superior del título */
  text-align: center; /* Centra el título en la página */
}

/* Estilos para el pie de página */
footer {
  background-color: #797171; /* Color de fondo */
  color: white; /* Color del texto */
  position: fixed; /* Fija el pie de página en la parte inferior de la ventana */
  bottom: 0; /* Alinea el pie de página al borde inferior */
  width: 100%; /* Ancho completo */
  text-align: center; /* Centra el contenido del pie de página */
  margin-right: 5px; /* Margen derecho */
}

/* Estilos para el contenedor principal */
.contenedor {
  margin: 0 auto; /* Centra el contenedor horizontalmente */
  margin-top: 40px; /* Margen superior */
  width: fit-content; /* Ajusta el ancho del contenedor al contenido */
  padding: 20px; /* Relleno interno */
  background-color: rgb(152, 236, 232); /* Color de fondo */
}

/* Estilos para el campo de entrada de nueva tarea */
#nueva-tarea {
  width: 500px; /* Ancho del campo de entrada */
  padding: 10px; /* Relleno interno */
  margin-bottom: 10px; /* Margen inferior */
  border: 1px solid #ccc; /* Borde */
}

/* Estilos para el botón de agregar tarea */
#btn-agregar {
  padding: 10px 20px; /* Relleno interno */
  background-color: #000; /* Color de fondo */
  color: #fff; /* Color del texto */
  border: none; /* Sin borde */
  cursor: pointer; /* Cursor al pasar sobre el botón */
}

/* Estilos para la lista de tareas */
#lista-tareas {
  list-style: none; /* Elimina la viñeta de la lista */
  padding: 0; /* Elimina el relleno */
}

/* Estilos para cada elemento de la lista de tareas */
#lista-tareas li {
  padding: 10px; /* Relleno interno */
  border: 1px solid #ccc; /* Borde */
  margin-bottom: 10px; /* Margen inferior */
  display: flex; /* Usa el modelo de caja flexible */
  justify-content: space-between; /* Distribuye el espacio entre los elementos */
  align-items: center; /* Alinea verticalmente los elementos */
  background-color: #fff; /* Color de fondo */
}

/* Estilos para las tareas completadas */
#lista-tareas li.completada {
  background-color:rgb(63, 255, 114); /* Color de fondo */
  text-decoration: line-through; /* Tachado del texto */
}

/* Estilos para los botones dentro de la lista de tareas */
#lista-tareas button {
  padding: 5px 10px; /* Relleno interno */
  border: none; /* Sin borde */
  cursor: pointer; /* Cursor al pasar sobre el botón */
}

/* Estilos para el botón de eliminar tarea */
#lista-tareas button.eliminar {
  background-color: #f00; /* Color de fondo */
  color: #fff; /* Color del texto */
}
```
####JS

```javascript
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
```
###Enlace GitHub Pages
https://benjaminmejia.github.io/ProyectoWeb1P/WebList.html

###Página Lista de Tareas
Al ejecutar la página de forma local o ingresando al enlace, se verá la página de la siguiente manera (ejemplo en PC).

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Pagina1.jpg?raw=true)

La página verificará que el campo del nombre no esté vacío al hacer clic en "Agregar", y notificará en caso de que no se haya ingresado el nombre de la nueva tarea.

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Pagina2.jpg?raw=true)

Al agregar una nueva tarea, esta se guardará en una lista que se desplegará hacia abajo y se extenderá en función al número de tareas que se deseen agregar. Las tareas nuevas se agregarán con el estado de "No completado" por defecto.

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Pagina3.jpg?raw=true)

Las tareas se cambiarán a "Completado" al marcar la casilla izquierda de la tarea en cuestión y se pueden eliminar al hacer clic en el recuadro derecho de la propia tarea, ya que estas quedarán guardadas en el almacenamiento local.

![](https://github.com/BenjaminMejia/ProyectoWeb1P/blob/main/img/Pagina4.jpg?raw=true)

_- NOTA: La implementación de filtros fue un desafío a la hora de llevar a cabo este proyecto, pues la lógica con la que se diseñó el programa no lo hizo posible._
