// https://www.themealdb.com/api/json/v1/1/search.php?s=duck;

const result = document.getElementById("result");
const form = document.querySelector("form");
const input = document.querySelector("input");

let meals = [];

// Fonction pour fetch les données (rechercher les données)
async function fetchMeals(search) {
  await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then((res) => res.json())
    .then((data) => (meals = data.meals))
    .catch((err) => console.log(err));
  console.log(meals);
}

// fonction pour afficher les données recues
function displayMeals() {
  if (meals === null) {
    result.innerHTML = `
    <h2 class="noresult">Aucun résultat</h2>
    `;
  } else {
    meals.length = 12;
    result.innerHTML = meals
      .map((meal) => {
        let ingredients = [];

        for (i = 1; i < 21; i++) {
          if (meal[`strIngredient${i}`]) {
            let ingredient = meal[`strIngredient${i}`];
            let measure = meal[`strMeasure${i}`];
            ingredients.push(`<li>${ingredient} -  ${measure}</li>`);
          }
        }

        console.log(ingredients);

        return `
          <li class="card">
          <h2> ${meal.strMeal}</h2>
          <p> ${meal.strArea}</p>
          <img src=${meal.strMealThumb} alt="photo ${meal.strMeal}" />
          <h4> Ingredients</h4> <br>
          <ul>${ingredients.join("")}</ul>
          </li>
          `;
      })
      .join("");
  }
}

// Input qui prends la valeur de ce qu'on écrit, et va fetcher ce qu'onlui demande
input.addEventListener("input", (e) => {
  fetchMeals(e.target.value);
});

// Form qui va afficher ce qu'on a demandé dans l'input
form.addEventListener("submit", (e) => {
  e.preventDefault();
  displayMeals();
});

document.addEventListener("DOMContentLoaded", () => {
  input.value = "";
});
