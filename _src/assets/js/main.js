"use strict";

let recipeTitle = document.querySelector(".recipe-title");
let product = document.querySelector(".data__cointainer");
let shipping = document.querySelector(".shipping-js");

function getRecipe() {
  const url =
    "https://raw.githubusercontent.com/Adalab/recipes-data/master/rissoto-setas.json";
  fetch(url)
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

        ingredientItem += `<div class="items__list row">
        
        <div class="col-2">
        <input type="checkbox" value="${
          ingredient.product
        }" name="ingredients" class="checkbox"/><input type="number" value="${
          ingredient.item
        }" class="input__number"/>
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
    });
}

getRecipe();
