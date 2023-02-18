import { createCalendar } from './app/modules/shared/utils/createCalendar';
import jimi from './bot/bot';
import http from 'http';
import App from './app/server';

const ExpressApp = new App();
console.log(createCalendar('9:30', '18:30', '15'));

const server = http.createServer(ExpressApp.getServer);

// jimi();
// _________LISTEN PORT___________
const port = process.env.PORT || 5000;

server.listen(port, () => console.log('Listening port on ' + port));
