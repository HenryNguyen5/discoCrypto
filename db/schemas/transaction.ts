import { ITable } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
const TransactionTable: ITable = {
  tName: Tables.TRANSACTION,
  cNames: ["default"],
  tableSchema: table => {
    const { ICO, Transaction, User } = Columns;

    table.string(Transaction.USERNAME, 100).notNullable();
    table.string(Transaction.ICO_NAME).notNullable();
    table.string(Transaction.ICO_OWNER, 100).notNullable();
    table.string(Transaction.TO_ADDR, 42).notNullable(); //   TODO: Add check public key is exactly 42 characters long
    table.string(Transaction.TX_HASH, 66); //   TODO: Add check hash is exactly 66 characters long
    table.json(Transaction.METADATA);

    table
      .foreign(Transaction.USERNAME)
      .references(User.USERNAME)
      .inTable(Tables.USER)
      .onDelete("CASCADE");

    table
      .foreign([
        Transaction.ICO_NAME,
        Transaction.ICO_OWNER,
        Transaction.ICO_OWNER
      ])
      .references([ICO.NAME, ICO.OWNER, ICO.OWNER_ADDR])
      .inTable(Tables.ICO)
      .onDelete("CASCADE");

    table.primary([
      Transaction.USERNAME,
      Transaction.ICO_NAME,
      Transaction.ICO_OWNER,
      Transaction.TO_ADDR,
      Transaction.TX_HASH
    ]);
  }
};

export default TransactionTable;
