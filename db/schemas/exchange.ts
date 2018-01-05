import { ITable } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
const ExchangeTable: ITable = {
  tName: Tables.EXCHANGE,
  cNames: ["default"],
  tableSchema: table => {
    const { Coin, Exchange } = Columns;

    table.string(Exchange.EXCHANGE_NAME).notNullable();
    table.string(Exchange.COIN_NAME, 100).notNullable();
    table.string(Exchange.BASE_UNIT, 100).notNullable();
    table.dateTime(Exchange.DATE).notNullable();
    table.decimal(Exchange.PRICE, 10, 8).notNullable();

    // Have to seperate these two FKs as they reference same PK - something weird with knex
    table
      .foreign(Exchange.COIN_NAME)
      .references(Coin.NAME)
      .inTable(Tables.COIN)
      .onDelete("CASCADE"); // TODO: Change this

    table
      .foreign(Exchange.BASE_UNIT)
      .references(Coin.NAME)
      .inTable(Tables.COIN)
      .onDelete("CASCADE"); // TODO: Change this

    table.primary([
      Exchange.EXCHANGE_NAME,
      Exchange.COIN_NAME,
      Exchange.BASE_UNIT,
      Exchange.DATE
    ]);
  }
};

export default ExchangeTable;
