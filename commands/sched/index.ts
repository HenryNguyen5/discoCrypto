import { Sched } from '../../db/models/schedule'
import { createSchedList } from './formatters'

const addIco = async ([name, date]) => {
    let sched = await Sched.findOne()
    if (!sched)
        sched = await Sched.createICO()
    
    return console.log(await sched!.addICO({ name, date }))
}

const removeIco = async ([name]) => {
    const sched = await Sched.findOne()
    return console.log(await sched!.removeICO(name))
}

const list = async () => {
    await updateTime()
    const sched = await Sched.findOne()
    return createSchedList(sched!)
}

const updateTime = async() => {
    const now = new Date()
    const sched = await Sched.findOne()
    return sched!.currentDate = now
}

const removeOutdated = async([days]) => {
    await updateTime()
    const sched = await Sched.findOne()
    return sched!.icos =  sched!.icos.filter(
        ({ date: icoDate }) => {
            return sched!.currentDate > icoDate + days
        }
    )
}

export default { addIco, add: addIco, removeIco, remove: removeIco, list, clean: removeOutdated }