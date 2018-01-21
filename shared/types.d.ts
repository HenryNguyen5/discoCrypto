interface ICMCCoin {
  id: string;
  symbol: string;
  rank: string;
  name: string;
  price_usd: string;
  price_btc: string;
  volume_usd_24_h: string;
  market_cap_usd: string;
  available_supply: string;
  total_supply: string;
  max_supply: string;
  percent_change_1h: string;
  percent_change_24h: string;
  percent_change_7d: string;
  last_updated: string;
}

interface IExtendedCMCCoin extends ICMCCoin {
  price_eth: string;
}

type ReducerFunc<S, A> = (state: S, action: A) => S;

interface IAction {
  type: string;
  payload: any;
}

type ReducerMapObj<T extends IAction, S> = {
  [key in T["type"]]: ReducerFunc<S, T>
};

interface IAppState {
  cache: ICoinState;
}

// "id": "entcash",
// "name": "ENTCash",
// "symbol": "ENT",
// "rank": "1467",
// "price_usd": "0.150869",
// "price_btc": "0.00001056",
// "24h_volume_usd": null,
// "market_cap_usd": null,
// "available_supply": null,
// "total_supply": "600000000.0",
// "max_supply": "1600000000.0",
// "percent_change_1h": null,
// "percent_change_24h": null,
// "percent_change_7d": null,
// "last_updated": "1515562159"
