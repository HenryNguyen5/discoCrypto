import * as Discord from 'discord.js'
import * as format from 'format-number'
interface coin {
    rank,
    name,
    symbol,
    price_usd,
    price_btc,
    price_eth,
    percent_change_1h,
    percent_change_24h,
    percent_change_7d,
    market_cap_usd
}

const formatting = {
    dollarFormat: format({ prefix: '$' }),
    percentFormat: format({ prefix: '%' }),
}

const embedMessage = (coin: coin) => {
    const embed = new Discord.RichEmbed()
        .setTitle(`${coin.rank} ${coin.name} ${coin.symbol}`)
        .addBlankField(true)
        .addField(`USD: ${formatting.dollarFormat(coin.price_usd)}`)
        .addField(`BTC: ${format()(coin.price_btc)}`)
        .addField(`ETH: ${format()(coin.price_eth)}`)
        .addBlankField(true)
        .addField(`1 Hour: ${formatting.percentFormat(coin.percent_change_1h)}`)
        .addField(`24 Hours: ${formatting.percentFormat(coin.percent_change_24h)}`)
        .addField(`7 Days: ${formatting.percentFormat(coin.percent_change_7d)}`)
        .addField(`1 Hour: ${formatting.percentFormat(coin.percent_change_1h)}`)
    
}

const embed = new Discord.RichEmbed()