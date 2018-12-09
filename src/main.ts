import Vue from 'vue'

import App from './App.vue'
import store from "./store/index";
import Router from "vue-router";
import routes from "./routes"
import VueResource from "vue-resource";
import VShowSlide from 'v-show-slide'

Vue.use(VueResource);
Vue.use(Router);
Vue.use(VShowSlide);

const router = new Router({
    routes,
    mode: 'history'
});

new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
});

export default router;

