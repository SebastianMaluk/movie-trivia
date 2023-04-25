// Helper function to refresh the access token
export async function refreshAccessToken(refreshToken) {
  try {
    const response = await fetch(
      "https://trivia-bck.herokuapp.com/api/token/refresh/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to refresh the access token");
    }

    const data = await response.json();

    console.log("ACCESS TOKEN REFRESHED");
    localStorage.setItem("accessToken", data.access);
    return data.access;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    return null;
  }
}

// Custom fetch function with token handling
export async function customFetch(url, options = {}) {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");

  // If no tokens are available, log out the user
  if (!accessToken || !refreshToken) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    window.location = "login.html";
    return;
  }

  // Set the Authorization header with the access token
  options.headers = options.headers || {};
  options.headers["Authorization"] = `Bearer ${accessToken}`;

  const response = await fetch(url, options);

  // If the request fails due to an unauthorized error, attempt to refresh the token
  if (response.status === 401) {
    console.log("Access token expired, attempting to refresh it...");
    const newAccessToken = await refreshAccessToken(refreshToken);

    // If the token refresh is successful, update the access token and retry the request
    if (newAccessToken) {
      options.headers["Authorization"] = `Bearer ${newAccessToken}`;
      console.log("Access token refreshed, retrying the request...");
      return fetch(url, options);
    } else {
      // If refreshing the token fails, log out the user
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      console.log(
        "Failed to refresh the access token, logging out the user..."
      );
      window.location = "login.html";
    }
  }

  return response;
}
