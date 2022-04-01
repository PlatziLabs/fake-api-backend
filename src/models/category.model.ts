import { IDataSetModel } from '@app/data-set';
import { Exclude } from 'class-transformer';
import { typeImg } from './../utils';

export class Category implements IDataSetModel {
  id: number;
  name: string;
  image: string;
  @Exclude()
  keyLoremSpace: typeImg;
}
