import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    
  await knex.raw(`
  create table if not exists calendar(
    id uuid primary key default uuid_generate_v4(),  
    master_id uuid references masters(id) not null, 
    day timestamp not null,
    start_time timestamp not null,
    end_time timestamp not null,
    busy bool default false,
    created_at timestamp not null default current_timestamp
    );
`);

}


export async function down(knex: Knex): Promise<void> {
    await knex.raw(`
    drop table calendar; 
  `);
};



// master_calendar

// id 1
// master_id
// day 22.01
// start_time 10:30
// end_time  11:00
//status 

// id 1
// master_id
// day 22.01
// start_time 11:00
// end_time  11:30



 

