<script setup lang="ts">
import type { Iproduct } from '@/shared/interface'


defineProps<{
    product:Iproduct
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
}>();

</script>

<template>
    <div class="product d-flex flex-col ">
        <div class="product-image" ></div>
        <div class="p-10 d-flex flex-col">
            <h4>{{ product.title }}</h4>
          <p>{{ product.description }}</p>
            <div class="d-flex flex-row align-items-center ">
                <span class="flex-fill"> <strong>Prix:</strong> {{ product.price }} Eur</span>
                <button class="btn btn-primary"  @click="emit('addProductToCart', product._id)">Ajouter au panier</button>
            </div>
        </div>

    </div>
</template>

<style lang="scss" scoped>
.product {
    background-color: #ffffffff;
    border :var(--border);
    border-radius: var(--border-radius);
    &-image{
        border-top-right-radius: var(--border-radius);
        border-top-left-radius: var(--border-radius);
        background-image: url('../../../../assets/images/raw.png');
        height: 200px;
        background-size: cover;
        background-position: center;
    }
}
</style>