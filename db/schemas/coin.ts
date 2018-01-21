import { ICoinData, ICoinPrimary, ITable } from "../models";
import { Columns, Tables } from "../models/";

// Might want to use inheritance for this
const CoinTable: ITable = {
  tName: Tables.COIN,
  cNames: Columns.Coin,
  tableSchema: table => {
    const { Coin } = Columns;

    table.string(Coin.NAME, 100).notNullable();
    table.string(Coin.TICKER, 6).notNullable();
    table.primary([Coin.NAME]);
  },
  instanceOfPrimary: object => {
    return object.hasOwnProperty(this.cNames.NAME);
  },
  instanceOfData: object => {
    return (
      this.instanceOfPrimary(object) &&
      object.hasOwnProperty(this.cNames.TICKER)
    );
  }
};

export default CoinTable;
