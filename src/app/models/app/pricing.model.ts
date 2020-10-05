export interface Pricing {
  id: string;
  name: string;
  price: string;
  features: string[];
  createdAt?: Date;
  modifiedAt?: Date;
}
