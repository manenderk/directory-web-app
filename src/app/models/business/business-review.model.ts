import { Business } from './business.model';

export interface BusinessReview {
  id: string;
  businessId: Business;
  rating: number;
  title: string;
  comment: string;
  ratedBy: string;
  active: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}
