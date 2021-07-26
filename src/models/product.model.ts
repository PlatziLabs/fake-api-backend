import { Category } from './category.model';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: Category;
  images: string[];
}

export type CreateProductDTO = Omit<Product, 'id'>;
export type UpdateProductDTO = Partial<Product>;

// export interface UpdateProductDTO extends Partial<Product> {
//   categoryId: number;
// }
