import { BingChat } from "../node_modules/bing-chat/build/index.js";

export async function BingChatAsk(message) {
    const api = new BingChat({
        cookie: process.env.BING_CHAT_COOKIE,
      });
  const res = await api.sendMessage(message, { variant: "Precise" });
  res.text = res.text.replace(/\[\^.*?\^\]/g, ""); // clean [^num^] tags
  res.text = res.text.replace(/(\s+)(\.|,)/g, "$2"); // clean spaces before . and ,
  return res.text
}
