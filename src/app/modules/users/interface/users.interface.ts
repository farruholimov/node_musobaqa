export interface ICreateUser {
  full_name: string;
  email: string;
  password: string;
  language_id: number;
}

export interface IUpdateUser {
  full_name?: string;
  email?: string;
  password?: string;
  language_id?: number;
}

export interface IUser {
  user_id: string;
  created_at: Date;
  updated_at: Date;
  full_name: string;
  email: string;
  password: string;
  language_id: number;
  is_active: boolean;
  is_verified: boolean;
}
