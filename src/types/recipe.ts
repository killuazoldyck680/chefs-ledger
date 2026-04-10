// 1. The small building block: Ingredients
export interface Ingredient {
  id: number;
  name: string;
  amount: number;
  unit: string;
}

// 2. The main object: The Recipe
export interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  // An array of the Ingredient interface we defined above
  extendedIngredients: Ingredient[];
  // Optional property (marked with ?) for user notes
  userNotes?: string; 
}

// 3. The API Response (How the data arrives from Spoonacular)
export interface RecipeResponse {
  results: Recipe[];
  offset: number;
  number: number;
  totalResults: number;
}