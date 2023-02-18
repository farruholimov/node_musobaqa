import { IsEmail, IsString, MinLength } from "class-validator";
import { IUpdateUser } from "../interface/users.interface";

export interface ICreateUser {
  full_name: string;
  email: string;
  password: string;
  language_id: number;
}

export class UpdateUserDTO implements IUpdateUser {
  @IsString({message: "Full name must be string"})
  @MinLength(5, {message: "Full name length must be at least 5"})
  full_name?: string;

  @IsEmail({message: "Invalid email"})
  email?: string;

  @IsString({message: "Password must be string"})
  @MinLength(6, {message: "Password length must be at least 6"})
  password?: string;
}

export interface IUser {
  id: string;
  created_at: Date;
  updated_at: Date;
  full_name: string;
  email: string;
  password: string;
  language_id: number;
  is_active: boolean;
}
