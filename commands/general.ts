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
		},
		'.meme': {
			n: 'ngo',
			s: 'spec'
		}
	}
	return helpObj
}
export default { help }
