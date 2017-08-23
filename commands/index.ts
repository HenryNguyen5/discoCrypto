import cmc from './cmc'
import * as YAML from 'yamljs'
const commandObj = { cmc }
const PREFIX = '.'

const preFixedCommandObj = Object.keys(
	commandObj
).reduce((prevValue, currValue) => {
	return { ...prevValue, [`${PREFIX}${currValue}`]: commandObj[currValue] }
}, {})

const commandHandler = async command => {
	const [commandName, option, ...rest] = command.split(' ')
	if (!preFixedCommandObj[commandName]) return null

	const result = preFixedCommandObj[commandName][option]
	return result ? YAML.stringify(await result(rest)) : null
}

export default commandHandler
