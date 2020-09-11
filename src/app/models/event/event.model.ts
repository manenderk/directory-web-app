export interface TheEvent {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  date: Date;
  location: string;
  priceRange: string;
  active: boolean;
  featured: boolean;
  order: number;
  created: Date;
  modified: Date;
}
