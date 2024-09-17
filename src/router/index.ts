import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAlertLoading } from '@/composables/useAlert'


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('@/layouts/ProjectsLayout.vue'),
            children: [
                {
                    path: 'landing',
                    name: 'landing',
                    component: () => import('@/views/LandingView.vue')
                },
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('@/views/LoginView.vue'),
                },
                {
                    path: 'register',
                    name: 'register',
                    component: () => import('@/views/RegisterView.vue'),
                }
            ]
        },
        {
            path: '/projects',
            name: 'projects',
            component: () => import('@/layouts/ProjectsLayout.vue'),
            children: [
                {
                    path: '',
                    name: 'projects-list',
                    component: () => import('@/views/ProjectsListView.vue')
                },
                {
                    path: ':projectUUID',
                    name: 'project-details',
                    component: () => import('@/views/ProjectDetailsView.vue'),
                },
                {
                    path: ':projectUUID/revisions/:revisionUUID',
                    name: 'project-revisions',
                    component: () => import('@/views/ProjectRevisionsView.vue')
                }
            ]
        },
        // 404 Not Found
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: () => import('@/views/NotFoundView.vue')
        }
    ]
})

router.beforeEach( async (to, from, next) => {
    const userStore = useUserStore()
    const AlertLoading = useAlertLoading()

    AlertLoading.show()
    await userStore.checkAuth()
    AlertLoading.hide()

    if (to.name === 'home') {
        if (userStore.isAuthenticated) {
            next({ name: 'projects-list' })
        } else {
            next({ name: 'landing' })
        }
    } else {
        next()
    }
})

export default router
