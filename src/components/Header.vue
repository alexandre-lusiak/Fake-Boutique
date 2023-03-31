<script setup lang="ts">
</script>

<template>
    <header  class=" px-20 align-items-center">
        <a class="align-items-center mr-20" href="#"> 
            <img src="./../assets/logo.svg">
            <span class="logo">ALBOUTIQUE</span>
        </a>
        <ul class="d-flex flex-row flex-fill">
            <li class="mr-10">
                <a href="#">Boutique</a>
            </li>
            <li>
                <a href="#">Admin</a>
            </li>
        </ul>
        <ul class="d-flex flex-row ">
            <li class="mr-10">
                <a href="#">Inscription</a>
            </li>
            <li>
                <a href="#">Connexion</a>
            </li>
        </ul>
    </header>
</template>

<style lang="scss" scoped>

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
   
}
</style>
