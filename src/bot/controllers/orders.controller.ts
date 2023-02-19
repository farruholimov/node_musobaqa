import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
import UsersService from "../../app/modules/users/users.service"
import MastersService from "../../app/modules/masters/masters.service"
import OrdersService from "../../app/modules/orders/orders.service"

export default class OrdersController{
    private userService = new UsersService()
    private masterService = new MastersService()
    private orderService = new OrdersService()

    public updateStep = async (ctx, step: string) => {
        ctx.session.step = step
        await this.userService.updateByChatId(ctx.session.chat_id, {
            step: step
        })
    }

    public sendMasterOrders = async (ctx, page?) => {
        const master = await this.masterService.getByChatId(ctx.callbackQuery.message.chat.id)

        const query = page ? { 
            "orders.master_id": master.id,
            page: page
        } : { "orders.master_id": master.id }

        const orders = await this.orderService.getAll(query)

        if (!orders || !orders.length) {
            await ctx.api.answerCallbackQuery(ctx.callbackQuery.id, {
                text: messages.noClientsMsg,
                show_alert: true,
                parse_mode: "HTML"
            })
            throw new Error("No Clients")
        }

        let list_message = ""
        const keyboard_data = []

        for (let i = 0; i < orders.length; i ++) {
            let order = orders[i]
            let index = i+1

            keyboard_data.push({
                id: order.id,
                index
            })

            list_message += `${i+1}. 🗓 ${order["calendar.day"]} \n🕖 ${order["calendar.start_time"]} \n👤 ${order["user.full_name"]} \n📞 ${order["user.phone"]}`
        }

        await ctx.api.editMessageText(
            ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
            list_message, 
        {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.orders_menu_switch(page, "master_menu"),
        })
    }

    public sendUserOrders = async (ctx, page?) => {
        const user = await this.userService.getByChatId(ctx.callbackQuery.message.chat.id)

        const query = page ? { 
            "orders.user_id": user.user_id,
            page: page
        } : { "orders.user_id": user.user_id }

        const orders = await this.orderService.getAll(query)

        console.log(orders);
        

        if (!orders || !orders.length) {
            await ctx.api.answerCallbackQuery(ctx.callbackQuery.id, {
                text: messages.noOrdersMsg,
                show_alert: true,
                parse_mode: "HTML"
            })
            throw new Error("No Orders")
        }

        let list_message = ""
        const keyboard_data = []

        for (let i = 0; i < orders.length; i ++) {
            let order = orders[i]
            let index = i+1

            keyboard_data.push({
                id: order.id,
                index
            })

            list_message += `${i+1}. 🗓 ${order["calendar.day"]} \n🕖 ${order["calendar.start_time"]} \n👤 ${order["user.full_name"]} \n📞 ${order["user.phone"]}`
        }

        await ctx.api.editMessageText(
            ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
            list_message, 
        {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.orders_menu_switch(page, "master_menu"),
        })
    }
}