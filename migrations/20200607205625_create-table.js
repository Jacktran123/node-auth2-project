
exports.up = function(knex) {
  return knex.schema.createTable('User', table=>{
      table.increments('id');
      table.string('Username',128).notNullable;
      table.string('Password',128).notNullable;
      table.string('Department',128).notNullable;
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('User');
};
