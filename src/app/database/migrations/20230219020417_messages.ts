import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  await knex.raw(`
  create table if not exists messages(
    id uuid primary key default uuid_generate_v4(),   
    chat_id varchar not null,
    comment text not null,
    created_at timestamp not null default current_timestamp
    );
`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table messages; 
  `);
};

// status 
// 0
// 

 