import { createSiteMenuTemplate } from './view/menu.js';
import { createFilmsSection} from './view/films.js';
import { createFilmCard } from './view/film-card.js';
import { createShowMoreBtn } from './view/show-more-btn.js';
import { createUserProfile } from './view/user.js';
import { createExtraSections } from './view/films-extra.js';
import { createFilmsQuantity } from './view/fims-quantity.js';
// import { createPopup } from './view/popup.js';
import { generateFilm } from './mock/film.js';
import { generateFilter } from './mock/filter.js';
// import { generateComment } from './mock/comment.js';

const CARD_COUNT = 5;
const FILMS_COUNT = 20;
const FILMS_COUNT_EXTRA = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
const filters = generateFilter(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector('.main');
render(siteMainElement, createSiteMenuTemplate(filters), 'beforeend');
render(siteMainElement, createFilmsSection(),'beforeend');
const filmsListElement = siteMainElement.querySelector('.films-list');
if (films.length > CARD_COUNT) {
  let renderedFilmCount = CARD_COUNT;
  render(filmsListElement, createShowMoreBtn(),'beforeend');

  const showMoreButton = siteMainElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + CARD_COUNT)
      .forEach((film) => render(filmsListContainerElement, createFilmCard(film), 'beforeend'));

    renderedFilmCount += CARD_COUNT;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}
const filmsListContainerElement = siteMainElement.querySelector('.films-list__container');
const headerElement = document.querySelector('.header');
render(headerElement, createUserProfile(),'beforeend');

for (let i = 0; i < Math.min(films.length, CARD_COUNT); i++) {
  render(filmsListContainerElement, createFilmCard(films[i]), 'beforeend');
}

const filmsElement = siteMainElement.querySelector('.films');
render(filmsElement, createExtraSections(),'beforeend');
const topRatedContainer = siteMainElement.querySelector('.films-list__container--top');
const mostCommentedContainer = siteMainElement.querySelector('.films-list__container--most');
for (let i = 0; i < FILMS_COUNT_EXTRA; i++) {
  render(topRatedContainer, createFilmCard(films[i]), 'beforeend');
  render(mostCommentedContainer, createFilmCard(films[i]), 'beforeend');
}

const footerStatisticsElement = document.querySelector('.footer__statistics');
render(footerStatisticsElement, createFilmsQuantity(FILMS_COUNT),'beforeend');

// рендер Popup - закоментировал, т.к закрывает главную страницу
// const bodyElement = document.body;
// render(bodyElement, createPopup(films[0]),'beforeend');
