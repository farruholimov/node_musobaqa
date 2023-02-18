import cors from "cors";
import express, { Express, Router } from 'express';
import errorHandler from "./modules/shared/middlewares/errorHandler"; 
import path from "path"; 

class App {
  public app: Express;

  constructor() {
    this.app = express();
     

    this.initializeMiddlewares(); 
    this.initializeErrorHandling();
  }

  public get getServer() {
    return this.app;
  }

  private initializeMiddlewares() {  
  }
 
  private initializeErrorHandling() {
    this.app.use(errorHandler);
  } 

}

export default App;
