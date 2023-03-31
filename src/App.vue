<script setup lang="ts">
import TheHeader from './components/Header.vue';
import TheFooter from './components/Footer.vue';
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import { computed, reactive } from 'vue';
import { data } from './components/data/product';
import type { IProductCart,Iproduct, IFilters ,IFilterUpdate} from '@/interface';
import { DEFAULT_FILTERS } from './components/data/filters';

// const products = reactive<Iproduct[]>(data)

// const cart = reactive<Iproduct[]>([]);


const state = reactive<{
 products: Iproduct[],
 cart:IProductCart[],
 filters: IFilters

}>({
    products:data,
    cart:[],
    filters: {...DEFAULT_FILTERS}
})

const filteredProducts = computed(() => {
    
  return state.products.filter((product) => {
    console.log('LOl',state.filters.priceRange[0]);
    
    if (
      product.title
        .toLocaleLowerCase()
        .startsWith(state.filters.search.toLocaleLowerCase()) &&
      product.price >= state.filters.priceRange[0] &&
      product.price <= state.filters.priceRange[1] &&
      (product.category === state.filters.category ||
        state.filters.category === 'all')
    ) {
      return product;
    } else {
      return false;
    }
  });
});


function addProductToCart(productId: number): void {
  const product = state.products.find((product) => product.id === productId);
  if(product){
    const productCart = state.cart.find(product => product.id === productId)
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

function removeProductFromCart(productId: number): void {
    const productFromCart = state.cart.find(product => product.id === productId )
  if(productFromCart ) {
    if(productFromCart.quantity === 1 ){
        state.cart = state.cart.filter((w) => w.id != productId)
    }else{
        productFromCart.quantity--
    }
  }
}

const updateFilter = (filterUpdate:IFilterUpdate) => {
    
    if(filterUpdate.search != undefined) {
        state.filters.search = filterUpdate.search;
    } else if(filterUpdate.priceRange) {
        console.log('FUCK',filterUpdate.priceRange)
        state.filters.priceRange = filterUpdate.priceRange
        console.log('FUCK12', state.filters.priceRange[1])
    } else if (filterUpdate.category){
        state.filters.category = filterUpdate.category
    }else{
        state.filters={...DEFAULT_FILTERS}
    }

}



console.log('FFIIFII',filteredProducts);
const cartEmpty = computed(() => state.cart.length === 0);
</script>

<template>
    <div class="app-container" :class="{
      gridEmpty: cartEmpty,
    }">
        <TheHeader class="header "/>
        <Shop
         @update-filter="updateFilter"
         @add-product-to-cart="addProductToCart"
         :products="filteredProducts" 
         :filters="state.filters"
         class="shop " />
        <Cart
        v-if="!cartEmpty"
       
        :cart="state.cart" class="cart " @remove-product-from-cart="removeProductFromCart"/>
        <TheFooter class="footer "/>
    </div>
</template>

<style lang="scss">
@import url("./assets/styles/base.scss");
@import url("./assets/styles/debug.scss");

.app-container{
    display:grid;
    grid-template-areas:
     "header header"
     "shop cart"
     "footer footer"
     ;
     grid-template-columns: 75% 25%;
     grid-template-rows: 72px auto 100px;
     min-height: 100vh;
}

.gridEmpty {
  grid-template-areas: 'header' 'shop' 'footer';
  grid-template-columns: 100%;
}


.header{
    grid-area: header ;
}

.shop{
    grid-area: shop ;
}

.cart{
    grid-area: cart ;
    background-color: white;
    border-left: var(--border);
}

.footer{
    grid-area: footer ;
}
</style>
