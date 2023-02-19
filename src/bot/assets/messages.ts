const messages = {
    startMsg: 'Kerakli tilni tanlang \n Choose your language',
    selectSectionMsg: "<b>Kerakli bo'limni tanlang:</b>",
    selectRoleMsg: '<b>Botdan kim sifatida foydalanmoqchisiz:</b>',
    nameMsg:
        "👤 <b>Ro'yxatdan o'tish uchun ismigizni va familiyangizni kiriting:</b>",
    inputNameMsg: '👤 <b>Ismingizni kiriting:</b>',
    phoneNumberMsg:
        "☎️ <b>Telefon raqamingizni</b> kiriting:\n\nNa'muna: <i>+998901234567</i>",
    brandMsg: "☎️ <b>Brendingiz nomini</b> kiriting:\n\n<i>Na'muna: Sudo</i>",
    addressMsg:
        "☎️ <b>Manzilni</b> kiriting:\n\n<i>Na'muna: Shayxontohur tumani, Navoiy ko'chasi</i>",
    addressTargetMsg:
        "☎️ <b>Manzil mo'ljalini</b> kiriting:\n\n<i>Na'muna: IIB ro'parasi</i>",
    locationMsg:
        "☎️ <b>Xaritada joylashuvingizni</b> (lokatsiya) jo'nating:\n\n<i>Telegramning joylashuv ulashish imkoniyati orqali</i>",
    workTimeMsg: (text: string, exp: string) =>
        `☎️ <b>Ish ${text}</b> vaqtini jo'nating:\n\n<i>Na'muna: ${exp}</i>`,
    durationMsg:
        "☎️ <b>Bir mijoz uchun sarflaydigan o'rtacha vaqtingizni daqiqalarda*</b> kiriting:\n\n<i>Na'muna: <b>80</b></i>",
    waitVerificationMsg:
        "Ma'lumotlaringiz administratorlar tomonidan tasdiqlanishi lozim.\n\n <i>Holatni tekshirish uchun <b>Tekshirish</b> tugmasidan foydalaning.<b>Bekor qilish</b> tugmasi orqali ro'yhatdan o'tishni bekor qilish mumkin (bunda kiritilgan ma'lumotlar o'chiriladi!)</i>",
    wrongTimeMsg:
        "<b>Vaqtni na'munadagi ko'rinishda kiriting!</b>\n\n<i>Shuningdek <b>Soat</b> va <b>daqiqaning</b> to'g'riligini tekshiring</i>",
    wrongDurationMsg:
        "<b>Vaqtni na'munadagi ko'rinishda daqiqa sifatida kiriting!</b>",
    wrongPhoneMsg: "<b>Telefon raqamini na'munadagi ko'rinishda kiriting!</b>",
    notVerifiedMsg: "Ma'lumotlaringiz hali tasdiqlanmagan.",
    enterMessageMsg: 'Habarni (savol, shikoyat, taklif) kiriting:',
    noClientsMsg: "Hozircha mijozlaringiz yo'q.",
    noMastersMsg: "Hozircha hizmat ko'rsatuvchilar yo'q.",
    noOrdersMsg: "Hozircha belgilangan xizmatlar yo'q.",
    switchedToAdminMsg: "✅ Administrator rejimiga o'tdingiz!",
    notAdminMsg: "❌ Siz administrator emassiz!",
    youGotRejectedMsg: "❌ Siz administrator tomonidan tasdiqlanmadingiz!",
    youGotAccepteddMsg: "✅ Siz administrator tomonidan tasdiqlandingiz!",
    orderFirstStep:
        "<b>Quyidagi saytdan kerakli mahsulotning rasmini (screenshot) yoki linkini yuboring.</b> \n----------------------------------------------------------------------\n 👉 https://telegra.ph/Aksessuarlar-03-07 👈\n----------------------------------------------------------------------\n\n<i>Mahsulotlarni yuborganingizdan so'ng davom etish uchun <b>Tasdiqlash</b> tugmasini bosing yoki buyurtma berishni to'xtatish uchun <b>Bekor qilish</b> tugmasini bosing.</i>",
    menuMsg: `📖 Asosiy menyu`,
    yourRatingsMsg: (rating) =>
        `Sizning reytingingiz: \n\n${new Array(rating).fill('⭐️')}`,
    getDaysMessage: `Bir kunlik vaqtlarni olish uchun\nshu kunlardan birini tanlang 😊`,
    getTimessMessage: (date) =>
        `${date} ushbu sanadagi vaqtlarni oldingiz! Band qilish uchun\nyoki bo'shatish uchun vaqtni ustiga bosing 😊`,
    masterNameMsg: "Ismni kiriting:",
};

export default messages;
