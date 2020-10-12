import { LatLng } from './latLng.model';

export interface Marker {
  latLng: LatLng;
  title?: string;
  link?: string;
  iconUrl?: string;
  shadowIconUrl?: string;
}
