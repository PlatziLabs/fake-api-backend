export type typeImg =
  | 'movie'
  | 'game'
  | 'album'
  | 'album'
  | 'face'
  | 'fashion'
  | 'shoes'
  | 'watch'
  | 'furniture'
  | 'pizza'
  | 'burger'
  | 'drink'
  | 'car'
  | 'house'
  | 'random';

const images = [
  'https://i.imgur.com/5iNAL9T.jpeg',
  'https://i.imgur.com/x0K3SKA.jpeg',
  'https://i.imgur.com/Dm2pPfd.jpeg',
  'https://i.imgur.com/zQwsC2m.jpeg',
  'https://i.imgur.com/0KlqHu9.jpeg',
  'https://i.imgur.com/lVH533g.jpeg',
  'https://i.imgur.com/QEGACen.jpeg',
  'https://i.imgur.com/rDC2jWQ.jpeg',
  'https://i.imgur.com/OARGZQW.jpeg',
  'https://i.imgur.com/OLKMwgP.jpeg',
  'https://i.imgur.com/00qWleT.jpeg',
  'https://i.imgur.com/RQL19O6.jpeg',
  'https://i.imgur.com/kTPCFG2.jpeg',
  'https://i.imgur.com/gxaUWSF.jpeg',
  'https://i.imgur.com/rUWNzYa.jpeg',
  'https://i.imgur.com/Y5gHJMd.jpeg',
  'https://i.imgur.com/fpT4052.jpeg',
  'https://i.imgur.com/G45P8tI.jpeg',
  'https://i.imgur.com/DumuKkD.jpeg',
  'https://i.imgur.com/nZnWUc0.jpeg',
  'https://i.imgur.com/O1LUkwy.jpeg',
  'https://i.imgur.com/uDpzwEk.jpeg',
  'https://i.imgur.com/s8WRA2O.jpeg',
  'https://i.imgur.com/5mPmJYO.jpeg',
  'https://i.imgur.com/nCqOV7L.jpeg',
  'https://i.imgur.com/aCDF0yh.jpeg',
  'https://i.imgur.com/M3QKiC5.jpeg',
  'https://i.imgur.com/GwylUgV.jpeg',
  'https://i.imgur.com/imQx3Az.jpeg',
  'https://i.imgur.com/RLnJJyQ.jpeg',
];

export function generateImage(category: typeImg) {
  const position = getRandomInt(0, images.length);
  console.log(category);
  return images[position];
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
