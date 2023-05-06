export function drawResponses(user_id, nosy_id) {
  if (user_id == nosy_id) {
    const names = ["Javier", "Matias", "Claudio", "Rafael"];
    for (let i = 0; i < names.length; i++) {
      // create parent div element
      const parentDiv = document.createElement("div");
      parentDiv.className =
        "bg-white p-5 rounded-lg text-secondary shadow-lg mb-2";

      // create child grid element
      const gridDiv = document.createElement("div");
      gridDiv.className = "grid grid-cols-2 gap-4";

      // create child div elements for each grid column
      const col1Div = document.createElement("div");
      const col2Div = document.createElement("div");
      col2Div.className = "flex justify-end";

      // create child p elements for the first column
      const p1Element = document.createElement("p");
      p1Element.className = "font-bold text-xl";
      p1Element.textContent = names[i];
      const p2Element = document.createElement("p");
      p2Element.textContent = "Respuesta de Javier";

      // create child button elements for the second column
      const button1Element = document.createElement("button");
      const img1Element = document.createElement("img");
      img1Element.src = "../imgs/good-answer.svg";
      button1Element.appendChild(img1Element);

      const button2Element = document.createElement("button");
      const img2Element = document.createElement("img");
      img2Element.src = "../imgs/medium-answer.svg";
      button2Element.appendChild(img2Element);

      const button3Element = document.createElement("button");
      const img3Element = document.createElement("img");
      img3Element.src = "../imgs/bad-answer.svg";
      button3Element.appendChild(img3Element);

      // append child elements to their respective parent elements
      col1Div.appendChild(p1Element);
      col1Div.appendChild(p2Element);
      col2Div.appendChild(button1Element);
      col2Div.appendChild(button2Element);
      col2Div.appendChild(button3Element);
      gridDiv.appendChild(col1Div);
      gridDiv.appendChild(col2Div);
      parentDiv.appendChild(gridDiv);

      // append parent div element to the container
      const container = document.getElementById("responsesContainer");
      container.appendChild(parentDiv);
    }
  }
}
