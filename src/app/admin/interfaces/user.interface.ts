export interface User {
  createdAt?: string;
  modifiedAt?: string;
  userId?: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  roles?: Role[];
}

export interface Role {
  createdAt: string;
  modifiedAt?: string;
  roleId: number;
  name: string;
}
