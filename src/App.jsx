import RecipeList from "./components/RecipeList";
import RecipeForm from "./components/RecipeForm";
import vegetablePastaImg from "./assets/recipes/vegetable-pasta.png";
import bananaPancakesImg from "./assets/recipes/banana-pancakes.png";
import idlyImg from "./assets/recipes/idly.png";
import biriyaniImg from "./assets/recipes/biriyani.png";
import friedRiceImg from "./assets/recipes/fried-rice.png";
import samosaImg from "./assets/recipes/samosa.png";
import { useEffect, useState } from "react";


import "./App.css";

const initialRecipes = [
  {
    id: 1,
    title: "Vegetable Pasta",
    category: "Dinner",
    prepTime: 25,
    isFavorite: false,
    image: vegetablePastaImg,
  },
  {
    id: 2,
    title: "Banana Pancakes",
    category: "Breakfast",
    prepTime: 15,
    isFavorite: true,
    image: bananaPancakesImg,
  },
  {
    id: 3,
    title: "idly",
    category: "Breakfast",
    prepTime: 5,
    isFavorite: true,
    image: idlyImg,
  },
  {
    id: 4,
    title: "Biriyani",
    category: "Lunch",
    prepTime: 1,
    isFavorite: true,
    image: biriyaniImg,
  },
  {
    id: 5,
    title: "Fried Rice",
    category: "Breakfast",
    prepTime: 15,
    isFavorite: false,
    image: friedRiceImg,
  },
  {
    id: 6,
    title: "samosa",
    category: "Snack",
    prepTime: 10,
    isFavorite: false,
    image: samosaImg,
  },
];

const STORAGE_KEY = "recipe-box-recipes";

function App() {
const [recipes, setRecipes] = useState(() => {
  try {
    const savedRecipes = localStorage.getItem(STORAGE_KEY);

    if (!savedRecipes) {
      return initialRecipes;
    }

    const parsedRecipes = JSON.parse(savedRecipes);

    return Array.isArray(parsedRecipes) ? parsedRecipes : initialRecipes;
  } catch (error) {
    console.error("Could not load saved recipes:", error);
    return initialRecipes;
  }
});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

 useEffect(() => {
   localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
 }, [recipes]);
  
  function handleToggleFavorite(id) {
    setRecipes((currentRecipeList) =>
      currentRecipeList.map((recipeItem) =>
        recipeItem.id === id
          ? {
              ...recipeItem,
              isFavorite: !recipeItem.isFavorite,
            }
          : recipeItem,
      ),
    );
  }

  function handleAddRecipe(recipeToAdd) {
    setRecipes((currentRecipeList) => [...currentRecipeList, recipeToAdd]);
  }

 const filteredRecipes = recipes.filter((recipeItem) => {
   const matchesCategory =
     selectedCategory === "All" || recipeItem.category === selectedCategory;

   const matchesFavorite = !showFavoritesOnly || recipeItem.isFavorite;

   return matchesCategory && matchesFavorite;
 });
  
  function handleReset() {
    const shouldReset = window.confirm(
      "Reset all recipes and favorite changes?",
    );

    if (!shouldReset) {
      return;
    }

    setRecipes(initialRecipes);
    setSelectedCategory("All");
    setShowFavoritesOnly(false);
  }

  return (
    <main>
      <header className="app-header">
        <p>My personal cookbook</p>
        <h1>Recipe Box</h1>
      </header>

      <section className="filter-panel">
        <label htmlFor="category-filter">Filter by category</label>

        <select
          id="category-filter"
          value={selectedCategory}
          onChange={(event) => setSelectedCategory(event.target.value)}
        >
          <option value="All">All recipes</option>
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>

        <label>
          <input
            type="checkbox"
            checked={showFavoritesOnly}
            onChange={(event) => setShowFavoritesOnly(event.target.checked)}
          />
          Show favorites only
        </label>
      </section>

      <RecipeForm onAddRecipe={handleAddRecipe} />
      
      <button type="button" className="reset-button" onClick={handleReset}>
        Reset Recipe Box
      </button>
      <RecipeList
        recipes={filteredRecipes}
        onToggleFavorite={handleToggleFavorite}
      />
    </main>
  );
}

export default App;
