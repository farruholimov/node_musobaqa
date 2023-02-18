import jimi from './bot/bot';
import http from 'http';
import App from "./app/server"; 

const ExpressApp = new App()

const server = http.createServer(ExpressApp.getServer);

jimi()
// _________LISTEN PORT___________
const port = process.env.PORT || 5000

server.listen(port, () => console.log("Listening port on " + port))