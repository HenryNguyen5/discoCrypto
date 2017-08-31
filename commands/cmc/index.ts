import { globalMarketData, lookupCoin } from './api'
import { tickerEmbed, statsEmbed } from './formatters'

const stats = () => statsEmbed(globalMarketData)

const ticker = ([query, ...rest]) => {
	const coinData = lookupCoin(query)
	return coinData ? tickerEmbed(coinData) : null
}

export default { stats, s: stats, ticker, t: ticker }
