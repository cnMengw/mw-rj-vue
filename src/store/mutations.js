import _ from 'lodash';

const mutations = {
    setIsReady(state, data) {
        state.isReady = data;
    },
    setIsLogin(state, data) {
        state.isLogin = data;
    },
    setIsError(state, data) {
        state.isError = data;
    },
    setErrorInfo(state, data) {
        state.errorInfo = data;
    },
    setPlatformInfo(state, data) {
        state.platformInfo = data;
    },
    setCurrentStudent(state, data) {
        state.currentStudent = data;
    },
    setStudentIsReady(state, data) {
        state.studentIsReady = data;
    },
    setUseAddress(state, data) {
        state.currentUseAddress = data;
    },
    setCurrentAddress(state, data) {
        if (data.type === 'clear') {
            state.currentAddress = data;
            return;
        }
        const _data = { ...state.currentAddress, ...data };
        state.currentAddress = _data;
    },
    setUseVoucher(state, data) {
        const { useVoucherList, useVoucherTotal, maxVoucherList, maxVoucherListItems, maxVoucherTotal } = data;
        if ( useVoucherList ) {
            state.currentUseVoucher.useVoucherList = useVoucherList;
        }
        if ( Number(useVoucherTotal) ) { state.currentUseVoucher.useVoucherTotal = useVoucherTotal; }
        if ( maxVoucherList ) { state.currentUseVoucher.maxVoucherList = maxVoucherList; }
        if ( maxVoucherListItems ) { state.currentUseVoucher.maxVoucherListItems = maxVoucherListItems; }
        if ( maxVoucherTotal ) { state.currentUseVoucher.maxVoucherTotal = maxVoucherTotal; }
    },
    setClassList(state, data) {
        state.classList = data;
    },
    setVoucherListAll(state, data) {
        state.voucherListAll = data;
    },
    setIsGray(state, data) {
        state.isGray = data;
    },
    setRouteKey(state, data) {
        state.routeKey = data;
        state.routeKeyIsReady = true;
    },
    setOrderData(state, data) {
        state.orderData = { ...state.orderData, ...data || {} };
    },
    setOrderClassData(state, data) {
        state.orderClassData = { ...state.orderClassData, ...data || {} };
    },
    setOrderMachData(state, data) {
        state.orderMachData = { ...state.orderMachData, ...data || {} };
    },
    setOrderList(state, data) {
        state.orderList = { ...state.orderList, ...data || {} };
    },
    setOrderDetail(state, data) {
        state.orderDetail = { ...state.orderDetail, ...data || {} };
    },
    setOrderTraveler(state, data) {
        state.orderTraveler = { ...state.orderTraveler, ...data || {} };
    },
    setOrderDepositData(state, data) {
        state.orderDepositData = { ...state.orderDepositData, ...data || {} };
    },
    setProductList(state, data) {
        state.productList = { ...state.productList, ...data || {} };
    },
    setCartTheme(state, data) {
        const m = ['purple', 'green'];
        state.cartTheme = m.includes(data) ? data : m[1];
    }
};
export default mutations;
