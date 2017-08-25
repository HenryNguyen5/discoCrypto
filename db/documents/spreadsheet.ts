import { Document as CamoDoc } from 'camo'


interface ContributorEntry {
    [index: string]: string | number
    name: string
    amount: number
}
interface Contributors {
    contributors: Array<ContributorEntry>
}
interface ICO {
    name: string
    total: number
    currency: string
    date: Date
    contributors: Contributors
}
interface ICOs {
    icos: Array<ICO>
}
interface spreadsheets {
    [index: string]: any
    ICOs
}
class ICOdocs extends CamoDoc<spreadsheets> {
    ICOs: any = {
        type: Array,
        default: []
    }

    public static async addICO(name: string, total:number, currency:string, date:Date): Promise<ICO> {
        const isICO: any = await ICOdocs.findOne({ name })
        console.log('Making ICO...')
        if (isICO)
            return isICO

        const newICO : any = ICOdocs.create({ name, total, currency, date })
        return newICO.save()
    }

    public async addContrib(contrib: ContributorEntry) {
        const { name: contribName, amount: contribAmount } = contrib
        if (!contribName || !contribAmount)
            throw new Error('Invalid params to addContrib')

        let found = false
        this.ICOs = this.ICOs.map(currentContrib => {
            const { name: name } = currentContrib
            if (name === contribName){
                found = true
                return {...currentContrib, }
            } else {
                return currentContrib
            }
        })
        if (!found) {
            this.ICOs = [...this.ICOs, contrib]
        }
        return this.save()
    }
}

export default ICOdocs