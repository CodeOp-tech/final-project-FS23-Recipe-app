import React from "react";

export default function RecipeView(props) {
  const { recipe, recipeInstructions } = props;
  if (recipeInstructions) {
    const { steps } = recipeInstructions[0];

    let instructions = {};
    let ingredients = {};

    for (let objects of steps) {
      console.log(objects);
      instructions[objects.number] = objects.step;
    }
    console.log(instructions);

    for (let obj of steps) {
      for (let categories in obj) {
        console.log(categories);
        if (categories === "ingredients") {
          for (let ingredient of categories) {
            // ingredients = ingredient.name;
            console.log(ingredient);
          }
        }
      }
    }
  }

  return (
    <div>
      <h3>{recipe.title}</h3>
      <img src={recipe.image} alt={recipe.title} />
      {/* <p>{recipeInstructions}</p> */}
      {/* {recipeInstructions.map((step) => (
        <p>{step}</p>
      ))} */}

      {/* There's more then one property in the missedIngredients, 
      could we do the map instead hardcode way to render them? */}
    </div>
  );
}
