import { DB_CONFIG } from "./config";
import Database from "./db";

const test = async () => {
  const db = new Database(DB_CONFIG);
  await db.connect().then(db.init);
  // await db.dropAllTables();
};

test().then(() => {
  console.log("Done init");
});
