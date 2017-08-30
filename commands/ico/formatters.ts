import { formatting, flatten, applyFormatType } from '../../util/formatting'

export const formatMembers = ({ 
	amount, 
	name, 
	returnAddress,
	txid = null,
	tokenAmount, 
	tokenName }, amountType) => {
	return  { 
				name: `
${name}: ${applyFormatType({ amountType, amount })} | ${tokenAmount}${tokenName} `,
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
	members,
	tokenRate,
	tokenName
}) => {
	//console.log(members)
	//const memberString = members.reduce((str, m) => (str += formatMembers(m)), '')
	const memberString = members.map((m) => (formatMembers(m, amountType)))
	console.log(memberString)
	let arr = [
		{
			name: `${name}     ${amountType}: ${currentAmount}/${maxAmount}`,
			value: `
Contribution Addr: ${contributionAddress}
Min Contribution Amount: ${minAmount}
Token Exchange Rate: ${applyFormatType({ amountType , amount: 1 })} = ${tokenRate}${tokenName}`
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
			value: `
Contribution Addr: ${contributionAddress}
Min Contribution Amount: ${minAmount}
Contribution Cap: ${maxAmount}` 
	}
}

export const returnAsEmbed = (fields) => {
	return { embed: { fields: fields } }
}
