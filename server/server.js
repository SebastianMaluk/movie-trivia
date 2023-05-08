import { createServer } from "http";
import { GoogleAsk } from "../scripts/google.js";
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
      console.log({ body })
      let chatGPT;
      chatGPT = await ChatGPTAsk(body.pregunta);
      console.log({ chatGPT: chatGPT.data.choices })
      if (chatGPT.status === 200) {
        chatGPT = chatGPT.data.choices[0].message.content;
      } else {
        chatGPT = "Error";
      }

      let google;
      google = await GoogleAsk(body.pregunta)
      console.log({ google })
      const len = google.items.length;
      for (let i = 0; i < len; i++) {
        google.items[i] = google.items[i].snippet;
      }
      res.end(JSON.stringify({ chatGPT: chatGPT, google: google }));
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
