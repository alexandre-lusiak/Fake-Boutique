import { useProduct } from "@/features/boutique/store/productstore";
import { addProduct, deleteProduct, editProduct, fetchAllProducts, fetchProducts } from "@/shared/api/product.api";
import type { IFormProduct, Iproduct } from "@/shared/interface";
import { defineStore } from "pinia";
import { boolean } from "zod";
interface AdminProductState {
    products: Iproduct[],
    loading: boolean,
    loaded:boolean,
}
export const useAdminProducts = defineStore('adminProduct', {
    state: (): AdminProductState => ({
        products: [],
        loading: false,
        loaded:false,
    }),

    actions: {

        async fetchAll() {
            this.loading = true;
            const products = await fetchAllProducts();
            if (Array.isArray(products)) {
                this.products = products
            } else {
                this.products = [products]
            }
            this.loading = false

        },

        async deleteProduct(id: string) {
            const productIndex = this.products.findIndex(p => p._id === id);
            if (productIndex !== -1)
                await deleteProduct(id)
            this.products.splice(productIndex, 1)
        },
        async createProduct(product: IFormProduct) {
const productStore = useProduct()
            const newProduct = await addProduct(product);
            if (newProduct) {
                productStore.needRefresh = true
                this.products.push(newProduct);
            }
        },
        async editProduct(productId: string, productForm: IFormProduct) {
            const productStore = useProduct()
            const editedProduct = await editProduct(productForm, productId);
            if (editedProduct) {
                productStore.needRefresh = true
                const stateProductIndex = this.products.findIndex(
                    (p) => p._id === editedProduct._id
                );
                this.products[stateProductIndex] = editedProduct;
            }
        },
    },
});

export function initialFetchProductsAdmin() {
    const producStore = useAdminProducts()
    if(!producStore.loaded){
        producStore.fetchAll()
        producStore.loaded=true;
    }
}
