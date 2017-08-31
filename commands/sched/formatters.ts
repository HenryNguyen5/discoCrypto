import { formatting } from '../../util/formatting'

interface SchedEntry {
    name,
    date
}

interface Schedule {
    date: Date,
    icos: [SchedEntry]
}

const createSchedList = (schedule) => {
    const fields = schedule.icos.map(({ name, date }) => {
            return {
                name: name, 
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