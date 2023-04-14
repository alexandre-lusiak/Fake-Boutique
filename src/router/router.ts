import {createRouter,createWebHistory} from 'vue-router'
import NotFound from '../views/NotFound.vue'
import { ADMIN_ROUTES } from '@/features/admin/admin.routes'
import { initialFetchProducts, useProduct } from '@/features/boutique/store/productstore'
import { initialFetchProductsAdmin } from '@/features/admin/store/adminStore'
export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path:'/',
            redirect:'/boutique'
        },
        {
            path:'/boutique',
            beforeEnter:[initialFetchProducts],
            component:() => import('@/features/boutique/Boutique.vue')
        },
        {
                path:'/admin',
                beforeEnter:[initialFetchProductsAdmin],
                component:() => import('@/features/admin/Admin.vue'),
                children:ADMIN_ROUTES
        },
        {
            path:'/login',
            component:() => import('@/features/user/views/LoginForm.vue'),
            
        },
        {
            path:'/register',
            component:() => import('@/features/user/views/RegisterForm.vue'),
            
        },
        {
            path:'/:notfound(.*)*',
            component: NotFound
        }
        
    ]
})