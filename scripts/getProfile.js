import { customFetch } from "./fetch.js";

export async function getProfile() {
    const profile = {
      url: "https://trivia-bck.herokuapp.com/api/profile/",
      args: {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      },
    };
  
    try {
      const response = await customFetch(profile.url, profile.args);
      const user = await response.json();
      return user;
    } catch (error) {
      throw error;
    }
  }
  