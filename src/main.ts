import Vue from 'vue';
import App from './App.vue';
import store from './store/store';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
Vue.use(Vuetify);
Vue.config.productionTip = true;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
