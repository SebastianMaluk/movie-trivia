var username = document.getElementById("usernameInput");
var password = document.getElementById("passwordInput");
var loginBtn = document.getElementById("loginBtn");

window.onload = function onInitialized() {
  var httpRequest = new XMLHttpRequest();

  loginBtn.onclick = function () {
    var jsonData = JSON.stringify({
      username: "G18_" + username.value,
      password: password.value,
    });

    httpRequest.open(
      "POST",
      "https://trivia-bck.herokuapp.com/api/token/",
      true
    );
    httpRequest.setRequestHeader("Content-Type", "application/json");
    httpRequest.send(jsonData);
  };

  httpRequest.onreadystatechange = () => {
    try {
      if (httpRequest.readyState === XMLHttpRequest.DONE) {
        console.log(httpRequest.status);
        console.log(httpRequest.statusText);
        if (httpRequest.status === 200) {
          let loginJWTTokens = JSON.parse(httpRequest.responseText);
          localStorage.setItem("refreshToken", loginJWTTokens["refresh"]);
          localStorage.setItem("accessToken", loginJWTTokens["access"]);
          window.location = "home.html";
        }
      }
    } catch (e) {
      console.log(`Caught Exception: ${e.description}`);
    }
  };
};
