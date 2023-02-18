export interface ICreateUser {
  full_name: string;
  phone: string;  
  latitude: string;
  longitude: string; 
  chat_id: string;
  step: string;
  role_id?: number;
}

export interface IUpdateUser {
  full_name?: string;
  phone?: string;  
  latitude?: string;
  longitude?: string;
  step?: string;
}

export interface IUser {
  user_id: string;
  created_at: Date;
  updated_at: Date;
  full_name: string;
  phone: string;  
  longitude: string;
  latitude: string;
  chat_id: string;
  step: string;
}
