import { OpenAIApi, Configuration } from "openai";


export async function ChatGPTAsk(message) {
  try {
    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "Eres un ayudante en un juego de preguntas y respuestas sobre películas y series de televisión.",
        },
        {
          role: "user",
          content: message,
        },
      ],
    });
    return response
  } catch (error) {
    if (error.response && error.response.status === 429) {
      // Handle rate limit error (we recommend using exponential backoff)
      return error.response
    } else if (error.request) {
      // Handle connection error here
      return error.response
    } else {
      // Handle API error here, e.g. retry or log
      return error.response
    }
  }
}
