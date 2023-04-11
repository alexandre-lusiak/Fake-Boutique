<script setup lang="ts">

import type { IFilters, IFilterUpdate, Iproduct } from '@/interface';
import ShopFilters from './ShopFilters.vue';
import ShopProductList from './ShopProductList.vue';

defineProps<{
    products: Iproduct[]
    filters: IFilters
    moreResult:boolean
    
}>()

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e: 'updateFilter', updateFilter: IFilterUpdate): void;
  (e:'incPage'):void
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
            class="flex-fill scrollable"
            @add-product-to-cart="emit('addProductToCart', $event)"
            @inc-page="emit('incPage')"
            :products="products"
            :more-result="moreResult"
    />
    </div>
</template>

<style lang="scss" scoped>
.shop-filter{
    flex : 0 0 20px
}
.scrollable {
    overflow-y: auto;
    height: calc(100vh - 96px);
}
</style>
