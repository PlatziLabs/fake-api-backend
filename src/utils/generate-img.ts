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

export function generateImage(typeImg: typeImg) {
  const random = getRandomInt(0, 10000);
  if (typeImg === 'random') {
    return `https://picsum.photos/640/640?r=${random}`;
  }
  return `https://picsum.photos/640/640?r=${random}`;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
