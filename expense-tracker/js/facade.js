import View from "./view.js";

function Facade() {
  this.firebaseConfig = {
    apiKey: "api-key",
    authDomain: "project-id.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "project-id",
    storageBucket: "project-id.appspot.com",
    messagingSenderId: "sender-id",
    appId: "app-id",
    measurementId: "G-measurement-id",
  };

  this.view = new View("mainContainer");
}

Facade.prototype.main = function () {
  firebase.initializeApp(this.firebaseConfig);
  this.database = firebase.database();
  this.view.main();
};

let facade = new Facade();
facade.main();
