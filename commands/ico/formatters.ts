import { formatting, flatten } from '../../util/formatting'

export const formatMembers = ({ amount, name, returnAddress, txid = null }) => {
	return  { 
				name: `${name}: ${amount} `,
				value: `${returnAddress}${txid
					? `:ballot_box_with_check:${txid}`
					: ':octagonal_sign:'}`
			}
}

export const formatIco = ({
	name,
	amountType,
	contributionAddress,
	currentAmount = 0,
	maxAmount,
	minAmount,
	members
}) => {
	//console.log(members)
	//const memberString = members.reduce((str, m) => (str += formatMembers(m)), '')
	const memberString = members.map((m) => (formatMembers(m)))
	console.log(memberString)
	let arr = [
		{
			name: `${name}     ${amountType}:${currentAmount}`,
			value: `Contribution Addr: ${contributionAddress}\nMin Contribution Amount: ${minAmount}\nContribution Cap: ${maxAmount}`
		},
		memberString

	]

	return flatten(arr)
}
export const shortFormatIco = ({
	name,
	amountType,
	contributionAddress,
	currentAmount = 0,
	maxAmount,
	minAmount
}) => {
	return { name: `${name}     ${amountType}:${currentAmount}`,
			value: `Contribution Addr: ${contributionAddress}\nMin Contribution Amount: ${minAmount}\nContribution Cap: ${maxAmount}` }
}

export const returnAsEmbed = (fields) => {
	return { embed: { fields: fields } }
}
