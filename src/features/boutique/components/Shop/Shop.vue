<script setup lang="ts">

import type { IFilters, IFilterUpdate, Iproduct } from '@/interface';
import ShopFilters from './ShopFilters.vue';
import ShopProductList from './ShopProductList.vue';
import { reactive, Transition } from 'vue';
import Calc from '@/components/Calc.vue';

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

const state = reactive<{
    open:boolean,
    isMobile:boolean
}>({
    open:!matchMedia('(max-width:575px)').matches,
    isMobile:matchMedia('(max-width:575px)').matches
})

</script>

<template>
    <div class="d-flex flex-row shop-container">
        <Calc  :open=" state.isMobile && state.open" @close="state.open = false" :transparent="true"/>
        <Transition mode="out-in"> 
        <ShopFilters
        v-if="state.open"
        :number-of-product="products.length"
         :filters="filters" 
         class="shop-filter" 
         @update-filter="emit('updateFilter',$event)" 
         />
        </Transition>
         <div class="d-flex flex-col">
                <button @click="state.open=!state.open" class="btn btn-primary d-flex flex-row justify-content-center align-items-center button">
                    <i class="fa-solid fa-magnifying-glass mr-10"></i>
                    <span>Rechercher</span>
                </button>
           
             <ShopProductList
                class="flex-fill scrollable"
                @add-product-to-cart="emit('addProductToCart', $event)"
                @inc-page="emit('incPage')"
                :products="products"
                :more-result="moreResult "
        />
         </div>
    </div>
</template>

<style lang="scss" scoped>
@use '@/assets/styles/mixin.scss';

.shop-container{
    position: relative;
    
}

button{
    margin: 10px 20px 0 20px;
    @include mixin.sm {
        display: none;
     
    }
}

.scrollable {
    overflow-y: auto;
    height: calc(100vh - 96px);
}
.shop-filter{
    flex :0 0 200px;
    @include mixin.xs {
        position: absolute;
        top:0px;
        left:0px;
        background-color: white !important;
        z-index: 2;
        
    }

}


.v-enter-from,.v-leave-to{
    transform: translateX(-100%);
    opacity: 0;
}


.v-enter-active,.v-leave-active{
transition: all 0.315s;
}
</style>
