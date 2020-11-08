import { Business } from './business.model';

export interface BusinessReview {
  id: string;
  businessId: string;
  rating: number;
  title: string;
  comment: string;
  ratedBy: string;
  active: boolean;
  featured: boolean;
  businessName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
