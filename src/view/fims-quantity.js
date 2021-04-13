import { createElement } from '../utils.js';

const createFilmsQuantity = (filmsQuantity) => {
  return `<p>
            ${filmsQuantity} movies inside
          </p>`;
};

export default class FilmsQuantity {
  constructor(filmsQuantity) {
    this._filmsQuantity = filmsQuantity;
    this._element = null;
  }

  getTemplate() {
    return createFilmsQuantity(this._filmsQuantity);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
