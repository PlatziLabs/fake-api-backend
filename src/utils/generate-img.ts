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
