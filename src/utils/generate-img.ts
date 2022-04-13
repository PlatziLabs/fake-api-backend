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
    return `https://api.lorem.space/image?w=640&h=480&r=${random}`;
  }
  return `https://api.lorem.space/image/${typeImg}?w=640&h=480&r=${random}`;
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
