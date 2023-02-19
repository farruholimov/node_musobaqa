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

  async getAll( ) {
    return await this.sectionsDao.getAll( );
  }  
}