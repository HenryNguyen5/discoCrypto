const ngo = () => {
	return `:middle_finger: 
:no_entry_sign: :no_entry_sign: :no_entry_sign:
NO COINERS GET OUT
:poop: :poop: :poop:
:thumbsdown:`
}
const help = () => {
	const helpObj = {
		'.cmc': {
			stats: 'Serves general data about the market',
			s: 'alias for stats',
			'ticker <TICKER|SYMBOL>': 'Serves specific data about a coin :rocket:',
			t: 'alias for ticker '
		},
		'.gen': {
			h: 'help'
		}
	}
	return helpObj
}
export default { ngo, help }
