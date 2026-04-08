/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('items', function(table){
        table.increments()
        table.string('title')
        table.text('description')
        table.text('image')
        table.text('location')
        table.enu('status', ['lost', 'found'])
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('users.id').onDelete('cascade')
        table.string('category')
        table.timestamps()
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('items')
};
