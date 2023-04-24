const chatGPTContent = document.getElementById("chatGPTContent");
const bingChatContent = document.getElementById("bingChatContent");

// make http request to server
// when enviarPreguntaBtn is clicked
enviarPreguntaBtn.addEventListener("click", function (event) {
  var pregunta = preguntaPreguntonInput.value;
  textoPregunta.innerHTML = pregunta;
  // make http request to server
  // when enviarPreguntaBtn is clicked
  chatGPTContent.innerHTML = "Cargando...";
  bingChatContent.innerHTML = "Cargando...";
  fetch("http://localhost:8080/", {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      pregunta: pregunta,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      chatGPTContent.innerHTML = data.chatGPT;
      bingChatContent.innerHTML = data.bingChat;
    });
});
