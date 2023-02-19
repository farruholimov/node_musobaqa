import { ICreateMessage, IUpdateMessage } from './interface/messages.interface';
import extractQuery from '../shared/utils/extractQuery';
import MessagesDAO from './dao/messages.dao';

export default class UsersService {
  private messageDao = new MessagesDAO();



  async createMessage({ chat_id,comment }: ICreateMessage) {

    const message = await this.getById(chat_id);
    
    if(message) {
      return message;
    }

    const new_message = await this.messageDao.create({
      chat_id,comment
    }); 

    return new_message
  }

  async update(id: string, values: IUpdateMessage) {
    return await this.messageDao.update(id, values);
  }

  async getAll(query?) {
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 


    return await this.messageDao.getAll( filters, sorts);
  }

  async getById(id: string) {
    return this.messageDao.getById(id);
  }
}