import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, IUpdateUser, IUser } from '../interface/users.interface';

export default class UsersDAO {
  async create({
    full_name,
    longitude,
    latitude,
    phone
  }: ICreateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .insert({
          full_name,
          longitude,
          latitude,
          phone
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

  getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return KnexService('users')
      .select([
        "users.user_id",
        "users.full_name",
        "users.phone", 
        "users.longitude", 
        "users.latitude", 
        "users.created_at",
        "name as role",
      ])
      .innerJoin(function(){
        this.select(["user_roles.id", "user_roles.user_id", "role_id", "name"])
        .from("user_roles")
        .as("user_roles")
        .leftJoin({role: "roles"}, {"user_roles.role_id": "role.id"})
        .whereNot("role_id", 1)
        .groupBy("user_roles.id", "role.id")
      }, {"users.user_id": "user_roles.user_id"})
      .limit(limit)
      .offset(offset)
      .orderBy(`users.${orderBy}`, order)
      .whereILike(`users.${key}`, `%${keyword}%`)
      .andWhere(filters)
      .groupBy("users.user_id", "user_roles.id", "user_roles.user_id", "name")
  }

  getById(id: string) {
    return KnexService('users')
      .where({ user_id: id})
      .first();
  }

  getByPhone(phone: string) {
    return KnexService('users')
      .where({ phone: phone})
      .first();
  } 

  getByChatId(chat_id: string) {
    return KnexService('users')
      .where({ chat_id: chat_id})
      .first();
  } 
}
