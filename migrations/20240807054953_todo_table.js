/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('todo_list', (table) => {
    table.increments();
    table.string('description').notNullable();
    table.dateTime('created_at').defaultTo(knex.fn.now()).notNullable();
    table.boolean('is_completed').defaultTo(false);
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo_list')
};
