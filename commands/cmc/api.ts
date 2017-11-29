import * as request from 'request-promise-native'
import { checkUserAlerts, getAllAlerts } from '../alert/helpers'
import { checkSchedule } from '../sched/helpers'

const MINUTE = 1000 * 60
// cmc updates endpoints every 5 minutes
const FIVE_MINUTES = MINUTE * 5
const DAY = MINUTE * 60 * 24

const tickers = {}
const symbols = {}
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

  // gets top 1000 coins
  for (let i = 0; i < 10; i++) {
    const coinArray = await cmc.get(`/ticker?start=${i*100}`).then(async allcoins =>
      allcoins.map(coin => ({
        ...coin,
        price_eth: `${(parseFloat(coin.price_btc) /
          parseFloat(ethBtcPrice)).toFixed(8)}`
      }))
    )

    Object.assign(
      tickers,
      coinArray.reduce(
        (coins, currCoin) => ({ ...coins, [currCoin.id]: currCoin }),
        {}
      )
    )
    Object.assign(
      symbols,
      coinArray.reduce(
        (coins, currCoin) => ({ ...coins, [currCoin.symbol]: currCoin }),
        {}
      )
    )
    checkUserAlerts(coinArray)
  }

	globalMarketData = await cmc.get('/global')
}

updateCmcCache()

setInterval(() => {
	console.log('Five Minutes elapsed: Updating cache')
	updateCmcCache()
	checkSchedule()
}, FIVE_MINUTES)


export { lookupCoin, globalMarketData }
