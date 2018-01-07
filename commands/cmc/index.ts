import { globalMarketData, lookupCoin } from "./api";
import { statsEmbed, tickerEmbed } from "./formatters";

const stats = () => statsEmbed(globalMarketData);

const ticker = query => {
  const coinData = lookupCoin(query);
  return coinData ? tickerEmbed(coinData) : coinNotFound();
};

export default (client, message, args) => {
  switch (args[0]) {
    // TODO: Support multiple tickers
    case "t":
    case "ticker":
      message.channel.send(ticker(args[1] || "BITB"));
      break;
    case "s":
    case "stats":
      message.channel.send(stats());
      break;
    case "r":
    case "rank":
      break;
    default:
      message.channel.send("???");
  }
};

const coinNotFound = () => {
  return {
    embed: {
      fields: [
        {
          name: `:poop: :poop:`,
          value: `Coin not found`
        }
      ]
    }
  };
};
