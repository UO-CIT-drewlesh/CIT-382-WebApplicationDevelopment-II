import "./styles.css";
import React, { useState, useEffect } from "react";

const API_KEY = "eaa59e2a613e46a784ba5beba4cc3f8a";
function RandomRecipe() {
  const [recipe, setRecipe] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nutritionFacts, setNutritionFacts] = useState([]);

  // help from source: https://www.youtube.com/watch?v=cuEtnrL9-H0
  const fetchRecipe = (mealType) => {
    setLoading(true);
    // const dietQuery = diets.map((diet) => `&diet=${diet}`).join(",");
    // console.log(dietQuery);
    fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=1&include-tags=${mealType}`
    )
      .then((res) => {
        if (res.status === 402) {
          setError("Out of daily points for fetching recipes.");
        }
        return res.json();
      })
      .then((data) => {
        if (data && data.recipes && data.recipes.length > 0) {
          setRecipe(data.recipes[0]);
          console.log(data);
          console.log(recipe);
        } else {
          console.log("No recipes found");
          setError("No recipe was found.");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error.message);
        setError(error.message);
        setLoading(false);
      });
  };

  return (
    <div className="recipe">
      <button onClick={() => fetchRecipe("breakfast")}>Breakfast Recipe</button>
      <button onClick={() => fetchRecipe("lunch")}>Lunch Recipe</button>
      <button onClick={() => fetchRecipe("dinner")}>Dinner Recipe</button>

      {loading && <p>Loading...</p>}
      {error && <p>Heads Up: {error}</p>}
      {!loading && !error && (
        <>
          <h2 className="recipe-title">{recipe.title}</h2>
          <h3>Ingredient:</h3>
          <ul className="recipe-list">
            {recipe.extendedIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient.name}</li>
            ))}
          </ul>
        </>
      )}

      {/* Recipe img */}
      <p className="nutrition-facts">Nutrition Facts</p>
    </div>
  );
}

function Instructions() {
  const [instructions, setInstructions] = useState("");
}

function Diet() {
  const [diet, setDiet] = useState("");
  const [dietData, setDietData] = useState([]);

  const inputHandler = (e) => {
    setDiet(e.target.value);
  };

  const handleSave = () => {
    if (diet.trim() !== "") {
      setDietData([...dietData, diet]);
      setDiet("");
    }
  };

  const handleClear = () => {
    setDietData([]);
  };

  return (
    <div className="diet-wrapper">
      <label>Dietary Restrictions: </label>
      <input name="diet" type="text" value={diet} onChange={inputHandler} />
      <button onClick={handleSave}>Save Diet</button>
      <div>
        <h3>Saved Diet: </h3>
        <div>{dietData.join(", ")}</div>
      </div>
      <button onClick={handleClear}>Remove Diet Restrictions</button>
    </div>
  );
}

function GroceryList() {
  const [items, setItems] = useState([]);
  const [itemsInHand, setItemsInHand] = useState([]);
  return <div className="grocery-list">[Grocery List]</div>;
}

export default function App() {
  /*
  TODO/FIX: lift child component state to use diets in the fetch call
  const [diets, setDiets] = useState("");

  const handleAddDiet = (newDiet) => {
    setDiets([...diets, newDiet]);
  };
  */
  return (
    <div className="App">
      <h1>Random Recipe Suggestions</h1>
      <Diet />
      <hr />
      <div>
        <RandomRecipe />
        <Instructions />
        <GroceryList />
      </div>
    </div>
  );
}
