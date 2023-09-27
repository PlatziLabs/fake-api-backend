import { faker } from '@faker-js/faker';

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

export function generateImage(category: typeImg) {
  const random = getRandomInt(0, 10000);
  const img = faker.image.urlPicsumPhotos({
    width: 640,
    height: 640,
  });
  console.log(category);
  const url = new URL(img);
  url.searchParams.set('r', random.toString());
  return url.toString();
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
