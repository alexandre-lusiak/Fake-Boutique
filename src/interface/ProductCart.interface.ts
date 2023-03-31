import type { Iproduct } from "./Product.interface"

export interface IProductCart extends Iproduct {
    quantity: number;
}