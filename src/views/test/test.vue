<template>
    <div id="index">
        <p @click="goHref">href跳转</p>
        <ul>
            <li v-for="(item, index) in listInfo" :key="index">
                <a v-if="item.href" :href="item.href">{{item.text}}</a>
                <div :class="item.class" v-else @click="item.onClick" >{{item.text}}</div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
import xdfAuth from './../../sdk/xdf-auth';
const HREF_CONFIG = [
    {
        href: '/page-h5bm/cartAdd?appId=bmApp&systemSource=mobilePay',
        text: '添加购物车'
    },
    {
        href: '/page-h5bm/cart?appId=bmApp&systemSource=mobilePay',
        text: '购物车'
    },
    {
        href: '/page-h5bm/order?appId=bmApp&systemSource=mobilePay&schoolId=1&classCodes=BJFCT00420268002',
        text: '订单结算'
    },
    {
        href: '/page-h5bm/order-list?appId=bmApp&systemSource=mobilePay',
        text: '订单列表'
    },
    {
        href: '/page-h5bm/pay-share?appId=wxApp&systemSource=mobilePay&payOrderId=11952825&studentId=11&schoolId=1&orderCode=20221212151539330421',
        text: '找人代付页面'
    },
    {
        href: '/page-h5bm/pay-result-success?appId=bmApp&systemSource=mobilePay',
        text: '支付成功'
    },
    // {
    //     href: '/page-h5bm/business-index?appId=woxue&systemSource=woxue&userId=abc&studentCode=B101&schoolId=1',
    //     text: '营业厅'
    // },
    // {
    //     href: '/page-h5bm/search-classcode?appId=bmApp&systemSource=mobilePay&schoolId=1&studentCode=11',
    //     text: '班号搜索'
    // },
    // {
    //     href: '/page-h5bm/search-category?appId=bmApp&systemSource=mobilePay&schoolId=1&studentCode=11&deptCode=16',
    //     text: '分类搜索'
    // },
    {
        text: '登陆',
        class: 'list',
        onClick: xdfAuth.login
    },
    {
        text: '退出',
        class: 'list',
        onClick: xdfAuth.logout
    }
];

export default {
    name: 'index',
    data() {
        return {
            listInfo: HREF_CONFIG
        };
    },
    created() {
    },
    methods: {
        goHref() {
            const href = window.location.origin;
            window.location.href = `${href}/page-h5bm/paynew-success?appId=bmApp&systemSource=mobilePay`;
        }
    }
};
</script>

<style lang="scss" type="text/scss" scoped>
@mixin flex() {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@mixin fixed-full() {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

#index {
    @include fixed-full();
    @include flex();
    font-weight: 400;
    ul,
    li {
        width: 100%;
        font-size:30px;
        margin: 8px;
        @include flex();
    }
}
</style>
