import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

// Vuetify
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

import './assets/todostyles.css';

Vue.config.productionTip = false
Vue.prototype.$http = axios;

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app');
