import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
axios.defaults.baseURL = process.env.VUE_APP_BASE_BACKEND_URL;
axios.defaults.headers['Content-Type'] = "application/json"

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
