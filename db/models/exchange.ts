enum Exchange {
  EXCHANGE_NAME = "e_name",
  COIN_NAME = "c_name",
  BASE_UNIT = "base",
  DATE = "date",
  PRICE = "price"
}

interface IExchangePrimary {
  exchange_name: string;
  coin_name: string;
  base_unit: string;
  date: Date;
}

interface IExchangeData extends IExchangePrimary {
  price: number;
}

export { Exchange, IExchangePrimary, IExchangeData };
