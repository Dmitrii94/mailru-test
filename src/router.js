import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:paperId',
      name: ':paperId',
      component: () => import('./views/Paper.vue')
    },
    {
      path: '/:paperId/:mode',
      name: ':paperId',
      component: () => import('./views/Paper.vue')
    },
    {
      path: '/create',
      name: ':create',
      component: () => import('./views/Paper.vue')
    }
  ]
})
