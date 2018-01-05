enum Coin {
  NAME = "name",
  TICKER = "ticker"
}

interface ICoinPrimary {
  name: string;
}

interface ICoinData extends ICoinPrimary {
  ticker: string;
}

export { Coin, ICoinPrimary, ICoinData };
