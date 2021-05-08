import dayjs from 'dayjs';

export const sortRating = (a, b) => {
  return b.rating - a.rating;
};

export const sortDate = (a, b) => {
  return dayjs().diff(a.date) -  dayjs().diff(b.date);
};


