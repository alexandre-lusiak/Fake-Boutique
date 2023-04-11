import type { Category } from "./type";

export interface Iproduct {
    _id:string
    title: string;
    price:number
    description : string
    category:Category
}