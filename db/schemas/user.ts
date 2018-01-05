import { ITable } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

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
  }
};

export default UserTable;
