import * as request from 'request-promise-native'
import * as format from 'format-number'
const MINUTE = 1000 * 60
let tickerCache = {}
let symbolCache = {}
const cmc = request.defaults({
	baseUrl: 'https://api.coinmarketcap.com/v1',
	json: true
})
const stats = async () => {
	try {
		const result = await cmc.get('/global')
		console.log(result)
		return result
	} catch (error) {
		console.error(error)
	}
}
const updateCmcCache = async () => {
	const coinArray = await cmc.get('/ticker').then(async allcoins => {
		const ethBtcPrice = await cmc
			.get('/ticker/ethereum')
			.then(([{ price_btc }]) => price_btc)
		return allcoins.map(coin => ({
			...coin,
			price_eth: `${(parseFloat(coin.price_btc) /
				parseFloat(ethBtcPrice)).toFixed(8)}`
		}))
	})
	tickerCache = coinArray.reduce((prevValue, currentValue) => {
		return { ...prevValue, [currentValue.id]: currentValue }
	}, {})
	symbolCache = coinArray.reduce((prevValue, currentValue) => {
		return { ...prevValue, [currentValue.symbol]: currentValue }
	}, {})
}
const lookupBySymbol = (rest: [string]) => {
	console.log('lookupBySymbol', rest)
	try {
		let [symbol] = rest
		symbol = symbol.toUpperCase()
		return symbolCache[symbol]
	} catch (error) {
		console.log(error)
	}
}
const lookupByTicker = (rest: [string]) => {
	try {
		let [id] = rest
		id = id.toLowerCase()
		return tickerCache[id]
	} catch (error) {
		console.log(error)
	}
}
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
	format
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
const formatList = (data, unitsOwned) => {
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
const listTicker = rest => {
	const result = lookupBySymbol(rest) || lookupByTicker(rest) || null
	console.log('listTicker', rest)
	return result ? formatList(result, rest[1]) : null
}
const rawTickerData = query => {
	const result = lookupBySymbol([query]) || lookupByTicker([query]) || null

	return result ? result : null
}
const ticker = rest => {
	const result = lookupBySymbol(rest) || lookupByTicker(rest) || null

	return result ? formatData(result) : null
}

updateCmcCache()

setInterval(() => {
	console.log('Minute elapsed: Updating cache')
	updateCmcCache()
}, MINUTE)

export default { stats, s: stats, ticker, t: ticker, rawTickerData, listTicker }
