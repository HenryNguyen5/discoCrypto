import { knex } from "../connect";
import { Columns, Tables } from "../table-enum";

function generateTable() {
  return knex.schema.hasTable(Tables.COIN).then(exists => {
    if (!exists) {
      return knex.schema.createTable(Tables.COIN, tableSchema);
    }
    return Promise.resolve();
  });
}

function tableSchema(table) {
  const { Coin } = Columns;

  table.string(Coin.NAME, 100).notNullable().onDelete("CASCADE");
  table.string(Coin.TICKER, 6).notNullable();
  table.primary([Coin.NAME]);
}

export { generateTable };
