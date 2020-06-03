exports.up = function(knex) {
    return knex.schema
        .createTable('users', table => {
            table.increments('id');
            table.string('email').unique().notNullable();
            table.string('password_hash').notNullable();
            table.string('name').notNullable();
            table.string('surname').notNullable();
            table.text('bio');
            table.string('country').notNullable();
            table.string('city');
            table.string('photo_url').unique();
            table.timestamps();
        })
        .createTable('events', table => {
            table.increments('id');
            table.string('name').notNullable();
            table.text('description').notNullable();
            table.timestamp('start_date').notNullable().defaultTo(knex.fn.now());
            table.timestamp('end_date').notNullable().defaultTo(knex.fn.now());
            table.string('country').notNullable();
            table.string('city').notNullable();
            table.string('location').notNullable();
            table.integer('price').notNullable();
            table.string('photo_url').unique().notNullable();
            table.integer('organizer_id').unsigned();
            table.foreign('organizer_id').references('users.id').onDelete('CASCADE');
            table.unique([ 'name', 'start_date', 'country', 'city', 'location' ]);
        })
        .createTable('event_visitors', table => {
            table.integer('event_id').unsigned();
            table.integer('user_id').unsigned();
            table.foreign('event_id').references('events.id').onDelete('CASCADE');
            table.foreign('user_id').references('users.id').onDelete('CASCADE');
        })
        .createTable('categories', table => {
            table.increments('id');
            table.string('name').unique();
        })
        .createTable('categories_by_events', table => {
            table.integer('event_id').unsigned();
            table.integer('category_id').unsigned();
            table.foreign('event_id').references('events.id').onDelete('CASCADE');
            table.foreign('category_id').references('categories.id').onDelete('CASCADE');
        });
};

exports.down = function(knex) {
    return knex.schema
        .dropTable('users')
        .dropTable('events')
        .dropTable('event_visitors')
        .dropTable('categories')
        .dropTable('categories_by_events');
};
