/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', function(table) {
        table.increments();
        table.string('username');
        table.string('password');
        table.string('nomor');
        table.string('email').unique();
        table.string('otp_code').nullable();
        table.string('role');
        table.string('token')
        table.string('status').defaultTo('active');
        table.bigInteger('otp_expired').nullable();
        table.timestamps();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users')
};
