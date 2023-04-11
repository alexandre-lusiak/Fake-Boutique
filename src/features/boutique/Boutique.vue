<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import { computed, provide, reactive, toRef, watch, watchEffect } from 'vue';
import { data } from '../../components/data/product';
import type { IProductCart,Iproduct, IFilters ,IFilterUpdate} from '../../interface'
import { DEFAULT_FILTERS } from '../../components/data/filters';
import { fetchProducts } from '@/api/product.api';
import { pageKey } from '@/key/pageKey';


const state = reactive<{
 products: Iproduct[] ,
 cart:IProductCart[],
 filters: IFilters,
 page:number,
 isloading:boolean,
 moreResult : boolean

}>({
    products:[],
    cart:[],
    filters: {...DEFAULT_FILTERS},
    page:1,
    isloading:true,
    moreResult:true
})

watch(state.filters , () => {
  state.page=1
  state.products=[]
} )

provide(pageKey,toRef(state,'page'))

watchEffect(async () => { 
  state.isloading = true
  const products = await fetchProducts(state.filters,state.page);
  console.log('porrr',products);
  
  if(Array.isArray(products)) {
    state.products = [...state.products,...products]
    if(products.length < 20 ){
        state.moreResult = false;
    }
  }else{
    state.products =  [...products,products]
  }
  state.isloading =false
})



const filteredProducts = computed(() => {
    
  return state.products.filter((product) => {
 
    
    if (
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) 
    ) {
      return product;
    } else {
      return false;
    }
  });
});


function addProductToCart(productId: string): void {
  const product = state.products.find((product) => product._id === productId);
  if(product){
    const productCart = state.cart.find(product => product._id === productId)
    if(productCart){
        productCart.quantity++
    }else{
        state.cart.push({ ...product,quantity: 1});
    }
  }
//   if (product && !state.cart.find((product) => product.id === productId)) {
//     state.cart.push({ ...product,quantity: 1});
//   }
}

function removeProductFromCart(productId: string): void {
    const productFromCart = state.cart.find(product => product._id === productId )
  if(productFromCart ) {
    if(productFromCart.quantity === 1 ){
        state.cart = state.cart.filter((w) => w._id != productId)
    }else{
        productFromCart.quantity--
    }
  }
}

const updateFilter = (filterUpdate:IFilterUpdate) => {
    
    if(filterUpdate.search != undefined) {
        state.filters.search = filterUpdate.search;
    } else if(filterUpdate.priceRange) {
        state.filters.priceRange = filterUpdate.priceRange
    } else if (filterUpdate.category){
        state.filters.category = filterUpdate.category
    }else{
        state.filters={...DEFAULT_FILTERS}
    }

}

const cartEmpty = computed(() => state.cart.length === 0);
</script>

<template>
    <div class="d-flex flex-col">
        
      <Shop
      @inc-page="state.page++"
      @update-filter="updateFilter"
      :products="filteredProducts"
      :filters="state.filters"
      @add-product-to-cart="addProductToCart"
      :more-result="state.moreResult"
    />
    <Cart
      v-if="!cartEmpty"
      :cart="state.cart"
      @remove-product-from-cart="removeProductFromCart"
    />
        
    </div>
</template>

<style scoped lang="scss">
</style>
