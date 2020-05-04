import Expense from "./expense.js";
import Revenue from "./revenue.js";
import Observable from "./observable.js";

function Model(database) {
  Observable.call(this);
  this.expenses = [];
  this.revenues = [];
  this.expenseSum = 0;
  this.revenueSum = 0;
}

Model.prototype = Object.create(Observable.prototype);

Model.prototype.addExpense = function (name, amount) {
  const expense = new Expense(name, amount);
  fetch("URL/budget/expenses.json", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(expense),
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      this.expenses.push(expense);
      this.calculateSums();
      this.notify(this.expenseSum, this.revenueSum);
    } else {
      alert("Something went wrong. Try again later");
    }
  });
};

Model.prototype.addRevenue = function (name, amount) {
  const revenue = new Revenue(name, amount);
  fetch("URL/budget/revenues.json", {
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(revenue),
    method: "POST",
  }).then((response) => {
    if (response.ok) {
      this.revenues.push(revenue);
      this.calculateSums();
      this.notify(this.expenseSum, this.revenueSum);
    } else {
      alert("Something went wrong. Try again later");
    }
  });
};

Model.prototype.retrieveDataFromDatabase = function () {
  fetch("URL/budget.json").then((response) => {
    response.json().then((data) => {
      const expenses = data["expenses"];
      const revenues = data["revenues"];

      for (const expense in expenses) {
        this.expenses.push(
          new Expense(expenses[expense]["name"], expenses[expense]["amount"])
        );
      }

      for (const revenue in revenues) {
        this.revenues.push(
          new Revenue(revenues[revenue]["name"], revenues[revenue]["amount"])
        );
      }

      this.calculateSums();
      this.notify(this.expenseSum, this.revenueSum);
    });
  });
};

Model.prototype.calculateSums = function () {
  this.revenueSum = 0;
  this.expenseSum = 0;

  this.expenses.forEach((expense) => {
    this.expenseSum += Number(expense.amount);
  });
  this.revenues.forEach((revenue) => {
    this.revenueSum += Number(revenue.amount);
  });
};

export default Model;
