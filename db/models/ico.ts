import { Document, model, Model } from 'mongoose'
import db from '..'
import { IcoSchema } from '../schemas/ico'

export interface IIcoEntry {
	amount: string
	name: string
	returnAddress: string
	txid?: string
}
interface INewIco {
	name: string
	contributionAddress: string
	minAmount: number
	maxAmount: number
	amountType: string
}

export interface IIco extends Document {
	amountType: number
	createdAt: number
	name: string
	contributionAddress: string
	minAmount: number
	maxAmount: number
	currentAmount: number
	members: [IIcoEntry]
	addMember: (entry: IIcoEntry) => Promise<IIco>
	removeMember: (name: string) => Promise<IIco>
}

export interface IIcoModel extends Model<IIco> {
	newIco: (icoData: INewIco) => Promise<IIco>
	deleteIco: (name: string) => Promise<null>
	findIcoByName: (name: string) => Promise<IIco>
}

export const Ico = model<IIco, IIcoModel>('Ico', IcoSchema)

const reduceCoins = coins => {
	coins.reduce((obj, currCoin) => {
		return { ...obj, [currCoin.id]: currCoin }
	}, {})
}
