export interface ICreateOrder {
   master_id: string;
   calendar_id: string;
   user_id: string;
   status: number
}

export interface IUpdateOrder {
   master_id?: string;
   calendar_id?: string;
   user_id?: string;
   status?: number
}

export interface IOrder {
   id: string;
   master_id: string;
   calendar_id: string;
   user_id: string;
   status: number
   created_at: Date;
}
