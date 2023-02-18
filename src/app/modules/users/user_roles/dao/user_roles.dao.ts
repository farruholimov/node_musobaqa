import { Knex } from 'knex';
import { isEmpty } from 'lodash';
import KnexService from '../../../../database/connection';
import { getFirst } from '../../../shared/utils/utils';
import { ICreateUserRole, IUserRole } from '../interface/user_roles.interface';

export default class UserRolesDAO {
  async create({
    user_id,
    role_id
  }: ICreateUserRole): Promise<IUserRole> {
    return getFirst(
      await KnexService('user_roles')
        .insert({
          user_id,
          role_id
        })
        .returning('*'),
    );
  }

  getByUserId(id: string) {
    return KnexService('user_roles')
      .select("*")
      .where("user_id", id)
  }

  deleteById(id: number) {
    return KnexService('user_roles')
      .where('id', id)
      .delete()
  }

  deleteByUserId(id: string) {
    return KnexService('user_roles')
      .where('user_id', id)
      .delete()
  }
}
