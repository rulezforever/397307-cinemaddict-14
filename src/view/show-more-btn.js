import AbstractView from './abstract.js';

const createShowMoreBtn = () => {
  return `<button class="films-list__show-more">
           Show more
          </button>`;
};

export default class ShowMoreBtn extends AbstractView {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createShowMoreBtn();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener('click', this._clickHandler);
  }
}
