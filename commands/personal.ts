import User from '../db/documents/user'
import cmc from './cmc'

const makeEntry = (queriedData, units) => ({
	coin: queriedData,
	unitsOwned: units,
	dateAdded: Date.now()
})
const addCoin = async ([coinName, units, username]) => {
	const queriedData = cmc.rawTickerData(coinName)
	if (!queriedData) return null
	console.log('Addcoin called')
	console.log(username)
	const curUser = await User.addUser(username)
	console.log(curUser)
	console.log('Adding to portofolio...')
	const result = await curUser.addToPortfolio(makeEntry(queriedData, units))
	console.log(result)
	return result
}

const delCoin = async ([coinName, username]) => {
	const queriedData = cmc.rawTickerData(coinName)
	if (!queriedData) return null
	const curUser = await User.addUser(username)
	console.log(curUser)
	const result = await curUser.deleteFromPortfolio({ coin: queriedData })
	console.log(result)
	return result
}

const list = async ([name]) => {
	const curUser = await User.addUser(name)
	const result = curUser.portfolio
		.map(({ coin, unitsOwned }) => {
			const { symbol } = coin
			console.log('list', symbol)
			return cmc.listTicker([symbol, unitsOwned])
		})
		.join('\n')
	console.log(result)
	return result
}

export default { add: addCoin, del: delCoin, list }
