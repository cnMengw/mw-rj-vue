// 初始化 state
const state = {
    isLogin: false,
    isReady: false,
    isError: false,
    errorInfo: {
        type: '', //
        msg: '', // 接口错误信息
        isReload: false
    },
    // 订单状态
    orderStates: [
        { text: '全部', type: [], orderState: '' },
        { text: '待支付', type: [0, 1, 10001], orderState: 1 },
        { text: '已支付', type: [2, 6, 3], orderState: 2 },
        { text: '已取消', type: [5], orderState: 5 },
        { text: '已退款', type: [7], orderState: 7 }
    ],
    platformInfo: {},
    // 当前使用学员
    currentStudent: {
        studentCode: '',
        unCheck: false // 是否检查必填项
    },
    // 当前地址
    currentAddress: {
        address: null, // 选择的地址
        select: {}, // 选择地址的数据
        unCheck: false // 是否检查必填项
    },
    // 是否拿到学员信息
    studentIsReady: false,
    // 当前使用配送地址
    currentUseAddress: {
        addressFees: 0
    },
    // 班级列表
    classList: [],
    // 班课优惠券列表
    voucherListAll: [],
    // 使用优惠券情况
    currentUseVoucher: {
        // 已使用优惠券
        useVoucherList: [],
        // 已使用优惠券总金额
        useVoucherTotal: 0,
        // 最大优惠使用代金券
        maxVoucherList: [],
        // 最大优惠项
        maxVoucherListItems: [],
        // 最大优惠金额
        maxVoucherTotal: 0
    },
    // 灰度配置
    isGray: false,
    // 大班量下单header标识
    routeKey: null,
    // 班量下单header标识是否请求完成
    routeKeyIsReady: false,

    // 订单的状态
    orderTypeList: [
        21, // 单次课
        22, // 系列课
        23, // 班课
        24, // 组合商品
        25, // 游学商品
        32, // 学习机
        33, // 自学卡
        34, // 课时包
        3233, // 学习机和自学卡
        60 // 高考订单
    ],
    // 订单列表页
    orderList: {
        page: 1,
        size: 10,
        total: 0,
        orderState: '', // 当前点击状态
        serverTime: 0, // 服务器时间
        list: []
    },
    // 订单详情页
    orderDetail: {
        serverTime: 0, // 服务器时间
        orderData: {} // 订单详情
    },
    // 商品结算页
    orderData: {
        agree: false, // 订单结算页是否同意
        distribution: false, // 配送地址
        saleMoney: null, // 订单结算页售价金额
        voucherMoney: 0, // 优惠金额
        payMoney: null, // 应付金额
        voucherList: [], // 优惠列表
        voucherGroupList: [] // 优惠展示
    },
    // 游学商品
    orderTraveler: {
        studentList: [], // 选中的学生
        check: false // 是否检查必填项
    },
    // 班课-商品结算页
    orderClassData: {
        readList: [], // 报名须知
        productList: [], // 产品列表
        distribution: false, // 配送地址
        payMoney: null, // 应付金额

        voucherProductList: [], // 商品的优惠券列表
        voucherList: [], // 用户使用的优惠券列表
        voucherMoney: 0, // 优惠金额
        voucherGroupList: [], // 最优优惠列表
        voucherGroupMoney: 0 // 最优优惠金额
    },
    // 自学卡-商品结算页
    orderMachData: {
        agree: false, // 订单结算页是否同意
        agreeMust: false, // 订单结算页是否同意-必读
        readListMust: [], // 报名须知-必读
        readList: [], // 报名须知
        productList: [], // 产品列表
        distribution: false, // 配送地址
        payMoney: null, // 应付金额
        saleMoney: null, // 实付金额 应付金额 - 最优优惠 - 使用的优惠券

        reCountMoney: 0, // 是否重新计算自动优惠
        voucherProductList: [], // 商品的优惠券列表
        voucherList: [], // 用户使用的优惠券列表
        voucherMoney: 0, // 优惠金额
        voucherGroupList: [], // 最优优惠列表
        voucherGroupMoney: 0 // 最优优惠金额
    },
    // 托管班erp3，erp4-商品结算页
    orderDepositData: {
        isAllAccessory: false, // 是否全是配件
        agree: false, // 订单结算页是否同意
        allRead: false, // 是否阅读完毕
        // agreeMust: false, // 订单结算页是否同意-必读
        readListMust: [], // 报名须知-必读
        readList: [], // 报名须知
        productList: [], // 产品列表
        distribution: false, // 配送地址
        aliChecked: false, // 支付宝授权
        aliAuth: false, // 是否支持支付宝
        isAccessory: false, // 配件
        // vouClsAll: [], // 班课的优惠券列表
        vouProAll: [], // 商品的优惠券列表
        // vouClsUse: [], // 用户使用的班课优惠券列表
        vouProUse: [], // 用户使用的优惠券列表
        voucherGroupList: [] // 最优优惠列表
    },
    // 商品列表
    productList: {
        list: [] // 商品列表
    },
    cartTheme: ''
};
export default state;
