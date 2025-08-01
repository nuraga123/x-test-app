import { Types } from "mongoose";

export type UserRoleType = "admin" | "courier" | "user";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRoleType;
}

export type LoginFormValues = {
  name: string;
  password: string;
  remember?: boolean;
};

export type VerifyTokenResponse =
  | {
      errorMessage: string;
    }
  | {
      valid: boolean;
      id: Types.ObjectId;
      name: string;
      role: UserRoleType;
    };
