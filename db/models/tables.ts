export enum Tables {
  USER = "User",
  COIN = "Coin",
  ICO = "ICO",
  PARTICIPATES_ICO = "ParticipatesICO",
  TRANSACTION = "Transaction",
  EXCHANGE = "Exchange"
}

export interface ITableInterface {
  tName: Tables;
  cNames: string[]; // Could import proper types but creates circular dependency - also not sure if this property is necessary yet
  generateTable(db: any); // TODO: Use knex db object as type
  // tableSchema(table: any); // TODO: Use knex table obects as type
  // TODO: Add basic universal table queries
}
