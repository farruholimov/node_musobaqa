import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {

  await knex.schema.raw(`
    create extension if not exists "uuid-ossp";
  `); 

  await knex.raw(`
  create table if not exists sections(
    section_id uuid primary key default uuid_generate_v4(), 
    name varchar(128)
  );
`);

  await knex.raw(`
    create table if not exists users(
      user_id uuid primary key default uuid_generate_v4(),
      created_at timestamp not null default current_timestamp,
      updated_at timestamp not null default current_timestamp,
      full_name varchar(32) not null,
      phone varchar(13) not null,
      brand_name varchar(128),
      address varchar(128),
      avarage_time varchar not null,
      target varchar,
      start_time varchar,
      end_time varchar,
      langitude varchar not null, 
      longitude varchar not null,   
      is_verified bool not null default false
    );
  `);

}


export async function down(knex: Knex): Promise<void> {
 
  await knex.raw(`
    drop table sections;
    drop table users;
  `);

   
}

