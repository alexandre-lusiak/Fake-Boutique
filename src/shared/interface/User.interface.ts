export interface Iuser {
    _id : string
    email:string
    password:string
    registerAt:string
}

export interface IFormuser extends Partial<Iuser>{}
    