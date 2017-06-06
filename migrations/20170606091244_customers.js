
exports.up = function(knex, Promise) {
  return knex.schema.createTable('customers', (t) =>{
   t.increments('id');
   t.string('name').notNullable()
   t.integer('seller_id');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('customers');
};
