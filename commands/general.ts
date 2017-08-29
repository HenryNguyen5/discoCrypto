const ngo = () => {
	return {
		embed: {
			fields: [
				{
					name: `:middle_finger:`,
					value:`
:no_entry_sign: :no_entry_sign: :no_entry_sign:
NO COINERS GET OUT
:poop: :poop: :poop:
:thumbsdown:`
				}
			]
		}
	}
}
const help = () => {
	return {
		embed : {
			title: `Help`,
			fields: [
				{
					name: `.cmc`,
					value: `
stats: 											\t\t\t\t\tServes general data about the market
s: 												  \t\t\t\t\tAlias for stats
ticker <TICKER|SYMBOL>: 				\t\tServes specific data about a coin :rocket:
t:									 				\t\t\t\t\tAlias for ticker`
				},
				{
					name: `.gen`,
					value: `
help: 								  \t\t\t\t\t\t\tShow help`
				},
				{
					name: `.ico`,
					value: `
del <ICO>: \t\t\t\t\t\t\t\t\t\t\t		delete the group buy
join <ICO><AMOUNT><ADDR>:			Join the group buy of an ICO
confirmTx <ICO><TXID>: \t\t\t\t 	   Confirm that you have sent your contribution
list: \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t  Lists all active ICOs
display <ICO>: \t\t\t\t\t\t\t\t\t\t     Displays the group buy
leave <ICO>: \t\t\t\t\t\t\t\t\t\t       Leave the group buy for an ICO
					`
				},
				{
					name: `.per`,
					value: `
add <TICKER|SYMBOL><AMOUNT>:     Add a token to your portfolio 
del <TICKER|SYMBOL>:				\t\t\t\tRemove the token from your portfolio
list: 								\t\t\t\t\t\t\t\t\tList your portfolio - Sent by DM `
				},
				{
					name: `Spacing this is cancer`,
					value: `This is what you get :)`
				}
			]
		}
	}
}
export default { ngo, help }
