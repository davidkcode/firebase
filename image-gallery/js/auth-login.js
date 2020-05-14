const loginForm = document.getElementById("login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginForm["email"].value;
  const password = loginForm["password"].value;
  // [START createwithemail]
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      window.location.replace((href = "index.html"));
      loginForm.reset();
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode === "auth/wrong-password") {
        alert("Wrong password.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
      loginForm.reset();
    });
});
