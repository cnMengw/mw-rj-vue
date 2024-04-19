/* version: 1.0.5 兼容处理无语言包的2.1.0素材 */
function LoadFramework(langzh, langen) {
    let receiveMsg = false; // 是否已接收到消息
    let interval; // 定时器
    let langMap; // 语言文件路径
    let flagCount = 0; // 记录所有外部资源文件加载个数

    function loadFile(url) {
        return new Promise(function (resolve, reject) {
            const suffix = getFileSuffix(url);
            if (suffix === 'js') {
                loadScript(url).then(function () {
                    resolve(null);
                });
            } else if (suffix === 'css' || suffix === 'less' || suffix === 'sass' || suffix === 'scss') {
                loadCss(url).then(function () {
                    resolve(null);
                });
            } else {
                resolve(url);
            }
        });
    }

    /* 获取文件地址后缀 url */
    function getFileSuffix(url) {
        /* 只获取后缀 */
        return url.substring(url.lastIndexOf('.') + 1);// txt
    }

    /* 获取文件名 url */
    function getFileName(url) {
        const temp = url.split('/');
        if (!temp || !temp.length) return;
        const fileName = temp.slice(temp.length - 1, temp.length).toString(String).split('.');
        return fileName.slice(0, 1).join('');
    }

    /* 异步动态创建script url */
    function loadScript(url) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('script');
            script.src = url;
            script.async = false;
            script.onload = function () {
                resolve(url);
            };
            script.onerror = function () {
                reject(url);
            };
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
        });
    }

    /* 异步动态创建css url */
    function loadCss(url) {
        return new Promise(function (resolve, reject) {
            const script = document.createElement('link');
            script.href = url;
            script.rel = 'stylesheet';
            script.async = false;
            script.onload = function () {
                resolve(url);
            };
            script.onerror = function () {
                reject(url);
            };
            const head = document.getElementsByTagName('head')[0];
            head.appendChild(script);
        });
    }

    /* 加载其他资源文件 */
    function loadOtherFile(url) {
        return new Promise(function (resolve, reject) {
            try {
                const request = new XMLHttpRequest();/* 用new创建一个XHR对象 */
                request.open('GET', url);/* 设置XHR对象的请求方法与路径 */
                request.send(null);/* 设置XHR对象不发送数据到服务器 */
                request.onload = function() { /* 设置当获XHR对象获取到返回信息后执行以下代码 */
                    if (request.status === 200 && request.responseText) { /* 如果返回的状态为200，即为成功获取数据 */
                        typeof request.responseText === 'string' && resolve(JSON.parse(request.responseText));
                        return;
                    }
                    if (request.responseText) {
                        typeof request.responseText === 'string' && resolve(JSON.parse(request.responseText));
                        return;
                    }
                    resolve(null);
                };
            } catch (e) {
                resolve(null);
                console.error('获取语言包报错', e);
            }
        });
    }

    function loadFrameworkFile(data) {
        /**
         * eventData的数据类型
         * [{fileName: '', fileType: '', fileUrl: '', position: '', type: ''}]
         * 其中的type为 framework, lang, vtt
         */
        const eventData = data.data;
        if (!eventData) return;
        const fileList = [];
        for (const extraFile of eventData) {
            if (!extraFile) continue;
            const fileUrl = extraFile.fileUrl;
            if (extraFile.type === 'framework') {
                loadFile(fileUrl).then(function () {
                    setFlagCount(eventData);
                });
            } else if (extraFile.type === 'lang') {
                fileUrl && fileList.push(fileUrl);
            } else {
                loadFile(fileUrl).then(function () {
                    setFlagCount(eventData);
                });
            }
        }
        // 设置语言包
        langMap = new Map();
        langMap.set('zh', langzh).set('en', langen);
        for (const url of fileList) {
            // 加载语言文件
            loadOtherFile(url).then(function (source) {
                if (!source) return;
                setFlagCount(eventData);
                const fileName = getFileName(url);
                langMap.set(fileName, source);
            });
        }
    }

    function setFlagCount(eventData) {
        flagCount++;
        // 标识是否已经接收到消息 并加载好外部资源文件
        flagCount === eventData.length && (receiveMsg = true);
    }

    /* 消息监听 */
    function receiveMessgae(event) {
        const data = event.data;
        if (!data) return;
        const eventType = data.type;
        // 语言字体大小
        if (eventType === 'langFont') {
            console.log('接收到获取语言包字体的消息', data.fontWeightType);
            window.fontWeightType = data.fontWeightType;
        }
        // 只监听加载framework、语言包、字幕文件等文件的消息
        if (eventType !== 'loadFrameworkFile') return;
        receiveMsg = false;
        flagCount = 0;
        console.log('接收到loadFrameworkFile的消息');
        loadFrameworkFile(data);
    }

    return new Promise(function (resolve, reject) {
        window.removeEventListener('message', receiveMessgae);
        window.addEventListener('message', receiveMessgae);
        const msg = {
            type: 'getExtraFileList',
            data: ''
        };
        window.parent.postMessage(JSON.parse(JSON.stringify(msg)), '*');
        interval = window.setInterval(() => {
            if (receiveMsg) {
                window.clearInterval(interval);
                langMap && resolve(langMap);
            }
        }, 100);
    });
};

window.LoadFramework = LoadFramework;
// export default LoadFramework;
// 加载火花资源默认提示界面
function loadDefaultTip() {
    if (window.location.href.indexOf('localhost') > -1) {
        return;
    }
    const id = 'compatibleTip';
    const className = 'compatibleTip';
    if (window.top === window.self) {
        console.log(1111);
        loadBodyScript('', id, className);
        return;
    }
    // 判断存在frameworkVersion参数时，即为新版本素材播放器，老版本播放器打开新素材，提示升级
    if (!getSearchParam('frameworkVersion')) {
        console.log(2222);

        loadBodyScript('', id, className);
    }
}

/* 异步动态创建script url */
function loadBodyScript(url, id = '', className = '') {
    const divEl = document.createElement('div');
    id && (divEl.id = id);
    className && (divEl.className = className);
    divEl.innerText = '请升级客户端播放新版本素材';
    const body = window.document.getElementsByTagName('body')[0];
    body.appendChild(divEl);
}

function getSearchParam(name) {
    const search = window.location.search;
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    const r = search.substr(1).match(reg);
    if (r != null) {
        const str = decodeURIComponent(r[2]);
        if (str.toLowerCase() === 'null' || str === 'nil' || str === 'undefined') {
            return null;
        }
        return str;
    }
    return null;
}
