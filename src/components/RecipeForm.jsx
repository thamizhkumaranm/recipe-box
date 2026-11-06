import { useState } from "react";

function RecipeForm({ onAddRecipe }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Breakfast");
  const [prepTime, setPrepTime] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim() || !prepTime) {
      alert("Please enter recipe title and preparation time");
      return;
    }
    const newRecipe = {
      id: Date.now(),
      title: title.trim(),
      category,
      prepTime: Number(prepTime),
      isFavorite: false,
    };
    onAddRecipe(newRecipe);
    setTitle("");
    setPrepTime("");
  }
  return (
    <section>
      <h2>Add a Recipe</h2>

      <form onSubmit={handleSubmit}>
        <label htmlFor="recipe-title">Recipe title</label>

        <input
          id="recipe-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Example: Tomato Pasta"
        />

        <label htmlFor="recipe-category">Category</label>

        <select
          id="recipe-category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
        >
          <option value="Breakfast">Breakfast</option>
          <option value="Lunch">Lunch</option>
          <option value="Dinner">Dinner</option>
          <option value="Snack">Snack</option>
        </select>
        <label htmlFor="prep-time">Preparation time</label>

        <input
          id="prep-time"
          type="number"
          min="1"
          value={prepTime}
          onChange={(event) => setPrepTime(event.target.value)}
          placeholder="Minutes"
        />
        <p>
          Preview: {title || "Recipe title"} - {category} - {prepTime || "0"}{" "}
          minutes
        </p>
        <button type="submit">Add Recipe</button>
      </form>
    </section>
  );
}

export default RecipeForm;
