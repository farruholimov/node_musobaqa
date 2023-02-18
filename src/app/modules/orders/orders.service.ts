import { ICreateOrder, IUpdateOrder } from './interface/orders.interface';
 
import OrdersDAO from './dao/orders.dao'; 
import extractQuery from '../shared/utils/extractQuery';

 
export default class OrdersService {
  private ordersDao = new OrdersDAO();

async create({ 
    user_id,
    master_id,
    calendar_id,
    status
  }: ICreateOrder) {

    return await this.ordersDao.create({
      user_id,
      master_id,
      calendar_id,
      status
    });
  }

  async update(id: string, values: IUpdateOrder) {
    return await this.ordersDao.update(id, values);
  }

  async getAll(key: string, keyword: string, query) {

    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 

    return await this.ordersDao.getAll(key, keyword, filters, sorts);
  } 
 
}