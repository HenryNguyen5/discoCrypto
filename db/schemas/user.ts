import { Schema, SchemaDefinition } from 'mongoose'
import { IPortfolioEntry, IUser } from '../models/user'

const portfolioEntry: SchemaDefinition = {
	coinId: { type: String, required: true, lowercase: true, trim: true },
	unitsOwned: { type: Number, required: false, min: 0 }
}
export const UserSchema: Schema = new Schema({
	createdAt: { type: Date, default: Date.now },
	portfolio: { type: [portfolioEntry], default: [] },
	username: { type: String, required: true, trim: true }
})

UserSchema.statics.findOrAddUser = async function(
	username: string
): Promise<IUser> {
	let curUser = await this.findOne({ username })
	if (!curUser) {
		curUser = this.create({ username })
	}
	return curUser
}

UserSchema.methods.addToPortfolio = async function(
	entry: IPortfolioEntry
): Promise<IUser> {
	const { coinId: coinToAdd, unitsOwned: unitsToAdd } = entry

	if (!coinToAdd || !unitsToAdd) {
		throw new Error('Invalid params to addToPortfolio')
	}

	let found = false

	this.portfolio = this.portfolio.map(currentEntry => {
		const { currentCoin } = currentEntry
		if (currentCoin === coinToAdd) {
			found = true
			return { ...currentEntry, unitsOwned: unitsToAdd }
		}
		return currentEntry
	})

	if (!found) {
		this.portfolio = [...this.portfolio, entry]
	}

	return this.save()
}

UserSchema.methods.deleteFromPortfolio = async function(
	entry: IPortfolioEntry
) {
	const { coinId: coinToDelete } = entry
	if (!coinToDelete) {
		throw new Error('Invalid params to deleteFromPortfolio')
	}

	this.portfolio = this.portfolio.filter(
		({ coinId }) => coinToDelete !== coinId
	)
	return this.save()
}
