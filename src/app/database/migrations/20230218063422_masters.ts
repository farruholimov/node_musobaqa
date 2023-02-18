import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  await knex.raw(`
  create table if not exists masters(
    id uuid primary key default uuid_generate_v4(), 
    brand_name varchar(128),
    address varchar(128),
    average_time varchar not null,
    target varchar,
    start_time varchar,
    end_time varchar, 
    rating int,
    is_verified bool not null default false,
    section_id uuid references sections(id),
    user_id uuid references users(user_id),
    created_at timestamp not null default current_timestamp,
    updated_at timestamp not null default current_timestamp  
    );
`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table masters; 
  `);
}

