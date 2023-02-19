import  CalendarsService  from './../calendars/calendar.service';
import { ICreateOrder, IUpdateOrder } from './interface/orders.interface';
 
import OrdersDAO from './dao/orders.dao'; 
import extractQuery from '../shared/utils/extractQuery';

 
export default class OrdersService {
  private ordersDao = new OrdersDAO();
  private calendarsService = new CalendarsService()

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

  async getAll(query?) { 
    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters 
 
    const sorts = extractedQuery.sorts 

    return await this.ordersDao.getAll(filters, sorts);
  };

  async getOneByFilter(filters) {  

    return await this.ordersDao.getOneByFilter(filters);
  };


  async verifyOrder(id: string) {
    let order = await this.ordersDao.verifyOrder(id); 

    await this.calendarsService.update(order.id, {
      busy: true
    });

    return order
  } 
  
}