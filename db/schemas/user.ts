import { ITable, IUserData, IUserPrimary } from "../models/";
import { Columns, Tables } from "../models/"; // Better way to do this?

// Might want to use inheritance for this
const UserTable: ITable = {
  tName: Tables.USER,
  cNames: ["default"],
  tableSchema: table => {
    const { User } = Columns;

    table.string(User.USERNAME, 64).notNullable();
    table.string(User.ALIAS, 64).notNullable();
    table.boolean(User.VERIFIED).notNullable().defaultTo(false);

    table.primary([User.USERNAME]);
  },
  instanceOfPrimary: object => {
    return object.hasOwnProperty("username");
  },
  instanceOfData: object => {
    // TODO: Add support for arrays
    // TODO: Use column enums
    return (
      this.instanceOfPrimary(object) &&
      object.hasOwnProperty("alias") &&
      object.hasOwnProperty("verified")
    );
  }
};

export default UserTable;
