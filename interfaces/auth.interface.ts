export interface AuthParams {
  email: string;
  password: string;
}

export interface AuthResponse {
  id: number;
  token: string;
}
