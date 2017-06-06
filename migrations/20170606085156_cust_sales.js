
exports.up = function(knex, Promise) {
  return knex.schema.createTable('cust_sales', (t) =>{
   t.increments('id');
   t.integer('seller_id')
   t.integer('cust_id');
   t.decimal('sales_tax')
   t.decimal('sales_discount')
   t.decimal('sale_cost')
   t.decimal('total_sale')
   t.integer('sale_quantity')
   t.integer('prod_id');
   t.string('customer_name')
   t.string('product_name')
   t.text('sale_date');
 })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cust_sales');
};
