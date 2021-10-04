import { Module } from '@nestjs/common';
import { DataSetService } from './data-set.service';

@Module({
  providers: [DataSetService],
  exports: [DataSetService],
})
export class DataSetModule {}
