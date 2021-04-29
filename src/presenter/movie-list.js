import SortView from '../view/sort.js';
import NoFilmView from '../view/no-film.js';
import FilmsSectionView from '../view/films.js';
import ShowMoreBtnView from '../view/show-more-btn.js';
import UserProfileView from '../view/user.js';
import ExtraSectionsView from '../view/films-extra.js';
import FilmsListView from '../view/films-list.js';
import MoviePresenter from './movie.js';
import { updateItem } from '../utils/common.js';
import { renderTemplate, renderElement, RenderPosition, remove } from '../utils/render.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;
const FILMS_COUNT_EXTRA = 2;


export default class MovieList {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;
    this._renderedFilmCount = CARD_COUNT;
    this._moviePresenter = {};

    this._filmsSectionComponent = new FilmsSectionView();
    this._sortComponent = new SortView();
    this._showMoreBtnComponent = new ShowMoreBtnView();
    this._noFilmComponent = new NoFilmView();
    this._userProfileComponent = new UserProfileView();
    this._extraSectionsComponent = new ExtraSectionsView();
    this._filmsListComponent =  new FilmsListView();

    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleShowMoreBtnClick = this._handleShowMoreBtnClick.bind(this);
  }

  init(boardFilms) {
    this._boardFilms = boardFilms.slice();
    this._renderBoard();
  }

  _renderSort() {
    renderTemplate(this._movieContainer, this._sortComponent.getTemplate(), RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
    const moviePresenter = new MoviePresenter(this._filmsListComponent, this._handleFilmChange);
    moviePresenter.init(film);
    this._moviePresenter[film.id] = moviePresenter;
  }

  _renderFilms(from, to) {
    this._boardFilms
      .slice(from, to)
      .forEach((boardFilm) => this._renderFilm(boardFilm));
  }

  _clearFilmList() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};
    this._renderedFilmCount = CARD_COUNT;
    remove(this._showMoreBtnComponent);
  }

  _handleFilmChange(updatedFilm) {
    this._boardFilms = updateItem(this._boardFilms, updatedFilm);
    this._moviePresenter[updatedFilm.id].init(updatedFilm);
  }

  _handleShowMoreBtnClick() {
    this._renderFilms(this._renderedFilmCount, this._renderedFilmCount + CARD_COUNT);
    this._renderedFilmCount += CARD_COUNT;

    if (this._renderedFilmCount >= this._boardFilms.length) {
      remove(this._showMoreBtnComponent);
    }
  }

  _renderNoFilm() {
    renderElement(this._movieContainer, this._noFilmComponent.getElement(), RenderPosition.BEFOREEND);
  }

  _renderFilmsSection() {
    renderElement(this._movieContainer, this._filmsSectionComponent.getElement(), RenderPosition.BEFOREEND);
  }


  _renderShowMoreBtn() {
    const filmsListElement = this._movieContainer.querySelector('.films-list');
    // const filmsListContainerElement = this._movieContainer.querySelector('.films-list__container');
    if (this._boardFilms.length > CARD_COUNT) {
      renderElement(filmsListElement, this._showMoreBtnComponent.getElement(), RenderPosition.BEFOREEND);
      // this._showMoreBtnComponent.setClickHandler(() => {
      //   this._boardFilms
      //     .slice(this._renderedFilmCount, this._renderedFilmCount + CARD_COUNT)
      //     .forEach((film) => this._renderFilm(filmsListContainerElement, film));

      //   this._renderedFilmCount += CARD_COUNT;

      //   if (this._renderedFilmCount >= this._boardFilms.length) {
      //     remove(this._showMoreBtnComponent);
      //   }
      // });
      this._showMoreBtnComponent.setClickHandler(this._handleShowMoreBtnClick);
    }
  }
  _renderFilmsList() {
    // const filmsListContainerElement = this._movieContainer.querySelector('.films-list__container');
    // for (let i = 0; i < Math.min(this._boardFilms.length, CARD_COUNT); i++) {
    //   this._renderFilm(filmsListContainerElement, this._boardFilms[i]);
    // }
    this._renderFilms(0, Math.min(this._boardFilms.length, CARD_COUNT));
    if (this._boardFilms.length > CARD_COUNT) {
      this._renderShowMoreBtn();
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
      this._renderFilmsList();
      this._renderShowMoreBtn();
      this._renderUserProfile();
      this._renderExtraSections();
    }
  }
}
