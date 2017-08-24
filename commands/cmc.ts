import * as request from 'request-promise-native'
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
	const coinArray = await cmc.get('/ticker')
	.then(async allcoins => {
		const ethBtcPrice = await cmc.get('/ticker/ethereum')
			.then( ([{price_btc}]) => price_btc)
		return allcoins.map( coin => ({
			...coin, 
			price_eth: `${(parseFloat(coin.price_btc)/parseFloat(ethBtcPrice)).toFixed(8)}`
		}) )
	})
	tickerCache = coinArray.reduce((prevValue, currentValue) => {
		return { ...prevValue, [currentValue.id]: currentValue }
	}, {})
	symbolCache = coinArray.reduce((prevValue, currentValue) => {
		return { ...prevValue, [currentValue.symbol]: currentValue }
	}, {})
}
const lookupBySymbol = (rest: [string]) => {
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
const ticker = rest => {
	const result = lookupBySymbol(rest) || lookupByTicker(rest) || null
	return result
}

updateCmcCache()

setInterval(() => {
	console.log('Minute elapsed: Updating cache')
	updateCmcCache()
}, MINUTE)

export default { stats, s: stats, ticker, t: ticker }
