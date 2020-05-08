import View from "./view.js";
import Model from "./model.js";

function Facade() {
  this.view = new View("mainContainer");
  this.model = new Model(this.view);
  this.model.subscribe(this.view);
}

Facade.prototype.main = function () {
  this.createMarkup();

  this.view.main();
  this.model.retrieveDataFromDatabase();

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

Facade.prototype.reset = function () {
  document.querySelector(".wrapperContainer").innerHTML = ``;
  this.view = new View("mainContainer");
  this.model = new Model(this.view);
  this.model.subscribe(this.view);
};

Facade.prototype.createMarkup = function () {
  document.querySelector(".wrapperContainer").innerHTML = `
      <h1>Expense Tracker</h1>
      <div class="balanceWrapper">
        <h4 style="margin-bottom: 20px;">Balance</h4>
        <h3 id="balance-value">0$</h3>
      </div>
      <div class="valueContainer">
        <div style="color: green;" id="revenueContainer">
          <h4 id="revenue-value">0$</h4>
        </div>
        <div>
          <div style="color: red;" id="expenseContainer">
            <h4 id="expense-value">0$</h4>
          </div>
        </div>
      </div>
      <div class="addWrapper">
        <div>
          <h3 class="mb-3 text-center">Enter Expense</h3>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" id="expense-name" />
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input type="number" class="form-control" id="expense-amount" />
          </div>
          <button class="btn btn-danger mt-3 w-100" id="expense-button">
            Add Expense
          </button>
        </div>
        <div>
          <h3 class="mb-3 text-center">Enter Revenue</h3>
          <div class="form-group">
            <label>Name</label>
            <input type="text" class="form-control" id="revenue-name" />
          </div>
          <div class="form-group">
            <label>Amount</label>
            <input type="number" class="form-control" id="revenue-amount" />
          </div>
          <button class="btn btn-success mt-3 w-100" id="revenue-button">
            Add Revenue
          </button>
        </div>
      </div>
  `;
};

export default Facade;
