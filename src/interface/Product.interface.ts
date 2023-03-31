import type { Category } from "./Filters.interface";

export interface Iproduct {
    id:number
    title: string;
    price:number
    description : string
    category:Category
}