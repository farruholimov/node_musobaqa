import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
  `); 

  await knex.raw(`
  create table if not exists sections(
    id uuid primary key default uuid_generate_v4(), 
    name varchar(128)
  );
`);

  await knex.raw(`
    create table if not exists users(
      user_id uuid primary key default uuid_generate_v4(),
      full_name varchar(32),
      phone varchar(13),  
      longitude varchar, 
      latitude varchar,    
      chat_id varchar not null,
      step int not null,
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp
    );
  `);

}


export async function down(knex: Knex): Promise<void> {
 
  await knex.raw(`
    drop table sections;
    drop table users;
  `);

   
}

