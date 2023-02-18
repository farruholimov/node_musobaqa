import messages from "../assets/messages"
import InlineKeyboards from "../assets/inline_keyboard"
const data = [
	{
		"id": 1,
		"name": "at,"
	},
	{
		"id": 2,
		"name": "sem"
	},
	{
		"id": 3,
		"name": "tempus"
	},
	{
		"id": 4,
		"name": "euismod"
	},
	{
		"id": 5,
		"name": "imperdiet"
	}
]


export default class MessagesController{
    public sendSections = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.user_sections(data),
        })
    }

    public askFullName = async (ctx) => {
        await ctx.reply(messages.nameMsg, {
            parse_mode: "HTML"
        })
    }

    public askPhone = async (ctx) => {
        await ctx.reply(messages.phoneNumberMsg, {
            parse_mode: "HTML"
        })
    }

    public askBrandName = async (ctx) => {
        await ctx.reply(messages.brandMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.skip("address"),
        })
    }

    public askAddress = async (ctx) => {
        await ctx.reply(messages.addressMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.skip("address"),
        })
    }

    public askAddressTarget = async (ctx) => {
        await ctx.reply(messages.addressTargetMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.skip("location"),
        })
    }

    public askLocation = async (ctx) => {
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
}