export interface Category {
  id: string;
  name: string;
  description: string;
  thumbnailFile?: File;
  thumbnail: string;
  parentCategoryId: string;
  active: boolean;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}
