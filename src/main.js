import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import "font-awesome/css/font-awesome.css";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
import NProgress from "nprogress"; //引入nprogress
import "nprogress/nprogress.css"; //这个样式必须引入
//代码高亮文件引入
import hljs from "highlight.js";
//样式文件,这里我选的是sublime样式，文件里面还有其他样式可供选择
import "highlight.js/styles/atom-one-light.css";

NProgress.inc(0.2);
NProgress.configure({ easing: "ease", speed: 500, showSpinner: false });

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.component(CollapseTransition.name, CollapseTransition);

Vue.directive("highlight", function (el) {
  let blocks = el.querySelectorAll("pre code");
  blocks.forEach((block) => {
    hljs.highlightBlock(block);
  });
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
