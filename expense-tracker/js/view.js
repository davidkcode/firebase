function View() {
  this.expenses = document.getElementById("expense-value");
  this.revenues = document.getElementById("revenue-value");
  this.balance = document.getElementById("balance-value");
}

View.prototype.main = function () {
  this.updateValues(0, 0);
};

View.prototype.updateValues = function (expenses, revenues) {
  this.expenses.innerHTML = expenses;
  this.revenues.innerHTML = revenues;
  this.balance.innerHTML =
    Number(this.revenues.innerHTML) - Number(this.expenses.innerHTML);

  if (this.balance.innerHTML < 0) {
    document
      .getElementById("balanceContainer")
      .setAttribute("style", "color: red;");
  } else if (this.balance.innerHTML > 0) {
    document
      .getElementById("balanceContainer")
      .setAttribute("style", "color: green;");
  } else {
    document
      .getElementById("balanceContainer")
      .setAttribute("style", "color: black;");
  }

  this.expenses.innerHTML = this.expenses.innerHTML + "$";
  this.revenues.innerHTML = this.revenues.innerHTML + "$";
  this.balance.innerHTML = this.balance.innerHTML + "$";
};

export default View;
