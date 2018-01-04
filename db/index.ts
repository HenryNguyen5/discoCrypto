import { Config, ConnectionConfig } from "knex";
import * as knexDep from "knex";

// Better way to do this?
import Models from "./models/";
const { Tables, Columns } = Models;

import CoinTable from "./schemas/coin";
import ExchangeTable from "./schemas/exchange";
import ICOTable from "./schemas/ico";
import ParticipatesTable from "./schemas/participates-ico";
import TransactionTable from "./schemas/transaction";
import UserTable from "./schemas/user";

const DEBUG: boolean = true;

export default class Database {
  private static db;
  private static connection: ConnectionConfig;

  constructor(config: ConnectionConfig) {
    if (config !== Database.connection) {
      console.log(
        "Config changed! Please (re)connect to database via Database.connect()"
      );
    }
    Database.connection = config;
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
      const tableGen = [
        new UserTable(),
        new CoinTable(),
        new ICOTable(),
        new ParticipatesTable(),
        new TransactionTable(),
        new ExchangeTable()
      ];

      const tableStr = [
        Tables.USER,
        Tables.COIN,
        Tables.ICO,
        Tables.PARTICIPATES_ICO,
        Tables.TRANSACTION,
        Tables.EXCHANGE
      ];

      for (const fn of tableGen) {
        await fn.generateTable(Database.db);
      }
    } catch (err) {
      console.log("Error generating tables", err);
    }
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
}
