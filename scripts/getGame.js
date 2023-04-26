import { customFetch } from "./fetch.js";

export async function getGame(game_id) {
  const games = {
    url: "https://trivia-bck.herokuapp.com/api/games/",
    args: {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };

  try {
    const response = await customFetch(games.url, games.args);
    const partidas = await response.json();
    // get game with the id passed as parameter
    const game = partidas.find((game) => game.id === Number(game_id));
    console.log(game);
    return game;
  } catch (error) {
    throw error;
  }
}
