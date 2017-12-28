import { Config } from "knex";
import * as knexDep from "knex";
import { Columns, Tables } from "./table-enum";

// Add a common interface for these
import * as coinGen from "./schemas/coin";
import * as exchangeGen from "./schemas/exchange";
import * as icoGen from "./schemas/ico";
import * as participateGen from "./schemas/participates-ico";
import * as transactionGen from "./schemas/transaction";
import * as userGen from "./schemas/user";

// TODO: Add envars to heroku
const config: Config = {
  client: "pg",
  connection: {
    ssl: true,
    host: "ec2-107-22-174-187.compute-1.amazonaws.com",
    database: "dbs1t1p9dhnl30",
    user: "dorcdtfpjfterw",
    port: "5432",
    password: "017142ed5ecfc5ea6b35c7ee5e266b1fa43f76e520130718d924ed205a7712ca"
  },
  debug: true
};

const knex = knexDep(config);

const init = async () => {
  try {
    const tableGen = [
      userGen.generateTable(),
      coinGen.generateTable(),
      icoGen.generateTable(),
      participateGen.generateTable(),
      transactionGen.generateTable(),
      exchangeGen.generateTable()
    ];

    return tableGen.reduce((cur, next) => {
      return cur.then(next);
    });
  } catch (e) {
    console.log(e, "error");
  }
};

init().then(() => {
  console.log("done!!");
});

async function dropAllTables() {
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
    await knex.schema.dropTableIfExists(str).then(val => {
      console.log(`Dropped table ${str}\n`);
      // console.log(val);
    });
  });

  await Promise.all(x);
}

export { knex };
