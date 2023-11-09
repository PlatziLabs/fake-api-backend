import { faker } from '@faker-js/faker';

export function generateAvatar() {
  return faker.image.avatar();
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
