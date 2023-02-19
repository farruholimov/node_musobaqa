import extractQuery from '../shared/utils/extractQuery';
import CalendarDAO from './dao/calendar.dao';
import {
    ICreateCalendar,
    IUpdateCalendar,
} from './interface/calendar.interface';

export default class CalendarsService {
    private calendarsDao = new CalendarDAO();
 
    async create({
        start_time,
        end_time,
        master_id,
        busy,
        day,
    }: ICreateCalendar) {
        return await this.calendarsDao.create({
            start_time,
            end_time,
            master_id,
            busy,
            day,
        });
    }

    async update(id: string, values: IUpdateCalendar) {
        return await this.calendarsDao.update(id, values);
    }

    async getAll(query?) {
        const extractedQuery = extractQuery(query);
        const filters = extractedQuery.filters;

        const sorts = extractedQuery.sorts;

        return {
            times: await this.calendarsDao.getAll(filters, sorts),
            count: await this.calendarsDao.getCount(filters)

        }
    }
}
