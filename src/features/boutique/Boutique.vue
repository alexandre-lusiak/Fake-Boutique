<script setup lang="ts">
import Shop from './components/Shop/Shop.vue';
import Cart from './components/Cart/Cart.vue';
import type {IFilterUpdate} from '../../shared/interface'
import { useProduct } from './store/productstore';
import { useCart } from './store/cartStore';

const cartStore = useCart()
const productStore = useProduct()
// productStore.seed()
function updateFilter(filterUpdate:IFilterUpdate) {
  productStore.updateFilter(filterUpdate)
}

function incPage() {
  productStore.incPage()
}
function addProductToCart(productId:string) {
  cartStore.addProductToCart(productId)
}

function removeProductFromCart(productId:string) {
  cartStore.removeProductFromCart(productId)
}
productStore.$onAction(({name , after,args}) => {
  if(name ==="updateFilter" && args[0].search === undefined){
      after(() => {
      productStore.page = 1; 
      productStore.products =[];
      productStore.moreResult =true;
      productStore.fetchProducts()
      })
  }else if (name==='incPage' ){
    after(() => {
      productStore.fetchProducts()
    })
  }
})

</script>

<template>
    <div class="d-flex flex-col">
        
      <Shop
      @inc-page="incPage"
      @update-filter="updateFilter"
      :products="productStore.filteredProducts"
      :filters="productStore.filters"
      @add-product-to-cart="addProductToCart"
      :more-result="productStore.moreResult"
      :page="productStore.page"
    />
    <Cart
      v-if="cartStore.cartEmpty"
      :cart="cartStore.cart"
      @remove-product-from-cart="removeProductFromCart"
    />
        
    </div>
</template>

<style scoped lang="scss">
</style>
