import { Document, model, Model } from 'mongoose'
import db from '..'
import { UserSchema } from '../schemas/user'

export interface IPortfolioEntry {
	coinId: string
	unitsOwned?: number
}

export interface IAlertEntry {
	coinId: string
	above?: string
	price?: number
	unit?: string
}

export interface IUser extends Document {
	createdAt: number
	portfolio: [IPortfolioEntry]
	alerts: [IAlertEntry]
	username: string
	addToPortfolio: (entry: IPortfolioEntry) => Promise<IUser>
	deleteFromPortfolio: (entry: IPortfolioEntry) => Promise<IUser>
	addAlert: (alert: IAlertEntry) => Promise<IUser>
	removeAlert: (alert: IAlertEntry) => Promise<IUser>
}

export interface IUserModel extends Model<IUser> {
	findOrAddUser: (name) => IUser
	findAllUsers: () => [IUser]
}

export const User = model<IUser, IUserModel>('User', UserSchema)
