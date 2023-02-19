import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, IUpdateUser, IUser } from '../interface/users.interface';

export default class UsersDAO {
  async create({
    full_name,
    longitude,
    latitude,
    chat_id,
    step,
    phone,
    role_id
  }: ICreateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .insert({
          full_name,
          longitude,
          latitude,
          chat_id,
          step,
          phone,
          role_id
        })
        .returning('*'),
    );
  }

  async update(id: string, values: IUpdateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .update({
          ...values
        })
        .where({user_id: id})
        .returning('*'),
    );
  }

  async updateByChatId(id: string, values: IUpdateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .update({
          ...values
        })
        .where({chat_id: id})
        .returning('*'),
    );
  }

 async  getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('users')
      .select([
        "users.user_id",
        "users.full_name",
        "users.phone", 
        "users.longitude", 
        "users.latitude", 
        "users.created_at",
        "users.role_id", 
      ]) 
      .limit(limit)
      .offset(offset)
      .orderBy(`users.${orderBy}`, order)
      .whereILike(`users.${key}`, `%${keyword}%`)
      .andWhere(filters) 
  }

  async getById(id: string) {
    return  await KnexService('users')
      .where({ user_id: id})
      .first();
  }

  async getByPhone(phone: string) {
    return await KnexService('users')
      .where({ phone: phone})
      .first();
  } 

  async getByChatId(chat_id: string) {
    return await KnexService('users') 
      .select([
        "users.user_id",
        "users.full_name",
        "users.phone", 
        "users.step", 
        "users.longitude", 
        "users.latitude", 
        "users.created_at",
        "users.role_id",
        'master.id as master_id'
      ])
      .leftJoin({master: "masters"}, {"users.user_id": "master.id"})
      .groupBy('users.user_id', 'master.id')
      .where({ chat_id: chat_id}) 
      .first();
  } 
}
