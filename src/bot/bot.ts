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

import MessagesController from './controllers/msg.controller';
import UsersController from './controllers/users.controller';
import MastersController from './controllers/masters.controller';
import OrdersController from './controllers/orders.controller';

import UsersService from '../app/modules/users/users.service';
import MastersService from '../app/modules/masters/masters.service';

import messages from './assets/messages';
import InlineKeyboards from "./assets/inline_keyboard"

const bot = new Bot(botConfig.token);

export default class TgBot {
    private userService = new UsersService()
    private masterService = new MastersService()

    private msgController = new MessagesController()
    private usersController = new UsersController()
    private mastersController = new MastersController()
    private ordersController = new OrdersController()

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
                    section_id: null
                },
                user_data: {
                    full_name: null,
                    phone: null,
                    role_id: null
                },
                messages_to_delete: [],
                message_ids: {},
                chosen_section_id: null,
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
                    step: "name"
                })
                ctx.session.chat_id = chat_id
                ctx.session.user_id = user.id
                ctx.session.step = "name"

                await this.msgController.askFullName(ctx)
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
                
                await this.mastersController.sendMainMenu(ctx)
            } else {
                next()
            }
        })

        this.router.route("name", async (ctx) => {
            try {
                await this.usersController.setFullName(ctx, ctx.msg.text)
                await this.msgController.askPhone(ctx)
                await this.usersController.updateStep(ctx, "phone")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("phone", async (ctx) => {
            try {
                await this.usersController.setPhone(ctx, ctx.msg.contact ? ctx.msg.contact.phone_number : ctx.msg.text)
                await this.msgController.sendRoles(ctx)
                await this.usersController.updateStep(ctx, "role")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("brand_name", async (ctx) => {
            try {
                await this.mastersController.setBrandName(ctx, ctx.msg.text)
                await this.msgController.removeInlineKeyboard(ctx, ctx.session.message_ids.ask_brand_name)
                await this.msgController.askAddress(ctx)
                await this.usersController.updateStep(ctx, "address")
                await this.msgController
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("address", async (ctx) => {
            try {
                await this.mastersController.setAddress(ctx, ctx.msg.text)
                await this.msgController.removeInlineKeyboard(ctx, ctx.session.message_ids.ask_address)
                await this.msgController.askAddressTarget(ctx)
                await this.usersController.updateStep(ctx, "address_target")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("address_target", async (ctx) => {
            try {
                await this.mastersController.setAddressTarget(ctx, ctx.msg.text)
                await this.msgController.removeInlineKeyboard(ctx, ctx.session.message_ids.ask_address_target)
                await this.msgController.askLocation(ctx)
                await this.usersController.updateStep(ctx, "location")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("location", async (ctx) => {
            try {
                await this.mastersController.setLocation(ctx, ctx.msg.text)
                await this.msgController.askStartTime(ctx)
                await this.usersController.updateStep(ctx, "start_time")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("start_time", async (ctx) => {
            try {
                await this.mastersController.setStartTime(ctx, ctx.msg.text)
                await this.msgController.askFinishTime(ctx)
                await this.usersController.updateStep(ctx, "end_time")
            } catch (error) {
                console.log(error.message);
                await ctx.reply(messages.wrongTimeMsg, { parse_mode: "HTML" })
            }
        })

        this.router.route("end_time", async (ctx) => {
            try {
                await this.mastersController.setFinishTime(ctx, ctx.msg.text)
                await this.msgController.askAvgDuration(ctx)
                await this.usersController.updateStep(ctx, "duration")
            } catch (error) {
                console.log(error.message);
                await ctx.reply(messages.wrongTimeMsg, { parse_mode: "HTML" })
            }
        })

        this.router.route("duration", async (ctx) => {
            try {
                await this.mastersController.setAvgDuration(ctx, ctx.msg.text)
                await this.mastersController.sendFinalInfo(ctx)
                await this.usersController.updateStep(ctx, "info_verificaion")
            } catch (error) {
                console.log(error);
            }
        })


        this.router.route("message_to_admin", async (ctx) => {
            try {
                await this.mastersController.saveAdminMessage(ctx, ctx.msg.text)
                await this.mastersController.sendFinalInfo(ctx)
                await this.usersController.updateStep(ctx, "info_verificaion")
            } catch (error) {
                console.log(error);
            }
        })

        this.router.route("waiting_verification", async (ctx) => {
            try {
                await this.mastersController.sendWaitingMenu(ctx)
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
                        if (query.role == 2) {
                            await this.usersController.setUserRole(ctx, query.role)
                            await this.msgController.sendSections(ctx, true)
                            await this.usersController.updateStep(ctx, "section")
                        }else{
                            await this.usersController.sendMainMenu(ctx, true)
                            await this.usersController.updateStep(ctx, "section")
                        }
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "set_section":
                    try {
                        await this.mastersController.setSection(ctx, query.section_id)
                        await this.msgController.askBrandName(ctx, true)
                        await this.usersController.updateStep(ctx, "brand_name")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "send_master_info":
                    try {
                        await this.mastersController.saveInfo(ctx)
                        await this.mastersController.sendWaitingMenu(ctx, true)
                        await this.usersController.updateStep(ctx, "waiting_verification")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "cancel_register_proccess":
                    try {
                        await this.msgController.sendRoles(ctx, true)
                        await this.usersController.updateStep(ctx, "role")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "cancel_registration":
                    try {
                        await this.mastersController.deleteInfo(ctx)
                        await this.msgController.sendRoles(ctx, true)
                        await this.usersController.updateStep(ctx, "role")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "check_verification_status":
                    try {
                        await this.mastersController.checkVerification(ctx)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "contact_admin":
                    try {
                        await this.msgController.askMessage(ctx)
                        await this.usersController.updateStep(ctx, "message_to_admin")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "my_clients":
                    try {
                        await this.ordersController.sendMasterOrders(ctx, query.page)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "my_ratings":
                    try {
                        await this.mastersController.sendRatings(ctx, true)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "services":
                    try {
                        await this.msgController.sendSections(ctx, true, "section_masters")
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "chosen_services":
                    try {
                        await this.ordersController.sendUserOrders(ctx, true)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "section_masters":
                    try {
                        await this.mastersController.sendSectionMasters(ctx, null, query.section_id)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "select_master":
                    try {
                        await this.mastersController.sendMasterInfo(ctx, query.master_id)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "search_master":
                    try {
                        await this.mastersController.sendMasterInfo(ctx, query.master_id)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "order_by_rating":
                    try {
                        await this.mastersController.sendSectionMasters(ctx, null, ctx.session.section_id, true)
                    } catch (error) {
                        console.log(error);
                    }
                    break;
                case "rate_users":
                    try {
                            await this.usersController.rateUsers(ctx)
                    } catch (error) {
                            console.log(error);
                    }
                    break;
                case "rating":
                    try {
                            console.log(query)
                    } catch (error) {
                            console.log(error);
                    }
                    break;


                case "skip":
                    switch(query.next_step){
                        case("address"):
                            try {
                                await this.msgController.askAddress(ctx, true)
                                await this.usersController.updateStep(ctx, "address")
                            } catch (error) {
                                console.log(error);
                            }
                            break;
                        case("address_target"):
                            try {
                                await this.msgController.askAddressTarget(ctx, true)
                                await this.usersController.updateStep(ctx, "address_target")
                            } catch (error) {
                                console.log(error);
                            }
                            break
                        case("location"):
                            try {
                                await this.msgController.askLocation(ctx, true)
                                await this.usersController.updateStep(ctx, "location")
                            } catch (error) {
                                console.log(error);
                            }
                            break
                    }
                    break;

                case "back":
                    switch(query.step){
                        case("waiting_verification"):
                            try {
                                await this.mastersController.sendWaitingMenu(ctx, true)
                                await this.usersController.updateStep(ctx, "waiting_verification")
                            } catch (error) {
                                console.log(error);
                            }
                            break;
                        case("master_menu"):
                            try {
                                await this.mastersController.sendMainMenu(ctx, true)
                                await this.usersController.updateStep(ctx, "idle")
                            } catch (error) {
                                console.log(error);
                            }
                            break;
                        case("section_masters"):
                            try {
                                await this.mastersController.sendSectionMasters(ctx, null, ctx.session.chosen_section_id)
                                await this.usersController.updateStep(ctx, "idle")
                            } catch (error) {
                                console.log(error);
                            }
                            break;
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