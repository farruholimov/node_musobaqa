import extractQuery from '../shared/utils/extractQuery';
import CalendarDAO from './dao/calendar.dao';
import { ICreateCalendar, IUpdateCalendar } from './interface/calendar.interface'; 

 
export default class CalendarsService {
  private calendarsDao = new CalendarDAO();

  create({ 
    start_time,
    end_time, 
    master_id,
    busy,
    day
  }: ICreateCalendar) {

    return this.calendarsDao.create({
      start_time,
      end_time, 
      master_id,
      busy,
      day
    });
  }

  update(id: string, values: IUpdateCalendar) {
    return this.calendarsDao.update(id, values);
  }

  getAll( query) {

    const extractedQuery = extractQuery(query)
    const filters = extractedQuery.filters  
 
    const sorts = extractedQuery.sorts 

    return this.calendarsDao.getAll( filters, sorts);
  } 
 
}