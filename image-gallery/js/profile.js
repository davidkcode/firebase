const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    db.collection("users")
      .doc(user.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log(doc.data());
        } else {
          console.log(doc);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
