export interface UserPayload {
  email: string;
  sub: number;
  name: string;
  iat?: number;
  exp?: number;
}
