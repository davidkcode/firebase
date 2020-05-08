function View() {}

View.prototype.main = function () {
  this.createMarkup();

  this.expenses = document.getElementById("expense-value");
  this.revenues = document.getElementById("revenue-value");
  this.balance = document.getElementById("balance-value");
  let overlay = document.createElement("div");
  let spinner = document.createElement("div");

  spinner.classList.add("loader");
  overlay.appendChild(spinner);
  overlay.id = "overlay";
  document.body.appendChild(overlay);

  this.updateValues(0, 0);
};

View.prototype.updateValues = function (expenses, revenues) {
  this.expenses.innerHTML = expenses;
  this.revenues.innerHTML = revenues;
  this.balance.innerHTML =
    Number(this.revenues.innerHTML) - Number(this.expenses.innerHTML);

  this.expenses.innerHTML = this.expenses.innerHTML + "$";
  this.revenues.innerHTML = this.revenues.innerHTML + "$";
  this.balance.innerHTML = this.balance.innerHTML + "$";
};

View.prototype.showSpinner = function () {
  if (document.getElementById("overlay").classList.contains("active")) {
    document.getElementById("overlay").classList.remove("active");
  } else {
    document.getElementById("overlay").classList.add("active");
  }
};

View.prototype.resetMarkup = function () {
  document.querySelector(".wrapperContainer").innerHTML = ``;
};

View.prototype.createMarkup = function () {
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

export default View;
