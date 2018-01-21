import { store } from "../../store";
import { getCoinFromCache } from "../../store/cache";
import { statsEmbed, tickerEmbed } from "./formatters";

export default (client, message, args) => {
  switch (args[0]) {
    // TODO: Support multiple tickers
    case "t":
    case "ticker":
      const coin = getCoinFromCache(store.getState(), args[1] || "BITB");
      if (!coin) {
        message.channel.send("Coin not found");
        break;
      }
      message.channel.send(tickerEmbed(coin));

      break;
    case "s":
    case "stats":
      message.channel.send("Not Working :)");
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
