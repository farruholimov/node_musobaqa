import MastersDAO from './dao/masters.dao';
import { ICreateMaster, IUpdateMaster } from './interface/masters.interface';

export default class MastersService {
  private mastersDao = new MastersDAO();

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

    return this.mastersDao.create({
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
    return this.mastersDao.update(id, values);
  }

  getAll(key: string, keyword: string, filters, sorts) {
    return this.mastersDao.getAll(key, keyword, filters, sorts);
  } 

  verifyMaster(id: string) {
    return this.mastersDao.verifyMaster(id);
  } 
}