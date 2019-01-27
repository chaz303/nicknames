exports.up = function(knex, Promise) {
  return Promise.all([
      knex.schema.createTable("name", (table) => {
          table.increments("id").primary();
          table.string("name").unique();
          table.string("name_normed").index();
          table.boolean("is_masculine").defaultTo(0);
          table.boolean("is_feminine").defaultTo(0);
      }),
      knex.schema.createTable("nickname", (table) => {
          table.increments("id").primary();
          table.string("nickname").unique();
          table.string("nickname_normed").index();
          table.boolean("is_masculine").defaultTo(0);
          table.boolean("is_feminine").defaultTo(0);
      }),
      knex.schema.createTable("name_to_nickname", (table) => {
          table.increments("id").primary();
          table.integer("name_id");
          table.integer("nickname_id");
      }),
  ]).catch((err) => console.log(err));
};
  
exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable("name"),
      knex.schema.dropTable("nickname"),
      knex.schema.dropTable("name_to_nickname")
  ])    
};
  
