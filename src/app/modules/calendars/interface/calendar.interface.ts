export interface ICreateCalendar {
   master_id: string;
   day: Date;
   start_time: Date;
   end_time: Date;
   busy?: Boolean;
}

export interface IUpdateCalendar {
   master_id?: string;
   day?: Date;
   start_time?: Date;
   end_time?: Date;
   busy?: Boolean;
}

export interface ICalendar {
   id: string;
   master_id: string;
   day: Date;
   start_time: Date;
   end_time: Date;
   busy: Boolean;
   created_at: Date;
}
