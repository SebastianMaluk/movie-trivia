window.onload = function onInitialized() {
  addParticipantes([
    "Nombre de Usuario 1",
    "Nombre de Usuario 2",
    "Nombre de Usuario 3",
    "Nombre de Usuario 4",
    "Nombre de Usuario 5",
    "Nombre de Usuario 6",
    "Nombre de Usuario 7",
    "Nombre de Usuario 8",
  ]);
};

function addParticipantes(participantes) {
  const container = document.getElementById("bordeParticipantes");

  container.innerHTML = "";

  participantes.forEach((participante) => {
    const div = document.createElement("div");
    div.classList.add("border-b", "border-gray-400", "py-4");
    div.textContent = participante;
    container.appendChild(div);
  });
}
