import discordConfig from "./config";
import Database from "./db";

const test = async () => {
  const db = new Database(discordConfig.DB_CONNECTION_CONFIG);
  await db.connect().then(db.init);
  // await db.dropAllTables();
  return db.getDb();
};

test().then(db => {
  console.log("Done!");
});
