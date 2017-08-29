import * as format from 'format-number'
export const formatting = {
    dollarFormat: format({ prefix: '$', truncate: 2 }),
    percentFormat: format({ prefix: '%', truncate: 2 }),
    ethFormat: format({ prefix: 'Ξ', truncate: 8 }),
    btcFormat: format({ prefix: 'Ƀ', truncate: 8 })
}


export const flatten  = (list) => {
	return Array.prototype.concat(...list)
}

export const smallSpace = '      '

export const mediumSpace = '                     '

export const largeSpace = '                                              '
