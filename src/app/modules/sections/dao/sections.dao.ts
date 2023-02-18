import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateSection, ISection } from '../interface/sections.interface';

export default class SectionsDAO {
  async create({
      name
  }: ICreateSection): Promise<ISection> {
    return getFirst(
      await KnexService('sections')
        .insert({  
          name
        })
        .returning('*'),
    );
  }

  async update(id: string, values: ICreateSection): Promise<ISection> {
    return getFirst(
      await KnexService('sections')
        .update({
          ...values
        })
        .where({id: id})
        .returning('*'),
    );
  }

  async getAll(key: string, keyword: string, filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('sections') 
      .limit(limit)
      .offset(offset)
      .orderBy(`sections.${orderBy}`, order)
      .whereILike(`sections.${key}`, `%${keyword}%`)
      .andWhere(filters) 
  } 
}
