import { ICreateCalendar, ICalendar, IUpdateCalendar } from '../interface/calendar.interface';
import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils'; 

export default class CalendarDAO {
  async create({ 
    start_time,
    end_time, 
    master_id,
    busy,
    day
  }: ICreateCalendar): Promise<ICalendar> {
    return getFirst(
      await KnexService('calendars')
        .insert({  
          start_time,
          end_time, 
          master_id,
          busy,
          day
        })
        .returning('*'),
    );
  }

  async update(id: string, values: IUpdateCalendar): Promise<ICalendar> {
    return getFirst(
      await KnexService('calendars')
        .update({
          ...values
        })
        .where({id: id})
        .returning('*'),
    );
  }

 async getAll( filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('calendars') 
      .limit(8)
      .offset(offset)
      .orderBy(`calendars.created_at`, 'asc') 
      .andWhere(filters) 
  } 

  async getOne(filters) { 
    return getFirst(await KnexService('calendars')  
    .where(filters)) 
  } 


  async getCount(filters) { 
    return await KnexService('calendars')    
      .andWhere(filters) 
      .count('*')
  } 
 
}
