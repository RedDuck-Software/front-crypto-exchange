// @ts-ignore
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'
// @ts-ignore
import VueInputAutowidth from 'vue-input-autowidth'

import '@fortawesome/fontawesome-free/css/all.css'
import './assets/css/tailwind.css'
import './assets/css/style.css'
import './assets/css/normalize.css'
import './assets/css/menuOptions.css'
import './assets/css/connectWalletButton.css'
import './assets/css/converter.css'
import './assets/css/cinput.css'
import './assets/css/light.css'
import './assets/css/header.css'
import './assets/css/footer.css'
import './assets/css/transferTab.css'
import './assets/css/donateTab.css'
import './assets/css/text.css'
import './assets/css/video.css'
import './assets/css/poppups.css'
// @ts-ignore
import PortalVue from 'portal-vue'
// import axios from 'axios'

Vue.use(PortalVue)
Vue.use(VueInputAutowidth)
Vue.config.productionTip = false
// Vue.prototype.$http = axios
// axios.defaults.baseURL = 'https://api-cash4crypto.azurewebsites.net/api'

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
