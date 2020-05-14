const db = firebase.firestore();

const signupForm = document.getElementById("signup-form");
signupForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const firstname = signupForm["firstname"].value;
  const lastname = signupForm["lastname"].value;
  const email = signupForm["email"].value;
  const password1 = signupForm["password1"].value;
  const password2 = signupForm["password2"].value;

  if (password1 !== password2) {
    console.log(password1, password2);
    alert("Passwords don't match");
    password1 = "";
    password2 = "";
    return;
  }

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password1)
    .then((res) => {
      let uid = res.user.uid;
      db.collection("users").doc(uid).set({
        firstname: firstname,
        lastname: lastname,
        email: email,
      });
      window.location.replace((href = "index.html"));
      signupForm.reset();
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
