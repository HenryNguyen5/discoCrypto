import * as request from "request-promise-native";

const BASE_URL = "https://api.coinmarketcap.com/v1";
const MINUTE = 1000 * 60;
const FIVE_MINUTES = MINUTE * 5; // cmc updates endpoints every 5 minutes
const DAY = MINUTE * 60 * 24;

const reqBase = request.defaults({
  baseUrl: BASE_URL,
  json: true
});

async function requestGlobalData() {
  return await reqBase.get("/global");
}

async function requestCoinData(limit: number) {
  return await reqBase.get(`/ticker?limit=${limit}`);
}

async function requestCoinByID(id: string) {
  return await reqBase.get(`/ticker/${id}`);
}

// const updateCmcCache = async () => {
//   tickers = coinArray.reduce(
//     (coins, currCoin) => ({ ...coins, [currCoin.id]: currCoin }),
//     {}
//   );

//   symbols = coinArray.reduce(
//     (coins, currCoin) => ({ ...coins, [currCoin.symbol]: currCoin }),
//     {}
//   );
// };

export { requestCoinByID, requestCoinData, requestGlobalData };

class CoinMarketCapCache {
  private coins: any;
  private global: any;

  constructor() {
    this.Monitor();
  }

  // Monitors coin market cap indefinitely
  private Monitor() {
    function getGlobal() {
      return requestGlobalData();
    }

    function getTickers() {
      return requestCoinData(500);
    }

    const intervalFxn = async () => {
      const global = await getGlobal();

      if (global.success) {
        this.global = global;
      }

      const coins = await getTickers();

      if (coins.success) {
        this.coins = this.parseCoins(coins.result);
      }
    };

    setInterval(intervalFxn, FIVE_MINUTES);
  }

  private parseCoins(response) {
    let ethBtcPrice: string = "1";

    ethBtcPrice = response.find(e => {
      return e.id === "ethereum";
    }).price_btc;

    this.coins = response.map(c => ({
      ...c,
      price_eth: `${(parseFloat(c.price_btc) / parseFloat(ethBtcPrice)).toFixed(
        8
      )}`
    }));
  }
}
