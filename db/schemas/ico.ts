import { IICOData, IICOPrimary, ITable } from "../models/";
import { Columns, Tables } from "../models/";

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
  },
  instanceOfPrimary: object => {
    return (
      object.hasOwnProperty("name") &&
      object.hasOwnProperty("owner") &&
      object.hasOwnProperty("owner_addr")
    );
  },
  instanceOfData: object => {
    return (
      this.instanceOfPrimary(object) &&
      object.hasOwnProperty("ticker") &&
      object.hasOwnProperty("deadline") &&
      object.hasOwnProperty("min_total") &&
      object.hasOwnProperty("max_total") &&
      object.hasOwnProperty("min_individual") &&
      object.hasOwnProperty("max_individual") &&
      object.hasOwnProperty("metadata")
    );
  }
};

export default ICOTable;
