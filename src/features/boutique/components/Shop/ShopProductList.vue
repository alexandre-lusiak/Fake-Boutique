<script setup lang="ts">
import ShopProduct from './ShopProduct.vue';
import { inject, onUpdated, ref, watch } from 'vue';
import type { Iproduct } from '@/shared/interface';

const props = defineProps<{
  products: Iproduct[];
  moreResult:boolean
  page:number
}>();

const emit = defineEmits<{
  (e: 'addProductToCart', productId: string): void;
  (e:'incPage'):void
}>();



watch(() => props.page,() => {
  if(props.page === 1){
    scrolablediv.value?.scrollTo(0,0)
  }
})

const scrolablediv = ref<HTMLElement | null>(null)
</script>

<template>
  <div class="d-flex flex-col p-20">
  <div class="grid mb-20">
    <ShopProduct
    ref="scrolablediv"
      @add-product-to-cart="emit('addProductToCart', $event)"
      v-for="product of products"
      :product="product"
      :key="product._id"
    />
</div>
    <div v-if="moreResult && products.length" class="d-flex flex-row aligns-items-content justify-content-center">
      <button class="btn btn-primary" @click="emit('incPage')">Plus de resultat</button>
    </div>
  
</div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixin.scss' as m;
.grid {
  display: grid;
  grid-template-columns: 1fr;
  @include m.sm{
    grid-template-columns: 1fr  1fr;

  }
  @include m.md{
    grid-template-columns: 1fr  1fr;

  }
  @include m.lg{
    grid-template-columns: 1fr 1fr 1fr;

  }
  @include m.xl{
    grid-template-columns: 1fr  1fr  1fr  1fr;

  }
  grid-auto-rows: 400px;
  gap: 20px;
}
</style>