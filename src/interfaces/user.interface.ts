export interface CreateUserDto {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  phone: string;
  role?: boolean;
}

