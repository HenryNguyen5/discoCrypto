import { Config, ConnectionConfig } from "knex";
import * as knexDep from "knex";

import { Columns, Tables } from "./table-enum";

// Add a common interface for these
import * as coinGen from "./schemas/coin";
import * as exchangeGen from "./schemas/exchange";
import * as icoGen from "./schemas/ico";
import * as participateGen from "./schemas/participates-ico";
import * as transactionGen from "./schemas/transaction";
import * as userGen from "./schemas/user";

const DEBUG: boolean = true;

export default class Database {
  private static db;
  private static connection: ConnectionConfig;

  constructor(config: ConnectionConfig) {
    if (config !== Database.connection) {
      console.log(
        "Config changed! Please (re)connect to database via Database.connect()"
      );
      Database.connection = config;
    }
  }

  public connect = async () => {
    Database.db = knexDep({
      connection: Database.connection,
      client: "pg",
      debug: DEBUG
    });

    let success: boolean = false;

    await Database.db.raw("select 1+1 as result").then(() => {
      console.log("Successful connection");
      success = true;
    });

    return success;
  };

  public init = async () => {
    console.log("Commencing table validation/generation");

    try {
      const tableGen = [
        userGen.generateTable(Database.db),
        coinGen.generateTable(Database.db),
        icoGen.generateTable(Database.db),
        participateGen.generateTable(Database.db),
        transactionGen.generateTable(Database.db),
        exchangeGen.generateTable(Database.db)
      ];

      return tableGen.reduce((cur, next) => {
        return cur.then(next);
      });
    } catch (e) {
      console.log(e, "error");
    }
  };

  public getDb = () => {
    return Database.db;
  };

  // For DEBUG Purposes
  public dropAllTables = async () => {
    if (!DEBUG) {
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

    const x = tableStr.map(async str => {
      // exists = await knex.schema.hasTable(str);
      await Database.db.schema.dropTableIfExists(str).then(val => {
        console.log(`Dropped table ${str}\n`);
        // console.log(val);
      });
    });

    await Promise.all(x);
  };
}
