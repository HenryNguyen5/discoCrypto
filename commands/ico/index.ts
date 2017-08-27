import { Ico } from '../../db/models/ico'
import { formatIco, shortFormatIco } from './formatters'
const addIco = async (
	[name, contributionAddress, minAmount, maxAmount, amountType]
) => {
	const newIco = await Ico.newIco({
		name,
		contributionAddress,
		minAmount,
		maxAmount,
		amountType
	})
	return console.log(newIco)
}

const delIco = async ([name]) => {
	console.log(await Ico.deleteIco(name))
}
const addMember = async ([icoName, amount, returnAddress, username]) => {
	const ico = await Ico.findIcoByName(icoName)

	if (!ico) {
		return null
	}
	return console.log(ico.addMember({ amount, name: username, returnAddress }))
}
const removeMember = async ([icoName, name]) => {
	const ico = await Ico.findIcoByName(icoName)

	if (!ico) {
		return null
	}
	return console.log(ico.removeMember(name))
}

const displayIco = async ([icoName]) => {
	const ico = await Ico.findIcoByName(icoName)
	return formatIco(ico)
}

const listIcos = async () => {
	const icos = await Ico.find({})
	const result = icos.map(ico => shortFormatIco(ico)).join('\n')
	return result
}

export default {
	new: addIco,
	del: delIco,
	list: listIcos,
	display: displayIco,
	leave: removeMember,
	join: addMember
}
