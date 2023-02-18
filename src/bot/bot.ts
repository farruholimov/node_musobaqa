import {
    Bot,
    session,
    GrammyError,
    HttpError,
} from 'grammy'
import {
    Router
} from '@grammyjs/router'
import parseUrl from "url-parse"

import {
    bot as botConfig
} from '../config/conf'

import MessagesController from './controllers/sendMsg';
import UsersController from './controllers/users.controller';
import BrandsController from './controllers/brands.controller';

import UsersService from '../app/modules/users/users.service';
import MastersService from '../app/modules/masters/masters.service';

import messages from './assets/messages';
import InlineKeyboards from "./assets/inline_keyboard"

const bot = new Bot(botConfig.token);

export default class TgBot {
    private userService = new UsersService()
    private masterService = new MastersService()

    private sendMsg = new MessagesController()
    private usersController = new UsersController()
    private brandsController = new BrandsController()

    private router = new Router((ctx) => ctx.session.step)

    public async runBot() {
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
                    role_id: null
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
            } else {
                next()
            }
        })

        this.router.route("name", async (ctx) => {
            try {
                await this.usersController.setFullName(ctx, ctx.msg.text)
                await this.sendMsg.askPhone(ctx)
                await this.usersController.updateStep(ctx, "phone")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("phone", async (ctx) => {
            try {
                await this.usersController.setPhone(ctx, ctx.msg.contact ? ctx.msg.contact.phone_number : ctx.msg.text)
                await this.sendMsg.askBrandName(ctx)
                await this.usersController.updateStep(ctx, "brand_name")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("brand_name", async (ctx) => {
            try {
                await this.usersController.setPhone(ctx, ctx.msg.text)
                await this.sendMsg.askBrandName(ctx)
                await this.usersController.updateStep(ctx, "brand_name")
            } catch (error) {
                console.log(error);
            }
        })

        bot.on("callback_query:data", async (ctx) => {

            const {
                pathname: command,
                query
            } = parseUrl(ctx.callbackQuery.data, true)

            switch (command) {
                case "set_user_role":
                    try {
                        await this.usersController.setUserRole(ctx, query.role)
                        await this.sendMsg.askFullName(ctx)
                        await this.usersController.updateStep(ctx, "name")
                    } catch (error) {
                        console.log(error);
                    }
                    break;

                default:
                    break;
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
    }
}