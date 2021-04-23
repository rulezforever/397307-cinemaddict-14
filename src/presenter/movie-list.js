import SortView from '../view/sort.js';
import NoFilmView from '../view/no-film.js';
import FilmsSectionView from '../view/films.js';
import ShowMoreBtnView from '../view/show-more-btn.js';
import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import UserProfileView from '../view/user.js';
import ExtraSectionsView from '../view/films-extra.js';
import { renderTemplate, renderElement, RenderPosition } from '../utils/render.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;
const FILMS_COUNT_EXTRA = 2;


export default class MovieList {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;

    this._filmsSectionComponent = new FilmsSectionView();
    this._sortComponent = new SortView();
    this._showMoreBtnComponent = new ShowMoreBtnView();
    this._noFilmComponent = new NoFilmView();
    this._userProfileComponent = new UserProfileView();
    this._extraSectionsComponent = new ExtraSectionsView();
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._renderBoard();
  }

  _renderSort() {
    renderTemplate(this._movieContainer, this._sortComponent.getTemplate(), RenderPosition.BEFOREEND);
  }

  _renderFilm(filmListElement, film) {
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

    filmComponent.setPosterClickHandler(onFilmClick);
    filmComponent.setTitleClickHandler(onFilmClick);
    filmComponent.setCommentsClickHandler(onFilmClick);
    popupComponent.setCloseClickHandler(onCloseBtnClick);

    renderElement(filmListElement, filmCard, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _renderNoFilm() {
    renderElement(this._movieContainer, this._noFilmComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilmsSection() {
    renderElement(this._movieContainer, this._filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);
  }


  _renderShowMoreBtn() {
    const filmsListElement = this._movieContainer.querySelector('.films-list');
    const filmsListContainerElement = this._movieContainer.querySelector('.films-list__container');
    if (this._boardFilms.length > CARD_COUNT) {
      let renderedFilmCount = CARD_COUNT;
      renderElement(filmsListElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
      this._showMoreBtnComponent.setClickHandler(() => {
        this._boardFilms
          .slice(renderedFilmCount, renderedFilmCount + CARD_COUNT)
          .forEach((film) => this._renderFilm(filmsListContainerElement, film));

        renderedFilmCount += CARD_COUNT;

        if (renderedFilmCount >= this._boardFilms.length) {
          this._showMoreBtnComponent.getElement().remove();
        }
      });
    }
  }
  // в методах _renderShowMoreBtn, _renderShowMoreBtn, и _renderFilmsList приходится создавать константу filmsListContainerElement,
  // правильно ли это, или есть какой-то другой путь?
  _renderFilmsList() {
    const filmsListContainerElement = this._movieContainer.querySelector('.films-list__container');
    for (let i = 0; i < Math.min(this._boardFilms.length, CARD_COUNT); i++) {
      this._renderFilm(filmsListContainerElement, this._boardFilms[i]);
    }
  }

  _renderUserProfile() {
    const headerElement = document.querySelector('.header');
    renderElement(headerElement, this._userProfileComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderExtraSections() {
    const filmsElement = this._movieContainer.querySelector('.films');
    renderTemplate(filmsElement, this._extraSectionsComponent.getTemplate(), RenderPosition.BEFOREEND);
    const topRatedContainer = this._movieContainer.querySelector('.films-list__container--top');
    const mostCommentedContainer = this._movieContainer.querySelector('.films-list__container--most');
    for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
      this._renderFilm(topRatedContainer, this._boardFilms[i]);
      this._renderFilm(mostCommentedContainer, this._boardFilms[i]);
    }
  }

  _renderBoard() {
    if (FILMS_COUNT === 0) {
      this._renderNoFilm();
    } else {
      this._renderSort();
      this._renderFilmsSection();
      this._renderShowMoreBtn();
      this._renderUserProfile();
      this._renderFilmsList();
      this._renderExtraSections();
    }
  }
}
