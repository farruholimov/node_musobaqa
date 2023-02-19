import extractQuery from '../shared/utils/extractQuery';
import UsersDAO from '../users/dao/users.dao';
import UsersService from '../users/users.service';
import MastersDAO from './dao/masters.dao';
import { ICreateMaster, ICreateRating, IUpdateMaster } from './interface/masters.interface';

export default class MastersService {
  private mastersDao = new MastersDAO();
  private usersDao = new UsersDAO()

  create({ brand_name,
    address,
    average_time,
    target,
    start_time,
    end_time,
    is_verified,
    section_id, 
    user_id }: ICreateMaster) {

    return this.mastersDao.create({
      brand_name,
      address,
      average_time,
      target,
      start_time,
      end_time,
      is_verified, 
      section_id,
      user_id
    });
  }

  update(user_id: string, values: IUpdateMaster) {
    return this.mastersDao.update(user_id, values);
  }

  deleteMasterByUserId(user_id: string) {
    return this.mastersDao.deleteMasterByUser(user_id);
  }

  getAll (search?, query?) {
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 


    return this.mastersDao.getAll(search, filters, sorts);
  } 

  async getByChatId (chat_id) { 
    const user = await this.usersDao.getByChatId(chat_id)

    return this.mastersDao.getByUserId(user.user_id)
  } 

  verifyMaster(id: string) {
    return this.mastersDao.verifyMaster(id);
  } 

  createRating({ 
    master_id,
    rating,
    comment,
    user_id 
  }: ICreateRating) {

    return this.mastersDao.createRating({
      master_id,
      rating,
      comment,
      user_id 
    });
  }

  getAllRatings(filters) { 
 
    return this.mastersDao.getAllRatings(filters);
  } 
}



