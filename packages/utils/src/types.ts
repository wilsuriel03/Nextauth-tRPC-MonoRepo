export type UserType = "admin" | "customer";

export interface Credentials {
  email: string;
  password: string;
  userType: UserType;
}