import { createRouter, createWebHistory } from 'vue-router'
import Doctor from '@/views/admin/Doctor.vue'
import Patient from '@/views/admin/Patient.vue'
import AdminHome from '@/views/admin/AdminHome.vue'

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
    }, {
      path: '/doctorLogin',
      name: 'doctorLogin',
      component: () => import('@/views/DoctorLogin.vue'),
    },{
      path: '/admin',
      name: 'admin',
      component: () => import('@/views/AdminView.vue'),
      children: [
        {
          path: 'doctorManagement',
          name: 'doctorManagement',
          component: Doctor,
        }, {
          path: 'patient',
          name: 'patient',
          component: Patient,
        }, {
          path: 'home',
          name: 'adminHome',
          component: AdminHome,
        }
      ],
    }, {
      path: '/adminLogin',
      name: 'adminLogin',
      component: () => import('@/views/AdminLogin.vue'),
    }
  ],
})

export default router
