import { Columns, Tables } from "../table-enum";

function generateTable(db) {
  return db.schema.hasTable(Tables.COIN).then(exists => {
    if (!exists) {
      return db.schema.createTable(Tables.COIN, tableSchema);
    }
    return Promise.resolve();
  });
}

function tableSchema(table) {
  const { Coin } = Columns;

  table.string(Coin.NAME, 100).notNullable();
  table.string(Coin.TICKER, 6).notNullable();
  table.primary([Coin.NAME]);
}

export { generateTable };
