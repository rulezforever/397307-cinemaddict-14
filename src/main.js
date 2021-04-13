import SiteMenuView from './view/menu.js';
import FilmsSectionView from './view/films.js';
import FilmCardView  from './view/film-card.js';
import ShowMoreBtnView from './view/show-more-btn.js';
import UserProfileView from './view/user.js';
import ExtraSectionsView from './view/films-extra.js';
import FilmsQuantityView from './view/fims-quantity.js';
// import PopupView from './view/popup.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { renderTemplate, renderElement, RenderPosition } from './utils.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;
const FILMS_COUNT_EXTRA = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const siteMainElement = document.querySelector('.main');
renderTemplate(siteMainElement, new SiteMenuView(filters).getTemplate(), RenderPosition.BEFOREEND);
renderElement(siteMainElement, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);
const filmsListElement = siteMainElement.querySelector('.films-list');
if (films.length > CARD_COUNT) {
  let renderedFilmCount = CARD_COUNT;
  const showMoreBtnComponent = new ShowMoreBtnView();
  renderElement(filmsListElement, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
  showMoreBtnComponent.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + CARD_COUNT)
      .forEach((film) => renderElement(filmsListContainerElement, new FilmCardView(film).getElement(), RenderPosition.BEFOREEND));

    renderedFilmCount += CARD_COUNT;

    if (renderedFilmCount >= films.length) {
      showMoreBtnComponent.getElement().remove();
    }
  });
}
const filmsListContainerElement = siteMainElement.querySelector('.films-list__container');
const headerElement = document.querySelector('.header');
renderElement(headerElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, CARD_COUNT); i++) {
  renderElement(filmsListContainerElement, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

const filmsElement = siteMainElement.querySelector('.films');
renderTemplate(filmsElement, new ExtraSectionsView().getTemplate(), RenderPosition.BEFOREEND);
const topRatedContainer = siteMainElement.querySelector('.films-list__container--top');
const mostCommentedContainer = siteMainElement.querySelector('.films-list__container--most');
for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
  renderElement(topRatedContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
  renderElement(mostCommentedContainer, new FilmCardView(films[i]).getElement(), RenderPosition.BEFOREEND);
}

const footerStatisticsElement = document.querySelector('.footer__statistics');
renderElement(footerStatisticsElement, new FilmsQuantityView(FILMS_COUNT).getElement(), RenderPosition.BEFOREEND);

// const filmCardComponent = new FilmCardView();
// filmCardComponent.getElement().addEventListener('click', (evt) => {
//   evt.preventDefault();
//   alert('jgfjuhg');
// });
// рендер Popup - закоментировал, т.к закрывает главную страницу
// const bodyElement = document.body;
// renderElement(bodyElement, new PopupView(films[0]).getElement(), RenderPosition.BEFOREEND);
