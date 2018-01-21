/* Imports */

// Knex
import { Config, ConnectionConfig } from "knex";
import * as knexDep from "knex";

// Interface Importing
import { ITable } from "./models";

// Enum Importing
import { Columns, Tables } from "./models/";

// Table Object Importing
import CoinTable from "./schemas/coin";
import ExchangeTable from "./schemas/exchange";
import ICOTable from "./schemas/ico";
import ParticipatesTable from "./schemas/participates-ico";
import TransactionTable from "./schemas/transaction";
import UserTable from "./schemas/user";

/* End Imports */

const DEBUG: boolean = true;

export default class Database {
  private static db;
  private static connection: ConnectionConfig;
  private tables: [ITable];

  constructor(config: ConnectionConfig) {
    if (config !== Database.connection) {
      console.log(
        "Config changed! Please (re)connect to database via Database.connect()"
      );
    }
    Database.connection = config;
    this.tables = [
      // Tables stored in DB here (order matters - FKs)
      UserTable,
      CoinTable,
      ICOTable,
      ParticipatesTable,
      TransactionTable,
      ExchangeTable
    ];
  }

  public connect = async () => {
    Database.db = knexDep({
      connection: Database.connection,
      client: "pg",
      debug: DEBUG
    });

    let success: boolean = false;

    await Database.db
      .raw("select 1+1 as result")
      .then(() => {
        console.log("Successful connection");
        success = true;
      })
      .catch(err => {
        console.log("Failed to connect to db\n", err);
      });

    return success;
  };

  // Assume connection was a success if not chained directly from connect().then(init)
  public init = async (connSuccess: boolean = true) => {
    if (!connSuccess || !Database.db) {
      throw new Error("Trying to initialize with failed/no connection");
    }

    console.log("Commencing table validation/generation");

    try {
      // Sequentially execute table generation as FKs depend on other tables
      for (const table of this.tables) {
        await this.generateTable(table);
      }
    } catch (err) {
      console.log("Error generating tables", err);
    }
  };

  // Selects a single entry by object of primary keys
  public selectByPK = async (table: Tables, data: any) => {
    const sTable = this.selectedTable(table);

    // Might mess up flow
    if (!sTable.instanceOfPrimary(data)) {
      throw new Error(`Invalid Primary Keys for Selected Table=${table}`);
    }

    return await Database.db(table).where(data).select();
  };

  // Inserts data into table
  public insert = async (table: Tables, data: any) => {
    const sTable = this.selectedTable(table);

    // Might mess up flow
    if (!sTable.instanceOfData(data)) {
      // Possible null values would break this if statement
      throw new Error(`Invalid data for selected Table=${table}`);
    }

    return await Database.db(table).insert(data);
  };

  get db() {
    return Database.db;
  }

  // For DEBUG Purposes
  public dropAllTables = async (connSuccess: boolean = true) => {
    if (!DEBUG || !connSuccess || !Database.db) {
      return;
    }

    const tableStr = [
      Tables.USER,
      Tables.COIN,
      Tables.ICO,
      Tables.PARTICIPATES_ICO,
      Tables.TRANSACTION,
      Tables.EXCHANGE
    ];

    try {
      const x = tableStr.map(async str => {
        // exists = await knex.schema.hasTable(str);
        await Database.db.schema.dropTableIfExists(str).then(val => {
          console.log(`Dropped table ${str}\n`);
          // console.log(val);
        });
      });

      await Promise.all(x);
    } catch (err) {
      console.log("Drop all tables failed", err);
    }
  };

  private generateTable = (table: ITable) => {
    return Database.db.schema.hasTable(table.tName).then(exists => {
      if (!exists) {
        return Database.db.schema.createTable(table.tName, table.tableSchema);
      }
      return Promise.resolve();
    });
  };

  private selectedTable = (table: Tables) => {
    for (const t of this.tables) {
      if (t.tName === table) {
        return t;
      }
    }

    throw new Error("Bad table specified");
  };
}
