const path = require('path');
const feXdfLocalGet = require('./node-service/xdf-local-get/index.js');
const feXdfLocalSet = require('./node-service/xdf-local-set/index.js');
process.env.VUE_APP_FEBUILDTIME = new Date().getTime();
process.env.VUE_APP_FEBUILDTIMEX = new Date();
const { cdnPath } = require('./package.json');
const _cdnPath = process.env.NODE_ENV === 'production' && cdnPath ? cdnPath : '/';
const proxyMiddleware = require('http-proxy-middleware');

function resolve(dir) {
    return path.join(__dirname, dir);
}

// vue.config.js 配置说明
module.exports = {
    publicPath: _cdnPath,
    outputDir: process.env.VUE_APP_OUTPUTDIR,
    devServer: {
        headers: {
            FeEnvironment: '_environment'
        },
        open: true,
        before(app) {
            app.use('^/prodHuo', proxyMiddleware.createProxyMiddleware({
                target: 'https://prod.huohuaschool.com',
                changeOrigin: true,
                pathRewrite: { '^/prodHuo': '' }
            }));
            // https://prod.huohuaschool.com/api-website/v2/component/info/0201003810

            feXdfLocalGet(app);
            feXdfLocalSet(app);
            // feXdfOnlineGet(app);
        }
    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {},
        }
    },
    chainWebpack: config => {
        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, { limit: 10240 }));
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('views', resolve('src/views'))
            .set('components', resolve('src/components'))
            .set('img', resolve('src/assets/img'));
    },
    productionSourceMap: false,
};

