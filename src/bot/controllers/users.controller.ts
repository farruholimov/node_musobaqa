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
            await ctx.reply(messages[ctx.session.user.lang].invalidNumberMsg, {
                parse_mode: "HTML",
            })
            throw new Error("Invalid phone number")
        }

        ctx.session.user_data.phone = phone
        
        await this.userService.updateByChatId(ctx.msg.chat.id, {
            phone: phone
        })
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

    public setLocation = async (ctx, target) => {
        ctx.session.master_data.target = target
    }
}