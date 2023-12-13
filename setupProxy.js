const proxyMiddleware = require('http-proxy-middleware');

module.exports = function (app) {
    app.use('^/prodHuo', proxyMiddleware.createProxyMiddleware({
        target: 'https://prod.huohuaschool.com',
        changeOrigin: true,
        pathRewrite: { '^/prodHuo': '' }
    }));
    app.use(
        '^/nms', //美刻云
        proxyMiddleware.createProxyMiddleware({
            target: 'https://nms.mk.metcom.com.cn',
            changeOrigin: true,
            pathRewrite: { '^/nms': '' }
        })
    )
}