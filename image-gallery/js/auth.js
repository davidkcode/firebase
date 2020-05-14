var firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const logoutLinks = document.querySelectorAll(".logout");
const authenticateLinks = document.querySelectorAll(
  'a[href="login.html"], a[href="signup.html"]'
);
const profileLinks = document.querySelectorAll("a[href='profile.html']");

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    authenticateLinks.forEach((link) => {
      link.classList.add("disabled");
    });
    logoutLinks.forEach((link) => {
      link.classList.remove("disabled");
    });
    profileLinks.forEach((link) => {
      link.classList.remove("disabled");
    });
  } else {
    if (
      window.location.href.includes("index.html") ||
      window.location.href.includes("profile.html")
    ) {
      window.location.href = "login.html";
    }
    authenticateLinks.forEach((link) => {
      link.classList.remove("disabled");
    });
    logoutLinks.forEach((link) => {
      link.classList.add("disabled");
    });
    profileLinks.forEach((link) => {
      link.classList.add("disabled");
    });
  }
});

logoutLinks.forEach((logoutLink) => {
  logoutLink.addEventListener("click", (event) => {
    event.preventDefault();
    firebase.auth().signOut();
  });
});
