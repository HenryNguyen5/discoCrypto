import { Schema, SchemaDefinition } from 'mongoose'
import { ISched, ISchedEntry } from '../models/schedule'

const schedEntry: SchemaDefinition = {
    name: { type: String, required: true, trim: true },
    date: { type: Date, required: true, trim: true }
}

export const SchedSchema: Schema = new Schema({
    icos: { type: [schedEntry], default: [] }
})

SchedSchema.statics.createICO = async function(): Promise <ISched> {
    const date = new Date()
    return await this.create({ date })
}

SchedSchema.methods.addICO = async function(entry: ISchedEntry): Promise <ISched> {
    const { name, date } = entry
    const nameLowerCase = name.toLowerCase()
    let found = false
    if (!nameLowerCase || !date){
        throw new Error('Invalid params to addIco')
    }
    this.icos = this.icos.map(currentEntry => {
        const { name: currentName } = currentEntry
        if (currentName === nameLowerCase){
            currentEntry.date = entry.date
            found = true
        }
        
        return currentEntry
    })

    if (!found){
        this.icos = [...this.icos, entry]
    }
    return this.save()
}

SchedSchema.methods.removeICO = async function(name: string): Promise <ISched> {
    if (!name){
        throw new Error ('Invalid params sent to removeIco')
    }
    console.log(this.icos)
    this.icos = this.icos.filter(
        ({ name: currentName }) => {
            return currentName.toLowerCase() !== name
        }
    )
    return this.save()
}

SchedSchema.methods.clean = async function (threshold: number): Promise<ISched> {
    if (isNaN(threshold)){
        threshold = 0 
    }
    const now = new Date()
    const removeBefore = new Date(now.setDate(now.getDate() - threshold))
    this.icos = this.icos.filter(
        ({ date: icoDate }) => {
            return new Date(icoDate).getTime() > removeBefore.getTime()
        }
    )
    return this.save()
}