import jimi from './bot/bot';
import http from 'http';
import App from "./app/server"; 
import TgBot from './bot/bot';

const ExpressApp = new App()
const Bot = new TgBot()

const server = http.createServer(ExpressApp.getServer);
Bot.runBot()
// _________LISTEN PORT___________
const port = process.env.PORT || 5000

server.listen(port, () => console.log("Listening port on " + port))