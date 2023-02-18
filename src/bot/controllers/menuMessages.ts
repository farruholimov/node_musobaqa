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


export default class MenuMessagesController{
    public sendSections = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.user_sections(data),
        })
    }

    public askFullName = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.user_sections(data),
        })
    }

    public askPhone = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.user_sections(data),
        })
    }

    public askBrandName = async (ctx) => {
        await ctx.reply(messages.selectSectionMsg, {
            parse_mode: "HTML",
            reply_markup: InlineKeyboards.user_sections(data),
        })
    }
}