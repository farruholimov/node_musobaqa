import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
import UsersService from "../../app/modules/users/users.service"
import MastersService from "../../app/modules/masters/masters.service"
import stringTimeValidator from "../utils/stringTimeValidator"
import UsersController from "./users.controller"

export default class MastersController{
    private userService = new UsersService()
    private masterService = new MastersService()

    private usersController = new UsersController()

    public sendWaitingMenu = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.waitVerificationMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.waiting_menu
            })
        else
            await ctx.reply(messages.selectSectionMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.waiting_menu,
            })
    }

    public sendMainMenu = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.menuMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.master_menu
            })
        else
            await ctx.reply(messages.menuMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.master_menu,
            })
    }

    public sendRatings = async (ctx, edit: boolean = false) => {

        const master = await this.masterService.getByChatId(ctx.callbackQuery.message.chat.id)
        const rating = master.rating

        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.yourRatingsMsg(rating),
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.back("master_menu")
            })
        else
            await ctx.reply(messages.yourRatingsMsg(rating), {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.back("master_menu"),
            })
    }

    public setSection = async (ctx, section) => {
        ctx.session.master_data.section_id = section
    }

    public setBrandName = async (ctx, brand_name) => {
        ctx.session.master_data.brand_name = brand_name
    }

    public setAddress = async (ctx, address) => {
        ctx.session.master_data.address = address
    }

    public setAddressTarget = async (ctx, target) => {
        ctx.session.master_data.target = target
    }

    public setLocation = async (ctx, location) => {
        ctx.session.master_data.location = location
    }

    public setStartTime = async (ctx, start_time) => {
        stringTimeValidator(start_time)
        ctx.session.master_data.start_time = start_time
    }

    public setFinishTime = async (ctx, end_time) => {
        stringTimeValidator(end_time)
        ctx.session.master_data.end_time = end_time
    }

    public setAvgDuration = async (ctx, avarage_time) => {
        if (isNaN(avarage_time)) {
            await ctx.reply(messages.wrongDurationMsg, { parse_mode: "HTML" })
            throw new Error("Duration validation error")
        } 
        ctx.session.master_data.average_time = avarage_time
    }

    public sendFinalInfo = async (ctx) => {
        const data = {
            ...ctx.session.user_data,
            ...ctx.session.master_data
        }

        const message = 
        `
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

    public saveInfo = async (ctx) => {
        const data = ctx.session.master_data
        const user = await this.userService.getByChatId(ctx.callbackQuery.message.chat.id)
        await this.masterService.create({
            ...data,
            user_id: user.user_id
        })
    }

    public saveAdminMessage = async (ctx, message: string) => {
        const user = await this.userService.getByChatId(ctx.callbackQuery.message.chat.id)
        // await this.messageService.create({
        //     text: message,
        //     user_id: user.user_id
        // })
    }

    public checkVerification = async (ctx) => {
        const master = await this.masterService.getByChatId(ctx.callbackQuery.message.chat.id)
        if (master.is_verified) {
            await this.sendMainMenu(ctx, true)
            await this.usersController.updateStep(ctx, "idle")
        }
        else{
            await ctx.api.answerCallbackQuery(ctx.callbackQuery.id, {
                text: messages.notVerifiedMsg,
                show_alert: true,
                parse_mode: "HTML"
            })
        }
    }

    public deleteInfo = async (ctx) => {
        ctx.session.master_data = {
            brand_name: null,
            address: null,
            avarage_time: null,
            target: null,
            start_time: null,
            end_time: null,
            section_id: null
        }
        ctx.session.user_data.role_id

        const user = await this.userService.updateByChatId(ctx.callbackQuery.message.chat.id, { role_id: null })
        await this.masterService.deleteMasterByUserId(user.user_id)
    }
}