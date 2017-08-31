import { Document, model, Model } from 'mongoose'
import db from '..'
import { SchedSchema } from '../schemas/schedule'

export interface ISchedEntry {
    name: string
    date: Date
}

export interface ISched extends Document {
    icos: [ISchedEntry]
    addICO: (sched: ISchedEntry) => Promise<ISched>
    removeICO: (name: string) => Promise<ISched>
    clean: (threshold: number) => Promise<ISched>
}
export interface ISchedModel extends Model<ISched> {
    createICO: () => Promise<ISched>
} 
export const Sched = model<ISched, ISchedModel>('Sched', SchedSchema)