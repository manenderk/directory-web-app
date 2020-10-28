import { Media } from '../app/media.model';

export interface Category {
  id: string;
  number: number;
  name: string;
  description: string;
  image: Media;
  parentCategory: Category;
  active: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
