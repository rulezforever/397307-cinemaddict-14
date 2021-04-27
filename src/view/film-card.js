import dayjs from 'dayjs';
import { timeConvert } from '../utils/common.js';
import AbstractView from './abstract.js';


const createFilmCard = (film) => {
  const { title, poster, description, rating, date, duration, genre, isFavorite, watched, addToWatchlist } = film;
  const dateYear = dayjs(date).format('YYYY');
  const runtime = timeConvert(duration);
  const addToWatchlistClassName = addToWatchlist
    ? 'film-card__controls-item--add-to-watchlist film-card__controls-item--active'
    : 'film-card__controls-item--add-to-watchlist';
  const favoriteClassName = isFavorite
    ? 'film-card__controls-item--favorite film-card__controls-item--active'
    : 'film-card__controls-item--favorite';
  const watchedClassName = watched
    ? 'film-card__controls-item--mark-as-watched film-card__controls-item--active'
    : 'film-card__controls-item--mark-as-watched';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${rating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${dateYear}</span>
      <span class="film-card__duration">${runtime}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="${poster}" alt="" class="film-card__poster">
    <p class="film-card__description"${description}</p>
    <a class="film-card__comments">18 comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item button ${addToWatchlistClassName}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item button ${watchedClassName}" type="button">Mark as watched</button>
      <button class="film-card__controls-item button ${favoriteClassName}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._editClickHandler = this._editClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._watchedClickHandler = this._watchedClickHandler.bind(this);
    this._addToWatchlistClickHandler = this._addToWatchlistClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCard(this._film);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _watchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _addToWatchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.addToWatchlistClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setWatchedClickHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this. _watchedClickHandler);
  }

  setAddToWatchlistClickHandler(callback) {
    this._callback.addToWatchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._addToWatchlistClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._editClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._editClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._editClickHandler);
  }
}
