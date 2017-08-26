import { Document, model, Model } from 'mongoose'
import db from '..'
import { UserSchema } from '../schemas/user'

export interface IPortfolioEntry {
	coinId: string
	unitsOwned?: number
}

export interface IUser extends Document {
	createdAt: number
	portfolio: [IPortfolioEntry]
	username: string
	addToPortfolio: (entry: IPortfolioEntry) => Promise<IUser>
	deleteFromPortfolio: (entry: IPortfolioEntry) => Promise<IUser>
}

export interface IUserModel extends Model<IUser> {
	findOrAddUser: (name) => IUser
}

export const User = model<IUser, IUserModel>('User', UserSchema)
