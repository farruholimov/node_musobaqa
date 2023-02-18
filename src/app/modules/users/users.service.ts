import { ICreateMaster } from './../masters/interface/masters.interface';
import MastersService from '../masters/masters.service';
import UsersDAO from './dao/users.dao';
import { ICreateUser, IUpdateUser } from './interface/users.interface';
import ErrorResponse from '../shared/utils/errorResponse'; 
import extractQuery from '../shared/utils/extractQuery';

export default class UsersService {
  private usersDao = new UsersDAO();
  private mastersService = new MastersService(); 
  async registerUser({ full_name, phone, latitude, longitude, chat_id, step, role_id }: ICreateUser) {

    const user = await this.getByChatId(chat_id);
    
    if(user) {
      return user;
    }

    const new_user = await this.usersDao.create({
      full_name,
      longitude,
      phone,
      latitude,
      chat_id,
      step, 
      role_id
    }); 

    return new_user
  }

  async update(id: string, values: IUpdateUser) {
    return await this.usersDao.update(id, values);
  }

  async getAll(key: string, keyword: string, query) {
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 


    return await this.usersDao.getAll(key, keyword, filters, sorts);
  }

  async getByPhone(phone: string) {
    return await this.usersDao.getByPhone(phone);
  } 

  async getByChatId(chatId: string) {
    const user = await this.usersDao.getByChatId(chatId); 

    // const myRatings = await this.mastersService.getAllRatings({
    //   master_id: user['master_id']
    // });

    // const totalRating = myRatings.reduce((accumulator, currentValue) => {
    //   return accumulator + currentValue.rating;
    // }, 0);

    // const averageRating = totalRating / myRatings.length;

    return user
  } 

  async getById(id: string) {
    return this.usersDao.getById(id);
  } 

  async registerMaster(data) {
      const { full_name, phone, latitude, longitude, chat_id, step, role_id }: ICreateUser = data;
      const { brand_name,  address, average_time, target, start_time, end_time,  section_id }: ICreateMaster = data;

      const user = await this.getByPhone(phone);

      if(user) throw new ErrorResponse(400, 'User already exists!');

      const new_user = await this.registerUser({full_name, phone, latitude, longitude, chat_id, step, role_id});

      const master = await this.mastersService.create({
        brand_name,  address, average_time, target, start_time, end_time, section_id, user_id: new_user.user_id
      })
 
      return {
        ...new_user,
        master
      }

  }

  async updateByChatId(chatId: string, values: IUpdateUser) {
    return this.usersDao.update(chatId, values);
  }
}