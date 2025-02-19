import { Injectable } from '@nestjs/common';
import { faker } from '@faker-js/faker';

import { generateLocation } from '@utils/location';
import { GenerateLocationsDto } from '@dtos/location.dto';

@Injectable()
export class LocationsService {
  generateLocations(params: GenerateLocationsDto) {
    const { origin, radius, size } = params;

    const [latitude, longitude] = origin.split(',');

    const latLng = {
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    };

    const generatorFn = () => generateLocation(latLng, radius);
    return faker.helpers.multiple(generatorFn, {
      count: size,
    });
  }
}
