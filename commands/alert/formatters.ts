import {applyFormatType, flatten, formatting } from '../../util/formatting'

export const alertEmbed = ({ coin, above, price, unit }) => {
    const {
        name,
        symbol,
        price_usd,
        price_eth,
        price_btc
    } = coin
    return [
        {
            name: `Alert set for: ${coin.name}`,
            value: `
Current Price: ${getCorrectUnit({ price: coin, unit })}
Alert when ${ above.toLowerCase() === 'above' ? `>` : `<` } ${displayAlertPrice({ price, unit })}`
        }
    ]

}

export const createAlertMessage = ({ alerts, user }) => {
    return { embed : { title: `${user}'s Alerts`, fields: flatten(alerts) } } 
}

const getCorrectUnit = ({ price, unit }) => {
    const { 
        price_usd,
        price_eth,
        price_btc
    } = price
    switch(unit.toLowerCase()) {
        case 'eth':
            return formatting.ethFormat(price.price_eth)
        case 'btc':
            return formatting.btcFormat(price.price_btc)
        case 'usd':
            return formatting.dollarFormat(price.price_usd)
    }
}

const displayAlertPrice = ({ price, unit }) => {
    switch(unit.toLowerCase()) {
        case 'eth':
            return formatting.ethFormat(price)
        case 'btc':
            return formatting.btcFormat(price)
        case 'usd':
            return formatting.dollarFormat(price)
    }
}