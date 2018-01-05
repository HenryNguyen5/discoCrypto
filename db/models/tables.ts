export enum Tables {
  USER = "User",
  COIN = "Coin",
  ICO = "ICO",
  PARTICIPATES_ICO = "ParticipatesICO",
  TRANSACTION = "Transaction",
  EXCHANGE = "Exchange"
}

export interface ITable {
  tName: Tables;
  cNames: string[]; // Could import proper types but creates circular dependency - also not sure if this property is necessary yet
  tableSchema(table: any); // TODO: Use knex table obects as type
  instanceOfPrimary(object: object);
  instanceOfData(object: object);
}
