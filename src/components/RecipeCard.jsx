function RecipeCard({ recipe, onToggleFavorite }) {
  return (
    <article className="recipe-card">
      {recipe.image ? (
        <img
          className="recipe-card__image"
          src={recipe.image}
          alt={`${recipe.title} dish`}
          width="800"
          height="600"
          loading="lazy"
        />
      ) : (
        <div className="recipe-card__placeholder">No image available</div>
      )}

      <div className="recipe-card__content">
        <span className="recipe-card__category">{recipe.category}</span>

        <h3>{recipe.title}</h3>

        <p className="recipe-card__time">
          Preparation time: {recipe.prepTime} minutes
        </p>

        <p>{recipe.isFavorite ? "Saved as favorite" : "Not a favorite"}</p>

        <button
          type="button"
          aria-pressed={recipe.isFavorite}
          onClick={() => onToggleFavorite(recipe.id)}
        >
          {recipe.isFavorite ? "Remove favorite" : "Add favorite"}
        </button>
      </div>
    </article>
  );
}

export default RecipeCard;
