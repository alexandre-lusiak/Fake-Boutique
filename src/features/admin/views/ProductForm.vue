<script setup lang="ts">
import z from 'zod'
import {useForm ,useField} from 'vee-validate'
import {toFormValidator} from '@vee-validate/zod'
import { onMounted, ref, type Text } from 'vue';

import { useRoute, useRouter } from 'vue-router';
import { addProduct, editProduct, getProduct } from '@/shared/api/product.api';
import type { IFormProduct, Iproduct } from '@/shared/interface';
import { useAdminProducts } from '../store/adminStore';

const firstInput = ref<HTMLInputElement| null>(null)
const product = ref<Iproduct | null>(null)
const route = useRoute()
const router = useRouter()
const adminProductStore = useAdminProducts();


if(route.params.id){
    product.value = await getProduct(route.params.id as string)
}else{

}
const required = {required_error:'Champ obligatoire'}

const initialValues = {
    title: product.value ? product.value.title : '' ,
    price: product.value ? product.value.price : 0,
    description : product.value ? product.value.description : '' ,
    category: product.value ? product.value.category : 'desktop',
    image : product.value ? product.value.image : '' ,
}
onMounted(() => {
    firstInput.value?.focus
})



const validationSchema = toFormValidator(
    z.object({
        title: z.string(required).min(3,{message:'titre trop court'}).max(20,{message:'titre trop long'}),
        price: z.number(required).min(1,{message:'prix doit etre supeireur a 0'}).max(15000,{message:'prix trop éleves (max:15000)'}),
        image: z.string(required),
        description: z.string(required).min(10,{message:'la description  doit etre au moin de 10 caractère  a 0'}),
        category: z.string(required)
    })
)

const {handleSubmit,isSubmitting} = useForm({
    validationSchema,
    initialValues
  
})



const onSubmit =  handleSubmit(async(formValues , {resetForm}) => {
    try {
        if (!product.value) {
            await adminProductStore.createProduct(formValues);
        } else {
            await adminProductStore.editProduct(product.value._id, formValues);
        }
        router.push('/admin/productlist');
    } catch (e) {
        console.log(e);
    }
    
})

const title = useField('title')
const image = useField('image')
const price = useField('price')
const description = useField('description')
const category = useField('category')

</script>

<template>
 <div class="card" >
    <h1>{{ product ?'Editer': "Ajouter"}}  un Article  </h1>
    <form @submit="onSubmit">
            <div class="d-flex flex-col mb-20">
                <label class="mb-5">*Titre</label>
                <input ref="firstInput" type="text"  v-model="title.value.value">
                <small class="form-error" v-if="title.errorMessage.value">{{ title.errorMessage.value }}</small>
            </div>

            <div class="d-flex flex-col mb-20">
                <label class="mb-5">*Image</label>
                <input v-model="image.value.value"/>
                <small class="form-error" v-if="image.errorMessage.value">{{ image.errorMessage.value }}</small>
            </div>

            <div class="d-flex flex-col mb-20">
                <label class="mb-5">*Prix</label>
                <input  v-model="price.value.value" type="number"/>
                <small class="form-error" v-if="price.errorMessage.value">{{ price.errorMessage.value }}</small>
            </div>

            <div class="d-flex flex-col mb-20">
                <label class="mb-5">*Description</label>
                <textarea   v-model="(description.value.value as string) " ></textarea>
                <small class="form-error" v-if="description.errorMessage.value">{{ description.errorMessage.value }}</small>
            </div>

            <div class="d-flex flex-col mb-20">
                <label class="mb-5">*Titre</label>
                <select  v-model="category.value.value">
                <option value>Choisir une Category</option>
                <option value="gamer">Gamer</option>
                <option value="desktop">Bureautique</option>
                <option value="streaming">Streaming</option>
                </select>
                <small class="form-error" v-if="category.errorMessage.value">{{ category.errorMessage.value }}</small>
            </div>

            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Sauvegarder</button>
    </form>
 </div>
</template>

<style  scoped lang="scss">

</style>
