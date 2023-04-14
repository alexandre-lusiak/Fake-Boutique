<script setup lang="ts">
import type { IProductCart } from '@/interface';
import { Teleport, computed, reactive } from 'vue';
import CartProductList from './CartProductList.vue';
import Calc from '@/components/Calc.vue';

const state = reactive<{
    open:boolean
}>({
    open:false
})

const props = defineProps<{
    cart:IProductCart[]
}>()

const emit = defineEmits<{
  (e: 'removeProductFromCart', productId: string): void;
}>();

const totalPrice = computed(() => props.cart.reduce((prev,product) => {
    return prev + product.price * product.quantity
},0))
</script>

<template>
    <div class="cart-container">
        <Transition mode="out-in">
            <div  v-if="!state.open" @click="state.open=!state.open" class="cart-holder d-flex justify-content-center align-items-center">
                <span class="tag">{{ cart.length }}</span>
                <i class="fa-solid fa-basket-shopping "></i>
            </div>
            <div v-else>
             <Calc :open="true" @close="state.open = false"/>
               <div class="p-20 d-flex flex-col cart">
                    <h2 class="mb-10">Panier</h2>
                    <CartProductList  
                    class="flex-fill"
                    :cart="cart"
                    @remove-product-from-cart="emit('removeProductFromCart',$event)"
                    
                    />
                    <button class="btn btn-success">Commander ({{ totalPrice }}) dolls</button>
                </div> 
            </div>
        </Transition>
        
    </div>
</template>

<style lang="scss" scoped>
.cart-container{
    position: fixed;
    bottom: 20px;
    right:20px;
   z-index: 100000;
}

.cart-holder{
    position: relative;
    background-color: var(--primary1);
    cursor: pointer;
    transition: background-color 0.315s;
    &:hover{
        background-color: var(--primary2);
    }
    width: 50px;
    height: 50px;
    border-radius: 50%;

    i{
        color: var(--text-primary-color) ;
        font-size: 25px;
        
    }
   
}

.cart{
    background-color: white;
    border-radius: 5%;
    margin: auto;
}
.tag{
    width: 15px;
    font-size: 10px;
    line-height: 15px;
    text-align: center;
    vertical-align: middle;
    border-radius: 50%;
    background-color: var(--danger1);
    position: absolute;
    top: 0;
    right: 0;
    color: var(--text-primary-color);
}

.calc {
    position: fixed;
    top: 0px;
    left:  0px;
    height: 100vh;
    width: 100%;
    background-color: #0000005b;
    z-index: 1;
}

.v-enter-from,.v-leave-to{
    transform: translateY(10px);
    opacity: 0;
}


.v-leave-active{
    transform: translateY(10px);
}
</style>
