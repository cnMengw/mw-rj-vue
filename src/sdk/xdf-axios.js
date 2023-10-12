/* eslint-disable */
import xdfConfig from './xdf-config';
import toast from 'vant/lib/toast';
import axios from 'axios';
import qs from 'qs';
import xdfUtil from '../utils/xdf-utils';
import xdfAuth from './xdf-auth';
import uuid from '../utils/xdf-uuid';
let loadingCount = 0; // 正在请求的接口数量
let toastLoading; //打开的loading
window.AxiosCacelSource = axios;
/**
 * 创建 h5bm 业务实例
 */
const _xdfAxios = axios.create( {
    timeout: 30000
} );
_xdfAxios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
_xdfAxios.defaults.withCredentials = true;
/**
 * h5bm 业务接口请求拦截器
 */
_xdfAxios.interceptors.request.use(
    config => {
        //判断当前接口是否需要出现等待状态
        config.showLoading && loading.startLoading();
        return AddCommonParam( config );
    },
    error => {
        errorHandle( error );
        return Promise.reject( error );
    }
);
/**
 * h5bm 业务接口响应拦截器
 */
_xdfAxios.interceptors.response.use(
    response => {
        //监听api
        logTransmitResponse( response );
        let config = response.config;
        config.showLoading && loading.closeLoading();
        return response;
    },
    error => {
        //log4j传参
        logTransmit( error );
        if ( error.message && error.message.errorIgnore ) return;
        //错误处理
        errorHandle( error );
        const method = error.config.method.toLowerCase() === 'post' ? 'data' : 'params';
        if ( error.config[method].showLoading || error.config.showLoading ) {
            loading.closeLoading();
        }
        return Promise.reject( error );
    }
);
/**
 * log监控传参
 */
const logTransmit = error => {
    let axiosXDF = {};
    try {
        axiosXDF = {
            config: error.response.config,
            data: error.response.data,
            headers: error.response.headers
        };
        error.response.request.axiosXDF = axiosXDF;
    }
    catch (e) {
        typeof window.fesdk === 'function' && window.fesdk( 'ajaxError', error.config );
    }
    //错误处理
    if ( error.config.error ) {
        errorHandle( error );
    } else {
        return Promise.reject( error );
    }
};
/**
 * log监控接口
 */
const logTransmitResponse = response => {
    if ( response.data.status === 0 ) {
        if ( [30001, 30002, 30003].indexOf( response.data.code ) > 1 || response.config.error ) {
            errorHandle( {
                config: response.config,
                message: response.data.message,
                code: response.data.code
            } );
        }
    }
    let axiosXDF = {};
    try {
        axiosXDF = {
            config: response.config,
            data: response.data,
            headers: response.headers
        };
        response.request.axiosXDF = axiosXDF;
    }
    catch (error) {}
};
/**
 * loading 打开
 */
const loading = {
    startLoading() {
        if ( loadingCount === 0 ) {
            toastLoading = toast.loading( {
                loadingType: 'spinner',
                duration: 0,
                position: 'middle',
                message: '加载中...',
                size: 10
            } );
        }
        loadingCount += 1;
    },
    closeLoading() {
        if ( loadingCount <= 0 ) {
            return;
        }
        loadingCount = loadingCount - 1;
        if ( loadingCount === 0 ) {
            toastLoading && toastLoading.clear();
        }
    }
};
/**
 * h5bm 业务接口添加默认参数
 */
const AddCommonParam = config => {
    let { appId = 'bmApp', systemSource = 'mobilePay', isE2, agentName } = xdfUtil.getQueryString();
    let CommonParam = Object.assign(
        { t: new Date().getTime() }
    );
    if (isE2) {
        CommonParam = { ...CommonParam, isE2 }
    }
    const method = config.method.toLowerCase() === 'post' ? 'data' : 'params';
    config[method] = config[method] || {};
    if ( config[method].showLoading && !config.showLoading ) {
        loading.startLoading();
        config.showLoading = true;
        delete config[method].showLoading;
    }
    let data = {};
    Object.assign( data, CommonParam, config[method] );
    config[method] = method === 'data' ? qs.stringify( data ) : data;
    config.headers['refererXdf'] = window.location.href.toString();
    if(config.json){
        config.headers['Content-type'] = 'application/json';
        config[method] = data
    }
    return config;
};
/**
 * 接口error处理
 */
const errorHandle = error => {
    let apiName = '';
    let logCode = '';
    if ( uuid.getXDFUUID() !== '' ) {
        logCode = uuid.getXDFUUID().slice( 0, 8 );
        logCode = '[' + logCode + ']';
    }
    try {
        apiName = error.config.url.replace( /http:\/\/[^\/]+/, '' );
    }
    catch (err) {
    }
    if ( error.response ) {
        // 接口错误
        toast( '(' + apiName + ') ' + error.response.status + '-服务器内部错误' + logCode );
        return;
    } else if ( error.request ) {
        if ( error.message && error.message.includes( 'timeout' ) ) { //接口超时
            toast( '(' + apiName + ') ' + Math.round( error.request.timeout / 1000 ) + 's请求超时！' + logCode );
            /*window.$mvvm.showError({
             type: showCode,
             msg: errMsg+logCode
             });用于超时阻断*/
            return;
        } else if ( error.message && error.message.match( /network/i ) ) { //网络异常
            console.log( '网络异常，请重试!' + logCode );
        } else {//其他错误
            toast( apiName + 'error!' + logCode );
        }
    } else {//其他错误
        toast( '服务器内部错误!' + logCode );
    }
};
let xdfAxios = function ( option ) {
    return new Promise( ( resolve, reject ) => {
        _xdfAxios( option ).then( response => resolve( response ) ).catch( function ( error ) {
            reject(error);
        } );
    } );
};
xdfAxios.prototype.get = function ( params ) {
    return new Promise( ( resolve, reject ) => {
        _xdfAxios.get( params ).then( response => resolve( response ) ).catch( function ( error ) {
            reject(error);
        } );
    } );
};
xdfAxios.prototype.post = function ( params ) {
    return new Promise( ( resolve, reject ) => {
        _xdfAxios.post( params ).then( response => resolve( response ) ).catch( function ( error ) {
            reject(error);
        } );
    } );
};
export default xdfAxios;
