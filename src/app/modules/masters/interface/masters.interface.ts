export interface ICreateMaster {
   brand_name: string;
   address: string;
   average_time: string;
   target: string;
   start_time: string;
   end_time: string;
   is_verified?: Boolean;
   section_id: string;
   user_id?: string; 
}

export interface IUpdateMaster {
   brand_name?: string;
   address?: string;
   average_time?: string;
   target?: string;
   start_time?: string;
   end_time?: string;
   is_verified?: Boolean;
   section_id?: string;
   user_id?: string; 
}

export interface IMaster {
   id: string;
   brand_name: string;
   address: string;
   average_time: string;
   target: string;
   start_time: string;
   end_time: string;
   is_verified: Boolean;
   section_id: string;
   user_id: string;
   created_at: Date;
   updated_at: Date; 
}

export interface ICreateRating {
   master_id: string;
   user_id: string;
   rating: number;
   comment: string;
}
