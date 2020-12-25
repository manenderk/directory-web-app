import { Media } from '../app/media.model';

export interface News {
  id: string;
  number: number;
  title: string;
  thumbnailImage: Media;
  bannerImage: Media;
  body: string;
  views: number;
  active: boolean;
  featured: boolean;
  order: number;
  createdAt?: Date;
  updatedAt?: Date;
}
