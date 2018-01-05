// Enums
import { Coin } from "./coin";
import { Exchange } from "./exchange";
import { ICO } from "./ico";
import { ParticipatesICO } from "./participates-ico";
import { Tables } from "./tables";
import { Transaction } from "./transaction";
import { User } from "./user";

const Columns = { Coin, Exchange, ICO, ParticipatesICO, Transaction, User };

export { Columns, Tables };

// Interfaces
export { ITable } from "./tables";
export { ICoinPrimary, ICoinData } from "./coin";
export { IExchangePrimary, IExchangeData } from "./exchange";
export { IICOPrimary, IICOData } from "./ico";
export { IParticipatesPrimary, IParticipatesData } from "./participates-ico";
export { ITransactionPrimary, ITransactionData } from "./transaction";
export { IUserPrimary, IUserData } from "./user";
