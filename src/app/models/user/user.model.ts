export interface User {
  id: string;
  email: string;
  firstName: string;
  middleName?: string;
  lastName?: string;
  password?: string;
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
