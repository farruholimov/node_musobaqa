 
 
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
            .text("Xizmatlar", "services?step=user_menu")
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

        search_sections_menu: (step) =>
            new InlineKeyboard()
            .text("Ism bo'yicha qidirish", `search_by_name`)
            .row()
            .text("Reyting bo'yicha tartiblash", `order_by_rating`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),

        masters_menu_switch: (masters, page) => {
            let menu = [
                [{
                    text: "◀️",
                    callback_data: `section_masters?page=${Number(page) ? Number(page) - 1 : 0}`
                },{
                    text: "▶️",
                    callback_data: `section_masters?page=${Number(page) ? Number(page) + 1: 0 + 1}`
                }],
                [{
                    text: "Orqaga ↩️",
                    callback_data: `back?step=idle&menu=services`
                },{
                    text: "Izlash 🔍",
                    callback_data: `search_master`
                }]
            ]
            if (!masters.length) return menu

            const first_row = []
            const second_row = []

            for (let i = 0; i < masters.length; i++) {
                const master = masters[i]
                let index = i+1

                const master_text = `${index}. ${master.full_name} \n${master.rating} \n${master.location}`

                if (first_row.length < Math.ceil(masters.length / 2)) {
                    first_row.push({
                        text: master_text,
                        callback_data: `select_master?master_id=${master.id}`
                    })
                }
                else{
                    second_row.push({
                        text: master_text,
                        callback_data: `select_master?master_id=${master.id}`
                    })
                }
            }
            menu.unshift(second_row)
            menu.unshift(first_row)
            return menu
        },

        menu_switch: (page, step) => new InlineKeyboard()
            .text("◀️", `prev?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text("▶️", `next?page=${Number(page) ? Number(page) + 1: 0 + 1}`)
            .row()
            .text("Orqaga ↩️", `back?step=${step}`),

        user_sections: (sections, command, step) => {
            let menu = [
                [{
                    text: "Orqaga",
                    callback_data: `back?step=${step}`
                }]
            ]
            if (!sections.length) return menu
            for (const section of sections) {
                menu.unshift([{
                    text: section.name,
                    callback_data: `${command}?section_id=${section.id}`
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

        master_info_menu: (master_id) =>
            new InlineKeyboard()
            .text("Vaqt Olish", `book_time?master_id=${master_id}`)
            .text("Baholash", `rate_master?master_id=${master_id}`)
            .row()
            .text("Orqaga ↩️", `back?step=section_masters`),

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