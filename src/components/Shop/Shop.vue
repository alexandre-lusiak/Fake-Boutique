<script setup lang="ts">

import type { IFilters, IFilterUpdate, Iproduct } from '@/interface';
import ShopFilters from './ShopFilters.vue';
import ShopProductList from './ShopProductList.vue';

defineProps<{
    products: Iproduct[]
    filters: IFilters
    
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: number): void;
  (e: 'updateFilter', updateFilter: IFilterUpdate): void;
}>();


</script>

<template>
    <div class="d-flex flex-row">
        <ShopFilters
        :number-of-product="products.length"
         :filters="filters" 
         class="shop-filter" 
         @update-filter="emit('updateFilter',$event)" />
        <ShopProductList
        class="flex-fill"
         @add-product-to-cart="emit('addProductToCart', $event)"
         :products="products" />
    </div>
</template>

<style lang="scss" scoped>
.shop-filter{
    flex : 0 0 20px
}
</style>
