import * as model from './model.js';
import recipeView from './views/recipeView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  const id = window.location.hash.slice(1);

  if(!id) {
    return;
  }

  try {
    recipeView.renderSpinder();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    console.log(err);
  }
};

['hashchange', 'load'].forEach(evt => { 
  window.addEventListener(evt, controlRecipe);
});