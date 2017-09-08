import { sendMessage } from '../..'
import { Sched } from '../../db/models/schedule'
import { removeItem } from '../sched'
import { createSchedList, createSchedMessage } from './formatters'

export const checkSchedule = async() => {
    const sched = await Sched.findOne()
    const now = new Date()
    const icosToday = sched!.icos.filter(
        (upcoming => {
            const { name, date } = upcoming
            return date.getTime() <= now.getTime()
        })
    )
    if (icosToday.length > 0){
        await sendMessage({
            user: null,
            message: createSchedMessage(icosToday)
        })
    }
    icosToday.map(ico => {
        removeItem(ico)
    })
}
