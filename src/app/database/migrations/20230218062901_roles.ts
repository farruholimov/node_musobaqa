import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists roles(
      id serial primary key,
      name varchar(64) not null, 
      created_at timestamp not null default current_timestamp
    );
  `);
}


export async function down(knex: Knex): Promise<void> {
}

