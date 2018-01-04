import { Coin } from "./coin";
import { Exchange } from "./exchange";
import { ICO } from "./ico";
import { ParticipatesICO } from "./participates-ico";
import * as TableInfo from "./tables";
import { Transaction } from "./transaction";
import { User } from "./user";

const Columns = { Coin, Exchange, ICO, ParticipatesICO, Transaction, User };
const { Tables } = TableInfo;

export { ITableInterface } from "./tables";
export default { Columns, Tables };
