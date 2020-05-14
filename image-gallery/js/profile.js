const db = firebase.firestore();
const container = document.querySelector(".personalInfoContainer");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          createMarkup(doc.data());
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

const createMarkup = (data) => {
  let firstname = document.createElement("p");
  let lastname = document.createElement("p");
  let email = document.createElement("p");

  firstname.innerHTML = "Firstname: " + data.firstname;
  lastname.innerHTML = "Lastname: " + data.lastname;
  email.innerHTML = "Email: " + data.email;

  container.appendChild(firstname);
  container.appendChild(lastname);
  container.appendChild(email);
};
