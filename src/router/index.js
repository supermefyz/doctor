import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ()=>import('@/views/HomeView.vue'),
    },
    {
      path: '/userMessage',
      name: 'userMessage',
      component: ()=>import('@/views/UserMessage.vue'),
    },
    {
      path: '/chat',
      name: 'chat',
      component: ()=>import('@/views/ChatView.vue'),
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: ()=>import('@/views/DoctorView.vue'),
    }, {
      path: '/patient',
      name: 'patient',
      component: () => import('@/views/PatientView.vue'),
    }, {
      path: '/doctorSearch',
      name: 'doctorSearch',
      component: () => import('@/views/DoctorSearch.vue'),
    }
  ],
})

export default router
