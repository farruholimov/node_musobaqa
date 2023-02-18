import {
    Bot,
    session,
    GrammyError,
    HttpError,
} from 'grammy'
import {Router} from '@grammyjs/router'
import { bot as botConfig } from '../config/conf'
import MessagesController from './controllers/sendMsg';
import UsersController from './controllers/users.controller';
import BrandsController from './controllers/brands.controller';
import UsersService from '../app/modules/users/users.service';
import messages from './assets/messages';

const bot = new Bot(botConfig.token);

export default class TgBot {
    private userService = new UsersService()
    private sendMsg = new MessagesController()
    private usersController = new UsersController()
    private brandsController = new BrandsController()
    private router = new Router((ctx) => ctx.session.step)

    public async runBot(){
        try {
            bot.use(session({
                initial: () => ({
                    user_id: null,
                    chat_id: null,
                    step: "idle",
                    master_data: {
                        brand_name: null,
                        address: null,
                        avarage_time: null,
                        target: null,
                        start_time: null,
                        end_time: null,
                        is_verified: null,
                        section_id: null
                    },
                    user_data: {
                        full_name: null,
                        phone: null,
                    },
                    messages_to_delete: [],
                    editing_item: {
                        item_id: null,
                        message_id: null,
                        message_type: "text",
                        message_content: "",
                    }
                })
            }))
    
            await bot.api.setMyCommands([{
                command: "start",
                description: "Start the bot"
            }]);
    
            bot.command("start", async (ctx, next) => {
                const chat_id = String(ctx.msg.chat.id)
        
                let user = await this.userService.getByChatId(chat_id)
                
                if (!user) {
                    user = await this.userService.registerUser({
                        chat_id: chat_id,
                        role_id: 3,
                        step: "section"
                    })
                    ctx.session.chat_id = chat_id
                    ctx.session.user_id = user.id
                    ctx.session.step = "section"

                    await this.sendMsg.sendSections(ctx)
                    return
                }
        
                ctx.session.user = {
                    chat_id,
                    user_id: user.id,
                    name: user.full_name,
                    phone: user.phone_number,
                }
        
                ctx.session.step = user.step
        
                if (user.step == "idle") {
                    await this.brandsController.sendMainMenu(ctx)
                }
                else {
                    next()
                }
            })

            bot.catch((err) => {
                const ctx = err.ctx;
                console.error(`Error while handling update ${ctx.update.update_id}:`);
                const e = err.error;
                if (e instanceof GrammyError) {
                    console.error("Error in request:", e.description);
                } else if (e instanceof HttpError) {
                    console.error("Could not contact Telegram:", e);
                } else {
                    console.error("Unknown error:", e);
                }
            });
        
            bot.use(this.router)
            bot.start()
        } catch (error) {
            console.log(error);
        }
    }
}