import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import { routes } from './routes';

Vue.config.productionTip = false

Vue.use(VueRouter);

const router = new VueRouter({
  routes, //es6 ya göre sadece routes yazıldı
  mode:'history',
});

new Vue({
  el:'#app',
  router: router,
  render: h => h(App),
});