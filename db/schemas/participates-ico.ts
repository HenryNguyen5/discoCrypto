import { ITableInterface } from "../models/";
import Models from "../models/"; // Better way to do this?
const { Tables, Columns } = Models;

// Might want to use inheritance for this
export default class ParticipatesTable implements ITableInterface {
  public tName = Tables.PARTICIPATES_ICO;
  public cNames;

  constructor() {
    this.cNames = ["default"];
  }

  public generateTable = db => {
    return db.schema.hasTable(this.tName).then(exists => {
      if (!exists) {
        return db.schema.createTable(this.tName, this.tableSchema);
      }
      return Promise.resolve;
    });
  };

  private tableSchema = table => {
    const { ICO, ParticipatesICO, User } = Columns;

    table.string(ParticipatesICO.USERNAME, 100).notNullable();
    table.string(ParticipatesICO.ICO_NAME).notNullable();
    table.string(ParticipatesICO.ICO_OWNER, 100).notNullable();
    table.string(ParticipatesICO.TO_ADDR, 42).notNullable();
    table.string(ParticipatesICO.FROM_ADDR, 42).notNullable();
    table.decimal(ParticipatesICO.AMOUNT, 10, 2);
    table
      .dateTime(ParticipatesICO.DATE)
      .notNullable()
      .defaultTo(new Date().toUTCString()); // TODO: Change this

    table
      .foreign([
        ParticipatesICO.ICO_NAME,
        ParticipatesICO.ICO_OWNER,
        ParticipatesICO.TO_ADDR
      ])
      .references([ICO.NAME, ICO.OWNER, ICO.OWNER_ADDR])
      .inTable(Tables.ICO)
      .onDelete("CASCADE");

    table
      .foreign(ParticipatesICO.USERNAME)
      .references(User.USERNAME)
      .inTable(Tables.USER)
      .onDelete("CASCADE");

    table.primary([
      ParticipatesICO.USERNAME,
      ParticipatesICO.ICO_NAME,
      ParticipatesICO.ICO_OWNER,
      ParticipatesICO.TO_ADDR
    ]);
  };
}
