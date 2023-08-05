import { htmlElements } from "./recipeHtmlElements.js";

export class recipeClass {
  constructor() {
    this.elements = new htmlElements();

    this.elements.searchBtn.addEventListener(
      "click",
      this.searchRecipe.bind(this)
    );
    this.url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
  }

  searchRecipe() {
    const recipeName = this.elements.userInput.value.trim();
    this.elements.errorText.style.display = "none";

    if (recipeName.length == 0) {
      setTimeout(() => {
        this.elements.errorText.style.display = "block";
      }, 100);
    } else {
      fetch(this.url + recipeName)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Error with Network response");
          }
        })
        .then((data) => {
          let meal = data.meals[0];
          // setTimeout(()=>{

          //     console.log(meal.strMealThumb);
          //     console.log(meal.strMeal);
          //     console.log(meal.strArea);
          //     console.log(meal.strInstructions);
          // }, 2000)

          //console.log(meal);
          let count = 1;
          let ingredients = [];
          for (let m in meal) {
            // if(Object.prototype.propertyIsEnumerable.call(meal, m)){
            //     console.log("Property:", m);
            // }
            if (
              meal.hasOwnProperty(m) &&
              m.startsWith("strIngredient") &&
              meal[m]
            ) {
              let ingredient = meal[m];
              let measure = meal[`strMeasure${count}`];
              count += 1;
              //console.log("Ingredient:", ingredient, "Measure:", measure);
              ingredients.push(`${measure} ${ingredient}`);
            } else {
              throw new Error("Error with Network response");
            }
          }
          //console.log(data);
          console.log(ingredients);

          this.elements.result.innerHTML = `<img src=${meal.strMealThumb}> 
                <div class="details">
                    <h2>${meal.strMeal}</h2>
                    <h2>${meal.strArea}</h2>
                </div>
                <div id="ingredient-con"></div>
                <div id="recipe">
                    <button id ="hide-recipe">X</button>
                    <pre id="instructions">${meal.strInstructions}</pre>
                </div>
                <button id="show-recipe">View Recipe</button>`;

          let ingredientsCon = document.getElementById("ingredient-con");
          let parent = document.createElement("ul");
          let recipe = document.getElementById("recipe");
          let hideRecipe = document.getElementById("hide-recipe");
          let showRecipe = document.getElementById("show-recipe");

          ingredients.forEach((ingredient) => {
            let child = document.createElement("li");
            child.innerText = ingredient;
            parent.appendChild(child);
            ingredientsCon.appendChild(parent);
          });

          hideRecipe.addEventListener("click", () =>{
            recipe.style.display ="none";
          });
          showRecipe.addEventListener("click", ()=>{
            recipe.style.display = "block";
          });
        })
        .catch((error) => {
          this.elements.errorText.innerHTML = `<h3>Invalid Input</h3>`
          console.error("Error:", error);
        });
    }
  }
}
