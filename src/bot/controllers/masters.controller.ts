import {
    createCalendar,
    generateDays,
} from './../../app/modules/shared/utils/createCalendar';
import messages from '../assets/messages';
import InlineKeyboards from '../assets/inline_keyboard';
import UsersService from '../../app/modules/users/users.service';
import MastersService from '../../app/modules/masters/masters.service';
import stringTimeValidator from '../utils/stringTimeValidator';
import UsersController from './users.controller';
import CalendarsService from '../../app/modules/calendars/calendar.service';

export default class MastersController {
    private userService = new UsersService();
    private masterService = new MastersService();
    private calendarsService = new CalendarsService();

    private usersController = new UsersController();

    public sendWaitingMenu = async (ctx, edit: boolean = false) => {
        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id,
                ctx.callbackQuery.message.message_id,
                messages.waitVerificationMsg,
                {
                    parse_mode: 'HTML',
                    reply_markup: InlineKeyboards.waiting_menu,
                }
            );
        else
            await ctx.reply(messages.selectSectionMsg, {
                parse_mode: 'HTML',
                reply_markup: InlineKeyboards.waiting_menu,
            });
    };

    public sendMainMenu = async (ctx, edit: boolean = false) => {
        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id,
                ctx.callbackQuery.message.message_id,
                messages.menuMsg,
                {
                    parse_mode: 'HTML',
                    reply_markup: InlineKeyboards.master_menu,
                }
            );
        else
            await ctx.reply(messages.menuMsg, {
                parse_mode: 'HTML',
                reply_markup: InlineKeyboards.master_menu,
            });
    };

    public sendRatings = async (ctx, edit: boolean = false) => {
        const master = await this.masterService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        const rating = master.rating;

        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id,
                ctx.callbackQuery.message.message_id,
                messages.yourRatingsMsg(rating),
                {
                    parse_mode: 'HTML',
                    reply_markup: InlineKeyboards.back('master_menu'),
                }
            );
        else
            await ctx.reply(messages.yourRatingsMsg(rating), {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.back("master_menu"),
            })
    }

    public sendSectionMasters = async (ctx, page, section_id, desc = false) => {
        ctx.session.chosen_section_id = section_id
        const query = page ? { 
            "masters.section_id": section_id,
            page: page
        } : { "masters.section_id": section_id }

        desc ? query["orderBy"] = "rating" : null
        desc ? query["order"] = "DESC" : null        
        
        const masters = await this.masterService.getAll(query)
        console.log(masters);
        console.log(page);
        
        
        if (!masters || !masters.length) {
            await ctx.api.answerCallbackQuery(ctx.callbackQuery.id, {
                text: messages.noMastersMsg,
                show_alert: true,
                parse_mode: "HTML"
            })
            throw new Error("No Masters")
        }
        
        let list_message = ""
        const keyboard_data = []
        
        for (let i = 0; i < masters.length; i++) {
            let master = masters[i]
            let index = i+1

            keyboard_data.push({
                id: master.id,
                index
            })

            list_message += `${i+1}. ${master.full_name} \nNomi: ${master.brand_name ? master.brand_name : "<i>ko'rsailmagan</i>"} \nJoylashuv: ${master.location ? master.location : "<i>ko'rsailmagan</i>"} \nReyting: ${new Array(master.rating).fill("⭐️")}\n\n`
        }

        await ctx.api.editMessageText(
            ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
            list_message, 
        {
            parse_mode: "HTML",
            reply_markup: {
                inline_keyboard: InlineKeyboards.masters_menu_switch(masters, page)
            },
        })
    }

    public sendDays = async (ctx, edit: boolean = false) => {
        const master = await this.masterService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        var days = await generateDays();

        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id,
                ctx.callbackQuery.message.message_id,
                messages.getDaysMessage,
                {
                    parse_mode: 'HTML',
                    reply_markup: InlineKeyboards.days_menu(days),
                }
            );
        else
            await ctx.reply(messages.getDaysMessage, {
                parse_mode: 'HTML',
                reply_markup: InlineKeyboards.days_menu(days),
            });
    };

    public sendTimes = async (
        ctx,
        edit: boolean = false,
        query: { day: string, page: number},
    ) => {
        const page = query.page ? query.page : 1
        const master = await this.masterService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        const {times,count: [{count}] } = await this.calendarsService.getAll({
            day: query.day,
            master_id: master.id,
            page
        });

        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id,
                ctx.callbackQuery.message.message_id,
                messages.getTimessMessage(query.day),
                {
                    parse_mode: 'HTML',
                    reply_markup: InlineKeyboards.times_menu(times,page, Math.ceil(Number(count)/8)),
                }
            );
        else
            await ctx.reply(messages.getTimessMessage(query.day), {
                parse_mode: 'HTML',
                reply_markup: InlineKeyboards.times_menu(times,page,Math.ceil(Number(count)/8)),
            });
    };

    public setSection = async (ctx, section) => {
        ctx.session.master_data.section_id = section;
    };

    public setBrandName = async (ctx, brand_name) => {
        ctx.session.master_data.brand_name = brand_name;
    };

    public setAddress = async (ctx, address) => {
        ctx.session.master_data.address = address;
    };

    public setAddressTarget = async (ctx, target) => {
        ctx.session.master_data.target = target;
    };

    public setLocation = async (ctx, location) => {
        ctx.session.master_data.location = location;
    };

    public setStartTime = async (ctx, start_time) => {
        stringTimeValidator(start_time);
        ctx.session.master_data.start_time = start_time;
    };

    public setFinishTime = async (ctx, end_time) => {
        stringTimeValidator(end_time);
        ctx.session.master_data.end_time = end_time;
    };

    public setAvgDuration = async (ctx, avarage_time) => {
        if (isNaN(avarage_time)) {
            await ctx.reply(messages.wrongDurationMsg, { parse_mode: 'HTML' });
            throw new Error('Duration validation error');
        }
        ctx.session.master_data.average_time = avarage_time;
    };

    public sendFinalInfo = async (ctx) => {
        const data = {
            ...ctx.session.user_data,
            ...ctx.session.master_data,
        };

        const message = `
        Ism: ${data.full_name}
        Telefon raqam: ${data.phone}
        Brend nomi: ${data.brand_name}
        Manzil: ${data.address}
        Mo'ljal: ${data.target}
        Joylashuv: ${data.location}
        Ish boshlash vaqti: ${data.start_time}
        Ish tugash vaqti: ${data.end_time}
        Mijozga sarflanadigan o'rtcha vaqt: ${data.average_time}
        `

        await ctx.reply(message, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.verify_info
        })
    }

    public sendMasterInfo = async (ctx, master_id: string) => {
        const master =  await this.masterService.getById(master_id)

        const message = 
        `Ism: ${master.full_name}
        Telefon raqam: ${master.phone}
        Nomi: ${master.brand_name ? master.brand_name : "<i>ko'rsailmagan</i>"}
        Manzil: ${master.address ? master.address : "<i>ko'rsailmagan</i>"}
        Mo'ljal: ${master.target ? master.target : "<i>ko'rsailmagan</i>"}
        Joylashuv: ${master.location}
        Ish boshlash vaqti: ${master.start_time}
        Ish tugash vaqti: ${master.end_time}\n\n
        Reyting:\n${new Array(master.rating).fill("⭐️")}
        `

        const reply_markup = ctx.session.is_admin ?  InlineKeyboards.master_register_menu : InlineKeyboards.master_info_menu

        await ctx.reply(message, {
            parse_mode: 'HTML',
            reply_markup,
        });
    };

    public saveInfo = async (ctx) => {
        const data = ctx.session.master_data;
        const user = await this.userService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        let mas = await this.masterService.create({
            ...data,
            user_id: user.user_id,
        });

        const slots = await createCalendar(
            data.start_time,
            data.end_time,
            data.average_time
        );

        for await (let slot of slots) {
            await this.calendarsService.create({
                start_time: slot.startTime,
                end_time: slot.endTime,
                day: slot.day,
                master_id: mas.id,
            });
        }
    };

    public saveAdminMessage = async (ctx, message: string) => {
        const user = await this.userService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        // await this.messageService.create({
        //     text: message,
        //     user_id: user.user_id
        // })
    };

    public acceptMaster = async (ctx, master_id) => {
        const master = await this.masterService.getByChatId(
            master_id
        );
        const user = await this.userService.getById(master.user_id);

        await this.masterService.update(master.id, {
            is_verified: true,
        })
        await ctx.api.sendMessage(user.chat_id, messages.youGotAccepteddMsg, {
            parse_mode: "HTML"
        })
    };

    public rejectMaster = async (ctx, master_id) => {
        const master = await this.masterService.getById(master_id);
        const user = await this.userService.getById(master.user_id);
        await ctx.api.sendMessage(user.chat_id, messages.youGotRejectedMsg, {
            parse_mode: "HTML"
        })
        await this.masterService.deleteMasterByUserId(user.user_id)
    };

    public checkVerification = async (ctx) => {
        const master = await this.masterService.getByChatId(
            ctx.callbackQuery.message.chat.id
        );
        if (master.is_verified) {
            await this.sendMainMenu(ctx, true);
            await this.usersController.updateStep(ctx, 'idle');
        } else {
            await ctx.api.answerCallbackQuery(ctx.callbackQuery.id, {
                text: messages.notVerifiedMsg,
                show_alert: true,
                parse_mode: 'HTML',
            });
        }
    };

    public deleteInfo = async (ctx) => {
        ctx.session.master_data = {
            brand_name: null,
            address: null,
            avarage_time: null,
            target: null,
            start_time: null,
            end_time: null,
            section_id: null,
        };
        ctx.session.user_data.role_id;

        const user = await this.userService.updateByChatId(
            ctx.callbackQuery.message.chat.id,
            { role_id: null }
        );
        await this.masterService.deleteMasterByUserId(user.user_id);
    };
}
