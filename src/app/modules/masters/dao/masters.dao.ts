import { ICreateRating } from './../interface/masters.interface';
import { Knex } from 'knex'; 
import KnexService from '../../../database/connection';
import { getFirst } from '../../shared/utils/utils';
import { ICreateMaster, IUpdateMaster, IMaster } from '../interface/masters.interface';

export default class MastersDAO {
  async create({
    brand_name,
    address,
    average_time,
    target,
    start_time,
    end_time,
    is_verified,
    section_id,
    user_id, 
  }: ICreateMaster): Promise<IMaster> {
    return getFirst(
      await KnexService('masters')
        .insert({  
        brand_name,
        address,
        average_time,
        target,
        start_time,
        end_time,
        is_verified,
        section_id,
        user_id, 
        })
        .returning('*'),
    );
  }

  async update(id: string, values: IUpdateMaster): Promise<IMaster> {
    return getFirst(
      await KnexService('masters')
        .update({
          ...values
        })
        .where({user_id: id})
        .returning('*'),
    );
  }

  async getAll( filters, sorts) {
    const {limit, offset, order, orderBy} = sorts
    return await KnexService('masters')
      .select([
        'masters.id',
        'masters.brand_name',
        'masters.address',
        'masters.average_time',
        'masters.target',
        'masters.start_time',
        'masters.end_time',
        'masters.is_verified',
        'masters.section_id',
        'masters.user_id',
        'users.user_id', 
        'users.full_name as full_name', 
        'users.phone as phone', 
      ])
      .leftJoin('users', 'users.user_id', 'masters.user_id')
      .leftJoin('ratings', 'masters.id', 'ratings.master_id')
      .avg('ratings.rating as rating') 
      .groupBy('masters.id', 'users.user_id')
      .limit(limit)
      .offset(offset)
      .orderBy(`masters.${orderBy}`, order) 
      .andWhere(filters) 
  }

  async getByUserId(user_id) { 
    return getFirst(
      await KnexService('masters')
      .select([
        'masters.id',
        'masters.brand_name',
        'masters.address',
        'masters.average_time',
        'masters.target',
        'masters.start_time',
        'masters.end_time',
        'masters.is_verified',
        'masters.section_id',
        'masters.user_id',
        'users.user_id', 
        'users.full_name as full_name', 
        'users.phone as phone', 
      ])
      .leftJoin('users', 'users.user_id', 'masters.user_id')
      .leftJoin('ratings', 'masters.id', 'ratings.master_id')
      .avg('ratings.rating as rating')
      .where({
        'masters.user_id': user_id
      })
      .groupBy('masters.id', 'users.user_id')

    )
  }

  async getById(id) { 
    return getFirst(
      await KnexService('masters')
      .select([
        'masters.id',
        'masters.brand_name',
        'masters.address',
        'masters.average_time',
        'masters.target',
        'masters.start_time',
        'masters.end_time',
        'masters.is_verified',
        'masters.section_id',
        'masters.user_id',
        'users.user_id', 
        'users.full_name as full_name', 
        'users.phone as phone', 
      ])
      .leftJoin('users', 'users.user_id', 'masters.user_id')
      .leftJoin('ratings', 'masters.id', 'ratings.master_id')
      .avg('ratings.rating as rating')
      .where({
        'masters.id': id
      })
      .groupBy('masters.id', 'users.user_id')

    )
  }

  async verifyMaster(id: string) {
    return await KnexService('masters')
      .update({
        is_verified: true
      })
      .where({ id: id}) 
  }

  async deleteMasterByUser(id: string) {
    return await KnexService('masters')
      .del()
      .where({ user_id: id}) 
  }

  async createRating({
    master_id,
    rating,
    comment,
    user_id, 
  }: ICreateRating) {
    return getFirst(
      await KnexService('ratings')
        .insert({  
            master_id,
            rating,
            comment,
            user_id, 
        })
        .returning('*'),
    );
  }

 async getAllRatings(filters) { 
    return await KnexService('ratings')   
    .andWhere(filters)
  }
}
