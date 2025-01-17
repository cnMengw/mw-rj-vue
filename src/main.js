import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import VueAddition from './vue-addition';
import ElementUI from 'element-ui';
import { Toast } from 'vant';
import './components/loading/loading.js';
// import './reset.css';

import 'element-ui/lib/theme-chalk/index.css';
import 'lib-flexible';

Vue.prototype.$toast = Toast;
Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(VueAddition);

window.$mvvm = new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
