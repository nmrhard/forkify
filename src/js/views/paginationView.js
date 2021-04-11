import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function(evt) {
      const btn = evt.target.closest('.btn--inline');

      if(!btn) {
        return
      };
      
      const gotToPage = +btn.dataset.goto;
      handler(gotToPage);
    })
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(this._data.results.length / this._data.resultsPerPage);

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateNextPageButton(curPage);
    }
    
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generatePrevPageButton(curPage);
    }
    
    // Others page
    if (curPage < numPages) {
      return `
        ${this._generatePrevPageButton(curPage)}
        ${this._generateNextPageButton(curPage)}
      `;
    }

    // Page 1 and there are NO other pages
    return '';
  }

  _generatePrevPageButton(page) {
    return `
      <button data-goto="${page - 1}" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${page - 1}</span>
      </button>
    `;
  }

  _generateNextPageButton(page) {
    return `
      <button data-goto="${page + 1}" class="btn--inline pagination__btn--next">
        <span>Page ${page + 1}</span>
        <svg class="search__icon">
          <use href=""${icons}#icon-arrow-right"></use>
        </svg>
      </button>
    `;
  }
}

export default new PaginationView();