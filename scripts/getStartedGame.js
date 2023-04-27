import { customFetch } from "./fetch.js";

export async function getStartedGame(game_id) {
  const games = {
    url: `https://trivia-bck.herokuapp.com/api/games/${game_id}/state/`,
    args: {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("accessToken"),
      },
    },
  };

  try {
    const response = await customFetch(games.url, games.args);
    const game = await response.json();
    // get game with the id passed as parameter
    return game;
  } catch (error) {
    throw error;
  }
}
