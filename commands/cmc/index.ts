import { globalMarketData, lookupCoin } from './api'
import { formatData } from './formatters'

const stats = () => globalMarketData

const ticker = ([query, ...rest]) => {
	const coinData = lookupCoin(query)
	return coinData ? formatData(coinData) : null
}

export default { stats, s: stats, ticker, t: ticker }
