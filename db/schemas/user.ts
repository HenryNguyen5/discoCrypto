import { Schema, SchemaDefinition } from 'mongoose'
import { IAlertEntry, IPortfolioEntry, IUser } from '../models/user'

const portfolioEntry: SchemaDefinition = {
	coinId: { type: String, required: true, lowercase: true, trim: true },
	unitsOwned: { type: Number, required: false, min: 0 }
}
const alertEntry: SchemaDefinition = {
	coinId: { type: String, required: true, lowercase: true, trim: true },
	above: {type: String, required: false, default: true },
	price: {type: Number, required: false, min: 0 },
	unit : {type: String, required: false, lowercase: false, trim: true }
}
export const UserSchema: Schema = new Schema({
	createdAt: { type: Date, default: Date.now },
	portfolio: { type: [portfolioEntry], default: [] },
	alerts: { type: [alertEntry], default: [] },
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

UserSchema.statics.findAllUsers = async function(): Promise<[IUser]> {
	const users = await this.find({})
	return users
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
		const { coinId } = currentEntry
		if (coinId === coinToAdd) {
			found = true
			return { coinId, unitsOwned: unitsToAdd }
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

UserSchema.methods.addAlert = async function(
	alert: IAlertEntry
): Promise<IUser> {
	const { 
		coinId: coinToAdd, 
		above: alertAbove,
		price: priceToAlert, 
		unit: unitToAlert
	} = alert
	let found = false
	
	if (!coinToAdd || !priceToAlert || !unitToAlert){
		throw new Error('Invalid params sent to addAlert')
	}
	this.alerts = this.alerts.map(currentEntry => {
		const { coinId } = currentEntry
		if (coinId === coinToAdd){
			found = true
			return { coinId, above: alertAbove, price: priceToAlert, unit: unitToAlert }
		}
		return currentEntry
	})
	if (!found){
		this.alerts = [...this.alerts, alert]
	}

	return this.save()
}

UserSchema.methods.removeAlert = async function(alert: IAlertEntry) {
	const { coinId: alertToRem } = alert
	if (!alertToRem){
		throw new Error('Invalid params sent to removeAlert')
	}

	this.alerts = this.alerts.filter(
		({ coinId }) => {
			console.log(coinId)
			return alertToRem !== coinId
		}
	)
	return this.save()
}
