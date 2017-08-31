import { applyFormatType, flatten, formatting } from '../../util/formatting'

export const formatMembers = ({ 
	amount, 
	name, 
	returnAddress,
	txid = null
	}, 
	{ 
		amountType, 
		tokenRate,
		tokenName
	}) => {
	return  { 
				name: `
${name}: ${applyFormatType({ amountType, amount })} | ${amount * tokenRate}${tokenName} `,
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
	const exchangeRates = {
		amountType,
		tokenRate,
		tokenName
	}
	// console.log(members)
	// const memberString = members.reduce((str, m) => (str += formatMembers(m)), '')
	const memberString = members.map((m) => (formatMembers(m, exchangeRates)))
	console.log(memberString)
	const arr = [
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
	minAmount,
	tokenRate,
	tokenName
}) => {
	return { name: `${name}     ${amountType}: ${currentAmount}/${maxAmount}`,
			value: `
Contribution Addr: ${contributionAddress}
Token Exchange Rate: ${applyFormatType({ amountType, amount: 1})} = ${tokenRate}${tokenName}` 
	}
}

export const returnAsEmbed = (fields) => {
	return { embed: { fields } }
}
