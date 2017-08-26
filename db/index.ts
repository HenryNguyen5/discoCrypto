import * as mongoose from 'mongoose'

const connectToDb = async (MONGODB_URI: string) => {
	mongoose.Promise = Promise // tslint:disable-line

	console.log(MONGODB_URI)
	await mongoose.connect(MONGODB_URI).catch(e => console.error('DB ERROR: ', e))
	console.log('Connected to db!')
}

export default connectToDb
