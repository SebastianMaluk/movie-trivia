import { customFetch } from "./fetch.js";

export async function getProfile() {
    const request = {
      url: "https://trivia-bck.herokuapp.com/api/profile/",
      args: {
        headers: {
         "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      },
    };
    const profile = await customFetch(request.url, request.args)
    .then((response) => {
        const contentType = response.headers.get("Content-Type");
        if (contentType && contentType.includes("application/json")) {
          return response.json();
        } else {
          throw new Error("Server returned non-JSON response");
        }
      })
    .then((data) => {
        return data
    })
    .catch((error) => {
        console.log(error)
    })
    return profile
}        
 