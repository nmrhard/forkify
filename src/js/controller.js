import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultView from './views/resultView.js';
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
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

    // 0. Update results view to mark selected result
    resultView.update(model.getSearchResultPage());
    bookmarksView.update(model.state.bookmarks);

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
    resultView.render(model.getSearchResultPage());

    // 5. Render initial pagintation buttons
    paginationView.render(model.state.search);
  } catch(err) {
    console.error(err);
  }
}

const controlPagination = function(gotToPage) {
  // 1. Rendering result
  resultView.render(model.getSearchResultPage(gotToPage));

  // 2. Render initial pagintation buttons
  paginationView.render(model.state.search);
}

const controlServings = function(newServings) {
  // 1 Update the recipe servings (in state)
  model.updateServings(newServings);

  // 2 Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
}

const controlAddBookmark = function() {
  // 1. Add/remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // 2. Update recipre view
  recipeView.update(model.state.recipe);

  // 3. Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}

const init = function() {
  recipeView.addHandlerRender(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);

  searchView.addHandlerSearch(controlSearchResult);
  paginationView.addHandlerClick(controlPagination);
}

init();