import { defineStore } from 'pinia'
import type { IProductCart, Iproduct, IFilters, IFilterUpdate } from '@/shared/interface'
import { DEFAULT_FILTERS } from '@/shared/data/filters';
import { useProduct } from './productstore';

interface CartState {

    cart: IProductCart[],

}
export const useCart = defineStore('cart', {
    state: (): CartState => ({
        cart: [],
    }),
    getters: {
        cartEmpty(state): boolean {
            return state.cart.length === 0
        }
    },
    actions: {
        addProductToCart(productId: string): void {
            const productStore = useProduct();
            const product = productStore.products.find(product => product._id === productId)

            if (product) {
                const productInCart = this.cart.find(product => product._id === productId)
                if (productInCart) {
                    productInCart.quantity++
                } else {
                    this.cart.push({ ...product, quantity: 1 });
                }
            }
            //   if (product && !state.cart.find((product) => product.id === productId)) {
            //     state.cart.push({ ...product,quantity: 1});
            //   }
        },
        removeProductFromCart(productId: string): void {
        const productFromCartIndex = this.cart.findIndex(product => product._id === productId )
            if(productFromCartIndex !== -1 ) {
                if( this.cart[productFromCartIndex].quantity ===1 ){
                    this.cart.splice(productFromCartIndex,1)
                }else{
                    this.cart[productFromCartIndex].quantity--
                }
            }
}

    }
})
