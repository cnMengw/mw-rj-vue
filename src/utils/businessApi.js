import xdfAxios from '@/sdk/xdf-axios';
import uuid from '@/utils/xdf-uuid';
import xdfConfig from '@/sdk/xdf-config';
import xdfCompute from '@/utils/xdf-compute';
import xdfUtil from '@/utils/xdf-utils';
import xdfAuth from '@/sdk/xdf-auth';
import { Toast } from 'vant';
const bussinessApi = {
    // C端埋点
    ccPoint(route) {
        try {
            const webjssdk = window.webjssdk;
            if (!webjssdk) {
                return null;
            }
            // 埋点数据初始化
            // 参数分别是项目名，版本，用户的uid，是否是开发环境，环境参数
            const env = xdfConfig.environment !== 'online' || false;
            const token = xdfAuth.getToken();
            const ORIGIN_PROTOCOL = window.location.protocol;
            // http不支持，只支持https
            if ( ORIGIN_PROTOCOL !== 'https:') {
                return null;
            }
            console.log(env, '埋点-env');
            webjssdk.getinstance('m_shoppingcart', '1.0', token, env, 'dev').reconnect(false);
        } catch (error) {}
    },
    // 获取优惠
    getOptimal(args) {
        const data = {};
        data.schoolId = args.schoolId;
        data.mode = 'default';
        data.studentClassInfoListJson = this.formatStudentClassJson(
            args.classCodeArray,
            args.studentCode,
            args.tag
        );
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.bmUrl}/Unified/Voucher/GetOptimal`,
                method: 'post',
                data
            })
            .then(response => {
                response = response.data;
                let resData = {};
                if (response.State === 1) {
                    let optimalTotal = 0;
                    response.Data.VoucherItems.forEach(item => {
                        // todo...
                        if (item) {
                            // 浮点数直加调用统一add方法
                            optimalTotal = xdfCompute.add(optimalTotal, item.Fees || 0);
                        }
                    });
                    resData = {
                        State: 1,
                        Error: response.Error,
                        Data: {
                            totalFees: optimalTotal,
                            groupByVoucherCode: response.Data.GroupByVoucherCode,
                            voucherItems: response.Data.VoucherItems
                        }
                    };
                    resolve(resData);
                }
            });
        });
    },
    // 获取商品优惠
    getOptimalNewV2(args) {
        const data = {
            giftProductList: [ // 用户选择的赠品列表
                {
                    giftIdList: [], // 赠品ID列表
                    needGift: true, // 是否需要赠品(不传默认需要)
                    productIdList: [] // 一起命中赠品的购买商品ID列表
                }
            ],
            productCouponList: [
                {
                    couponList: [], // 	商品使用优惠券编码
                    productId: 0
                }
            ],
            productIds: [],
            quantities: [], // 商品数量
            saleModeIds: [], // 销售方式
            schoolId: 0,
            studentCode: ''
        };
        const { productList, schoolId, studentCode } = args;
        data.schoolId = schoolId;
        data.studentCode = studentCode;
        data.productCouponList = productList.map(item => ({
            productId: item.productId,
            couponList: [],
            studentCode: studentCode || ''
        }));
        data.productIds = productList.map(item => item.productId); // 产品ID
        data.quantities = productList.map(item => !item.chose ? 1 : item.chose); // 选择数量
        data.saleModeIds = productList.map(item => item.saleModeId); // 销售方式
        // 暂时不需要的参数
        delete data.giftProductList;
        const reqponseData = data => data;
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.wbUrl}/voucher/getCombineVoucher`,
                method: 'post',
                json: true,
                data
            })
            .then(res => {
                res = res.data;
                const { code, data, message } = res;
                let resData = {};
                if (code === 10000) {
                    resData = reqponseData(data);
                    resolve(resData);
                } else {
                    Toast(message);
                    resolve({});
                }
            });
        });
    },

    /** 获取班课优惠 */
    getOptimalNew(args) {
        const data = {};
        const { classCodeArray, schoolId, studentCode } = args;
        data.schoolId = schoolId;
        data.voucherItemEntityList = classCodeArray.map(item => ({
            classCode: item.goodsCode,
            couponList: [],
            studentCode: studentCode || ''
        }));
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.wbUrl}/voucher/getSuperPosition`,
                method: 'post',
                json: true,
                data
            })
            .then(res => {
                res = res.data;
                const { code, data, message } = res;
                let resData = {};
                if (code === 10000) {
                    let optimalTotal = 0;
                    const voucherGroupList = data.voucherResultVos || [];
                    const couponResultList = data.couponResultList || [];
                    voucherGroupList.forEach(item => {
                        if (item) {
                            // 浮点数直加调用统一add方法
                            optimalTotal = xdfCompute.add(optimalTotal, item.fees || 0);
                        }
                    });
                    resData = {
                        totalFees: optimalTotal,
                        voucherList: couponResultList,
                        voucherGroupList
                    };
                    resolve(resData);
                    return null;
                }
                Toast(message);
                resolve({});
            });
        });
    },

    /** 获取学习机优惠 */
    getXxjOptimal(args) {
        const data = {};
        const { classCodeArray, schoolId, studentCode, saleModes } = args;
        data.schoolId = schoolId;
        data.studentCode = studentCode;
        data.productIds = classCodeArray;
        data.saleModes = saleModes;
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.wbUrl}/voucher/getProductVoucher`,
                method: 'get',
                data
            })
            .then(res => {
                res = res.data;
                const { code, data } = res;
                let resData = {};
                if (code === 10000) {
                    resData = {
                        totalFees: data.totalPreferentialAmount,
                        productList: data.productList,
                        voucherGroupList: data.voucherGroupList
                    };
                    resolve(resData);
                }
            });
        });
    },
    formatStudentClassJson(classCodeArray, studentCode, tag) {
        const _studentClass = [];
        const _tag = tag || '';
        const _studentCode = studentCode || '';
        classCodeArray.forEach(item => {
            _studentClass.push({
                Guid: uuid.guid(),
                ClassCode: item,
                StudentCode: _studentCode,
                isRecommendPeople: 'false',
                seatNo: '',
                Tag: _tag
            });
        });
        const _studentClassJson = JSON.stringify(_studentClass);
        return _studentClassJson;
    },
    checkNotice(callback) {
        xdfAxios({
            url: `${xdfConfig.bmUrl}/Unified/Common/EnableNotice`,
            method: 'get',
            showLoading: true
        })
        .then(response => {
            response = response.data;
            if (response.State === 1) {
                if (response.Data && response.Data.Enable) {
                    // 公告开启  type = 3
                    const msg = response.Data.Message === '' ? '系统正在维护，请您稍后再试！' : response.Data.Message;
                    window.$mvvm.showError({ type: 'systemNotice', msg, isReload: true });
                } else {
                    typeof callback === 'function' ? callback() : '';
                }
            } else {
                typeof callback === 'function' ? callback() : '';
            }
        });
    },
    async getCancelTime(schoolId) {
        // 获取订单超时的时间
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.bmUrl}/Unified/Order/GetCancelTime`,
                method: 'get',
                params: {
                    schoolId
                }
            }).then(({ data }) => {
                const { Data, State } = data;
                if ( State !== 1 ) {
                    reject(data);
                } else {
                    resolve(Data);
                }
            });
        });
    },
    async getServerTime() {
        // 获取订单超时的时间
        return new Promise((resolve, reject) => {
           xdfAxios({
                url: `${xdfConfig.wbUrl}/common/getServerTime`,
                method: 'get'
            }).then(res => {
                res = res.data;
                const { code, data, message } = res;
                if ( code !== 10000 ) {
                    reject(message);
                } else {
                    resolve(data);
                }
            });
        });
    },
    getPayUrl(params) {
        // 获取支付中心地址 appid, payOrderId, orderCode
        params = params || {};
        const _params = { orderCode: params.orderCode };
        let url = `${xdfConfig.wbUrl}/order/toPay`;
        if (params.orderType) {
            _params.orderType = params.orderType;
        }
        if (params.authFail) {
            _params.authFail = params.authFail;
        }
        if (params.pageType) {
            url = `${xdfConfig.wbUrl}/order/toPayAnon`;
            _params.orderCodeSign = params.orderCodeSign;
        }
        return new Promise((resolve, reject) => {
           xdfAxios({
                url,
                method: 'get',
                params: _params
            }).then(res => {
                res = res.data;
                const { code, message } = res;
                const data = res.data || {};
                let href = data.payUrl;
                if ( code !== 10000 ) {
                    Toast(message);
                    reject(data);
                    return;
                }
                if (!href) {
                    reject(data);
                    return;
                }
                if (xdfUtil.getQueryString().appId === 'upocAppletApp') {
                    window.location.href = `${xdfConfig.upocAppletAppUrl}?payOrderId=${params.payOrderId}`;
                    return;
                }
                // 小程序无法唤起支付，添加参数
                const payWxSmallRoutine = JSON.parse(sessionStorage.getItem('payWxSmallRoutine')) || {};
                const { openid, weixinSubAppId } = payWxSmallRoutine;
                if (openid && weixinSubAppId) { href = `${href}&${xdfUtil.strParams(payWxSmallRoutine)}`; }
                resolve({ href: encodeURI(href), ...data });
            });
        });
    },
    // 监管跳转
    jumpPay(redirectType, url, that) {
        if (redirectType === 2 && ['weChart'].includes(xdfConfig.browser)) {
            that.$router.push({
                path: '/pay-mark',
                query: {
                    ...that.$route.query,
                    title: that.$route.name,
                    goUrl: url
                }
            });
            return true;
        }
        return false;
    }
};

export default bussinessApi;
