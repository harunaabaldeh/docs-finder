export interface User {
  username: string;
  email: string;
  token: string;
}

export interface UserFormValues {
  firstName: string;
  lastName: string;
  email: string;
  address: string;
  username: string;
  phoneNumber: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}
