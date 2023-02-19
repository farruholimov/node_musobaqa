import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
import SectionsService from "../../app/modules/sections/sections.service"

export default class MessagesController{
    private sectionService = new SectionsService()
    
    public sendRoles = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.selectRoleMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.user_roles_menu
            })
        else
            await ctx.reply(messages.selectRoleMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.user_roles_menu,
            })
    }

    public sendSections = async (ctx, edit: boolean = false, command = "set_section", step = "user_roles_menu") => {

        const data = await this.sectionService.getAll()

        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.selectSectionMsg,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: InlineKeyboards.user_sections(data, command, step)
                }
            })
        else
            await ctx.reply(messages.selectSectionMsg, {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: InlineKeyboards.user_sections(data, command, step)
                },
            })
    }

    public askFullName = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.nameMsg,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: []
                }
            })
        else 
            await ctx.reply(messages.nameMsg, {
                parse_mode: "HTML"
            })
    }

    public askPhone = async (ctx) => {
        await ctx.reply(messages.phoneNumberMsg, {
            parse_mode: "HTML"
        })
    }

    public askBrandName = async (ctx, edit: boolean = false) => {
        if (edit) {
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.brandMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("address")
            })

            ctx.session.message_ids.ask_brand_name = ctx.callbackQuery.message.message_id

        }
        else{
            const message = await ctx.reply(messages.brandMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("address"),
            })

            ctx.session.message_ids.ask_brand_name = message.message_id
        }
    }

    public askAddress = async (ctx, edit: boolean = false) => {
        if (edit) {
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.addressMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("address_target")
            })

            ctx.session.message_ids.ask_address = ctx.callbackQuery.message.message_id
        }
        else{
            const message = await ctx.reply(messages.addressMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("address_target"),
            })

            ctx.session.message_ids.ask_address = message.message_id
        }
    }

    public askAddressTarget = async (ctx, edit: boolean = false) => {
        if (edit) {
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.addressTargetMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("location")
            })
            
            ctx.session.message_ids.ask_address_target = ctx.callbackQuery.message.message_id
        }
        else {
            const message = await ctx.reply(messages.addressTargetMsg, {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.skip("location"),
            })

            ctx.session.message_ids.ask_address_target = message.message_id
        }
    }

    public askLocation = async (ctx, edit: boolean = false) => {
        if (edit)
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.locationMsg,
            {
                parse_mode: "HTML",
                reply_markup: {
                    inline_keyboard: []
                }
            })
        else
            await ctx.reply(messages.locationMsg, {
                parse_mode: "HTML"
            })
    }

    public askStartTime = async (ctx) => {
        await ctx.reply(messages.workTimeMsg("boshlash", "09:30"), {
            parse_mode: "HTML"
        })
    }

    public askFinishTime = async (ctx) => {
        await ctx.reply(messages.workTimeMsg("tugash", "18:00"), {
            parse_mode: "HTML"
        })
    }

    public askAvgDuration = async (ctx) => {
        await ctx.reply(messages.durationMsg, {
            parse_mode: "HTML"
        })
    }

    public askMessage = async (ctx, edit: boolean = false) => {
        if (edit) 
            await ctx.api.editMessageText(
                ctx.callbackQuery.message.chat.id, ctx.callbackQuery.message.message_id,
                messages.enterMessageMsg,
            {
                parse_mode: "HTML",
                reply_markup: InlineKeyboards.back("waiting_verification")
            })
        else
            await ctx.reply(messages.enterMessageMsg, {
                parse_mode: "HTML"
            })
    }

    public removeInlineKeyboard = async (ctx, message_id?: string | number) => {
        console.log(message_id);
        
        const msg_id = message_id ? message_id : ctx.callbackQuery.message.message_id
        await ctx.api.editMessageReplyMarkup(ctx.msg.chat.id, msg_id, {
            reply_markup: {
                inline_keyboard: []
            }
        })
    }
}