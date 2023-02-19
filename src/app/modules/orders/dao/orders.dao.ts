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

 async getAll( filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    console.log(filters)
    return await KnexService('orders') 
      .from('orders')
      .select([
        'orders.master_id',
        'orders.id',
        'orders.user_id',
        'orders.calendar_id',
        'orders.status',
        'orders.is_verified',
        'orders.status',
        'users.user_id as users.user_id', 
        'users.full_name as users.full_name', 
        'users.phone as users.phone', 
        'masters.id', 
        'masters.address as masters.address',
        'masters.brand_name as masters.brand_name',
        'calendars.id as calendars.id',
        'calendars.start_time as calendars.start_time',
        'calendars.end_time as calendars.end_time',
        'calendars.day as calendars.day'

      ])
      .innerJoin('users', 'users.user_id', 'orders.user_id')
      .innerJoin('masters', 'masters.id', 'orders.master_id')
      .innerJoin('calendars', 'calendars.id', 'orders.calendar_id')
      .andWhere(filters) 
      .limit(limit)
      .offset(offset)
      .orderBy(`orders.${orderBy}`, order) 
      .groupBy('orders.id', 'users.user_id', 'masters.id', 'calendars.id')
  } ;


  async getOneByFilter( filters) { 
    console.log(filters)
    return getFirst(
      await KnexService('orders') 
      .from('orders')
      .select([
        'orders.master_id',
        'orders.id',
        'orders.user_id',
        'orders.status',
        'orders.is_verified',
        'orders.calendar_id',
        'orders.status',
        'users.user_id', 
        'users.full_name as full_name', 
        'users.phone as phone', 
        'masters.id', 
        'masters.address as address',
        'masters.brand_name as brand_name',
        'calendars.id',
        'calendars.start_time as start_time',
        'calendars.end_time as end_time',
        'calendars.day as day'

      ])
      .innerJoin('users', 'users.user_id', 'orders.user_id')
      .innerJoin('masters', 'masters.id', 'orders.master_id')
      .innerJoin('calendars', 'calendars.id', 'orders.calendar_id')
      .andWhere(filters)   
      .groupBy('orders.id', 'users.user_id', 'masters.id', 'calendars.id')
    )
  } ;


  async verifyOrder(id: string) {
    return getFirst(
      await KnexService('orders')
      .update({
        is_verified: true
      })
      .where({ id: id})
      .returning("*")
    )
  }
}
