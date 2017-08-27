const format = require('format-number') // tslint:disable-line

export const formatMembers = ({ amount, name, returnAddress }) => {
	return `${name} ${amount} ${returnAddress}\n`
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
	console.log(members)
	const memberString = members.reduce((str, m) => (str += formatMembers(m)), '')
	const dollarFormat = format({ prefix: '$' })
	const percentFormat = format({ suffix: '%' })
	const ethFormat = format({ prefix: 'Ξ' })
	const btcFormat = format({ prefix: 'Ƀ' })
	return `
    ${name}     ${amountType}:${currentAmount}
Contribution Addr: ${contributionAddress}
Min Contribution Amount: ${minAmount}
Contribution Cap:${maxAmount}
Members:
${memberString}
    `
}

export const shortFormatIco = ({
	name,
	amountType,
	contributionAddress,
	currentAmount = 0,
	maxAmount,
	minAmount
}) => {
	const dollarFormat = format({ prefix: '$' })
	const percentFormat = format({ suffix: '%' })
	const ethFormat = format({ prefix: 'Ξ' })
	const btcFormat = format({ prefix: 'Ƀ' })
	return `
${name}     ${amountType}:${currentAmount}
Contribution Addr: ${contributionAddress}
Min Contribution Amount: ${minAmount}
Contribution Cap:${maxAmount}
    `
}
