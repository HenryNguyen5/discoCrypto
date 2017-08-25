const connect = require('camo').connect
import path = require('path')
const uri = `nedb:///${path.join(__dirname, '/store')}/`

const connectToDb = async () => {
	const db = await connect(uri)
	console.log('Connected to db!')
	console.log(`nedb:///${path.join(__dirname, '/store')}/`)
	return db
}

export default connectToDb
