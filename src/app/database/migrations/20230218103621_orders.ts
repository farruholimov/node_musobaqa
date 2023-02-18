import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  await knex.raw(`
  create table if not exists orders(
    id uuid primary key default uuid_generate_v4(),  
    master_id uuid references masters(id) not null, 
    calendar_id uuid references calendars(id) not null,
    user_id uuid references users(user_id) not null,
    status int default 0,
    created_at timestamp not null default current_timestamp
    );
`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table orders; 
  `);
};

// status 
// 0
// 

 