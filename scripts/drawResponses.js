import { CustomWebSocket } from "./websocket.js";

export function drawResponses(user_id, response_text, players, ws) {
    const response_user = findUsernameById(players, user_id);
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
    p1Element.textContent = response_user;
    const p2Element = document.createElement("p");
    p2Element.textContent = response_text;

    // create child button elements for the second column
    const button1Element = document.createElement("button");
    button1Element.id = `response-${user_id}-good`
    button1Element.value = 2;
    button1Element.addEventListener("click", ws.sendGrade(user_id, 2));
    const img1Element = document.createElement("img");
    img1Element.src = "../imgs/good-answer.svg";
    button1Element.appendChild(img1Element);

    const button2Element = document.createElement("button");
    button2Element.id = `response-${user_id}-medium`
    button2Element.value = 1;
    button2Element.addEventListener("click", ws.sendGrade(user_id, 1));
    const img2Element = document.createElement("img");
    img2Element.src = "../imgs/medium-answer.svg";
    button2Element.appendChild(img2Element);

    const button3Element = document.createElement("button");
    button3Element.id = `response-${user_id}-bad`
    button3Element.value = 0;
    button3Element.addEventListener("click", ws.sendGrade(user_id, 0));
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


function sendGrade(user_id, grade) {
    
    ws.send(JSON.stringify({
        action: "qualify",
        user_id: user_id,
        grade: grade,
    }));
};

function findUsernameById(users, id) {
    const user = users.find((user) => user.id === id);
    if (user) {
      return user.username;
    } else {
      return null;
    }
}
