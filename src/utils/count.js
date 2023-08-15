const count = {
    fbOrder(PayOrderId, PayMoney) {
        st('default', { order_code: PayOrderId, price: PayMoney });
    },
    gaOrder(PayOrderId, PayMoney) {
        ga('ecommerce:addTransaction', {
            id: PayOrderId, // 订单号（动态调用）
            affiliation: '新东方',
            revenue: PayMoney, // 实际支付金额（动态调用）
            shipping: '0',
            tax: '0'
        });
        ga('ecommerce:send');// 发送订单信息结束
    },
    bjOrder(PayOrderId, PayMoney) {
        window._gaq.push(['t3._addTrans',
            PayOrderId,
            '新东方',
            PayMoney, // 支付总价
            '0',
            '0',
            '北京市',
            '北京',
            '中国'
            ]);
        window._gaq.push(['t3._trackTrans']);
    },
    bjPage() {
        window._gaq.push(['t3._setAccount', 'UA-8946782-1']);
        window._gaq.push(['t3._setDomainName', '.xdf.cn']);
        window._gaq.push(['t3._setAllowLinker', true]);
        window._gaq.push(['t3._setAllowHash', false]);
        window._gaq.push(['t3._addOrganic', 'soso', 'w']);
        window._gaq.push(['t3._addOrganic', 'yodao', 'q']);
        window._gaq.push(['t3._addOrganic', 'sogou', 'query']);
        window._gaq.push(['t3._addOrganic', 'gougou', 'search']);
        window._gaq.push(['t3._trackPageview']);
    }
};
export default count;
