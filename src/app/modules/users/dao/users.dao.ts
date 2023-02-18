import { Knex } from 'knex';
import { isEmpty } from 'lodash';
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateUser, IUpdateUser, IUser } from '../interface/users.interface';

export default class UsersDAO {
  async create({
    full_name,
    email,
    password,
    language_id,
  }: ICreateUser): Promise<IUser> {
    return getFirst(
      await KnexService('users')
        .insert({
          full_name,
          password,
          email,
          language_id,
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

  getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return KnexService('users')
      .select([
        "users.user_id",
        "users.full_name",
        "users.email",
        "users.is_verified",
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

  getByEmail(email: string) {
    return KnexService('users')
      .where({ email: email})
      .first();
  }

  getVerifiedByEmail(email: string) {
    return KnexService('users')
      .where({ email: email, is_verified: true })
      .first();
  }

  getUnverifiedByEmail(email: string) {
    return KnexService('users')
      .where({ email: email, is_verified: false })
      .first();
  }

  verify(id: string) {
    return KnexService('users')
      .update({ is_verified: true })
      .where('user_id', id)
      .returning('*');
  }
}
