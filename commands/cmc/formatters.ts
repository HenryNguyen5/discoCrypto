const format = require('format-number') // tslint:disable-line
const formatData = data => {
	const {
		name,
		symbol,
		rank,
		price_usd,
		price_btc,
		price_eth,
		percent_change_7d,
		percent_change_1h,
		percent_change_24h,
		market_cap_usd
	} = data
	const dollarFormat = format({ prefix: '$' })
	const percentFormat = format({ suffix: '%' })
	const formattedString = `
		:rocket:${rank}	${name}	${symbol}:rocket:

		USD: ${dollarFormat(price_usd)}
		BTC: ${format()(price_btc)}
		ETH: ${format()(price_eth)}

		1 Hour: ${percentFormat(percent_change_1h)}
		24 Hours: ${percentFormat(percent_change_24h)}
		7 Days: ${percentFormat(percent_change_7d)}
		Market Cap: ${dollarFormat(market_cap_usd)}
		`
	return formattedString
}
const formatList = (data, unitsOwned: number) => {
	const {
		name,
		symbol,
		rank,
		price_usd,
		price_btc,
		price_eth,
		percent_change_24h,
		market_cap_usd
	} = data

	const dollarFormat = format({ prefix: '$' })
	const percentFormat = format({ suffix: '%' })
	const ethFormat = format({ prefix: 'Ξ' })
	const btcFormat = format({ prefix: 'Ƀ' })
	const formattedString = `:rocket:${rank}	${name}	${symbol}
		USD: ${dollarFormat(price_usd)} * ${unitsOwned} = ${dollarFormat(
		price_usd * unitsOwned
	)}
		BTC: ${format()(price_btc)} * ${unitsOwned} = ${btcFormat(
		price_btc * unitsOwned
	)}
		ETH: ${format()(price_eth)} * ${unitsOwned} = ${ethFormat(
		price_eth * unitsOwned
	)}
		24 Hours: ${percentFormat(percent_change_24h)}
		`
	return formattedString
}

export { formatList, formatData }
