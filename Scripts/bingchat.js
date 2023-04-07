import { BingChat } from "bing-chat";

async function example(message) {
	const api = new BingChat({
		cookie:
		"",
	});

	const res = await api.sendMessage(
		message,
		{variant: 'Precise'
	});
  	res.text = res.text.replace(/\[\^.*?\^\]/g, ""); // clean [^num^] tags
	res.text = res.text.replace(/(\s+)(\.|,)/g, "$2"); // clean spaces before . and ,
	return res.text;
}

div = document.getElementById("bingchat")
div.innerHTML = "Loading..."
message = "Hello"
example(message).then(function (response) {
    div.innerHTML = response;
}
);
