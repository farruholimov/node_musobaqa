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
   rating?: Number;
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
   rating?: Number;
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
   rating?: Number;
}
