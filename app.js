
// Declaración de variables para almacenar las misiones, puntaje y nivel del usuario

// ESTADO DEL USUARIO

let misionesPendientes = [];
let misionesCompletadas = [];
let xp = 0;
let nivel = "Principiante";


// Referencias a elementos del DOM
const form = document.querySelector("#misionForm");
const statusEl = document.querySelector("#status");
const doneEl = document.querySelector("#done");
const pendingEl = document.querySelector("#pending");
const xpEl = document.querySelector("#xp");
const levelEl = document.querySelector("#level");


const pendingList = document.querySelector("#pendingList");
const completedList = document.querySelector("#completedList");

// Variable para asignar IDs únicos a las misiones para poder modificarlas o eliminarlas
let nextId = 1;

// Función para leer el formulario y agregar una nueva misión pendiente
form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  // Leer los valores del formulario
  const name = form.elements["name"].value;
  const description = form.elements["description"].value;
  const dificultad = form.elements["difficulty"].value;

  // Crear un nuevo objeto misión 
  const nuevaMision = {id: nextId++, name, description, dificultad, estado: "pendiente" };

  //Push para agregar la nueva misión al array de misiones pendientes
  misionesPendientes.push(nuevaMision);

  renderPendientes();

  form.reset();
  statusEl.textContent = "Estado: misión agregada";
});

// Función para completar una misión pendiente, moviéndola al array de misiones completadas y actualizando el estado del usuario
function completarMision(id) {
  // Buscar la misión por ID en el array de misiones pendientes
  const index = misionesPendientes.findIndex(m => m.id === id);

  // Si no se encuentra la misión, salir de la función
  if (index === -1) return;

  //Splice para eliminar la misión del array de pendientes y push para agregarla al array de completadas
  const mision = misionesPendientes.splice(index, 1)[0];
  misionesCompletadas.push(mision);

  renderPendientes();
  renderCompletadas();
}

// Función para renderizar la lista de misiones pendientes y actualizar el contador
function renderPendientes() {
  pendingList.innerHTML = "";

  misionesPendientes.forEach((mision) => {
    const li = document.createElement("li");
    li.dataset.id = mision.id;

    // Checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Si el checkbox se marca, se completa la misión
    checkbox.addEventListener("change", () => {
      completarMision(mision.id);
    });

    // Texto de la misión
    const text = document.createElement("span");
    text.textContent = `${mision.name} - ${mision.description} (${mision.dificultad})`;

    // Botón eliminar
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Eliminar";

    // Si se hace click en eliminar, se borra la misión
    deleteBtn.addEventListener("click", () => {
      eliminarMision(mision.id);
    });

    li.appendChild(checkbox);
    li.appendChild(text);
    li.appendChild(deleteBtn);

    pendingList.appendChild(li);
  });

  pendingEl.textContent = "Pendientes: " + misionesPendientes.length;
}


// Función para eliminar una misión pendiente
function eliminarMision(id) {
  misionesPendientes = misionesPendientes.filter(m => m.id !== id);
  renderPendientes();
}


// Otra función para renderizar. Para la lista de misiones completadas y actualizar el contador
function renderCompletadas() {
  completedList.innerHTML = "";

  misionesCompletadas.forEach((mision) => {
    const li = document.createElement("li");
    li.textContent = `${mision.name} - ${mision.description}`;

    completedList.appendChild(li);
  });

  doneEl.textContent = "Completadas: " + misionesCompletadas.length;
}