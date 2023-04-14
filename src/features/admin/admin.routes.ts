import type { RouteRecordRaw } from "vue-router";
import ProductForm from "./views/ProductForm.vue";
import ProductList from "./views/ProductList.vue";

export const ADMIN_ROUTES:RouteRecordRaw[] = [
    {
        path:'',
        redirect:'/admin/addproduct'
    },
    {
        path : 'addproduct',
        component:() => import('@/features/admin/views/ProductForm.vue')
    },
    {
        path:'productlist',
        component:() => import('@/features/admin/views/ProductList.vue')

    },
    {
        path:'edit/:id',
        name:"edit",
        component:() => import('@/features/admin/views/ProductForm.vue')

    }
]