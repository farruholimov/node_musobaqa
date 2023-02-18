import UsersDAO from './dao/masters.dao';
import { ICreateMaster, IUpdateMaster } from './interface/masters.interface';

export default class MastersService {
  private usersDao = new UsersDAO();

  create({ brand_name,
    address,
    average_time,
    target,
    start_time,
    end_time,
    is_verified,
    section_id,
    rating,
    user_id }: ICreateMaster) {

    return this.usersDao.create({
      brand_name,
      address,
      average_time,
      target,
      start_time,
      end_time,
      is_verified,
      rating,
      section_id,
      user_id
    });
  }

  update(id: string, values: IUpdateMaster) {
    return this.usersDao.update(id, values);
  }

  getAll(key: string, keyword: string, filters, sorts) {
    return this.usersDao.getAll(key, keyword, filters, sorts);
  } 

  verifyMaster(id: string) {
    return this.usersDao.verifyMaster(id);
  } 
}