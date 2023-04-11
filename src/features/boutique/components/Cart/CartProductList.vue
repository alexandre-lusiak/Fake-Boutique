<script setup lang="ts">

import type { IProductCart } from '@/interface';
import CartProduct from './CartProduct.vue';

const props =  defineProps<{
    cart:IProductCart[]
}>()

const emit = defineEmits<{
    (e:'removeProductFromCart', productId:string) : void
}>()
</script>


<template>
    <div class="d-flex flex-col">
      
        <CartProduct 
        v-for="product of cart" 
        :product="product" 
        @remove-product-from-cart="emit('removeProductFromCart',$event)" />
    </div>
</template>

<style lang="scss" scoped>

</style>
