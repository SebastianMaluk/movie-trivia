var username = document.getElementById("usernameInputR");
var password = document.getElementById("passwordInputR");
var passwordConfirm = document.getElementById("passwordConfirmInputR");
var registerBtn = document.getElementById("registerBtn");

window.onload = function onInitialized() {
  var httpRequest = new XMLHttpRequest();

  registerBtn.onclick = function () {
    var data = new FormData();
    data.append("username", "G18_" + username.value);
    data.append("password1", password.value);
    data.append("password2", passwordConfirm.value);

    httpRequest.open(
      "POST",
      "https://trivia-bck.herokuapp.com/registration/",
      true
    );

    httpRequest.send(data);
  };

  httpRequest.onreadystatechange = () => {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      console.log(httpRequest.status);
      console.log(httpRequest.statusText);
      if (httpRequest.status === 200) {
        console.log("Usuario Registrado");
        window.location = "login.html";
      }
    }
  };
};
