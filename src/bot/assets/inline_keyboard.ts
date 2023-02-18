 
 
import { InlineKeyboard } from "grammy";

const InlineKeyboards = {

        user_type_menu: new InlineKeyboard()
            .text("Usta", "set_user_type?type=usta")
            .text("Mijoz", "set_user_type?type=mijoz"),

        set_cost: new InlineKeyboard()
            .text("Narx belgilash", "set_cost"),

        menu_switch: (offset, step) => new InlineKeyboard()
            .text("◀️", `prev?offset=${Number(offset) - 1}`)
            .text("▶️", `next?offset=${Number(offset) + 1}`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),

        user_sections: (sections) => {
            let menu = [
                [{
                    text: "Orqaga",
                    callback_data: `back?step=user_type&menu=user_type_menu`
                }]
            ]
            if (!sections.length) return menu
            for (const section of sections) {
                menu.unshift([{
                    text: section.name,
                    callback_data: `set_section?section_id=${section.id}`
                }])
            }
            return menu
        },


        amount_menu: (item_id) =>
            new InlineKeyboard()
            .text("1", `set_amount?value=1&item_id=${item_id}`)
            .text("2", `set_amount?value=2&item_id=${item_id}`)
            .text("3", `set_amount?value=3&item_id=${item_id}`)
            .text("4", `set_amount?value=4&item_id=${item_id}`)
            .text("5", `set_amount?value=5&item_id=${item_id}`)
            .row()
            .text("6", `set_amount?value=6&item_id=${item_id}`)
            .text("7", `set_amount?value=7&item_id=${item_id}`)
            .text("8", `set_amount?value=8&item_id=${item_id}`)
            .text("9", `set_amount?value=9&item_id=${item_id}`)
            .text("10", `set_amount?value=10&item_id=${item_id}`)
            .row()
            .text("Boshqa", `manual_amount?item_id=${item_id}`),

        edit_item_menu: (item_id) =>
            new InlineKeyboard()
            .text("✏️ O'lchamni o'zgartirish", `change_size?item_id=${item_id}`)
            .text("✏️ Miqdorni o'zgartirish", `change_amount?item_id=${item_id}`)
            .row()
            .text("🗑 O'chirish", `delete_item?item_id=${item_id}`),

        user_info_menu: (step) =>
            new InlineKeyboard()
            .text("👤 Ismni o'zgartirish", `change_user_info?step=name`)
            .text("📱 Raqamni o'zgartirish", `change_user_info?step=phone`)
            .row()
            .text("🇺🇿🇷🇺 Tilni o'zgartirish", `change_user_info?step=lang`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),
        order_sections_menu: (step) =>
            new InlineKeyboard()
            .text("🔵 Barchasi", `all_orders`)
            .text("🟢 Hozirgi", `current_order`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),

        back: (step, menu) => new InlineKeyboard().text("Orqaga ↩️", `back?step=${step}&menu=${menu}`),
        skip: (next_step) => new InlineKeyboard().text("O'tkazib yuborish ↩️", `skip?step=${next_step}`),
}

export default InlineKeyboards;