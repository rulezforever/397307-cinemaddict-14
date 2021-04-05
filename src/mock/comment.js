import { getRandomInteger } from '../utils.js';

const getEmoji = () => {
  const emoji = ['smile', 'sleeping', 'puke', 'angry'];
  const randomIndex = getRandomInteger(0, emoji.length - 1);
  return emoji[randomIndex];
};


export const generateComment = () => {
  return {
    id: 1,
    text: 'text',
    emoji: getEmoji(),
    autor: 'author',
    date:'date',
    button: 'delete',
  };
};
