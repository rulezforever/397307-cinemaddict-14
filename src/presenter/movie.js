import FilmCardView from '../view/film-card.js';
import PopupView from '../view/popup.js';
import { renderElement, RenderPosition, replace, remove } from '../utils/render.js';

const Mode = {
  DEFAULT: 'POPUP CLOSED',
  OPEN: 'POPUP OPEN',
};

export default class Movie {
  constructor(filmListContainer, changeData, changeMode) {
    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._popupComponent =  null;
    this._filmComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleFilmClick = this._handleFilmClick.bind(this);
    this._handleCloseBtnClick = this._handleCloseBtnClick.bind(this);

    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleAddToWatchlistClick = this._handleAddToWatchlistClick.bind(this);
  }

  init(film) {
    this._film = film;

    const prevFilmComponent = this._filmComponent;
    const prevPopupComponent = this._popupComponent;

    this._filmComponent = new FilmCardView(film);
    this._filmCard = this._filmComponent.getElement();
    this._popupComponent =  new PopupView(film);
    this._popup = this._popupComponent.getElement();
    this._bodyElement = document.body;

    this._filmComponent.setPosterClickHandler(this._handleFilmClick);
    this._filmComponent.setTitleClickHandler(this._handleFilmClick);
    this._filmComponent.setCommentsClickHandler(this._handleFilmClick);
    this._popupComponent.setCloseClickHandler(this._handleCloseBtnClick);

    this._filmComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmComponent.setWatchedClickHandler(this._handleWatchedClick);
    this._filmComponent.setAddToWatchlistClickHandler(this._handleAddToWatchlistClick);

    if (prevFilmComponent === null || prevPopupComponent === null) {
      renderElement(this._filmListContainer, this._filmCard, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmComponent, prevFilmComponent);
    }

    if (this._mode === Mode.OPEN) {
      replace(this._popupComponent, prevPopupComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  }

  destroy() {
    remove(this._filmComponent);
    remove(this._popupComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._handleCloseBtnClick();
    }
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          isFavorite: !this._film.isFavorite,
        },
      ),
    );
  }

  _handleWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          watched: !this._film.watched,
        },
      ),
    );
  }

  _handleAddToWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          addToWatchlist: !this._film.addToWatchlist,
        },
      ),
    );
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this._handleCloseBtnClick();
    }
  }

  _handleFilmClick() {
    this._bodyElement.appendChild(this._popup);
    this._bodyElement.classList.add('hide-overflow');
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.OPEN;
  }

  _handleCloseBtnClick() {
    this._bodyElement.removeChild(this._popup);
    this._bodyElement.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }
}
