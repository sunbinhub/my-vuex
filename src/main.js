// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
// elementui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App";
import router from "./router";
import store from "./vuex/store";

// store.dispatch("GET_USERLIST").then(() => {
//   console.log("获取数据：", store.state.userList);
// });

//引入 axios
import axios from "axios";
//挂载在Vue的原型上 小技巧
Vue.prototype.axios = axios;

// 注册elementui
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
