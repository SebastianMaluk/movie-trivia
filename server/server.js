import { createServer } from "http";
import { BingChatAsk } from "../scripts/bingchat.js";
import { ChatGPTAsk } from "../scripts/chatgpt.js";
import dotenv from "dotenv";
dotenv.config();

const host = "localhost";
const port = 8080;

const requestListener = function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  if (req.method === "OPTIONS") {
    res.end();
  }
  if (req.method === "POST") {
    let data = "";

    req.on("data", (chunk) => {
      data += chunk;
    });

    req.on("end", async () => {
      const body = JSON.parse(data);
      let chatGPT;
      chatGPT = await ChatGPTAsk(body.pregunta);
      if (chatGPT.status !== 200) {
        chatGPT = "Error";
      } else {
        chatGPT = chatGPT.data.choices[0].message.content;
      }

      let bingChat;
      try {
        bingChat = await BingChatAsk(body.pregunta);
        if (bingChat == "") {
          bingChat = "Error";
        }
      } catch (error) {
        bingChat = "Error";
      }
      res.end(JSON.stringify({ chatGPT: chatGPT, bingChat: bingChat }));
    });
    req.on("error", (err) => {
      console.log(err);
    });
  }
};

const server = createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
