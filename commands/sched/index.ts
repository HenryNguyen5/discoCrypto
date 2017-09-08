import { sendMessage } from '../..'
import { Sched } from '../../db/models/schedule'
import { createSchedList, createSchedMessage } from './formatters'

const addIco = async ([name, date]) => {
    let sched = await Sched.findOne()
    if (!sched){
        sched = await Sched.createICO()
    }
    
    return console.log(await sched!.addICO({ name, date }))
}

const removeIco = async ([name]) => {
    const sched = await Sched.findOne()
    return console.log(await sched!.removeICO(name))
}

const list = async () => {
    const sched = await Sched.findOne()
    return createSchedList(sched!)
}

const removeOutdated = async([days]) => {
    const sched = await Sched.findOne()
    return console.log(await sched!.clean(days))
}

export const removeItem = async({ name, date }) => {
    removeIco([name])
}

export default { 
    addIco, 
    add: addIco, 
    removeIco, 
    remove: removeIco, 
    list, 
    removeOutdated, 
    clean: removeOutdated 
}