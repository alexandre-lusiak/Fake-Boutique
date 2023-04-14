import type { Category } from "./type";

export interface Iproduct {
    _id: string;
    createdAt: string;
    title: string;
    image: string;
    price: number;
    description: string;
    category: Category;
}


export interface IFormProduct {
    _id?: string;
    createdAt?: string;
    title: string;
    image: string;
    price: number;
    description: string;
    category: Category;

}