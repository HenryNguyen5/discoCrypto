import { ITable } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
const CoinTable: ITable = {
  tName: Tables.COIN,
  cNames: ["default"],
  tableSchema: table => {
    const { Coin } = Columns;

    table.string(Coin.NAME, 100).notNullable();
    table.string(Coin.TICKER, 6).notNullable();
    table.primary([Coin.NAME]);
  }
};

export default CoinTable;
