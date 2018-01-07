import { flatten, formatting } from "../../util/formatting";
import { lookupCoin } from "../cmc/api";
interface ICoin {
  rank;
  name;
  symbol;
  price_usd;
  price_btc;
  price_eth;
  percent_change_1h;
  percent_change_24h;
  percent_change_7d;
  market_cap_usd;
}
interface IPortfolioEntry {
  name;
  symbol;
  rank;
  price_usd;
  price_btc;
  price_eth;
  percent_change_24h;
  market_cap_usd;
}

const createPortfolioMessage = (portfolio, username) => {
  const array = new Array();
  truncate(flatten(portfolio), username, array);
  return array;
};

const truncate = (fieldList, user, array) => {
  array.push({
    embed: { title: `${user}'s Portfolio`, fields: fieldList },
    personal: true
  });
  if (fieldList.length > 24) {
    truncate(fieldList.slice(24), user, array);
  }
  return array;
};

const portfolioEmbed = (port, unitsOwned: number) => {
  const {
    name,
    symbol,
    rank,
    price_usd,
    price_btc,
    price_eth,
    percent_change_24h,
    market_cap_usd
  } = port;

  return [
    {
      name: `:rocket:${port.rank}    ${port.name}  ${port.symbol}`,
      value: `
Units Owned: ${unitsOwned}`
    },
    {
      name: `Market Values`,
      value: `
USD: ${formatting.dollarFormat(port.price_usd)} | ${formatting.dollarFormat(
        port.price_usd * unitsOwned
      )}
BTC: ${formatting.btcFormat(port.price_btc)} | ${formatting.btcFormat(
        port.price_btc * unitsOwned
      )}
ETH: ${formatting.ethFormat(port.price_eth)} | ${formatting.ethFormat(
        port.price_eth * unitsOwned
      )}

24 Hour Change: ${formatting.percentFormat(port.percent_change_24h)}`
    }
  ];
};

const tickerEmbed = (coinTicker: ICoin) => {
  const embed = {
    title: `:rocket:${coinTicker.rank}     ${coinTicker.name}     ${coinTicker.symbol}`,
    fields: [
      {
        name: `Market Values`,
        value: `
USD: ${formatting.dollarFormat(coinTicker.price_usd)}
ETH: ${formatting.ethFormat(coinTicker.price_eth)}
BTC: ${formatting.btcFormat(coinTicker.price_btc)}`
      },
      {
        name: `Market Changes`,
        value: `
1 Hour: ${formatting.percentFormat(coinTicker.percent_change_1h)}
24 Hours: ${formatting.percentFormat(coinTicker.percent_change_24h)}
7 Days: ${formatting.percentFormat(coinTicker.percent_change_7d)}`
      },
      {
        name: `Market Cap`,
        value: `
${coinTicker.market_cap_usd
          ? formatting.dollarFormat(coinTicker.market_cap_usd)
          : "N/A"}`
      }
    ],
    personal: false
  };
  return { embed };
};

const statsEmbed = stats => {
  const {
    total_market_cap_usd,
    total_24h_volume_usd,
    bitcoin_percentage_of_market_cap,
    active_currencies,
    active_assets,
    active_markets
  } = stats;
  return {
    embed: {
      fields: [
        {
          name: `Stats`,
          value: `
Total Market Cap(USD): ${formatting.dollarFormat(stats.total_market_cap_usd)}
Total 24h Volume(USD): ${formatting.dollarFormat(stats.total_24h_volume_usd)}
Bitcoin Percentage of Market Cap: ${formatting.percentFormat(
            stats.bitcoin_percentage_of_market_cap
          )}
Active Currencies: ${stats.active_currencies}
Active Assets: ${stats.active_assets}
Active Markets: ${stats.active_markets}`
        }
      ]
    }
  };
};

export { portfolioEmbed, tickerEmbed, createPortfolioMessage, statsEmbed };
