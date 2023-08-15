import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAddition from './vue-addition';
import 'lib-flexible';
import './assets/base.scss';
import { Toast } from 'vant';
Vue.prototype.$toast = Toast;
Vue.config.productionTip = false;
Vue.use(VueAddition);

window.$mvvm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
