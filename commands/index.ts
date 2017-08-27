import cmc from './cmc'
import gen from './general'
import ico from './ico'
import personal from './personal'
const commandObj = { cmc, gen, per: personal, ico }
const PREFIX = '.'

const preFixedCommandObj = Object.keys(
	commandObj
).reduce((prevValue, currValue) => {
	return { ...prevValue, [`${PREFIX}${currValue}`]: commandObj[currValue] }
}, {})

const commandHandler = async command => {
	const [commandName, option, ...rest] = command.split(' ')
	if (!preFixedCommandObj[commandName]) {
		return null
	}

	const result = preFixedCommandObj[commandName][option]
	console.log(result)
	return result(rest)
}

export default commandHandler
