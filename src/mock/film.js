import { getRandomInteger } from '../utils/common.js';
import {nanoid} from 'nanoid';

const DESCRIPTION_MAX_LENGTH = 140;
const MAX_RANDOM_QUANTITY = 5;
const DESCRIPTION_ITEMS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const TITLES = [
  'The Dance of Life',
  'Sagebrush Trail',
  'The Man with the Golden Arm',
  'Santa Claus Conquers the Martians',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'The Great Flamarion',
  'Made for Each Other',
];

const POSTERS = [
  './images/posters/made-for-each-other.png',
  './images/posters/popeye-meets-sinbad.png',
  './images/posters/sagebrush-trail.jpg',
  './images/posters/santa-claus-conquers-the-martians.jpg',
  './images/posters/the-dance-of-life.jpg',
  './images/posters/the-great-flamarion.jpg',
  './images/posters/the-man-with-the-golden-arm.jpg',
];

const date = new Date();

const getRandomTitle = () => {
  const randomIndex = getRandomInteger(0, TITLES.length - 1);
  return TITLES[randomIndex];
};

const getRandomPoster = () => {
  const randomIndex = getRandomInteger(0, POSTERS.length - 1);
  return POSTERS[randomIndex];
};


const generateDescription = () => {
  const randomDescriptions = [];
  for(let i = 0; i < getRandomInteger(1, MAX_RANDOM_QUANTITY); i++) {
    const randomIndex = getRandomInteger(0, DESCRIPTION_ITEMS.length - 1);
    randomDescriptions.push(DESCRIPTION_ITEMS[randomIndex]);
  }
  const description =  randomDescriptions.join('');
  if (description.length > DESCRIPTION_MAX_LENGTH) {
    return `${description.substring(0,DESCRIPTION_MAX_LENGTH - 2)}...`;
  }
  return description;
};

const generateFullDescription = () => {
  const randomDescriptions = [];
  for(let i = 0; i < getRandomInteger(1, MAX_RANDOM_QUANTITY); i++) {
    const randomIndex = getRandomInteger(0, DESCRIPTION_ITEMS.length - 1);
    randomDescriptions.push(DESCRIPTION_ITEMS[randomIndex]);
  }
  return randomDescriptions.join('');
};

export const generateFilm = () => {
  return {
    id: nanoid(),
    title: getRandomTitle(),
    poster: getRandomPoster(),
    description: generateDescription(),
    comments: ['1', '2'],
    rating: 8.3,
    date,
    duration: 77,
    genre: ['Western', 'Drama'],
    isFavorite: Boolean(getRandomInteger(0, 1)),
    watched: Boolean(getRandomInteger(0, 1)),
    addToWatchlist: Boolean(getRandomInteger(0, 1)),

    alternativeTitle: getRandomTitle(),
    director: 'Anthony Mann',
    writers: ['Anne Wigton', 'Heinz Herald', 'Richard Weil'],
    actors: ['Erich von Stroheim', 'Mary Beth Hughes', 'Dan Duryea'],
    country: 'USA',
    ageRating: '18',
    fullDescription: generateFullDescription(),
  };
};
