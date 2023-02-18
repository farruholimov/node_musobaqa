import { ICreateOrder, IUpdateOrder } from './interface/orders.interface';
 
import OrdersDAO from './dao/orders.dao'; 
import extractQuery from '../shared/utils/extractQuery';

 
export default class OrdersService {
  private ordersDao = new OrdersDAO();

  create({ 
    user_id,
    master_id,
    calendar_id,
    status
  }: ICreateOrder) {

    return this.ordersDao.create({
      user_id,
      master_id,
      calendar_id,
      status
    });
  }

  update(id: string, values: IUpdateOrder) {
    return this.ordersDao.update(id, values);
  }

  getAll(key: string, keyword: string, query) {

    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 

    return this.ordersDao.getAll(key, keyword, filters, sorts);
  } 
 
}