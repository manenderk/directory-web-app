import { ContactPerson } from '../app/contact-person.model';
import { Media } from '../app/media.model';
import { Pricing } from '../app/pricing.model';

export interface TheEvent {
  id: string;
  name: string;
  date: Date;
  time: Date;
  location: string;
  description: string;
  thumbnailImage: Media;
  bannerImage: Media;
  featured: boolean;
  active: boolean;
  order: number;
  socialLinks: string[];
  eventImages: Media[];
  presentedBy: Media[];
  inAssociationWith: Media[];
  sponsors: Media[];
  pricings: Pricing[];
  ticketsLocations: string[];
  contacts: ContactPerson[];
  createdAt?: Date;
  updatedAt?: Date;
}
