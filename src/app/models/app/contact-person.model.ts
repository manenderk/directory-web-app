import { Media } from './media.model';

export interface ContactPerson {
  id: string;
  image: Media;
  name: string;
  phone: string;
  email: string;
  createdAt?: Date;
  modifiedAt?: Date;
}
