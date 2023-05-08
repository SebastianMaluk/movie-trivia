import { customFetch } from "./fetch.js";

export async function getGame(game_id) {
  const request = {
    url: "https://trivia-bck.herokuapp.com/api/games/",
    args: {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };
  const game = await customFetch(request.url, request.args)
    .then((response) => response.json())
    .then((data) => {
        const game = data.find((game) => game.id === Number(game_id));
        return game;
    })
    .catch((error) => {
        console.log(error);
    });
    return game;
}
