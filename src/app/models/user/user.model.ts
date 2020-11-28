export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName?: string;
  password?: string;
  active: boolean;
  role: string;
  createdAt?: Date;
  updatedAt?: Date;
}
