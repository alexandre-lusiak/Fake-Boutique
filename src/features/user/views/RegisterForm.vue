<script setup lang="ts">
import z from 'zod'
import {useForm ,useField} from 'vee-validate'
import {toFormValidator} from '@vee-validate/zod'
import { onMounted, ref, type Text } from 'vue';
import { useUser } from '../store/userStore';
import { useRouter } from 'vue-router';
import type { IFormuser } from '@/shared/interface';

const router = useRouter()

const firstInput = ref<HTMLInputElement| null>(null)

const required = {required_error:'Champ obligatoire'}

const initialValues = {
    email:  '' ,
    password:  '',
    
}
onMounted(() => {
    firstInput.value?.focus
})

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const validationSchema = toFormValidator(
  z.object({
    email: z.string(required).email('Veuillez saisir une adresse e-mail valide'),
    password: z.string(required)
    .regex(passwordRegex,{
      message: 'Le mot de passe doit contenir au moins 1 lettre minuscule, 1 lettre majuscule, 1 chiffre et 1 caractère spécial parmi @, $, !, %, *, ?, &',

    })
      
  })
);

const {handleSubmit,isSubmitting,setErrors} = useForm({
    validationSchema,
    initialValues
  
})

const { value: emailValue, errorMessage: emailError } = useField('email');
const { value: passwordValue, errorMessage: passwordError } = useField('password');

const onSubmit =  handleSubmit(async(formValues :IFormuser) => {
  
    console.log(formValues);  
})

</script>
<template>
    <div class="d-flex flex-row justify-content-center aligns-items-center mt-20 ">
    <div class="card form-register" >
        <h1 class="mb-20">Inscription</h1>
    <form @submit="onSubmit">
            <div class="d-flex flex-col mb-20">
                <label for="email" class="mb-5">Email</label>
                <input id="email" ref="firstInput" type="text"  v-model="emailValue">
                <small class="form-error" v-if="emailError">{{ emailError}}</small>
            </div>
            <div class="d-flex flex-col mb-20">
                <label for="password" class="mb-5">password</label>
                <input id="password" v-model="passwordValue"/>
                <small class="form-error" v-if="passwordError">{{passwordError }}</small>
            </div>
            <button type="submit" class="btn btn-primary" :disabled="isSubmitting">Valider</button>
    </form>
 </div>
</div>
</template>
<style scoped lang="scss">
.form-register{
    width: 100%;
    padding:20px;
    width:500px;

}
</style>