import { Controller, Get, Query } from '@nestjs/common';
import { GenerateLocationsDto } from '@dtos/location.dto';

import { LocationsService } from '@services/locations.service';

@Controller('locations')
export class LocationsController {
  constructor(private locationsService: LocationsService) {}

  @Get()
  getAll(@Query() params: GenerateLocationsDto) {
    return this.locationsService.generateLocations(params);
  }
}
