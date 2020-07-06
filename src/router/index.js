import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      login: false,
      title: '線上相簿 | 首頁'
    }
  },
  {
    path: '/reg',
    name: 'Reg',
    component: () => import(/* webpackChunkName: "reg" */ '../views/Reg.vue'),
    meta: {
      login: false,
      title: '線上相簿 | 註冊'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: {
      login: false,
      title: '線上相簿 | 登入'
    }
  },
  {
    path: '/album',
    name: 'Album',
    component: () => import(/* webpackChunkName: "album" */ '../views/Album.vue'),
    meta: {
      login: true
      // 這裡不寫title，因為想要抓到使用者的資料顯示出來，但是這裡並沒有抓使用者的資料，所以會顯示錯誤，要在該元件中撰寫。
    }
  }
]

const router = new VueRouter({
  routes
})
// 登入時候擋頁面
router.beforeEach((to, from, next) => {
  if (to.meta.login && !store.state.user) {
    next('login')
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  // 三元運算 原本長這樣 if (to.name !== 'Album') ?{ document.title = to.meta.title} :else {document.title = store.state.user + '的相簿'}
  document.title = (to.name !== 'Album') ? to.meta.title : store.state.user + '的相簿'
})
export default router
