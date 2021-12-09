export interface User {
  createdAt?: string;
  modifiedAt?: string;
  userId?: number;
  name: string;
  email: string;
  username: string;
  password?: string;
  roles?: Rol[];
}

export interface Rol {
  createdAt: string;
  modifiedAt?: string;
  roleId: number;
  name: string;
}
