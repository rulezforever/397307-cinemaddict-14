import { createSiteMenuTemplate } from './view/menu.js';
import { createFilmsSection} from './view/films.js';
import { createFilmCard } from './view/film-card.js';
import { createShowMoreBtn } from './view/show-more-btn.js';
import { createUserProfile } from './view/user.js';
import { createExtraSections } from './view/films-extra.js';
import { createFilmsQuantity } from './view/fims-quantity.js';
// import { createPopup } from './view/popup.js';
import { generateFilm } from './mock/film.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
render(siteMainElement, createSiteMenuTemplate(), 'beforeend');
render(siteMainElement, createFilmsSection(),'beforeend');
const filmsListElement = siteMainElement.querySelector('.films-list');
render(filmsListElement, createShowMoreBtn(),'beforeend');
const filmsListContainerElement = siteMainElement.querySelector('.films-list__container');
const headerElement = document.querySelector('.header');
render(headerElement, createUserProfile(),'beforeend');

for (let i = 0; i < CARD_COUNT; i++) {
  render(filmsListContainerElement, createFilmCard(films[i]), 'beforeend');
}

const filmsElement = siteMainElement.querySelector('.films');
render(filmsElement, createExtraSections(),'beforeend');

const footerStatisticsElement = document.querySelector('.footer__statistics');
render(footerStatisticsElement, createFilmsQuantity(),'beforeend');

// рендер Popup - закоментировал, т.к закрывает главную страницу
// const bodyElement = document.body;
// render(bodyElement, createPopup(films[0]),'beforeend');
