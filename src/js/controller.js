import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function() {
  const id = window.location.hash.slice(1);

  if(!id) {
    return;
  }

  try {
    recipeView.renderSpiner();

    // 1. Loading recipe
    await model.loadRecipe(id);

    // 2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch(err) {
    recipeView.renderError();
  }
};

const controlSearchResult = async function() {
  try {
    resultView.renderSpiner();

    // 1. Get search quary
    const query = searchView.getQuery();
    if(!query) {
      return;
    }
    // 2. Load search results
    await model.loadSearchResults(query);

    // 3. Rendering result
    resultView.render(model.state.search.results);
  } catch(err) {
    console.error(err);
  }
}

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResult);
}

init();