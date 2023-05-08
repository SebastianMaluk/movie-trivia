import { OpenAIApi, Configuration } from "openai";
import dotenv from "dotenv";
dotenv.config();

export async function ChatGPTAsk(message) {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "user",
          content: message,
        }
      ]
    }).then((data) => {
        return data;
    }).catch((error) => {
        return error;
    });
    return response
}
