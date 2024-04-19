import mixin from './mixin';
import * as filter from './filters';
import VueAxios from 'vue-axios';
import vantBase from './components/vant-base';
import xdfUtil from './utils/xdf-utils';
import xdfAuth from './sdk/xdf-auth';
import xdfAxios from './sdk/xdf-axios';
import xdfConfig from './sdk/xdf-config';
import xdfCompute from './utils/xdf-compute';
import * as $echarts from 'echarts';
import _ from 'lodash';


const Plugs = { xdfConfig, xdfAuth, xdfAxios, xdfUtil, xdfCompute, $echarts, _};

const VueAddition = {
    install(Vue) {
        const VUE_PLUGS = Object.keys(Plugs);
        const VUE_FILTER = Object.keys(filter);
        Vue.mixin(mixin);
        VUE_FILTER.forEach(key => {
            Vue.filter(key, filter[key]);
        });
        VUE_PLUGS.forEach(key => {
            Vue.prototype[key] = Plugs[key];
        });
        Vue.use(vantBase);
        Vue.use(VueAxios, xdfAxios);
    }
};
export default VueAddition;
