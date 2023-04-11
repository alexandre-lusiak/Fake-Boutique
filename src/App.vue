<script setup lang="ts">

import TheHeader from './components/Header.vue';
import  Boutique from './features/boutique/Boutique.vue';
import TheFooter from './components/Footer.vue';
import  Admin from './features/admin/Admin.vue'
import { reactive } from 'vue';
import type { Page } from './interface';
import { seed40articles } from './components/data/seed';


const state = reactive<{
    page:Page

}>({
    page:'Boutique'
})

const pages:{[s:string]:any } = {
Boutique,
Admin
}


function navigate (page:Page) :void {
    state.page = page
}
</script>

<template>
    <div class="app-container" >
        <TheHeader @navigate="navigate" :page="state.page" class="header "/>
        <div class="content">
        <Suspense>
           <Component :is="pages[state.page]"/> 
        </Suspense>
    </div>
      
        <TheFooter  class="footer "/>
    </div>
</template>

<style lang="scss">
@import url("./assets/styles/base.scss");
@import url("./assets/styles/debug.scss");

.app-container{
  min-height: 100vh;
    display:grid;
    grid-template-areas:
     "header" 
     "content"  
     "footer";
     grid-template-rows: 48px auto 48px;
}


.header{
    grid-area: header ;
}

.content{
    grid-area: content ;
}


.footer{
    grid-area: footer ;
}
</style>
