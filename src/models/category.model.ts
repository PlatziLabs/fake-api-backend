import { CreateCategoryDto } from '../dto/category.dto';
import { IDataSetModel } from '@app/data-set';

export interface Category extends IDataSetModel {
  name: string;
  image: string;
}
