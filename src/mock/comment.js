import { getRandomInteger } from '../utils.js';

const getEmotion = () => {
  const emotions = ['smile', 'sleeping', 'puke', 'angry'];
  const randomIndex = getRandomInteger(0, emotions.length - 1);
  return emotions[randomIndex];
};

const date = new Date();

export const generateComment = () => {
  return {
    id: '42',
    comment: 'text comment',
    emotion: getEmotion(),
    author: 'Ilya OReilly',
    date,
  };
};
