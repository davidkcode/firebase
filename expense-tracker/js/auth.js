import Facade from "./facade.js";

let firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
};

firebase.initializeApp(firebaseConfig);

let facade = new Facade();

const signupLink = document.querySelector("#signup-link");
const loginLink = document.querySelector("#login-link");
const logoutLink = document.querySelector("#logout-link");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    signupLink.classList.add("disabled");
    loginLink.classList.add("disabled");
    logoutLink.classList.remove("disabled");
    facade.main();
  } else {
    signupLink.classList.remove("disabled");
    loginLink.classList.remove("disabled");
    logoutLink.classList.add("disabled");
    facade.reset();
    document.querySelector(".wrapperContainer").innerHTML =
      "<h3>Login or Signup to use our expense tracker!!!</h3>";
  }
});

const signupForm = document.querySelector("#signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred);
    })
    .catch(function (error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == "auth/weak-password") {
        alert("The password is too weak.");
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
});

const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;

  if (email.length < 4) {
    alert("Please enter an email address.");
    return;
  }
  if (password.length < 4) {
    alert("Please enter a password.");
    return;
  }
  // Create user with email and pass.
  // [START createwithemail]
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred);
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
    });
});

logoutLink.addEventListener("click", (event) => {
  event.preventDefault();
  firebase
    .auth()
    .signOut()
    .then(function () {
      console.log("user logged out");
    });
});
