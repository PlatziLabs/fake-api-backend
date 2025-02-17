import { faker } from '@faker-js/faker';

export function generateLocation(
  origin: { latitude: number; longitude: number },
  radius: number,
) {
  const [latitude, longitude] = faker.location.nearbyGPSCoordinate({
    origin: [origin.latitude, origin.longitude],
    isMetric: true,
    radius,
  });

  return {
    id: faker.number.int(),
    name: faker.location.streetAddress(),
    description: faker.lorem.sentence(),
    latitude,
    longitude,
  };
}
