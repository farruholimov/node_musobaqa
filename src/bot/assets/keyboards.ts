 
 
import { Keyboard } from "grammy";

const Keyboards = {
    share_phone: new Keyboard().requestContact("Telefon raqamni jo'natish"),
    register: new Keyboard().text("Ro'yhatdan o'tish"),
    cancel_order: new Keyboard().text("Buyurtmani bekor qilish"),
    yes_no: new Keyboard().text("Yo'q").text("Ha")
}

export default Keyboards