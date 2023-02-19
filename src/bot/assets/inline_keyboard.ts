import { InlineKeyboard } from 'grammy';

const InlineKeyboards = {
    verify_info: new InlineKeyboard()
        .text('Tasdiqlash', 'send_master_info')
        .text('Bekor qilish', 'cancel_register_proccess'),

    waiting_menu: new InlineKeyboard()
        .text('Tekshirish', 'check_verification_status')
        .text('Bekor qilish', 'cancel_registration')
        .row()
        .text("Admin bilan bog'lanish", 'contact_admin'),

    master_menu: new InlineKeyboard()
        .text('Mijozlar', 'my_clients')
        .text('Vaqt', 'my_timetable')
        .text('Reyting', 'my_ratings')
        .row()
        .text("Ma'lumotlarni o'zgartirish", 'edit_master_info'),

    user_menu: new InlineKeyboard()
        .text('Xizmatlar', 'services')
        .row()
        .text('Tanlangan xizmatlar', 'chosen_services')
        .row()
        .text("Ma'lumotlarni o'zgartirish", 'edit_user_info'),

    admin_menu: new InlineKeyboard()
        .text('Xizmatlar', 'services')
        .row()
        .text('Mijozlar', 'clients_menu')
        .row()
        .text('Ustalar', 'masters_menu'),

    search_sections_menu: new InlineKeyboard()
        .text("Ism bo'yicha izlash", 'search_by_name')
        .row()
        .text("Reyting bo'yicha tartiblash", 'sort_by_rating')
        .row()
        .text('Orqaga', 'back?step=section_masters'),

    user_roles_menu: new InlineKeyboard()
        .text('Usta', 'set_user_role?role=2')
        .text('Mijoz', 'set_user_role?role=3'),

    days_menu: (days: string[]) =>
        new InlineKeyboard()
            .text(days[0], `select_day?day=${days[0]}`)
            .text(days[1], `select_day?day=${days[1]}`)
            .text(days[2], `select_day?day=${days[2]}`)
            .text(days[3], `select_day?day=${days[3]}`)
            .row()
            .text(days[4], `select_day?day=${days[4]}`)
            .text(days[5], `select_day?day=${days[5]}`)
            .text(days[6], `select_day?day=${days[6]}`)
            .text('Orqaga ↩️', `back?step=master_menu`),

    times_menu: (times: string[], page = 1, countPage = 10) =>
        new InlineKeyboard()
            .text(
                `${times[0]['busy'] ? '❌' : ''}${times[0]['start_time']}-${times[0]['end_time']}`,
                `update_time?id=${times[0]['id']}&page=${page}`
            )
            .text(
                `${times[1]['busy'] ? '❌' : ''}${times[1]['start_time']}-${times[1]['end_time']}`,
                `update_time?id=${times[1]['id']}&page=${page}`
            )
            .row()
            .text(
                `${times[2]['busy'] ? '❌' : ''}${times[2]['start_time']}-${times[2]['end_time']}`,
                `update_time?id=${times[2]['id']}&page=${page}`
            )
            .text(
                `${times[3]['busy'] ? '❌' : ''}${times[3]['start_time']}-${times[3]['end_time']}`,
                `update_time?id=${times[3]['id']}&page=${page}`
            )
            .row()
            .text(
                `${times[4]['busy'] ? '❌' : ''}${times[4]['start_time']}-${times[4]['end_time']}`,
                `update_time?id=${times[4]['id']}&page=${page}`
            )
            .text(
                `${times[5]['busy'] ? '❌' : ''}${times[5]['start_time']}-${times[5]['end_time']}`,
                `update_time?id=${times[5]['id']}&page=${page}`
            )
            .row()
            .text(
                `${times[6]['busy'] ? '❌' : ''}${times[6]['start_time']}-${times[6]['end_time']}`,
                `update_time?id=${times[6]['id']}&page=${page}`
            )
            .text(
                `${times[7]['busy'] ? '❌' : ''}${times[7]['start_time']}-${times[7]['end_time']}`,
                `update_time?id=${times[7]['id']}&page=${page}`
            )
            .row()
            .text('◀️', `my_times?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text(`${page}/${countPage}`)
            .text(
                '▶️',
                `my_times?page=${Number(page) ? Number(page) + 1 : 0 + 1}`
            )
            .row()
            .text('Orqaga ↩️', `back?step=return_timetable`),

    orders_menu_switch: (page, step) =>
        new InlineKeyboard()
            .text('◀️', `my_clients?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text('▶️', `my_clients?page=${Number(page) ? Number(page) + 1 : 0 + 1}`)
            .row()
            .text('Buyurtmani tasdiqlash', `order_verification`)
            .text('Orqaga ↩️', `back?step=${step}`),

        masters_menu_switch: (masters, page?) => {
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
                    callback_data: `back?step=services`
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

                if (first_row.length < Math.ceil(masters.length / 2)) {
                    first_row.push({
                        text: index,
                        callback_data: `select_master?master_id=${master.id}`
                    })
                }
                else{
                    second_row.push({
                        text: index,
                        callback_data: `select_master?master_id=${master.id}`
                    })
                }
            }
            menu.unshift(second_row)
            menu.unshift(first_row)
            return menu
        },

    menu_switch: (page, step) =>
        new InlineKeyboard()
            .text('◀️', `prev?page=${Number(page) ? Number(page) - 1 : 0}`)
            .text('▶️', `next?page=${Number(page) ? Number(page) + 1 : 0 + 1}`)
            .row()
            .text('Orqaga ↩️', `back?step=${step}`),

    user_sections: (sections, command, step) => {
        let menu = [
            [
                {
                    text: 'Orqaga',
                    callback_data: `back?step=${step}`,
                },
            ],
        ];
        if (!sections.length) return menu;
        for (const section of sections) {
            menu.unshift([
                {
                    text: section.name,
                    callback_data: `${command}?section_id=${section.id}`,
                },
            ]);
        }
        return menu;
    },

    order_numbers: (orders) => {
        let menu = [
            [
                {
                    text: 'Orqaga',
                    callback_data: `my_clients`,
                },
            ],
        ];
        if (!orders.length) return menu;
        for (const order of orders) {
            menu.unshift([
                {
                    text: order.name,
                    callback_data: `verify_order?order_id=${order.id}`,
                },
            ]);
        }
        return menu;
    },


    back: (step) => new InlineKeyboard().text('Orqaga ↩️', `back?step=${step}`),
    skip: (next_step) =>
        new InlineKeyboard().text(
            "O'tkazib yuborish ➡️",
            `skip?next_step=${next_step}`
        ),
};

export default InlineKeyboards;
