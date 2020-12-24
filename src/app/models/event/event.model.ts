import { ContactPerson } from '../app/contact-person.model';
import { LatLng } from '../app/map/latLng.model';
import { Media } from '../app/media.model';
import { Pricing } from '../app/pricing.model';
import { SocialShare } from '../app/social-share.model';

export interface TheEvent {
  id: string;
  number: number;
  name: string;
  date: Date;
  time: Date;
  location: string;
  priceRange: string;
  description: string;
  thumbnailImage: Media;
  bannerImage: Media;
  featured: boolean;
  active: boolean;
  order: number;
  socialLinks: SocialShare[];
  eventImages: Media[];
  presentedBy: Media[];
  inAssociationWith: Media[];
  sponsors: Media[];
  pricings: Pricing[];
  ticketsLocations: string[];
  contacts: ContactPerson[];
  createdAt?: Date;
  updatedAt?: Date;
  latLng: LatLng;
}
