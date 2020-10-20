import { ContactPerson } from '../app/contact-person.model';
import { LatLng } from '../app/map/latLng.model';
import { Media } from '../app/media.model';
import { OpeningHours } from '../app/opening-hours.model';
import { Category } from '../category/category.model';

export interface Business {
  id: string;
  name: string;
  category: Category;
  starRating: number;
  owner: ContactPerson[];
  phone: string;
  email: string;
  latLng: LatLng;
  website: string;
  address: string;
  description: string;
  productsAndServices: string[];
  productsAndServicesImages: Media[];
  specialities: string[];
  languagesSpoken: string[];
  openingHours: OpeningHours;
  paymentMethods: Media[];
  team: ContactPerson[];
  thumbnailImage: Media;
  bannerImage: Media;
  images: Media[];
  featured: boolean;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
