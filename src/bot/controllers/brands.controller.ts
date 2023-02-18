import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
import UsersService from "../../app/modules/users/users.service"

export default class BrandsController{
    public sendWaitingMenu = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.waiting_menu,
        })
    }

    public sendMainMenu = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.waiting_menu,
        })
    }
}