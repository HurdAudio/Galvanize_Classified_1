'use strict';
exports.up = function(knex, Promise) {
  return knex.schema.createTable('classifieds', function(table) {
    table.increments().primary();
    table.string('title');
    table.string('description');
    table.decimal('price');
    table.string('item_image');
    table.timestamps(true, true);

  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('classifieds');

};
