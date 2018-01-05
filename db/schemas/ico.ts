import { ITable } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
const ICOTable: ITable = {
  tName: Tables.ICO,
  cNames: ["default"],
  tableSchema: table => {
    const { ICO, User } = Columns;

    table.string(ICO.NAME, 100).notNullable();
    table.string(ICO.OWNER).notNullable();

    //   TODO: Add check so address is exactly 42
    table.string(ICO.OWNER_ADDR, 42).notNullable();
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
};

export default ICOTable;
