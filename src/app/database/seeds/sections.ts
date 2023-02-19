import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("sections").del();

    // Inserts seed entries
    await knex("sections").insert([
        { name: "Sartaroshxona" }, 
        { name: "Stomatologiya" }, 
        { name: "Salon" } 
    ]);
};
