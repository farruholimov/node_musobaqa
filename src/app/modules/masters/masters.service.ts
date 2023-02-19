import extractQuery from '../shared/utils/extractQuery';
import UsersDAO from '../users/dao/users.dao';
import UsersService from '../users/users.service';
import MastersDAO from './dao/masters.dao';
import { ICreateMaster, ICreateRating, IUpdateMaster } from './interface/masters.interface';

export default class MastersService {
  private mastersDao = new MastersDAO();
  private usersDao = new UsersDAO()

  async create({ brand_name,
    address,
    average_time,
    target,
    start_time,
    end_time,
    is_verified,
    section_id, 
    user_id }: ICreateMaster) {

    return await this.mastersDao.create({
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

 async update(user_id: string, values: IUpdateMaster) {
    return await this.mastersDao.update(user_id, values);
  }

  async deleteMasterByUserId(user_id: string) {
    return await this.mastersDao.deleteMasterByUser(user_id);
  }

  async getAll (query?, search?) {
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 


    let jimi = await this.mastersDao.getAll(filters, sorts, search);

    return jimi
    
  } 

  async getByChatId (chat_id) { 
    const user = await this.usersDao.getByChatId(chat_id)

    return await this.mastersDao.getByUserId(user.user_id)
  } 

  async getById (id) { 
    return await this.mastersDao.getById(id)
  } 

  async verifyMaster(id: string) {
    return await this.mastersDao.verifyMaster(id);
  } 

  async createRating({ 
    master_id,
    rating,
    comment,
    user_id 
  }: ICreateRating) {

    return await this.mastersDao.createRating({
      master_id,
      rating,
      comment,
      user_id 
    });
  }

  async getAllRatings(filters) { 
 
    return await this.mastersDao.getAllRatings(filters);
  } 
}



