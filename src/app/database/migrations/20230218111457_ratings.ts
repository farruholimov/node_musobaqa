import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  await knex.raw(`
  create table if not exists ratings(
    id uuid primary key default uuid_generate_v4(),  
    master_id uuid references masters(id) not null, 
    user_id uuid references users(user_id) not null, 
    rating int not null,
    comment varchar,
    created_at timestamp not null default current_timestamp
    );
`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table ratings; 
  `);
};

// status 
// 0
// 

 