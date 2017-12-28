import { knex } from "../connect";
import { Columns, Tables } from "../table-enum";

function generateTable() {
  return knex.schema.hasTable(Tables.ICO).then(exists => {
    if (!exists) {
      return knex.schema.createTable(Tables.ICO, tableSchema);
    }
    return Promise.resolve;
  });
}

function tableSchema(table) {
  const { ICO, User } = Columns;

  table.string(ICO.NAME, 100).notNullable().onDelete("CASCADE");
  table.string(ICO.OWNER).notNullable().onDelete("CASCADE");

  //   TODO: Add check so address is exactly 42
  table.string(ICO.OWNER_ADDR, 42).notNullable().onDelete("CASCADE");
  table.string(ICO.TICKER, 6).notNullable();
  table.dateTime(ICO.DEADLINE).notNullable();

  //   TODO: Add better checks for these values (ie. min < max)
  table.integer(ICO.MIN_TOTAL).defaultTo(0);
  table.integer(ICO.MAX_TOTAL);
  table.integer(ICO.MIN_INDIVIDUAL).defaultTo(0);
  table.integer(ICO.MAX_INDIVIDUAL);
  table.json(ICO.METADATA);

  table
    .foreign(ICO.OWNER)
    .references(User.USERNAME)
    .inTable(Tables.USER)
    .onDelete("CASCADE"); // Should probably change this
  table.primary([ICO.NAME, ICO.OWNER, ICO.OWNER_ADDR]);
}

export { generateTable };
