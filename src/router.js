import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesRegister from './pages/coaches/CoachesRegister.vue'

import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsList from './pages/requests/RequestsList.vue'

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
        { path: "/register", component: CoachesRegister },
        { path: "/requests", component: RequestsList },
        { path: "/:notFound(.*)", component: NotFound },




    ]
})

export default router