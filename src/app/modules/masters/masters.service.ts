import extractQuery from '../shared/utils/extractQuery';
import MastersDAO from './dao/masters.dao';
import { ICreateMaster, ICreateRating, IUpdateMaster } from './interface/masters.interface';

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

  getAll (query) {
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 


    return this.mastersDao.getAll( filters, sorts);
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