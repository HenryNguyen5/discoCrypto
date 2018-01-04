import { ITableInterface } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
export default class UserTable implements ITableInterface {
  public tName = Tables.USER;
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
    const { User } = Columns;

    table.string(User.USERNAME, 64).notNullable();
    table.string(User.ALIAS, 64).notNullable();
    table.boolean(User.VERIFIED).notNullable().defaultTo(false);

    table.primary([User.USERNAME]);
  };
}
