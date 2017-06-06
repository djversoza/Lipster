
exports.up = function(knex, Promise) {
  return knex.schema.createTable('items', (t) =>{
   t.increments('id');
   t.string('name');
   t.string('color')
   t.integer('user_id');
   t.integer('quantity');
   t.decimal('cost');
   t.decimal('tax');
   t.decimal('discount');
   t.decimal('total_cost')
   t.decimal('retail_cost');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('items');
};
