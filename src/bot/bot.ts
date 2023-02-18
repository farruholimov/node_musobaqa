import {
    Bot,
    session,
    GrammyError,
    HttpError,
} from 'grammy'
import {Router} from '@grammyjs/router'
import { bot as botConfig } from '../config/conf'
import MenuMessagesController from './controllers/menuMessages';
import UsersController from './controllers/users.controller';

const bot = new Bot(botConfig.token);

export default class TgBot {
    private userService = new UserService()
    private menusController = new MenuMessagesController()
    private usersController = new UsersController()

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
                const chat_id = ctx.msg.chat.id
        
                let user = await this.userService.findByTelegramID(chat_id)
        
                if (!user) {
                    user = await this.userService.create({
                        chat_id: chat_id,
                        role: 3,
                        step: "section"
                    })
                    ctx.session.chat_id = chat_id
                    ctx.session.user_id = user.id
                    ctx.session.step = "section"
                    await this.menusController.sendSections(ctx)
                    return
                } else if (user) {
        
                    if (!user.full_name) {
                        await this.usersController.updateStep(ctx, "name")
                        await  this.menusController.askFullName(ctx)
                        return
                    }
                    if (!user.phone) {
                        await this.usersController.updateStep(ctx, "phone")
                        await  this.menusController.askFullName(ctx)
                        return
                    }
                }
        
                ctx.session.user = {
                    tgid: chat_id,
                    id: user.id,
                    name: user.full_name,
                    lang: user.language_code,
                    phone: user.phone_number,
                }
        
                ctx.session.step = user.step
        
                if (user.step == "menu") {
                    await sendMenu(ctx)
                }
                else if (user.step == "order") {
                    await ctx.reply(messages[user.language_code].orderingMsg)
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
        
            bot.use(router)
            bot.start()
        } catch (error) {
            console.log(error);
        }
    }
}