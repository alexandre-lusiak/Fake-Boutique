<script setup lang="ts">
import type { IProductCart} from '@/interface';



defineProps<{
  product: IProductCart;
}>();

const emit = defineEmits<{
    (e:'removeProductFromCart', productId:number)  :void
}>()
</script>

<template>
    <div class="mb-10 p-10 d-flex flex-row align-items-center product">
        <strong class="flex-fill">{{ product?.title }}</strong>
        <span class="mr-10  ">x {{product?.quantity}}</span>
        <span class="mr-10 ">{{product?.price}}€</span>
        <button class="btn btn-danger" @click="emit('removeProductFromCart',product?.id)"> retirer</button>
    </div>
</template>

<style lang="scss" scoped>

.product{
    border: var(--border);
    border-radius: var(--border-radius);
    background-color: wheat;
    background-color: var(--gray-1);
}

</style>

