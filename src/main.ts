// @ts-ignore
import Vue from 'vue'
import App from './App.vue'
import router from './router'

import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/tailwind.css'
import './assets/css/style.css'
import './assets/css/normalize.css'
// @ts-ignore
import Proton from '@proton-ui/proton'

Vue.use(Proton)
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App)
}).$mount('#app')
