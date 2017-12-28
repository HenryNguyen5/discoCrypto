enum Tables {
  USER = "User",
  COIN = "Coin",
  ICO = "ICO",
  PARTICIPATES_ICO = "ParticipatesICO",
  TRANSACTION = "Transaction",
  EXCHANGE = "Exchange"
}

enum User {
  USERNAME = "username",
  ALIAS = "alias"
}

enum Coin {
  NAME = "name",
  TICKER = "ticker"
}

enum ICO {
  NAME = "name",
  OWNER = "owner",
  OWNER_ADDR = "o_address",
  TICKER = "ticker",
  DEADLINE = "deadline",
  MIN_TOTAL = "min",
  MAX_TOTAL = "max",
  MIN_INDIVIDUAL = "individual_min",
  MAX_INDIVIDUAL = "individual_max",
  METADATA = "metadata"
}

enum ParticipatesICO {
  USERNAME = "username",
  ICO_NAME = "ico_name",
  ICO_OWNER = "ico_owner",
  TO_ADDR = "to_address",
  FROM_ADDR = "from_address",
  AMOUNT = "amount",
  DATE = "date"
}

enum Transaction {
  USERNAME = "username",
  ICO_NAME = "ico_name",
  ICO_OWNER = "ico_owner",
  TO_ADDR = "to_address",
  TX_HASH = "txhash",
  METADATA = "metadata"
}

enum Exchange {
  EXCHANGE_NAME = "e_name",
  COIN_NAME = "c_name",
  BASE_UNIT = "base",
  DATE = "date",
  PRICE = "price"
}

const Columns = { User, Coin, ICO, ParticipatesICO, Transaction, Exchange };

export { Tables, Columns };
