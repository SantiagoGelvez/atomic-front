import { createRouter, createWebHistory } from 'vue-router'

const isAuthenticated = false

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: isAuthenticated ? () => import('@/layouts/ProjectsLayout.vue') : () => import('@/layouts/LandingLayout.vue'),
      redirect: isAuthenticated ? { name: 'projects-list' } : { name: 'landing' },
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
        },
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

export default router
