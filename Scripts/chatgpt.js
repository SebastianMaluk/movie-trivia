import { OpenAIApi, Configuration } from "openai";


const configuration = new Configuration({
    apiKey: "",
  });

async function ChatGPT(message) {
    
    const openai = new OpenAIApi(configuration);
    const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.2,
        messages: [
        {
            role: "system",
            content: "You are a helpful assistant for a movie and tv shows trivia game"
        },
        {
            role: "user",
            content: message
        },
        ]
    });

    return response.data.choices[0].message.content;
}

div = document.getElementById("chatgpt")
div.innerHTML = "Loading..."
message = "Hello"
ChatGPT(message).then(function (response) {
    div.innerHTML = response;
}
);
