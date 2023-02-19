export interface ICreateOrder {
   master_id: string;
   calendar_id: string;
   user_id: string;
   status: number;
   is_verified?: Boolean;
}

export interface IUpdateOrder {
   master_id?: string;
   calendar_id?: string;
   user_id?: string;
   is_verified?: Boolean;
   status?: number
}

export interface IOrder {
   id: string;
   master_id: string;
   calendar_id: string;
   user_id: string;
   status: number;
   is_verified?: Boolean;
   created_at: Date;
}
