// make http request to server
// when enviarPreguntaBtn is clicked
export function getHelp(question) {
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
      pregunta: question,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      const chatGPTContent = document.getElementById("chatGPTContent");
      const bingChatContent = document.getElementById("bingChatContent");
      chatGPTContent.innerHTML = data.chatGPT;
      for (let i = 0; i < data.google.items.length; i++) {
        bingChatContent.innerHTML += `<p>${data.google.items[i]}\n</p>`;
      }
    });
};
