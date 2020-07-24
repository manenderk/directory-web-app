export interface Category {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  active: boolean;
  featured: boolean;
  order: number;
  created: Date;
  modified: Date;
}
