export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  role?: boolean;
}
export interface UpdateUserDto extends CreateUserDto {}
