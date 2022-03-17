import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesRegister from './pages/coaches/CoachesRegister.vue'

import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsList from './pages/requests/RequestsList.vue'

import UserAuth from './pages/auth/UserAuth.vue'

import store from './store';


import NotFound from './pages/NotFound.vue'




const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", redirect: "./coaches" },
        { path: "/coaches", component: CoachesList },
        {
            path: "/coaches/:id", component: CoachDetail, props: true, children: [
                { path: "/coaches/:id/contact", component: ContactCoach }
            ]
        },
        { path: "/register", component: CoachesRegister ,meta: {requiresAuth: true}},
        { path: "/requests", component: RequestsList ,meta: {requiresAuth: true} },
        { path: "/auth", component: UserAuth ,meta: {requiresUnAuth: true} },

        { path: "/:notFound(.*)", component: NotFound },




    ]
})

router.beforeEach((to, from ,next)=>{
    if(to.meta.requiresAuth && !store.getters.isAuthenticated){
        next('/auth')
    } else if(to.meta.requiresUnAuth && store.getters.isAuthenticated){
        next('/coaches')
    } else {
        next()
    }
})

export default router