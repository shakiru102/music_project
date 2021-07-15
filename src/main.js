import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import { dbAuth } from './firebase/config'

Vue.config.productionTip = false

export const bus = new Vue()

let app 
dbAuth.onAuthStateChanged(()=>{
  if(!app){
    app = new Vue({
      router,
      vuetify,
      render: h => h(App)
    }).$mount('#app')
  }
})


