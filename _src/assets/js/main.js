"use strict";

let recipeHeader = document.querySelector(".recipe-header.js");
let product = document.querySelector(".data__cointainer");
let totalPrice = document.querySelector(".total__price");
let shipping = document.querySelector(".shipping__cost");

const url =
  "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";

function getRecipe() {
  return fetch(url)
    .then(response => response.json())
    .then(data => {
      let recipeInfo = data.recipe;
      let recipeName = recipeInfo.name;
      let shippingCost = data.recipe["shipping-cost"];
      let currency = recipeInfo.currency;

      /* recipeHeader.innerHTML += `<h2></h2><h1>${recipeName}</h1>`; */

      let ingredientItem = "";
      for (const ingredient of recipeInfo.ingredients) {
        let brand = "";
        if (ingredient.brand === undefined) {
          brand = "";
        } else {
          brand = ingredient.brand;
        }

        ingredientItem += `<div>  <input type="checkbox" value="${
          ingredient.product
        }" name="ingredients" class="col-1"/><input type="number" value="${
          ingredient.item
        }" class="input__number col-1"/>
        <div class="col-3">
        <p class="ingredient__name">${ingredient.product}</p>
        <p class="ingredient__brand">${brand}</p>
        <p class="ingredient__quantity">${ingredient.quantity}</p>
        </div>
        <p class="ingredient__price col-6">${ingredient.price *
          ingredient.items} €</p></div>`;
      }
      product.innerHTML = ingredientItem;
    });
}

getRecipe();
