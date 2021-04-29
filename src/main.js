import SiteMenuView from './view/menu.js';
import FilmsQuantityView from './view/fims-quantity.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
import { renderTemplate, renderElement, RenderPosition } from './utils/render.js';
import MovieListPresenter from './presenter/movie-list.js';

const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);
const siteMainElement = document.querySelector('.main');

renderTemplate(siteMainElement, new SiteMenuView(filters).getTemplate(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(siteMainElement);
const footerStatisticsElement = document.querySelector('.footer__statistics');
renderElement(footerStatisticsElement, new FilmsQuantityView(FILMS_COUNT).getElement(), RenderPosition.BEFOREEND);

movieListPresenter.init(films);
