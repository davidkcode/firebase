import View from "./view.js";
import Model from "./model.js";

function Facade() {
  this.view = new View("mainContainer");
  this.model = new Model();
  this.model.subscribe(this.view);
}

Facade.prototype.main = function () {
  firebase.initializeApp(this.firebaseConfig);
  this.view.main();

  document.getElementById("expense-button").addEventListener("click", () => {
    let name = document.getElementById("expense-name").value;
    let amount = document.getElementById("expense-amount").value;
    if (name == "" || amount == 0) alert("Enter values");
    this.model.addExpense(name, amount);
  });

  document.getElementById("revenue-button").addEventListener("click", () => {
    let name = document.getElementById("revenue-name").value;
    let amount = document.getElementById("revenue-amount").value;
    if (name == "" || amount == 0) alert("Enter values");
    this.model.addRevenue(name, Number(amount));
  });
};

let facade = new Facade();
facade.main();
