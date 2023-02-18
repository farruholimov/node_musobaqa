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
}