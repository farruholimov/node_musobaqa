 
 
import { InlineKeyboard } from "grammy";

const InlineKeyboards = {
    
        verify_info: new InlineKeyboard()
            .text("Tasdiqlash", "send_info")
            .text("Bekor qilish", "cancel_register_proccess"),

        waiting_menu: new InlineKeyboard()
            .text("Tekshirish", "check_register_status")
            .text("Bekor qilish", "cancel_register")
            .row()
            .text("Admin bilan bog'lanish", "contact_admin"),

        user_menu: new InlineKeyboard()
            .text("Mijozlar", "clients_menu")
            .text("Vaqt", "time_menu")
            .text("Reyting", "rating_menu")
            .row()
            .text("Ma'lumotlarni o'zgartirish", "edit_user_info"),

        user_type_menu: new InlineKeyboard()
            .text("Usta", "set_user_type?type=usta")
            .text("Mijoz", "set_user_type?type=mijoz"),

        days_menu: new InlineKeyboard()
            .text("Dushanba", "select_day?day=mon")
            .text("Seshanba", "select_day?day=tue")
            .text("Chorshanba", "select_day?day=wed")
            .text("Payshanba", "select_day?day=thurs")
            .text("Juma", "select_day?day=fri")
            .text("Shanba", "select_day?day=sat")
            .text("Yakshanba", "select_day?day=sun"),

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