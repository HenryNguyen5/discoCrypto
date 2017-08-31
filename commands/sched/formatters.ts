import { formatting } from '../../util/formatting'

interface ISchedEntry {
    name,
    date
}

interface ISchedule {
    date: Date,
    icos: [ISchedEntry]
}

const createSchedList = (schedule) => {
    const fields = schedule.icos.map(({ name, date }) => {
            return {
                name, 
                value: formatting.dateFormat(date) 
            }
        }
    )
    return { embed: { title: 'Upcoming ICOs', fields: fields.sort(sortByDate) } }
}

export const sortByDate = (a, b) => (
    new Date(a.value).getTime() - new Date(b.value).getTime()
)

export { createSchedList }