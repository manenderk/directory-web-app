import { Media } from './media.model';

export interface HomeSlider {
  id: string;
  link: string;
  active: boolean;
  image: Media;
  createdAt?: Date;
  modifiedAt?: Date;
}
