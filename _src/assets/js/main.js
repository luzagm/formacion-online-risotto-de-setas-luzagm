"use strict";

const selectAll = document.querySelector(".selectAll-js");
const deselectAll = document.querySelector(".deselectAll-js");

let recipeTitle = document.querySelector(".recipe-title");
let product = document.querySelector(".data__cointainer");
let shipping = document.querySelector(".shipping-js");
const items = document.querySelector(".totalitems-js");
const subtotal = document.querySelector(".subtotal-js");
const total = document.querySelector(".totalPrice-js");
const buyButton = document.querySelector(".button-price-js");

let ingredientsPrice = [];
let totalIngredients = [];

function getRecipeInfo() {
  const url =
    "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";
  fetch(url)
    .then(response => response.json())
    .then(data => {
      paintRecipe(data);
    });
}

const getStartValues = () => {
  const ingredientsArr = [...document.querySelectorAll(".items-list-js")];
  for (const ingredient of ingredientsArr) {
    let price = parseFloat(ingredient.lastElementChild.innerText.split("€")[0]);
    ingredientsPrice.push({
      price: price,
      value: 1,
      id: ingredient.dataset.index
    });
  }
};

const paintRecipe = data => {
  let recipeInfo = data.recipe;
  let recipeName = recipeInfo.name;
  let shippingCost = data.recipe["shipping-cost"];
  let currency = recipeInfo.currency;

  let ingredientItem = "";
  for (const ingredient of recipeInfo.ingredients) {
    let brand = "";
    if (ingredient.brand === undefined) {
      brand = "";
    } else {
      brand = ingredient.brand;
    }

    ingredientItem += `<div class="items__list row items-list-js">
        <div class="col-2">
        <input type="checkbox" value="${
          ingredient.product
        }" name="ingredients" class="checkbox checkbox-js"/>
        <input type="number" value="${
          ingredient.item
        }" class="input__number input-number-js"/>
        </div>
        <div class="ingredient col-5">
        <p class="ingredient__name">${ingredient.product}</p>
        <p class="ingredient__brand">${brand}</p>
        <p class="ingredient__quantity">${ingredient.quantity}</p>
        </div>
        <p class="ingredient__price col-5">${ingredient.price *
          ingredient.items} €</p></div>`;
  }
  product.innerHTML = ingredientItem;
  recipeTitle.innerHTML = recipeName;
  shipping.innerHTML = `<p class="total__price">${shippingCost} ${currency}</p>`;

  getStartValues();
};

const totalPrice = () => {
  let subtotalPrice = 0;
  for (let i = 0; i < totalIngredients.length; i++) {
    if (i === 0) {
      subtotalPrice = totalIngredients[i].price;
    } else {
      subtotalPrice = subtotalPrice + totalIngredients[i].price;
    }
  }
  printPrices(subtotalPrice);
};

const printPrices = subtotalPrice => {
  if (subtotalPrice > 0) {
    const finalTotal = subtotalPrice + 7;
    subtotal.innerHTML = subtotalPrice.toFixed(2) + " €";
    total.innerHTML = finalTotal.toFixed(2) + " €";
    buyButton.innerHTML = finalTotal.toFixed(2) + " €";
  } else {
    subtotal.innerHTML = "0";
    total.innerHTML = "0";
    buyButton.innerHTML = " ";
  }
};

const countTotalItems = () => {
  let totalItems = 0;
  for (const item of totalIngredients) {
    totalItems = totalItems + item.value;
  }
  items.innerHTML = totalItems;
};

const selectAllFuntion = () => {
  debugger;
  const selectAllToArray = [...document.querySelectorAll(".checkbox-js")];
  selectAllToArray.map(ingredient => {
    if (!ingredient.checked) {
      return (ingredient.checked = true);
    }
  });

  for (const ingredient of ingredientsPrice) {
    totalIngredients.push(ingredient);
  }
  countTotalItems();
  totalPrice();
};

const deselectAllFuntion = () => {
  const deselectAllArray = [...document.querySelectorAll(".checkbox-js")];
  deselectAllArray.map(ingredient => {
    if (ingredient.checked) {
      return (ingredient.checked = false);
    }
  });
  totalIngredients = [];
  countTotalItems();
  totalPrice();
};

const listenToIngredients = () => {
  const ingredientsCheckbox = document.querySelectorAll(".checkbox-js");
  for (const ingredient of ingredientsCheckbox) {
    ingredient.addEventListener("change", addtotalIngredients);
  }
  const ingredientsNumber = document.querySelectorAll(".input-number-js");

  for (const ingredient of ingredientsNumber) {
    ingredient.addEventListener("change", getingredientsPrice);
  }
};

selectAll.addEventListener("click", selectAllFuntion);
deselectAll.addEventListener("click", deselectAllFuntion);
getRecipeInfo();
