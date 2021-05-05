exports.up = function(knex) {
    return knex.schema.createTable('menu', function(table){
        table.increments();

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('rest_id').notNullable();

        table.foreign('rest_id').references('id').inTable('restaurant');
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('menu');
};
