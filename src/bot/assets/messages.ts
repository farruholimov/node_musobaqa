export default messages = {
  startMsg: "Kerakli tilni tanlang \n Choose your language",
    nameMsg: "👤 <b>Ro'yxatdan o'tish uchun ismigizni va familiyangizni kiriting:</b>",
    inputNameMsg: "👤 <b>Ismingizni kiriting:</b>",
    telMsg: "☎️ <b>Telefon raqamingizni</b> yuboring:\n\nNamuna: <i>+998901234567</i>",
    selectSectionMsg: "<b>Kerakli bo'limni tanlang:</b>",
    incTelMsg: "❗️ Iltimos raqamni to'gri kiriting!",
    regSuccessMsg: "✅ Ro'yhatdan muvaffaqiyatli o'tdingiz!",
    orderFirstStep: "<b>Quyidagi saytdan kerakli mahsulotning rasmini (screenshot) yoki linkini yuboring.</b> \n----------------------------------------------------------------------\n 👉 https://telegra.ph/Aksessuarlar-03-07 👈\n----------------------------------------------------------------------\n\n<i>Mahsulotlarni yuborganingizdan so'ng davom etish uchun <b>Tasdiqlash</b> tugmasini bosing yoki buyurtma berishni to'xtatish uchun <b>Bekor qilish</b> tugmasini bosing.</i>",
    menuMsg: (id) => `📖 Asosiy menyu\n\nSizning ID raqamingiz: ${id}`,
    amountMsg: "Miqdorni jo'nating:",
    sizeMsg: "O'lchamni jo'nating:",
    costMsg: "Narxni kiriting:",
    chooseCountMsg: "Iltimos, nechtaligini tanglang!",
    invalidNumberMsg: "Raqam noto'g'ri kiritilgan!",
    finishManualAmountMsg: (id) => `Avval ${id}-mahsulotning miqdorini kiriting yoki tanlang!`,
    finishManualSizeMsg: (id) => `Avval ${id}-mahsulotning o'lchamini kiriting yoki tanlang!`,
    invalidMessageMsg: "Mahsulotning rasmini yoki linkini jo'natishingiz kerak!",
    sendOneImageMsg: "❗️ Faqat bir dona rasm jo'natishingiz kerak! \n\n❕ To'lovni tasdiqlovchi rasm sifatida birinchi rasm qabul qilindi!",
    orderNotFinishedMsg: "Buyurtma to'liq yakunlanmagan!",
    checkDataMsg: "Barcha ma'lumotlar to'g'riligiga ishonch hosil qiling!",
    areYouSureMsg: "Buyurtmani tasdiqlaysizmi?",
    notRepliedMsg: "Xabar javob sifatida jo'natilmadi!",
    notNumberMsg: "Iltimos, miqdor sifatida son jo'nating!\n<i>Misol: <b>86</b></i>",
    notNumberCostMsg: "Iltimos, narx sifatida son jo'nating!\n<i>Misol: <b>5600</b>, <b>5060000</b></i>",
    orderProccessCancelledMsg: "Buyurtma berish bekor qilindi!",
    isVerifyingMsg: "Agar ma'lumot xato bo'lsa unga o'zgartirish kiritish uchun tasdiqlashga Yo'q javobini bering!",
    orderingMsg: "Siz buyurtma berish jarayonidasiz! Buyurtma berishni davom ettiring yoki uni bekor qiling!",
    notOrderingMsg: "Buyurtma berish jarayoni to'xtatilgan! Yangi buyurtma berish uchun menyudan <b>Buyurtma berish</b> bo'limini tanlang.",
    orderSavedMsg: "Buyurtma muvaffaqiyatli saqlandi✅",
    waitCostMsg: "Administratorlar buyurtma narxini belgilashini kuting yoki narxni o'zingiz bilsangiz, summani kiritib, to'lov jarayoniga o'tishingiz mumkin.",
    verifyStoppedMsg: "Buyurtma tasdiqlanmadi❌.",
    noItemsMsg: "Mahsulot qo'shilmagan! Mahsulotning rasmini yoki linkini jo'natishingiz kerak!",
    nameChagedMsg: (name) => `Ismingiz <b>${name}</b>ga o'zgartirildi✅`,
    phoneChagedMsg: (phone) => `Raqam <b>${phone}</b> ga o'zgartirildi✅`,
    langChagedMsg: (lang) => `Hozirgi til: <b>${lang}</b>✅`,
    chooseSectionMsg: `Kerakli bo'limni tanlang:`,
    notDeliveredMsg: `Hozirgi buyurtmangiz hali yakunlanmagan!`,
    orderHasPriceMsg: `Buyurtmaga allaqachon narx belgilangan!`,
    notPaidMsg: `Hozirgi buyurtmaga hali to'lov qilinmagan!`,
    continueOrderMsg: "Buyurtmaga o'zgartirish kiritishingiz yoki yana mahsulotlar qo'shishingiz mumkin.",
    orderInstructions: "Mahsulotlarni yuborib bo'lgach buyurtmani ro'yxatdan o'tkazish uchun <b>Tasdiqlash</b> tugmasini bosing!\n<b>Bekor qilish</b> tugmasi esa jarayonni to'xtatadi!",
    imageRequiredMsg: "To'lovni tasdiqlovchi chek rasmini (screenshot) jo'nating!",
    paymentNotCheckedMsg: "To'lov hali administratorlar tomonidan ko'rib chiqilmagan. Iltimos, javobni kuting.",
    waitVerificationMsg: "Chek qabul qilindi. To'lov administratorlar tomonidan tekshiriladi. Tekshirish natijasi sizga bot orqali jo'natiladi. Iltimos, kuting.",
    orderCancelledMsg: "Buyurtmangiz bekor qilindi.",
    cannotOrderMsg: "Hozircha yangi buyurtma bera olmaysiz.",
    pleaseWaitMsg: "Iltimos, kuting.",
    paymentVerifiedMsg: `To'lov tasdiqlandi✅\nOperatorlarimiz tez orada aloqaga chiqishadi.`,
    paymentNotVerifiedMsg: `To'lov tasdiqlanmadi❌\n\n❗️ To'lov to'g'ri amalga oshirilganiga ishonch hosil qiling va rasmni qayta jo'nating`,
    noCostMsg: `Buyurtmaga hali narx belgilanmadi❌`,
    costSetMsg: (order_id, cost, text) => `${order_id}-buyurtmangizning umumiy narxi <b>${cost}</b> so'm etib belgilandi. \nQo'shimcha izoh: ${text ? `<b>${text}</b>` : "<i>mavjud emas</i>"}. \nTo'lovni tasdiqlovchi chek rasmini (screenshot) jo'nating.`,
    statusMessages: {
      "1": "Hozirgi buyurtmangizga hali narx belgilanmadi!",
      "2": "Hozirgi buyurtmangizga to'lov qilinmagan. Iltimos, to'lovni tasdiqlovchi rasmni jo'naiting!",
      "3": "Hozirgi buyurtmangizga qilingan to'lov hali tasdiqlanmadi!"
    }
}