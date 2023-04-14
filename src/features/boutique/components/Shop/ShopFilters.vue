<script setup lang="ts">
import type { Category, IFilters,IFilterUpdate } from '@/shared/interface'


const props = defineProps<{
    filters: IFilters
    numberOfProduct :number
}>()


const emit = defineEmits<{
    (e: 'updateFilter', filterUpdate: IFilterUpdate): void
}>()
</script>

<template >
    <div class="p-20 d-flex flex-col ">
        <section class="m-20">
            <h3 class="mb-10">recherchez</h3>
            <input :value="props.filters.search"
                @input="emit('updateFilter', { search: ($event.target as HTMLInputElement).value })"
                placeholder="recherchez" />

        </section>
        <section class="m-20">
            <h3 class="mb-10">Triez par prix</h3>

            <div class="mb-5"
                v-for="priceRange of ([[0, 10000], [800, 1000], [1000, 1500], [1500, 2000], [2000, 10000]] as [number, number][])">
                <input  :checked="filters.priceRange[0] === priceRange[0]" @input="emit('updateFilter', { priceRange })" name="priceRange" :id="priceRange[0].toString()"
                    type="radio" />
                <label :for="priceRange[0].toString()">{{
                    priceRange[0] === 0
                    ? 'Tous les prix'
                    : priceRange[0] === 2000
                        ? 'Plus de 2000€'
                        : `Entre ${priceRange[0]}€ et ${priceRange[1]}€`
                }}</label>
            </div>
        </section>
        <section class="m-20 flex-fill">
            <h3 class="mb-10">Triez par Categorie</h3>

            <p class="category" v-for="category in (['all','gamer','desktop',  'streaming' ] as Category[])" name="category"
                @click="emit('updateFilter', { category })" :class="{ selected: filters.category === category }">{{ category }}
            </p>
            <small>Nbr Resultat ({{props.numberOfProduct  }})</small>
            <button class="btn btn-danger" @click="emit('updateFilter', {})">Suppirmer les filtres</button>
        </section>
        </div>
</template>

<style lang="scss" scoped>
.category {
    font-size: 14px;
    line-height: 18px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }


    .selected {
  font-weight: bold;
  text-decoration: underline;
}

}
</style>