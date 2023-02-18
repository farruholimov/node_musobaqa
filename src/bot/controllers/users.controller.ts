import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"

export default class UsersController{
    private userService = new UserService()

    public updateStep = async (ctx, step: string) => {
        ctx.session.step = step
        await this.userService.updateByChatID(ctx.session.chat_id, {
            step: step
        })
    }
}