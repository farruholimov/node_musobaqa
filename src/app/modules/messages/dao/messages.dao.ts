import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateMessage,IMessage,IUpdateMessage } from '../interface/messages.interface';

export default class MessagesDAO {
  async create({
    chat_id,comment
  }: ICreateMessage): Promise<IMessage> {
    return getFirst(
      await KnexService('messages')
        .insert({
            chat_id,comment
        })
        .returning('*'),
    );
  }

  async update(id: string, values: IUpdateMessage): Promise<IMessage> {
    return getFirst(
      await KnexService('messages')
        .update({
          ...values
        })
        .where({id: id})
        .returning('*'),
    );
  }

 async  getAll(filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('messages')
      .limit(limit)
      .offset(offset)
      .orderBy(`messages.${orderBy}`, order)
      .andWhere(filters) 
  }

  async getById(id: string) {
    return  await KnexService('messages')
      .where({ id: id})
      .first();
  }
}
