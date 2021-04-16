import AbstractView from './abstract.js';

const createFilmsQuantity = (filmsQuantity) => {
  return `<p>
            ${filmsQuantity} movies inside
          </p>`;
};

export default class FilmsQuantity extends AbstractView {
  constructor(filmsQuantity) {
    super();
    this._filmsQuantity = filmsQuantity;
  }

  getTemplate() {
    return createFilmsQuantity(this._filmsQuantity);
  }
}
