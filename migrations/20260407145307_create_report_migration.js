/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('report', function(table){
        table.increments()
        table.integer('user_id').unsigned()
        table.integer('item_id').unsigned()
        table.text('proof')
        table.text('reason')
        table.timestamps()

        table.foreign('user_id').references('users.id').onDelete('cascade')
        table.foreign('item_id').references('items.id').onDelete('cascade')
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('report')
};
