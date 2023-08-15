const path = require('path');
const feXdfLocalGet = require('./node-service/xdf-local-get/index.js');
const feXdfLocalSet = require('./node-service/xdf-local-set/index.js');
const SkeletonWebpackPlugin = require('vue-skeleton-webpack-plugin');
process.env.VUE_APP_FEBUILDTIME = new Date().getTime();
process.env.VUE_APP_FEBUILDTIMEX = new Date();
const { name, version, cdnPath } = require('./package.json');
const _cdnPath = process.env.NODE_ENV === 'production' && cdnPath ? cdnPath : '/';

// 添加全局变量配置项
const conf = {
    cdnBase: '',
    cdnBase2: _cdnPath,
    ejsCdnBase2: '<%=cdnBase2%>',
    publicPath: 'window.config.cdnBase2'
};

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
            feXdfLocalGet(app);
            feXdfLocalSet(app);
            // feXdfOnlineGet(app);
        }
    },
    lintOnSave: false,
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@/assets/var.scss";'
            },
            less: {
                modifyVars: {
                    green: '#57BDA2',
                    'button-default-color': '#777777',
                    orange: '#D7702D',
                    'button-border-radius': '4px',
                    'dialog-confirm-button-text-color': '#57BDA2',
                    'dialog-has-title-message-text-color': '#000',
                    'dialog-border-radius': '10px'
                }
            }
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
    configureWebpack: config => {
        // 骨架屏
        config.plugins.push(
            new SkeletonWebpackPlugin({
                webpackConfig: {
                    entry: {
                        app: path.join(__dirname, './src/skeleton/skeleton.js')
                    }
                },
                minimize: true,
                quiet: true,
                router: {
                    mode: 'history',
                    routes: [
                        {
                            path: '/',
                            skeletonId: 'skeletonIn'
                        },
                        {
                            path: '/business-index',
                            skeletonId: 'skeletonBusiness'
                        },
                        {
                            path: '/page-h5bm/business-index',
                            skeletonId: 'skeletonBusiness'
                        },
                        {
                            path: '/cart',
                            skeletonId: 'skeletonIn'
                        },
                        {
                            path: '/page-h5bm/cart',
                            skeletonId: 'skeletonIn'
                        },
                        {
                            path: '/order-list',
                            skeletonId: 'skeletonIn'
                        },
                        {
                            path: '/page-h5bm/order-list',
                            skeletonId: 'skeletonIn'
                        }
                    ]
                }
            })
        );
    }
};

