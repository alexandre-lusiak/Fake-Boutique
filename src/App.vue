<script setup lang="ts">

import TheHeader from './components/Header.vue';
import  Boutique from './features/boutique/Boutique.vue';
import TheFooter from './components/Footer.vue';
import  Admin from './features/admin/Admin.vue'
import { reactive } from 'vue';
import { seed40articles } from './shared/data/seed';


function logout(){
    
}

</script>

<template>
    <div class="app-container" >
        <TheHeader :isLoggedIn="false" @logout="logout" is  class="header "/>
        <div class="content">
            <router-view v-slot="{Component}">
                <template v-if="Component">
                    <Suspense>
                       <Component :is="Component"/> 
                    </Suspense>
                </template>
            </router-view>
        </div>
        <TheFooter  class="footer hide-xs "/>
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
