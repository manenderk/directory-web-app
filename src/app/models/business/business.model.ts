export interface Business {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  shortAddress: string;
  categoryIds: string[];
  reviews: number;
  rating: number;
}
