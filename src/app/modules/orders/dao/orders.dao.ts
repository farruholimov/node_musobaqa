import { IOrder, IUpdateOrder } from './../interface/orders.interface';
 
import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 
import { ICreateOrder } from '../interface/orders.interface';

export default class OrdersDAO {
  async create({ 
    user_id,
    master_id,
    calendar_id,
    status
  }: ICreateOrder): Promise<IOrder> {
    return getFirst(
      await KnexService('orders')
        .insert({  
          user_id,
          master_id,
          calendar_id,
          status
        })
        .returning('*'),
    );
  }

  async update(id: string, values: IUpdateOrder): Promise<IOrder> {
    return getFirst(
      await KnexService('orders')
        .update({
          ...values
        })
        .where({id: id})
        .returning('*'),
    );
  }

 async getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('orders') 
      .from('orders')
      .select([
        'orders.master_id',
        'orders.id',
        'orders.user_id',
        'orders.calendar_id',
        'orders.status',
        'users.user_id as users.user_id', 
        'users.full_name as users.full_name', 
        'users.phone as users.phone', 
        'masters.id as masters.id', 
        'masters.address as masters.address',
        'masters.brand_name as masters.brand_name',
        'calendars.id as calendars.id',
        'calendars.start_time as calendars.start_time',
        'calendars.end_time as calendars.end_time',
        'calendars.day as calendars.day'

      ])
      .innerJoin('users', 'users.user_id', 'orders.user_id')
      .innerJoin('masters', 'masters.id', 'orders.master_id')
      .innerJoin('calendar', 'calendar.id', 'orders.calendar_id')
      .limit(limit)
      .offset(offset)
      .orderBy(`orders.${orderBy}`, order)
      .whereILike(`orders.${key}`, `%${keyword}%`)
      .andWhere(filters) 
      .groupBy('orders.id', 'users.user_id', 'masters.id', 'calendars.id')
  }  
}
