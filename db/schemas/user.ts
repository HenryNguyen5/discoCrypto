import { knex } from "../connect";
import { Columns, Tables } from "../table-enum";

function generateTable() {
  return knex.schema.hasTable(Tables.USER).then(exists => {
    if (!exists) {
      return knex.schema.createTable(Tables.USER, tableSchema);
    }
    return Promise.resolve();
  });
}

function tableSchema(table) {
  const { User } = Columns;

  table.string(User.USERNAME, 64).notNullable().onDelete("CASCADE");
  table.string(User.ALIAS, 64).notNullable();
  table.primary([User.USERNAME]);
}

export { generateTable };
