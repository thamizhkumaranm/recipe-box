import RecipeCard from "./RecipeCard";

function RecipeList({ recipes, onToggleFavorite }) {
  if (recipes.length === 0) {
    return (
      <section className="recipe-section">
        <h2>My Recipes</h2>
        <div className="empty-state">
          <h3>No recipes found</h3>
          <p>Try another category or add a new recipe.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="recipe-section">
      <h2>My Recipes</h2>

      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </section>
  );
}

export default RecipeList;
