// modify 2020-04-17 11:42:35
const ORIGIN_PROTOCOL = window.location.protocol;
const HTTP_PROTOCOL = ORIGIN_PROTOCOL === 'file:' ? 'http:' : ORIGIN_PROTOCOL;
const XDF_LOCAL_GET = '/xdf-local-get';
// const XDF_ESDEV_GET = '//fesdk.test.xdf.cn/xdf-esdev-get';
// const XDF_MOCK_PHP = '/xdf-mock-php';

// 生产环境
const xdfConfig = {};
xdfConfig.h5ThisWeb = `${HTTP_PROTOCOL}//${window.location.host}`;
xdfConfig.environment = 'online';
xdfConfig.debug = false;
xdfConfig.h5bmUrl = `${HTTP_PROTOCOL}//h5bm.xdf.cn`;
xdfConfig.h5bmPathBase = '/page-h5bm';
xdfConfig.h5bmIsRouter = false;
xdfConfig.passportWebGoTo = `${HTTP_PROTOCOL}//login.xdf.cn/sso/login`;
xdfConfig.passportWebGoToE2 = `${HTTP_PROTOCOL}//e2api.staff.xdf.cn/e2/qr`;

xdfConfig.passportUrl = `${HTTP_PROTOCOL}//login.xdf.cn/logout.html`;
xdfConfig.bmUrl = `${HTTP_PROTOCOL}//bm.xdf.cn`;
xdfConfig.upocAppletAppUrl = `${HTTP_PROTOCOL}//xuban.xdf.cn/mini/h5/redirect2wx`; // 此域名是uopc小程序，支持双协议
xdfConfig.wxapidataUrl = `${HTTP_PROTOCOL}//xubanapi.xdf.cn`; // 引域名续班接口，支持双协议
xdfConfig.wxapidataAppId = 700;
xdfConfig.soukeUrl = `${HTTP_PROTOCOL}//m.souke.xdf.cn`;
xdfConfig.wbUrl = `${HTTP_PROTOCOL}//gateway.xdf.cn/web_reg_uapi`; // 网报java后台
xdfConfig.purUrl = `${HTTP_PROTOCOL}//product.xdf.cn`; // 单次课，系列课
xdfConfig.zizhuUrl = `${HTTP_PROTOCOL}//zizhu.xdf.cn`; // 自助退

const browser = () => new Promise(((resolve, reject) => {
    // 做一些异步操作
    let type = '';
    const wx = window.wx;
    const ua = navigator.userAgent.toLowerCase();
    const re = ua.match(/MicroMessenger/i) || '';
    // 判断是否在微信浏览器内
    if (re.includes('micromessenger')) {
        wx.miniProgram.getEnv(res => {
            if (res.miniprogram) {
                type = 'miniWeChart';
                console.log('在小程序内');
            } else {
                type = 'weChart';
                console.log('不在小程序内');
            }
            resolve(type);
        });
    } else {
        type = 'other';
        resolve(type);
        console.log('不在微信浏览器内');
    }
}));

browser().then(res => {
    xdfConfig.browser = res;
});

if (window.location.hostname !== 'h5bm.xdf.cn') {
    const arrayBaseDomain = ['h5bm.staff.xdf.cn', 'h5bm.test.xdf.cn'];
    const objBaseDomain = {
        nodeDev: [], // 本地开发环境
        nodeT: [], // 本地测试环境
        nodeQ: [], // 生产环境
        nodeMock: [], // 本地模拟环境
        t: ['t', 'test'], // 测试环境
        q: ['q'], // Q环境
        proxy: [] // 代理环境，默认测试环境数据库，需要在nginx代理环境上确认
    };
    const objEnvironment = {
        nodeDev: ['dev.local.xdf.cn', '127.0.0.1', 'localhost'],
        nodeT: ['t.local.xdf.cn'],
        nodeQ: ['q.local.xdf.cn'],
        nodeMock: ['mock.local.xdf.cn', '10.201.241.175', '10.201.128.214'],
        t: [],
        q: []
    };
    for (const key in objBaseDomain) {
        for (let i = 0; i < objBaseDomain[key].length; i++) {
            for (let j = 0; j < arrayBaseDomain.length; j++) {
                objEnvironment[key].push(objBaseDomain[key][i] + arrayBaseDomain[j]);
            }
        }
    }
    const isEnvironment = {
        t: false,
        q: false,
        nodeDev: false,
        nodeMock: false,
        nodeT: false,
        nodeQ: false
    };
    for (const key in objEnvironment) {
        for (let i = 0; i < objEnvironment[key].length; i++) {
            if (window.location.hostname === objEnvironment[key][i]) {
                isEnvironment[key] = true;
                xdfConfig.environment = key;
                xdfConfig.debug = true;
            }
        }
    }

    if (isEnvironment.nodeDev || isEnvironment.t || isEnvironment.nodeT) {
        xdfConfig.h5bmPathBase = '';
        xdfConfig.upocAppletAppUrl = `${HTTP_PROTOCOL}//xytest.staff.xdf.cn/miniprogram/redirect2Wx`;
        xdfConfig.h5bmUrl = `${HTTP_PROTOCOL}//${window.location.host}`;
        xdfConfig.passportWebGoTo = `${HTTP_PROTOCOL}//login-t.test.xdf.cn/sso/login`;
        xdfConfig.passportWebGoToE2 = '//teste2api.test.xdf.cn/e2/qr?e2clientid=10050&';

        xdfConfig.passportUrl = `${HTTP_PROTOCOL}//login-t.test.xdf.cn/logout.html`;
        xdfConfig.bmUrl = `${HTTP_PROTOCOL}//bmt.staff.xdf.cn`;
        xdfConfig.wxapidataUrl = `${HTTP_PROTOCOL}//txubanapi.test.xdf.cn`;
        xdfConfig.soukeUrl = `${HTTP_PROTOCOL}//msouke.test.xdf.cn`;
        xdfConfig.wbUrl = `${HTTP_PROTOCOL}//gateway.test.xdf.cn/web_reg_uapi`;
        xdfConfig.purUrl = `${HTTP_PROTOCOL}//product.test.xdf.cn`;
        xdfConfig.zizhuUrl = `${HTTP_PROTOCOL}//tzizhu.test.xdf.cn`;
    }

    if (isEnvironment.nodeMock) {
        xdfConfig.h5bmUrl = `${HTTP_PROTOCOL}//${window.location.host}`;
        xdfConfig.h5bmPathBase = '';
        xdfConfig.passportWebGoTo = '//h5.staff.xdf.cn/i/u2new/index.aspx';
        xdfConfig.passportWebGoToE2 = '//h5.staff.xdf.cn/i/e2new/login?';

        xdfConfig.passportUrl = '//h5.staff.xdf.cn/i/u2new/index.aspx';
        xdfConfig.bmUrl = `${XDF_LOCAL_GET}/bm`;
        xdfConfig.wxapidataUrl = `${XDF_LOCAL_GET}/xubanapi`;
        xdfConfig.soukeUrl = `${HTTP_PROTOCOL}//msouke.test.xdf.cn`;
        xdfConfig.wbUrl = `${XDF_LOCAL_GET}/bm`;
        xdfConfig.purUrl = `${HTTP_PROTOCOL}//product.test.xdf.cn`;
        xdfConfig.zizhuUrl = `${HTTP_PROTOCOL}//tzizhu.test.xdf.cn`;
    }

    if (isEnvironment.q || isEnvironment.nodeQ) {
        xdfConfig.upocAppletAppUrl = `${HTTP_PROTOCOL}//xytest.staff.xdf.cn/miniprogram/redirect2Wx`;
        xdfConfig.h5bmUrl = `${HTTP_PROTOCOL}//${window.location.host}`;
        xdfConfig.passportWebGoTo = `${HTTP_PROTOCOL}//login-q.test.xdf.cn/sso/login`;
        xdfConfig.passportWebGoToE2 = '//teste2api.test.xdf.cn/e2/qr?e2clientid=10050&';

        xdfConfig.passportUrl = `${HTTP_PROTOCOL}//login-q.test.xdf.cn/logout.html`;
        xdfConfig.bmUrl = `${HTTP_PROTOCOL}//bmq.staff.xdf.cn`;
        xdfConfig.wxapidataUrl = `${HTTP_PROTOCOL}//txubanapi.test.xdf.cn`;
        xdfConfig.soukeUrl = `${HTTP_PROTOCOL}//m.souke.xdf.cn`;
        xdfConfig.wbUrl = `${HTTP_PROTOCOL}//gateway-q.test.xdf.cn/web_reg_uapi`;
        xdfConfig.purUrl = `${HTTP_PROTOCOL}//product-q.test.xdf.cn`;
        xdfConfig.zizhuUrl = `${HTTP_PROTOCOL}//qzizhu.test.xdf.cn`;
    }
}
export default xdfConfig;
