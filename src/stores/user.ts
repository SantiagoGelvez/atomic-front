import { defineStore } from 'pinia'
import apiClient from '@/plugins/axios'
import router from '@/router'

export const useUserStore = defineStore('user', {
    state: () => ({
        uuid: '',
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        user_type: '',
        company: '',
        token: null
    }),

    actions: {
        async login(formData: FormData) {
            try {
                const response = await apiClient.post('users/login', formData)

                this.$patch({
                    ...response.data.user,
                    token: response.data.token
                })
            } catch (error) {
                throw error
            }
        },

        async register(formData: FormData) {
            try {
                const response = await apiClient.post('users/register', formData)

                this.$patch({
                    ...response.data.user,
                    token: response.data.token
                })
            } catch (error) {
                throw error
            }
        },

        async logout() {
            await apiClient.post('users/logout')

            this.$reset()

            router.push({ name: 'home' })
        },

        async checkAuth() {
            try {
                const response = await apiClient.get('users')

                this.$patch({
                    ...response.data.user,
                    token: response.data.token
                })
            } catch (error) {
                this.$reset()
            }
        },

        async update(formData: FormData) {
            try {
                const response = await apiClient.put('users', formData)

                this.$patch({
                    ...response.data.user, 
                    token: response.data.token
                })
            } catch (error) {
                throw error
            }
        }
    },

    getters: {
        isAuthenticated: (state) => !!state.token,
    }
})
