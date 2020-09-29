import Vue from 'vue'
import Router from 'vue-router'
import Welcome from '@/components/Welcome'
import Login from '@/components/Login'
import Signup from '@/components/Signup'
import Chat from '@/components/Chat'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Welcome',
      component: Welcome
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/chat',
      name: 'Chat',
      component: Chat,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})

// Route guard to ensure that only signed in users can access chat
router.beforeEach((to, from, next) => {
  // Check if route requires auth
  if (to.matched.some(req => req.meta.requiresAuth)) {
    let user = firebase.auth().currentUser
    if (user) {
      next()
    } else {
      next({ name: 'Login' })
    }
  } else {
    next()
  }
})


export default router