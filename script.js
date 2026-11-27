// ---------- Get elements from the page ----------
const form = document.getElementById("expense-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const categoryInput = document.getElementById("category");
const errorMessage = document.getElementById("error");
const expenseList = document.getElementById("expense-list");
const totalDisplay = document.getElementById("total");
const emptyMessage = document.getElementById("empty-message");
const expenseTable = document.getElementById("expense-table");

// The key name used to store data in the browser's LocalStorage
const STORAGE_KEY = "dailyExpenses";

// ---------- Load saved expenses ----------
// If nothing is saved yet (or the data is broken), start with an empty list.
function loadExpenses() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    const data = saved ? JSON.parse(saved) : [];
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

// ---------- Save expenses ----------
function saveExpenses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
}

// This array holds all expenses while the page is open
let expenses = loadExpenses();

// ---------- Show everything on the page ----------
function render() {
  // Clear the old rows
  expenseList.innerHTML = "";

  let total = 0;

  expenses.forEach(function (expense) {
    total += expense.amount;

    const row = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = expense.name;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = expense.category;

    const dateCell = document.createElement("td");
    dateCell.textContent = expense.date;

    const amountCell = document.createElement("td");
    amountCell.className = "right";
    amountCell.textContent = "₹" + expense.amount.toFixed(2);

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "btn-delete";
    deleteButton.addEventListener("click", function () {
      deleteExpense(expense.id);
    });
    actionCell.appendChild(deleteButton);

    row.appendChild(nameCell);
    row.appendChild(categoryCell);
    row.appendChild(dateCell);
    row.appendChild(amountCell);
    row.appendChild(actionCell);

    expenseList.appendChild(row);
  });

  // Show the total
  totalDisplay.textContent = "₹" + total.toFixed(2);

  // Show the table only when there are expenses
  const hasExpenses = expenses.length > 0;
  expenseTable.style.display = hasExpenses ? "table" : "none";
  emptyMessage.style.display = hasExpenses ? "none" : "block";
}

// ---------- Add a new expense ----------
function addExpense(event) {
  event.preventDefault(); // stop the page from reloading

  const name = nameInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categoryInput.value;

  // Simple validation
  if (name === "") {
    errorMessage.textContent = "Please enter an expense name.";
    return;
  }
  if (isNaN(amount) || amount <= 0) {
    errorMessage.textContent = "Please enter an amount greater than 0.";
    return;
  }
  errorMessage.textContent = "";

  const newExpense = {
    id: Date.now(), // a unique number for each expense
    name: name,
    amount: amount,
    category: category,
    date: new Date().toLocaleDateString()
  };

  expenses.push(newExpense);
  saveExpenses();
  render();

  // Clear the form
  form.reset();
  nameInput.focus();
}

// ---------- Delete an expense ----------
function deleteExpense(id) {
  // Keep every expense except the one with this id
  expenses = expenses.filter(function (expense) {
    return expense.id !== id;
  });
  saveExpenses();
  render();
}

// ---------- Start the app ----------
form.addEventListener("submit", addExpense);
render();
