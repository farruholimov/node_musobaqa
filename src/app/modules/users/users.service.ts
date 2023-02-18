import UsersDAO from './dao/users.dao';
import { ICreateUser, IUpdateUser } from './interface/users.interface';

export default class {
  private usersDao = new UsersDAO();

  create({ full_name, email, password, language_id }: ICreateUser) {

    return this.usersDao.create({
      full_name,
      language_id,
      email,
      password,
    });
  }

  update(id: string, values: IUpdateUser) {
    return this.usersDao.update(id, values);
  }

  getAll(key: string, keyword: string, filters, sorts) {
    return this.usersDao.getAll(key, keyword, filters, sorts);
  }

  getByEmail(email: string) {
    return this.usersDao.getByEmail(email);
  }

  getVerifiedByEmail(email: string) {
    return this.usersDao.getVerifiedByEmail(email);
  }

  getUnverifiedByEmail(email: string) {
    return this.usersDao.getUnverifiedByEmail(email);
  }

  getById(id: string) {
    return this.usersDao.getById(id);
  }
  verify(id: string) {
    return this.usersDao.verify(id);
  }
}