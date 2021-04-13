import { createElement } from '../utils.js';

const createExtraSections = () => {
  return `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Top rated</h2>

  <div class="films-list__container films-list__container--top">
  </div>
</section>

<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>

  <div class="films-list__container films-list__container--most">
  </div>
</section>`;
};

export default class ExtraSections {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createExtraSections();
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
