import { Document as CamoDoc } from 'camo'


interface ContributorEntry {
    [index: string]: string | number
    name: string
    amount: number
}
interface Contributors {
    contributors: Array<ContributorEntry>
}
interface ICOEntry {
    name: string
    total: number
    currency: string
    date: Date
    contributors: Contributors
}
interface ICOs {
    icos: Array<ICOEntry>
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

    public async addContrib(  contrib: ContributorEntry, ico: ICOEntry  ) {
        const { name: contribName, amount: contribAmount } = contrib
        const { name: icoName } = ico
        if (!contribName || !contribAmount || !icoName)
            throw new Error('Invalid params to addContrib')

        let found = false
        this.ICOs = this.ICOs.map(currentICO => {
            const { name: name} = currentICO
            if (name === icoName){
                found = true
                return {..}
            }
        })
        this.ICOs = this.ICOs.map(currentContrib => {
            const { name: name } = currentContrib
            if (name === contribName){
                found = true
                return {...currentContrib, amount: contribAmount}
            } else {
                return currentContrib
            }
        })
        if (!found) {
            this.ICOs = [...this.ICOs, contrib]
        }
        return this.save()
    }

    public async removeContrib(contrib: ContributorEntry) {
        const { name: contribName } = contrib
        if (!contribName)
            throw new Error('Invalid params to removeContrib')

        let found = false
        this.ICOs = this.ICOs.filter(
            ({ contributor: { name, amount } }) =>
                name !== contribName
        )
        return this.save()
    }

    public async updateContrib(contrib: ContributorEntry) {
        const { name: contribName, amount: contribAmount } = contrib
        if (!contribName || ! contribAmount)
            throw new Error('Invalid params to updateContrib')

        let found = false
        this.ICOs = this.ICOs.map(currentContrib => {
            const { contrib: { name, amount } } = currentContrib
            if (name === contribName) { 
                found = true
                return { ...currentContrib, amount: contribAmount }
            } else {
                return currentContrib
            }
        })
        if (!found) {
            this.addContrib(contrib)
        }
        return this.save()
    }
}

export default ICOdocs