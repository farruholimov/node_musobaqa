import UserRolesDAO from './dao/user_roles.dao';
import { ICreateUserRole } from './interface/user_roles.interface';

export default class UserRoleService{
  private userRolesDao = new UserRolesDAO();

    create({ user_id, role_id }: ICreateUserRole) {

    return this.userRolesDao.create({
      user_id,
      role_id
    });
  }

  getByUserId(id: string) {
    return this.userRolesDao.getByUserId(id);
  }

  deleteById(id: number) {
    return this.userRolesDao.deleteById(id);
  }

  deleteByUserId(id: string) {
    return this.userRolesDao.deleteByUserId(id);
  }
}