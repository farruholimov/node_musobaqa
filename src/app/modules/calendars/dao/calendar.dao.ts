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

 async  getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('calendars') 
      .limit(limit)
      .offset(offset)
      .orderBy(`calendars.${orderBy}`, order)
      .whereILike(`calendars.${key}`, `%${keyword}%`)
      .andWhere(filters) 
  } 
 
}
