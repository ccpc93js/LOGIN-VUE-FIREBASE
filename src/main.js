import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/js/all'

import firebase from 'firebase'


Vue.config.productionTip = false

let app = null
firebase.auth().onAuthStateChanged((user)=>{
  console.log(user)
  if(!app){
   app =  new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
  }
})


