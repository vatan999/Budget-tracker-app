const getById = (id) => document.getElementById(id);
const totalAmount = getById("total-amount");
const userAmount = getById("user-amount");
const checkAmountButton = getById("check-amount");
const totalAmountButton = getById("total-amount-button");
const productTitle = getById("product-title");
const errorMessage = getById("budget-error");
const productTitleError = getById("product-title-error");
const productCostError = getById("product-cost-error");
const amount = getById("amount");
const expenditureValue = getById("expenditure-value");
const balanceValue = getById("balance-amount");
const list = getById("list");
let tempAmount = 0;

totalAmountButton.addEventListener("click", () => {
  tempAmount = totalAmount.value;
  if (tempAmount === "" || tempAmount < 0) {
    errorMessage.classList.remove("hide");
  } else {
    errorMessage.classList.add("hide");
    amount.innerHTML = tempAmount;
    balanceValue.innerText = tempAmount - expenditureValue.innerText;
    totalAmount.value = "";
  }
});

const disableButtons = (bool) => {
  const editButtons = document.getElementsByClassName("edit");
  Array.from(editButtons).forEach((element) => {
    element.disabled = bool;
  });
};

const modifyElement = (element, edit = false) => {
  const parentDiv = element.parentElement;
  const parentAmount = parentDiv.querySelector(".amount").innerText;
  const currentBalance = parseInt(balanceValue.innerText);
  const currentExpense = parseInt(expenditureValue.innerText);
  const updatedBalance = currentBalance + parseInt(parentAmount);
  const updatedExpense = currentExpense - parseInt(parentAmount);
  balanceValue.innerText = updatedBalance;
  expenditureValue.innerText = updatedExpense;
  parentDiv.remove();
  if (edit) {
    const parentText = parentDiv.querySelector(".product").innerText;
    productTitle.value = parentText;
    userAmount.value = parentAmount;
    disableButtons(true);
  }
};

const listCreator = (expenseName, expenseValue) => {
  const sublistContent = document.createElement("div");
  sublistContent.className = "sublist-content flex-space";
  sublistContent.innerHTML = `<p class="product">${expenseName}</p><p class="amount">${expenseValue}</p>`;
  const editButton = createButton("fa-solid fa-pen-to-square edit", "1.2em", () => {
    modifyElement(editButton, true);
  });
  const deleteButton = createButton("fa-solid fa-trash-can delete", "1.2em", () => {
    modifyElement(deleteButton);
  });
  sublistContent.append(editButton, deleteButton);
  list.appendChild(sublistContent);
};

const createButton = (className, fontSize, clickHandler) => {
  const button = document.createElement("button");
  button.className = className;
  button.style.fontSize = fontSize;
  button.addEventListener("click", clickHandler);
  return button;
};

checkAmountButton.addEventListener("click", () => {
  if (!userAmount.value || !productTitle.value) {
    productTitleError.classList.remove("hide");
    return false;
  }
  disableButtons(false);
  const expenditure = parseInt(userAmount.value);
  const sum = parseInt(expenditureValue.innerText) + expenditure;
  expenditureValue.innerText = sum;
  const totalBalance = tempAmount - sum;
  balanceValue.innerText = totalBalance;
  listCreator(productTitle.value, userAmount.value);
  productTitle.value = "";
  userAmount.value = "";
});
