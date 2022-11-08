exports.up = (knex) => {
    return knex.schema.createTable("company", (table) => {
      table.string("id").primary();
      table.string("website");
      table.string("name");
      table.integer("founded");
      table.string("size");
      table.string("locality");
      table.string("region");
      table.string("country");
      table.string("industry");
      table.string("linkedin_url");
      table.unique(["id"], "company_id_unique");
    });
  };
  
  exports.down = (knex) => {
    return knex.schema.dropTableIfExists("company");
  };
  