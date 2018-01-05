enum Transaction {
  USERNAME = "username",
  ICO_NAME = "ico_name",
  ICO_OWNER = "ico_owner",
  TO_ADDR = "to_address",
  TX_HASH = "txhash",
  METADATA = "metadata"
}

interface ITransactionPrimary {
  username: string;
  ico_name: string;
  ico_owner: string;
  to_address: string;
  txhash: string;
}

interface ITransactionData extends ITransactionPrimary {
  metadata: object;
}

export { Transaction, ITransactionPrimary, ITransactionData };
