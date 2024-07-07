document.addEventListener('DOMContentLoaded', () => {
    const recipeList = document.getElementById('recipe-list');
    const addRecipeButton = document.getElementById('add-recipe-button');
    const recipeForm = document.getElementById('recipe-form');
    const addRecipeForm = document.getElementById('add-recipe-form');
    const cancelButton = document.getElementById('cancel-button');
  
    let recipes = JSON.parse(localStorage.getItem('_username_recipes')) || [];
  
    function saveRecipes() {
      localStorage.setItem('_username_recipes', JSON.stringify(recipes));
    }
  
    function renderRecipes() {
      recipeList.innerHTML = '';
      recipes.forEach((recipe, index) => {
        const recipeItem = document.createElement('div');
        recipeItem.classList.add('recipe-item');
        recipeItem.textContent = recipe.name;
        recipeItem.addEventListener('click', () => viewRecipe(index));
        recipeList.appendChild(recipeItem);
      });
    }
  
    function viewRecipe(index) {
      const recipe = recipes[index];
      const viewRecipeHtml = `
        <h2>${recipe.name}</h2>
        <p>${recipe.ingredients}</p>
        <button onclick="editRecipe(${index})">Edit</button>
        <button onclick="deleteRecipe(${index})">Delete</button>
        <button onclick="renderRecipes()">Back</button>
      `;
      recipeList.innerHTML = viewRecipeHtml;
    }
  
    function editRecipe(index) {
      const recipe = recipes[index];
      document.getElementById('recipe-name').value = recipe.name;
      document.getElementById('recipe-ingredients').value = recipe.ingredients;
      recipeForm.style.display = 'block';
      addRecipeForm.onsubmit = function(event) {
        event.preventDefault();
        recipe.name = document.getElementById('recipe-name').value;
        recipe.ingredients = document.getElementById('recipe-ingredients').value;
        saveRecipes();
        renderRecipes();
        recipeForm.style.display = 'none';
      };
    }
  
    function deleteRecipe(index) {
      recipes.splice(index, 1);
      saveRecipes();
      renderRecipes();
    }
  
    addRecipeButton.addEventListener('click', () => {
      recipeForm.style.display = 'block';
      document.getElementById('recipe-name').value = '';
      document.getElementById('recipe-ingredients').value = '';
      addRecipeForm.onsubmit = function(event) {
        event.preventDefault();
        const newRecipe = {
          name: document.getElementById('recipe-name').value,
          ingredients: document.getElementById('recipe-ingredients').value
        };
        recipes.push(newRecipe);
        saveRecipes();
        renderRecipes();
        recipeForm.style.display = 'none';
      };
    });
  
    cancelButton.addEventListener('click', () => {
      recipeForm.style.display = 'none';
    });
  
    renderRecipes();
  });
  