import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'font-awesome/css/font-awesome.css'
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import NProgress from 'nprogress'//引入nprogress
import 'nprogress/nprogress.css' //这个样式必须引入
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAxios, axios)
Vue.component(CollapseTransition.name, CollapseTransition)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
