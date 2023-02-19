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

  async getAll() { 
    return await KnexService('sections')   
  } 
}
