import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
import UsersService from "../../app/modules/users/users.service"

export default class UsersController{
    private userService = new UsersService()

    public updateStep = async (ctx, step: string) => {
        ctx.session.step = step
        await this.userService.updateByChatId(ctx.session.chat_id, {
            step: step
        })
    }

    public sendMainMenu = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.menuMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.user_menu
            })
        else
            await ctx.reply(messages.menuMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.user_menu,
            })
    }

    public setUserRole = async (ctx, role) => {
        ctx.session.user_data.role_id = role
        await this.userService.updateByChatId(ctx.msg.chat.id, {
            role_id: role
        })
    }

    public setFullName = async (ctx, name) => {
        ctx.session.user_data.full_name = name
        await this.userService.updateByChatId(ctx.msg.chat.id, {
            full_name: name
        })
    }

    public setPhone = async (ctx, phone) => {
        if (ctx.msg.text && !(/^\+\998[389][012345789][0-9]{7}$/).test(ctx.msg.text)) {
            await ctx.reply(messages.invalidNumberMsg, {
                parse_mode: "HTML",
            })
            throw new Error("Invalid phone number")
        }

        ctx.session.user_data.phone = phone
        
        await this.userService.updateByChatId(ctx.msg.chat.id, {
            phone: phone
        })
    }

    public rateUsers = async (ctx) => {
        const replyMarkup = {
            inline_keyboard: [
            [
                { text: '⭐️', callback_data: '1' },
                { text: '⭐️', callback_data: '2' },
                { text: '⭐️', callback_data: '3' },
                { text: '⭐️', callback_data: '4' },
                { text: '⭐️', callback_data: '5' },
            ],
            ],
        };
        ctx.reply('Ustani baholash:', { reply_markup: replyMarkup });
        
    }
}