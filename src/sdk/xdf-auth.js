// modify 2020-07-06 13:25:26
import xdfConfig from './xdf-config';
import axios from './xdf-axios';
import xdfUtil from './../utils/xdf-utils';

function _getToken() {
    // return 'c9370752-d300-4762-b0f1-183d86a28f54';
    let ret = null;
    let m = null;
    if ((m = String(document.cookie).match(new RegExp('(?:^| )U2AT(?:(?:=([^;]*))|;|$)')))) {
        ret = m[1] ? decodeURIComponent(m[1]) : '';
    }
    if (ret === null) {
        return '';
    }
    return ret;
}

function isLogin(cbFnYes, cbFnNo) {
    const _par = xdfUtil.parseParams(window.location.search) || {};

    setTimeout(() => {
        const _fesdk = window._fesdk;
        if (_fesdk) {
            _fesdk.track('loginAction', {
                wbToken: _getToken(),
                wbAction: 'isLogin',
                wbQuery: _par,
                wbCbFnNoType: typeof cbFnNo
            });
        }
    }, 1000);

    if (!_par.isE2 && _getToken() === '') {
        if (typeof cbFnNo === 'function') {
            cbFnNo();
        }
        return null;
    }

    axios({
        url: `${xdfConfig.wbUrl}/verify/verifyToken`,
        method: 'get'
    })
    .then(res => {
        res.data.code === 10000
            ? typeof cbFnYes === 'function' && cbFnYes()
            : typeof cbFnNo === 'function' && cbFnNo();
    })
    .catch(() => {
        typeof cbFnNo === 'function' && cbFnNo();
    });
}

function getUserInfo() {}

function login() {
    const _par = xdfUtil.parseParams(window.location.search) || {};
    let url = `${xdfConfig.passportWebGoTo}?redirect_uri=${encodeURIComponent(window.location.href)}&app_id=wangbao&ehr_org_id=105`;

    // E2处理
    if (_par.isE2) {
        url = `${xdfConfig.passportWebGoToE2}?e2clientid=20111&returnUrl=${encodeURIComponent(window.location.href)}`;
    }

    setTimeout(() => {
        const _fesdk = window._fesdk;
        if (_fesdk) {
            _fesdk.track('loginGo', {
                wbToken: _getToken(),
                wbAction: 'login',
                wbUrl: url,
                wbQuery: _par,
                wbCbFnNoType: typeof cbFnNo
            });
        }
    }, 1000);

    // E2、U2处理
    window.location.href = url;
}

function logout() {
    const _date = new Date();
    _date.setTime(_date.getTime() - 7 * 24 * 60 * 60 * 1000);
    _date.toUTCString();
    document.cookie = `U2AT=notLogin; expires=${_date}; path=/`;
    document.cookie = `U2AT=notLogin; expires=${_date}; domain=.xdf.cn; path=/`;
    window.localStorage.clear();
    window.location.href = `${xdfConfig.passportUrl}?redirect_uri=${encodeURIComponent(window.location.href)}&app_id=wangbao&ehr_org_id=105`;
}

export default {
    isLogin,
    login,
    logout,
    getToken: _getToken,
    getUserInfo
};
// DEMO
// xdfAuth.isLogin(
//   function () {
//     console.log('yes');
//   },
//   function () {
//     xdfAuth.login();
//     console.log('no');
//   }
// );
