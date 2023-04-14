import{defineStore} from 'pinia'
import type { IProductCart,Iproduct, IFilters ,IFilterUpdate} from '@/shared/interface'
import { DEFAULT_FILTERS } from '@/shared/data/filters';
import { fetchProducts } from '@/shared/api/product.api';
import { seed40articles } from '@/shared/data/seed';

interface ProductState {
    products: Iproduct[] ,
    cart:IProductCart[],
    filters: IFilters,
    page:number,
    isloading:boolean,
    moreResult : boolean,
    loaded : boolean,
    needRefresh:boolean

}
export const useProduct =  defineStore('products' , {
    state : () : ProductState => ({
        products:[],
        cart:[],
        filters: {...DEFAULT_FILTERS},
        page:1,
        isloading:true,
        moreResult:true,
        loaded:false,
        needRefresh:false

    }),

    getters:{
        filteredProducts(state) {
        return state.products.filter((product) => product.title.toLocaleLowerCase().startsWith(state.filters.search.toLocaleLowerCase()));
        }
    },
    actions:{
      async  fetchProducts() {
            this.isloading = true
            const products = await fetchProducts(this.filters,this.page);
            console.log('porrr',products);
                
            if(Array.isArray(products)) {
                this.products = [...this.products,...products]
                if(products.length < 20 ){
                    this.moreResult = false;
                }
            }else{
                this.products =  [...products,products]
            }
            this.isloading =false
        },
        updateFilter(filterUpdate :IFilterUpdate) {
            if(filterUpdate.search != undefined) {
                this.filters.search = filterUpdate.search;
            } else if(filterUpdate.priceRange) {
                this.filters.priceRange = filterUpdate.priceRange
            } else if (filterUpdate.category){
                this.filters.category = filterUpdate.category
            }else{
                this.filters={...DEFAULT_FILTERS}
            }
        },
        incPage () {
            this.page++
        },
        seed() {
            seed40articles('products')
        },
    }
})

export function initialFetchProducts() {
    const producStore = useProduct()
    if(!producStore.loaded || producStore.needRefresh){
        producStore.fetchProducts()
        producStore.loaded=true;
        if(producStore.needRefresh){
            producStore.page=1
            producStore.products=[];
            producStore.needRefresh=false;
        }
        
    }
}





// const updateFilter = (filterUpdate:IFilterUpdate) => {
    
//     if(filterUpdate.search != undefined) {
//         state.filters.search = filterUpdate.search;
//     } else if(filterUpdate.priceRange) {
//         state.filters.priceRange = filterUpdate.priceRange
//     } else if (filterUpdate.category){
//         state.filters.category = filterUpdate.category
//     }else{
//         state.filters={...DEFAULT_FILTERS}
//     }

// }

// const filteredProducts = computed(() => {
    
//   return state.products.filter((product) => {
 
    
//     if (
//       product.title
//         .toLocaleLowerCase()
//         .startsWith(state.filters.search.toLocaleLowerCase()) 
//     ) {
//       return product;
//     } else {
//       return false;
//     }
//   });
// });