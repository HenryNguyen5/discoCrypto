import * as dateFormat from 'dateformat'
import * as format from 'format-number'
// const dateFormat = require('dateformat')
export const formatting = {
    /* tslint: disable */
    dollarFormat: format({ prefix: '$', truncate: 2 }), 
    percentFormat: format({ prefix: '%', truncate: 2 }),
    ethFormat: format({ prefix: 'Ξ', truncate: 8 }),
    btcFormat: format({ prefix: 'Ƀ', truncate: 8 }),
    otherFormat: format({ truncate: 8 }),
    dateFormat: (date) => dateFormat(date, 'yyyy/mm/dd'),
    dateTimeFormat: (date) => dateFormat(date, 'HH:MM | yyyy/mm/dd')
    /* tslint: enable */
}


export const flatten  = (list) => {
	return Array.prototype.concat(...list)
}

export const smallSpace = '      '

export const mediumSpace = '                     '

export const largeSpace = '                                              '

export const applyFormatType = (({ amountType, amount }) => {
    switch(amountType.toUpperCase()){
        case 'ETH':
            return `${formatting.ethFormat(amount)}`
        case 'BTC':
            return `${formatting.btcFormat(amount)}`
        case 'USD':
            return `${formatting.dollarFormat(amount)}`
        default:
            return `${formatting.otherFormat(amount)}${amountType}`
    }   
})

