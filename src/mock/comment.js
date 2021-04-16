import { getRandomInteger } from '../utils/common.js';

const EMOTIONS = ['smile', 'sleeping', 'puke', 'angry'];

const getEmotion = () => {
  const randomIndex = getRandomInteger(0, EMOTIONS.length - 1);
  return EMOTIONS[randomIndex];
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
