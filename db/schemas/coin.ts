import { ITableInterface } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
export default class CoinTable implements ITableInterface {
  public tName = Tables.COIN;
  public cNames;

  constructor() {
    this.cNames = ["default"];
  }

  public generateTable = db => {
    return db.schema.hasTable(this.tName).then(exists => {
      if (!exists) {
        return db.schema.createTable(this.tName, this.tableSchema);
      }
      return Promise.resolve();
    });
  };

  private tableSchema = table => {
    const { Coin } = Columns;

    table.string(Coin.NAME, 100).notNullable();
    table.string(Coin.TICKER, 6).notNullable();
    table.primary([Coin.NAME]);
  };
}
