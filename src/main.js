import Vue from 'vue'
// import Button from 'ant-design-vue/lib/button'
import {Button} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import App from './App.vue'
import router from './router'
Vue.component(Button.name, Button)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
