import { User } from '../../db/models/user'
import { lookupCoin } from '../cmc/api'
import { alertEmbed, createAlertMessage } from './formatters'

const addAlert = async ([coinName,above, price, unit, username]) => {
    const { id: coinId } = lookupCoin(coinName)
    if (!coinId){
        return null
    }
    const curUser = await User.findOrAddUser(username)
    return console.log(await curUser.addAlert({ coinId, above, price, unit }))
}

const delAlert = async ([coinName, username]) => {
    const { id:coinId } = lookupCoin(coinName)
    if (!coinId){
        return null
    }
    const curUser = await User.findOrAddUser(username)
    return console.log(await curUser.removeAlert({ coinId }))
}

const list = async ([username]) => {
    const curUser = await User.findOrAddUser(username)
    const result = curUser!.alerts
        .map(({ coinId, above, price, unit }) => {
            const coin = lookupCoin(coinId)
            return alertEmbed({ coin, above, price, unit })
        })
    return createAlertMessage({ alerts: result, user: curUser.username })
}

export const removeAlert = async({ coinName, username }) => {
    delAlert([coinName, username])
}

export default { add: addAlert, del: delAlert, list }