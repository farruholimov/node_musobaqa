import { Knex } from "knex";
import { getFirst } from "../../modules/shared/utils/utils";
import { generateHash } from "../../modules/shared/utils/bcrypt";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    const count = await knex("users").count("user_id"); 

    if (Number(count[0]?.count)) return

    // Inserts seed entries
    const admin = getFirst(
        await knex("users").insert(
            { 
            full_name: "Admin", 
            chat_id: "373512368",  
            role_id: 1,
            step: 'idle' 
        }).returning("*")
    ) 
};
