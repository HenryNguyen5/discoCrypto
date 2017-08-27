import { Schema, SchemaDefinition } from 'mongoose'
import { IIco, IIcoEntry } from '../models/ico'

const icoEntry: SchemaDefinition = {
	amount: { type: Number, required: true, min: 0 },
	name: { type: String, required: true, lowercase: true, trim: true },
	returnAddress: { type: String, required: true, trim: true },
	txid: { type: String, required: false, trim: true }
}

export const IcoSchema: Schema = new Schema({
	amountType: { type: String, required: true, trim: true },
	contributionAddress: { type: String, required: true, trim: true },
	currentAmount: { type: Number, default: 0, min: 0 },
	createdAt: { type: Date, default: Date.now },
	maxAmount: { type: Number, required: false, min: 0 },
	minAmount: { type: Number, required: false, min: 0 },
	members: { type: [icoEntry], default: [] },
	name: { type: String, required: true, lowercase: true, trim: true }
})

IcoSchema.statics.newIco = async function(icoData): Promise<IIco> {
	const {
		name,
		contributionAddress,
		minAmount,
		maxAmount,
		amountType
	} = icoData
	if (
		!name ||
		!contributionAddress ||
		!minAmount ||
		!maxAmount ||
		!amountType
	) {
		throw new Error('Invalid params to newIco')
	}
	let ico = await this.findOne({ name: name.toLowerCase() })
	if (!ico) {
		ico = await this.create(icoData)
	}
	return ico
}

IcoSchema.statics.deleteIco = async function(name: string): Promise<null> {
	return this.remove({ name: name.toLowerCase() })
}
IcoSchema.statics.findIcoByName = async function(name: string): Promise<IIco> {
	return this.findOne({ name: name.toLowerCase() })
}

IcoSchema.methods.addMember = async function(entry: IIcoEntry): Promise<IIco> {
	const { name, amount, returnAddress, txid = null } = entry
	const nameLowerCase = name.toLowerCase()
	let found = false
	const amountNumber = parseFloat(amount)
	if (!nameLowerCase || !amountNumber || !returnAddress) {
		throw new Error('Invalid params to addMember')
	}
	if (amountNumber < this.minAmount) {
		throw new Error('addMember: Contribution amount too low')
	}
	this.currentAmount += amountNumber

	this.members = this.members.map(currentEntry => {
		const { name: currentName, amount: currContribAmount } = currentEntry
		if (currentName === nameLowerCase) {
			this.currentAmount -= currContribAmount
			found = true
			return entry
		}
		return currentEntry
	})

	if (!found) {
		this.members = [...this.members, entry]
	}

	if (this.currentAmount > this.maxAmount) {
		throw new Error('addMember: Contribution amount exceeds max cap')
	}
	return this.save()
}
IcoSchema.methods.confirmTx = async function(
	txid: string,
	name: string
): Promise<IIco> {
	const nameLowerCase = name.toLowerCase()
	this.members = this.members.map(currentEntry => {
		const { name: currentName } = currentEntry
		console.log({ ...currentEntry.toJSON() })
		console.log('\n')
		if (currentName === nameLowerCase) {
			// console.log('expanding txid', { ...currentEntry, txid })
			return { ...currentEntry.toJSON(), txid }
		}
		return currentEntry
	})
	return this.save()
}
IcoSchema.methods.removeMember = async function(name: string): Promise<IIco> {
	if (!name) {
		throw new Error('Invalid params to removeMember')
	}

	this.members = this.members.filter(
		({ name: currentName, amount: currContribAmount }) => {
			const deleteMember = name.toLowerCase() === currentName
			if (deleteMember) {
				this.currentAmount -= currContribAmount
			}
			return !deleteMember
		}
	)
	return this.save()
}
