<script setup lang="ts">
import type { IProductCart } from '@/interface';
import { computed } from 'vue';
import CartProductList from './CartProductList.vue';

const props = defineProps<{
    cart:IProductCart[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: number): void;
}>();

const totalPrice = computed(() => props.cart.reduce((prev,product) => {
    return prev + product.price * product.quantity
},0))
</script>

<template>
    <div class="p-20 ">
        <h2 class="mb-10">Panier</h2>
        <CartProductList  
        :cart="cart"
        @remove-product-from-cart="emit('removeProductFromCart',$event)"
        
        />
        <button class="btn btn-sucess">Commander ({{ totalPrice }}) dolls</button>
    </div>
</template>

<style lang="scss" scoped></style>
