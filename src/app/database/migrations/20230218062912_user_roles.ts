import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.raw(`
    create table if not exists user_roles(
        id uuid primary key default uuid_generate_v4(), 
        user_id uuid references users(user_id) not null,
        role_id int references roles(id) not null,
        created_at timestamp not null default current_timestamp
    );
  `);
}


export async function down(knex: Knex): Promise<void> {
}

