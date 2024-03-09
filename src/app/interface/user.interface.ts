export type User = {
  password: string;
  name: string;
  email: string;
};
export type UserResponse = {
  name: string;
  email: string;
  accessToken?: string;
};
