
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


// Función para leer los datos del formulario
form.addEventListener("submit", (event) => {
  event.preventDefault(); 

  
  const name = form.elements["name"].value;
  const description= form.elements["description"].value;
  const dificultad = form.elements["difficulty"].value;

  
  console.log("Formulario enviado:");
  console.log({ name, description, dificultad });

    form.reset();


  statusEl.textContent = "Estado: enviado (ver Console).";
});



