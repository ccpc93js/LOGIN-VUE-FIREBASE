import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta:{
      requiresAuth: true,
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
  },

  {
    path: '/adduser',
    name: 'AddUser',
    component: () => import(/* webpackChunkName: "adduser" */ '../views/AddUser.vue'),
    meta:{
      requiresAuth: true,
    }

},


  {
    path: '/editUser/:id',
    name: 'EditUser',
    component: () => import(/* webpackChunkName: "editUser" */ '../views/EditUser.vue'),
    meta:{
      requiresAuth: true,
    }

}



]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.matched.some(route => route.meta.requiresAuth)){
    const user = firebase.auth().currentUser;
    if(user){
      next();
    }else{
      next("/login");
    }
  }else{
    next();
  }
})



export default router;