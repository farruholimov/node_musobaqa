import { ICreateSection } from './interface/sections.interface';
import SectionsDAO from "./dao/sections.dao";

 
export default class SectionsService {
  private sectionsDao = new SectionsDAO();

  create({name}: ICreateSection) {

    return this.sectionsDao.create({
        name
    });
  }

  update(id: string, values: ICreateSection) {
    return this.sectionsDao.update(id, values);
  }

  getAll(key: string, keyword: string, filters, sorts) {
    return this.sectionsDao.getAll(key, keyword, filters, sorts);
  }  
}