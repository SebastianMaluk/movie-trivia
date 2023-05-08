import dotenv from "dotenv";
dotenv.config();

export async function GoogleAsk(message) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${process.env.GOOGLE_API_KEY}&cx=${process.env.GOOGLE_CX}&q=${message}}`;
    console.log(url)
    const response = await fetch(url)
        .then((response) => response.json())
        .then((data) => {
            return data;
        }
    );
    return response;
}
