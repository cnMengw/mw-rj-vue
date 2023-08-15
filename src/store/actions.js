import xdfAuth from '../sdk/xdf-auth';
import xdfConfig from '../sdk/xdf-config';
import xdfAxios from '../sdk/xdf-axios';
import businessApi from '@/utils/businessApi';
import xdfUtil from '@/utils/xdf-utils';
import _ from 'lodash';

const actions = {
    /**
     * @param {state,commit}
     * @param {to,cbFn} to：路由传参数,cbFn：回调函数
     */
    checkIsLogin({ state, commit }, { to, cbFn }) {
        if (!to.meta.auth) {
            commit('setIsLogin', true);
            commit('setIsReady', true);
            cbFn(true);
        } else {
            xdfAuth.isLogin(
                () => {
                    commit('setIsLogin', true);
                    commit('setIsReady', true);
                    cbFn(true);
                },
                () => {
                    commit('setIsLogin', false);
                    commit('setIsReady', true);
                }
            );
        }
    },
    // 获取学员信息
    getCurrentStudent(context, type = 0) {
        context.commit('setCurrentStudent', {});
        let url = `${xdfConfig.bmUrl}/Unified/StudentV2/GetList`;
        const { studentCode, schoolId } = $mvvm.$route.query;
        const data = { schoolId };
        if (studentCode) {
            url = `${xdfConfig.bmUrl}/Unified/StudentV2/GetByStuCode`;
            data.studentCode = studentCode;
        }
        xdfAxios({
            url,
            method: 'get',
            showLoading: true,
            params: data
        }).then(({ data }) => {
            const { State, Error } = data;
            let { Data } = data;
            Data = Data || {};
            if (State !== 1) {
                return $mvvm.$dialog.alert({
                    message: Error
                });
            }
            if (studentCode) {
                context.commit('setCurrentStudent', Data);
            } else {
                context.commit('setCurrentStudent', Data[0] || {});
            }
            if (type) {
                setTimeout(() => {
                    context.commit('setStudentIsReady', true);
                }, 200);
            }
        });
    },
    getClassList({ state, commit }) {
        const { schoolId, classCodes } = $mvvm.$route.query;
        xdfAxios({
            url: `${xdfConfig.bmUrl}/Unified/Class/GetList`,
            method: 'get',
            showLoading: true,
            params: {
                schoolId,
                classCodes
            }
        }).then(({ data }) => {
            const { Data, State, Error } = data;
            if (State !== 1) {
                commit('setCurrentStudent', []);
                return $mvvm.$dialog.alert({
                    message: Error
                });
            }
            commit('setClassList', Data);
        });
    },
    checkGray({ state, commit }, params) {
        const session = JSON.parse(sessionStorage.getItem('EnableGrayRelease'));
        if (session && (params.schoolId === session.schoolId)) {
            return;
        }
        params.callback();
    },
    // 获取灰度配置信息
    setGray({ state, commit }, schoolId) {
        return new Promise((resolve, reject) => {
            xdfAxios({
                url: `${xdfConfig.bmUrl}/Unified/Common/EnableGrayRelease`,
                method: 'get',
                showLoading: true,
                timeout: 5000,
                params: {
                    schoolId
                }
            }).then(({ data }) => {
                const { Data, State } = data;
                if (State === 1) {
                    const session = {
                        ...Data,
                        schoolId
                    };
                    sessionStorage.setItem('EnableGrayRelease', JSON.stringify(session));
                    commit('setIsGray', new Date());
                }
                resolve(data);
            });
        });
    },
    // 获取大班量下单标识
    getRouteKey({ state, commit }, length) {
        // 加try catch
        xdfAxios({
                url: `${xdfConfig.bmUrl}/Unified/Order/GetRouteKey`,
                method: 'get',
                timeout: 1000,
                params: {
                    ClassCount: length
                }
            }).then(({ data }) => {
                const { Data, State, Error } = data;
                if (State === 1) {
                    commit('setRouteKey', Data);
                } else {
                    commit('setRouteKey', '');
                }
            })
            .catch(() => {
                commit('setRouteKey', '');
            });
    },
    // 获取订单列表
    getOrderList({ state, commit }, params) {
        const orderList = state.orderList;
        const p1 = xdfAxios({
            url: `${xdfConfig.wbUrl}/order/orderList`,
            method: 'get',
            params: {
                ...params,
                orderState: orderList.orderState,
                studentCode: orderList.studentCode,
                page: orderList.page,
                size: orderList.size
            }
        });
        const p2 = businessApi.getServerTime();
        commit('setOrderList', { loading: true });

        return Promise.all([p1, p2]).then(res => {
            const res1 = res[0];
            const res2 = res[1];
            const { code } = res1.data;
            let { data } = res1.data;
            data = data || {};
            const serverTime = Number(new Date(xdfUtil.timeCovert(res2)));
            commit('setOrderList', { loading: false });
            if (code !== 10000) { return; }
            let list = data.list || [];
            list = list.map(it1 => {
                it1.classList = it1.classList || [];
                it1.classList = it1.classList.map(it2 => {
                    it2.classVo = it2.classVo || {};
                    it2.productVo = it2.productVo || {};
                    return it2;
                });
                return it1;
            });
            orderList.list = [].concat([], orderList.list, list);
            orderList.serverTime = serverTime;
            orderList.total = data.total;
            if (orderList.page === 1) {
                orderList.list = list;
            }
            commit('setOrderList', orderList);
        })
        .catch(err => {
            commit('setOrderList', { loading: false });
        });
    },
    // 配送方式设置
    getDistribution({ state, commit }, params) {
        const { that, productIds = '' } = params;
        if (!productIds) { return console.warn('%s:%s', '当前调用缺失参数 productIds', productIds); }
        that.xdfAxios( {
            url: `${that.xdfConfig.wbUrl}/deliver/getType`,
            method: 'get',
            showLoading: true,
            params: { productIds }
        } ).then( ( { data } ) => {
            const { message, code } = data;
            if (code !== 10000) { return that.$dialog.alert({ message }); }
            const distribution = !!data.data.isNeedPost;
            if (distribution) {
                commit('setOrderDepositData', { distribution });
                return;
            }
            commit('setOrderDepositData', {
                distribution,
                currentAddress: {
                    address: null
                }
            });
        } );
    }
};
export default actions;
