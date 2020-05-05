import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import {
  routes
} from './routes';
import VueGoogleCharts from 'vue-google-charts';
import Toasted from 'vue-toasted';

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueGoogleCharts);
Vue.use(Toasted, {
  duration: 2000
});

const router = new VueRouter({
  routes, //es6 ya göre sadece routes yazıldı
  mode: 'history',
});

new Vue({
  el: '#app',
  router: router,
  render: h => h(App),
});