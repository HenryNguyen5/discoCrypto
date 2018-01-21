import { ITable, IUserData, IUserPrimary } from "../models/";
import { Columns, Tables } from "../models/"; // Better way to do this?

// Might want to use inheritance for this
const UserTable: ITable = {
  tName: Tables.USER,
  cNames: Columns.User,
  tableSchema: table => {
    const { User } = Columns;

    table.string(User.USERNAME, 64).notNullable();
    table.string(User.ALIAS, 64).notNullable();
    table.boolean(User.VERIFIED).notNullable().defaultTo(false);

    table.primary([User.USERNAME]);
  },
  instanceOfPrimary: object => {
    return object.hasOwnProperty(this.cNames.USERNAME);
  },
  instanceOfData: object => {
    // TODO: Add support for arrays
    return (
      this.instanceOfPrimary(object) &&
      object.hasOwnProperty(this.cNames.ALIAS) &&
      object.hasOwnProperty(this.cNames.VERIFIED)
    );
  }
};

export default UserTable;
