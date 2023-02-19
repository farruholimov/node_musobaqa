export interface ICreateMessage {
    chat_id: string;
    comment: string;
  }
  
  export interface IUpdateMessage {
    chat_id: string;
    comment: string;
  
  }
  
  export interface IMessage {
    id: string,
    chat_id: string;
    comment: string;
    created_at: Date;
  }