<script setup lang="ts">
import type { Page } from '@/interface';
import { Transition, reactive } from 'vue';
import Calc from './Calc.vue';

const state = reactive<{
    open:boolean
}>({
    open:false
})

</script>

<template>
   <!-- <i class="fa-solid fa-bars"></i>--> 
    <header  class=" px-20 align-items-center">
        <a class="align-items-center mr-20" href="#"> 
            <img src="./../assets/logo.svg">
            <span class="logo">ALBOUTIQUE</span>
        </a>
        <div class="d-flex flex-row flex-fill actions-container">
            <ul class="d-flex flex-row flex-fill  hide-xs">
                <li class="mr-10">
                    <router-link to="/boutique" href="#">Boutique</router-link>
                </li>
                <li>
                    <router-link to="/admin"  href="#">Admin</router-link>
                </li>
            </ul>
            <ul class="d-flex flex-row hide-xs ">
                <li class="mr-10">
                    <a href="#">Inscription</a>
                </li>
                <li>
                    <a href="#">Connexion</a>
                </li>
            </ul>
            <div class="menu-xs-container">
                <Calc :open="state.open" @close="state.open=false"  :transparent="true"/>
                <i @click="state.open=!state.open" class="fa-solid fa-bars"></i>
                <Transition > <ul v-if="state.open" class="menu cart" >
                <li class="mr-10">
                    <router-link to="/boutique" href="#">Boutique</router-link>
                </li>
                <li>
                    <router-link to="/admin"  href="#">Admin</router-link>
                </li>
                <li>
                    <a href="#">Inscription</a>
                </li>
                <li>
                    <a href="#">Connexion</a>
                </li>
                </ul></Transition>
            </div>
        </div>
        
    </header>
</template>

<style lang="scss" scoped>
@use './../assets/styles/mixin.scss';
header{
    background-color: var(--primary1);
    display: flex;
    flex-direction: row;
    
    ul{
    display: flex;
    flex-direction: row;
    }
    a{
        color: var(--text-primary-color);
        img{
            width: 20px;
            margin-right: 5px;

        }
        .logo{
            font-weight: 700;
            font-size: 20px;
        }
    }
    i{
        @include mixin.sm{
            display: none;
        }
    }
    .router-link-active {
        text-decoration: underline;
    }
   
    .actions-container{
        @include mixin.xs{
        justify-content: end; 
        color: white;
        font-size: 25px;
    }
    }

    .menu-xs-container{
        position: relative;
    }

    .menu {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 1;
        right: 0;
        background-color: white;
        border-radius: 5%;
        font-size: 16px;
        padding: 3px;
        margin: 0;
        z-index: 2;
        li {
            padding: 10px;
        }

        a{
            color: var(--text-color);
        }
      
    }
}
.v-enter-from,.v-leave-to{
    transform: translateY(-10px);
    opacity: 0;
    }

    .v-enter-active,.v-leave-active{
         transition:all 0.2s;
    }

</style>
