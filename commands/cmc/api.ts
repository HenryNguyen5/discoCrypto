import * as request from 'request-promise-native'

const MINUTE = 1000 * 60
let tickers = {}
let symbols = {}
let globalMarketData = {}

const cmc = request.defaults({
	baseUrl: 'https://api.coinmarketcap.com/v1',
	json: true
})

const lookupCoin = (id: string) => {
	const coinTicker = id.toLowerCase()
	const coinSymbol = id.toUpperCase()
	return tickers[coinTicker] || symbols[coinSymbol]
}

const updateCmcCache = async () => {
	const ethBtcPrice = await cmc
		.get('/ticker/ethereum')
		.then(([{ price_btc }]) => price_btc)

	const coinArray = await cmc.get('/ticker').then(async allcoins =>
		allcoins.map(coin => ({
			...coin,
			price_eth: `${(parseFloat(coin.price_btc) /
				parseFloat(ethBtcPrice)).toFixed(8)}`
		}))
	)
	tickers = coinArray.reduce(
		(coins, currCoin) => ({ ...coins, [currCoin.id]: currCoin }),
		{}
	)
	symbols = coinArray.reduce(
		(coins, currCoin) => ({ ...coins, [currCoin.symbol]: currCoin }),
		{}
	)
	globalMarketData = await cmc.get('/global')
}

updateCmcCache()

setInterval(() => {
	console.log('Minute elapsed: Updating cache')
	updateCmcCache()
}, MINUTE)

export { lookupCoin, globalMarketData }
