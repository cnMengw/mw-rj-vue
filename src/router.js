import Vue from 'vue';
import Router from 'vue-router';
import xdfUtil from './utils/xdf-utils';
import routerTest from './router/router-test';
import { constant } from 'lodash';
import { construct } from 'core-js/fn/reflect';

/**
 * meta 参数定义说明
 *  auth: true  //是否验证登录  true :验证    false:不验证
 *  notBack:false   //不后退    true: 不后退  false:后退
    ischeckParams: true,  // 是否验证参数 true验证   false不验证
    isIgnoreDefault: false, //是否忽略验证默认参数 appId ,systemSource   true:不验证，false：验证
    checkParams: ['userId', 'studentCode', 'schoolId'] // 除默认参数外还需要要验证的参数列表
 */
Vue.use(Router);
const router = new Router({
    mode: 'history',
    base: process.env.NODE_ENV === 'development' ? process.env.publicPath : '/page-h5bm',
    routes: [
        ...routerTest
    ],
    scrollBehavior() {
        return { x: 0, y: 0 };
    }
});

router.beforeEach((to, from, next) => {
    const store = router.app.$options.store;
    console.log(to.path, 'to.name---');
    sessionStorage.setItem('hash', to.path);
    if (to.meta.title) {
        window.document.title = to.meta.title;
    }
    // 设置禁止后退的页面
    if (to.meta.notBack) {
        xdfUtil.goBackNotWork();
    }

    store.dispatch('checkIsLogin', {
        to,
        cbFn: flag => {
            // let ispass = true;
            if (to.meta.isCheckParams) {
                const ignoreDefault = !!to.meta.isIgnoreDefault;
                const lackParam = xdfUtil.checkInjectInfo(to.meta.checkParams, ignoreDefault, to.fullPath);
                if (lackParam.length > 0) {
                    // ispass = false;
                    router.app.$toast(`${lackParam.join()}不能为空`);
                    return false;
                }
            }
            if (flag) {
                next(flag);
            }
        }
    });
    // const grayPath = ['/order']//灰度路径
    // if(grayPath.indexOf(to.path)>-1){
    //     //获取灰度配置信息
    //     store.dispatch('checkGray',{
    //         schoolId:to.query.schoolId,
    //         callback:function(){
    //             store.dispatch('setGray',to.query.schoolId)
    //         }
    //     })
    // }
});
router.afterEach((to, from) => {
    const toPath = to.path;
    const params = xdfUtil.parseParams(window.location.href) || {};
    if (params.openid && params.weixinSubAppId) {
        sessionStorage.setItem('payWxSmallRoutine', JSON.stringify({ openid: params.openid, weixinSubAppId: params.weixinSubAppId }));
    }
    if (toPath.indexOf('order') > -1) {
        ga('require', 'ecommerce');
    }
    // if(to.query.appId=='bmApp'){
    //     var dom=document.createElement('script');
    //     dom.setAttribute("src","https://images.xdf.cn/cms20150819/xinbannew/js/xdf_global.min.js?v=2016-01");
    //     document.body.appendChild(dom);
    // }
});

// 解决小程序0元支付，不能返回问题
window.addEventListener('popstate', e => {
    const hash = sessionStorage.getItem('hash');
    const publicPath = '';
    const WeixinJSBridge = window.WeixinJSBridge;
    const wx = window.wx;
    try {
        if ([`${publicPath}/paynew-success`, `${publicPath}/order-list`].includes(hash) && WeixinJSBridge && wx) {
            WeixinJSBridge.call('closeWindow');
            wx.miniProgram.navigateBack();
        }
    } catch (error) {

    }
});

export default router;


class demo1 {
    construct(name){
        this.name = name;
    }
    say(){
        console.log(this.name, 'this.name');
        this.name = 12
        return this;
    }
    toSay(){
        this.say();
        return this;
    }
}

class demo2 extends demo1 {
    construct(){
        this.name = 21
    }
    say(){
        this.name = 22
        return this;
    }
}

let aa = new demo1();
let bb = new demo2();
// aa.name = 'a1'
aa.say();
console.log(aa.name);
console.log(aa.toSay());


let name = 3;
let cc = {
    name: 'fd',
    say(){
        console.log(this.name);
    }
}
cc.say();