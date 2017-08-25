import { Document as CamoDoc } from 'camo'
interface Coin {
	id: string
	name: string
	symbol: string
	rank: number
	price_usd: number
	price_btc: number
	'24h_volume_usd': number
	market_cap_usd: number
	available_supply: number
	total_supply: number
	percent_change_1h: number
	percent_change_24h: number
	percent_change_7d: number
	last_updated: number
}
interface PortfolioEntry {
	[index: string]: Coin | number
	coin: Coin
	unitsOwned: number
	dateAdded: number
}
interface Portfolio {
	portfolio: Array<PortfolioEntry>
}
interface User {
	[index: string]: any
	portfolio
	name
}
class User extends CamoDoc<User> {
	portfolio: any = {
		type: Array,
		default: []
	}
	name: any = {
		type: String,
		required: true
	}
	public static async addUser(name: string): Promise<User> {
		const isUser: any = await User.findOne({ name })
		console.log('Making user..')
		if (isUser) return isUser

		const newUser: any = User.create({ name })
		return newUser.save()
	}

	public async addToPortfolio(entry: PortfolioEntry) {
		const { coin: coinToAdd, unitsOwned: unitsToAdd } = entry
		if (!coinToAdd || !unitsToAdd)
			throw new Error('Invalid params to addToPortfolio')

		let found = false
		this.portfolio = this.portfolio.map(currentEntry => {
			const { coin: { id, symbol } } = currentEntry
			if (id === coinToAdd.id && symbol === coinToAdd.symbol) {
				found = true
				return { ...currentEntry, unitsOwned: unitsToAdd }
			} else {
				return currentEntry
			}
		})
		if (!found) {
			this.portfolio = [...this.portfolio, entry]
		}

		return this.save()
	}

	public async deleteFromPortfolio(entry) {
		const { coin: { id: idToDelete, symbol: symbolToDelete } } = entry
		console.log('done')
		if (!idToDelete || !symbolToDelete)
			throw new Error('Invalid params to deleteFromPortfolio')
		this.portfolio = this.portfolio.filter(
			({ coin: { id, symbol } }) =>
				id !== idToDelete && symbol !== symbolToDelete
		)
		return this.save()
	}
}
export default User
