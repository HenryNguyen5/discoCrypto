import { User } from '../../db/models/user'
import { sendMessage } from '../../index'
import { removeAlert } from '../alert'
import { alertEmbed, createAlertMessage } from './formatters'

export const checkUserAlerts = async(coinArray) => {
    const allAlerts = await getAllAlerts()
    allAlerts.map((usersAlerts) => {
        usersAlerts.alerts.map((alert) => { 
            const {
                above,
                price,
                unit,
                coinId
            } = alert
            const currUser = usersAlerts.user
            coinArray.map(async (currCoin) => {
                if (alert.coinId === currCoin.id) {
                    const triggeredAlert = checkAlertTrigger({ alert, coin: currCoin })
                   
                    if (triggeredAlert){
                        sendMessage({ 
                            user: currUser, 
                            message: createAlertMessage({ 
                                alerts: alertEmbed({ coin: currCoin, above, price, unit }),
                                user: currUser 
                            }) 
                        })
                        const coinName = triggeredAlert.coin.name.toLowerCase()
                        console.log(coinName, currUser)
                        removeAlert({ coinName, username: currUser })
                    }
                }
            })
        })
    })
    return allAlerts
}

export const getAllAlerts = async () => {
    const users = await User.findAllUsers()
    const allAlerts = users.map((user) => {
        return { user: user.username, alerts: user.alerts }
    })
    return allAlerts
}

const checkAlertTrigger = ({ alert, coin }) => {
    const coinPrice = Number(getCoinPrice({ alert,coin }))
    if (
        (alert.above.toLowerCase() === 'above' && 
            coinPrice > alert.price) || 
        (alert.above.toLowerCase() ==='below' && 
            coinPrice < alert.price)){
        return { coin, alert }
    } 
    return
}

const getCoinPrice = ({ alert, coin }) => {
    switch (alert.unit.toLowerCase()){
        case 'usd':
            return coin.price_usd
        case 'eth':
            return coin.price_eth
        case 'btc':
            return coin.price_btc
    }
}
