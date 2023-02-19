 
 
import { InlineKeyboard } from "grammy";

const InlineKeyboards = {
    
        verify_info: new InlineKeyboard()
            .text("Tasdiqlash", "send_master_info")
            .text("Bekor qilish", "cancel_register_proccess"),

        waiting_menu: new InlineKeyboard()
            .text("Tekshirish", "check_verification_status")
            .text("Bekor qilish", "cancel_registration")
            .row()
            .text("Admin bilan bog'lanish", "contact_admin"),

        master_menu: new InlineKeyboard()
            .text("Mijozlar", "my_clients")
            .text("Vaqt", "my_timetable")
            .text("Reyting", "my_ratings")
            .row()
            .text("Ma'lumotlarni o'zgartirish", "edit_master_info"),

        user_menu: new InlineKeyboard()
            .text("Xizmatlar", "services")
            .row()
            .text("Tanlangan xizmatlar", "chosen_services")
            .row()
            .text("Ma'lumotlarni o'zgartirish", "edit_user_info"),

        admin_menu: new InlineKeyboard()
            .text("Xizmatlar", "services")
            .row()
            .text("Mijozlar", "clients_menu")
            .row()
            .text("Ustalar", "masters_menu"),

        user_roles_menu: new InlineKeyboard()
            .text("Usta", "set_user_role?role=2")
            .text("Mijoz", "set_user_role?role=3"),

        days_menu: new InlineKeyboard()
            .text("Dushanba", "select_day?day=mon")
            .text("Seshanba", "select_day?day=tue")
            .text("Chorshanba", "select_day?day=wed")
            .text("Payshanba", "select_day?day=thurs")
            .text("Juma", "select_day?day=fri")
            .text("Shanba", "select_day?day=sat")
            .text("Yakshanba", "select_day?day=sun"),

        orders_menu_switch: (page, step) => new InlineKeyboard()
            .text("◀️", `my_clients?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text("▶️", `my_clients?page=${Number(page) ? Number(page) + 1: 0 + 1}`)
            .row()
            .text("Buyurtmani tasdiqlash", `order_verification`)
            .text("Orqaga ↩️", `back?step=${step}`),

        menu_switch: (page, step) => new InlineKeyboard()
            .text("◀️", `prev?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text("▶️", `next?page=${Number(page) ? Number(page) + 1: 0 + 1}`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),

        user_sections: (sections) => {
            let menu = [
                [{
                    text: "Orqaga",
                    callback_data: `back?step=user_type&menu=user_roles_menu`
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

        order_numbers: (orders) => {
            let menu = [
                [{
                    text: "Orqaga",
                    callback_data: `my_clients`
                }]
            ]
            if (!orders.length) return menu
            for (const order of orders) {
                menu.unshift([{
                    text: order.name,
                    callback_data: `verify_order?order_id=${order.id}`
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

        back: (step) => new InlineKeyboard().text("Orqaga ↩️", `back?step=${step}`),
        skip: (next_step) => new InlineKeyboard().text("O'tkazib yuborish ➡️", `skip?next_step=${next_step}`),
}

export default InlineKeyboards;