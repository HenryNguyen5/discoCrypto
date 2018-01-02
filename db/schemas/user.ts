import { Columns, Tables } from "../table-enum";

function generateTable(db) {
  return db.schema.hasTable(Tables.USER).then(exists => {
    if (!exists) {
      return db.schema.createTable(Tables.USER, tableSchema);
    }
    return Promise.resolve();
  });
}

function tableSchema(table) {
  const { User } = Columns;

  table.string(User.USERNAME, 64).notNullable();
  table.string(User.ALIAS, 64).notNullable();
  table.boolean(User.VERIFIED).notNullable().defaultTo(false);

  table.primary([User.USERNAME]);
}

export { generateTable };
