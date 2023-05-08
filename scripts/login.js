var username = document.getElementById("usernameInput");
var password = document.getElementById("passwordInput");
var loginBtn = document.getElementById("loginBtn");

window.onload = function onInitialized() {
  loginBtn.onclick = function () {
    var jsonData = JSON.stringify({
      username: username.value,
      password: password.value,
    });

    fetch("https://trivia-bck.herokuapp.com/api/token/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonData,
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        }
      })
      .then((loginJWTTokens) => {
        localStorage.setItem("refreshToken", loginJWTTokens["refresh"]);
        localStorage.setItem("accessToken", loginJWTTokens["access"]);
        const url = new URL("/views/home.html", window.location);
        window.location.href = url.href;
      })
      .catch((error) => {
        console.log(`Caught Exception: ${error}`);
      });
  };
};
