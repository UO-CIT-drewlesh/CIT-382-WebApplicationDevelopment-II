/* 
- recipeData is an array of objects
- holds data that will be fetched from the web
- this data will be used in an app Component to display necessary data:
  1. Name of a suggested recipe
  2. Image of the suggested recipe
  3. Ingredients required to make the suggested recipe
  4. Instructions on how to make the suggested recipe
  5. A link to the web page the recipe was pulled from
*/
const recipeData = [
  {
    recipeName,
    recipeImage,
    ingredients: [],
    instructions,
    cookingTime,
    webLink
  }
];

/* 
- nutritionalFacts is an array of objects holding nutritional data about the recipe
- this can be displayed somewhere on the page
*/
const nutritionalFacts = [
  { calories, fat, saturatedFat, carbs, sugar, cholestoral, sodium, protein }
];

/*
- userData allows a user to store info preferences in suggestions
- Allergies, dietary preferences(vegan, keto, GF, etc.)
- user ingredients will hold the ingredients a user doesn't need 
- this data will be used for conditionals
*/
const userData = { dietaryRestrictions: [], ingredients: [] };

/*
- groceryList is an array of everything you'll need for a recipe
- will be compared against ingredients a user already has
*/
const groceryList = [];
