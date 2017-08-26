import { User } from '../db/models/user'
import { lookupCoin } from './cmc/api'
import { formatList } from './cmc/formatters'
const addCoin = async ([coinName, unitsOwned, username]) => {
	const { id: coinId } = lookupCoin(coinName)
	if (!coinId) {
		return null
	}
	const curUser = await User.findOrAddUser(username)
	console.log('AddCoin: Got User: ', curUser.username)
	return console.log(await curUser.addToPortfolio({ coinId, unitsOwned }))
}

const delCoin = async ([coinName, username]) => {
	const { id: coinId } = lookupCoin(coinName)

	if (!coinId) {
		return null
	}
	const curUser = await User.findOrAddUser(username)

	console.log('DelCoin: Got User: ', curUser.username)

	return console.log(await curUser.deleteFromPortfolio({ coinId }))
}

const list = async ([username]) => {
	const curUser = await User.findOne({ username })
	console.log('List:', curUser)
	const result = curUser!.portfolio
		.map(({ coinId, unitsOwned }) => {
			console.log('inMap')
			return formatList(lookupCoin(coinId), unitsOwned!)
		})
		.join('\n')
	return result
}

export default { add: addCoin, del: delCoin, list }
