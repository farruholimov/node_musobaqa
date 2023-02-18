import { ICreateSection } from './interface/sections.interface';
import SectionsDAO from "./dao/sections.dao";

 
export default class SectionsService {
  private sectionsDao = new SectionsDAO();

 async create({name}: ICreateSection) {

    return await this.sectionsDao.create({
        name
    });
  }

 async update(id: string, values: ICreateSection) {
    return await this.sectionsDao.update(id, values);
  }

  async getAll(key: string, keyword: string, filters, sorts) {
    return await this.sectionsDao.getAll(key, keyword, filters, sorts);
  }  
}