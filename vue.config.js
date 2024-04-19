const path = require('path');
const fs = require('fs');
const feXdfLocalGet = require('./node-service/xdf-local-get/index.js');
const feXdfLocalSet = require('./node-service/xdf-local-set/index.js');
process.env.VUE_APP_FEBUILDTIME = new Date().getTime();
process.env.VUE_APP_FEBUILDTIMEX = new Date();
const { cdnPath } = require('./package.json');
const _cdnPath = process.env.NODE_ENV === 'production' && cdnPath ? cdnPath : '/';
const proxy_new = require('./setupProxy.js');

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
        // 使用https 时打开
        // https: {
        //     cert: fs.readFileSync(path.join(__dirname, './ca/cert.crt')), // 此处路径为自己项目实际为准
        //     key: fs.readFileSync(path.join(__dirname, './ca/cert.key'))  // 此处路径为自己项目实际为准
        // },
        open: true,
        before(app) {
            proxy_new(app);
            feXdfLocalGet(app);
            feXdfLocalSet(app);
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

