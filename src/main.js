import SiteMenuView from './view/menu.js';
import SortView from './view/sort.js';
import NoFilmView from './view/no-film.js';
import FilmsSectionView from './view/films.js';
import FilmCardView from './view/film-card.js';
import ShowMoreBtnView from './view/show-more-btn.js';
import UserProfileView from './view/user.js';
import ExtraSectionsView from './view/films-extra.js';
import FilmsQuantityView from './view/fims-quantity.js';
import PopupView from './view/popup.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { renderTemplate, renderElement, RenderPosition } from './utils.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;
const FILMS_COUNT_EXTRA = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const siteMainElement = document.querySelector('.main');

const renderFilm = (filmListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmCard = filmComponent.getElement();
  const popupComponent = new PopupView(film);
  const bodyElement = document.body;
  const popup = popupComponent.getElement();

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      bodyElement.removeChild(popup);
      bodyElement.classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onFilmClick = () => {
    bodyElement.appendChild(popup);
    bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', onEscKeyDown);
  };

  const onCloseBtnClick = () => {
    bodyElement.removeChild(popup);
    bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', onEscKeyDown);
  };

  filmCard.querySelector('.film-card__poster').addEventListener('click', onFilmClick);
  filmCard.querySelector('.film-card__title').addEventListener('click', onFilmClick);
  filmCard.querySelector('.film-card__comments').addEventListener('click', onFilmClick);
  popupComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', onCloseBtnClick);

  renderElement(filmListElement, filmCard, RenderPosition.BEFOREEND);
};

renderTemplate(siteMainElement, new SiteMenuView(filters).getTemplate(), RenderPosition.BEFOREEND);

if (FILMS_COUNT === 0) {
  renderElement(siteMainElement, new NoFilmView().getElement(), RenderPosition.BEFOREEND);
} else {
  renderTemplate(siteMainElement, new SortView().getTemplate(), RenderPosition.BEFOREEND);
  renderElement(siteMainElement, new FilmsSectionView().getElement(), RenderPosition.BEFOREEND);
  const filmsListElement = siteMainElement.querySelector('.films-list');
  const filmsListContainerElement = siteMainElement.querySelector('.films-list__container');
  if (films.length > CARD_COUNT) {
    let renderedFilmCount = CARD_COUNT;
    const showMoreBtnComponent = new ShowMoreBtnView();
    renderElement(filmsListElement, showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
    showMoreBtnComponent.getElement().addEventListener('click', (evt) => {
      evt.preventDefault();
      films
        .slice(renderedFilmCount, renderedFilmCount + CARD_COUNT)
        .forEach((film) => renderFilm(filmsListContainerElement, film));

      renderedFilmCount += CARD_COUNT;

      if (renderedFilmCount >= films.length) {
        showMoreBtnComponent.getElement().remove();
      }
    });
  }

  const headerElement = document.querySelector('.header');
  renderElement(headerElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);

  for (let i = 0; i < Math.min(films.length, CARD_COUNT); i++) {
    renderFilm(filmsListContainerElement, films[i]);
  }

  const filmsElement = siteMainElement.querySelector('.films');
  renderTemplate(filmsElement, new ExtraSectionsView().getTemplate(), RenderPosition.BEFOREEND);
  const topRatedContainer = siteMainElement.querySelector('.films-list__container--top');
  const mostCommentedContainer = siteMainElement.querySelector('.films-list__container--most');
  for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
    renderFilm(topRatedContainer, films[i]);
    renderFilm(mostCommentedContainer, films[i]);
  }
}
const footerStatisticsElement = document.querySelector('.footer__statistics');
renderElement(footerStatisticsElement, new FilmsQuantityView(FILMS_COUNT).getElement(), RenderPosition.BEFOREEND);

