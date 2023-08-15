/**
 * Created by zyn on 2019/3/15.
 * 没用已放到删除文件中，需要时移过来 2019-6-12 14:31:30
 */
import uuid from '@/utils/xdf-uuid';
import ClipboardJS from 'clipboard';
import { Toast } from 'vant';

const trim = function( string ) {
    return (
        string || ''
    ).replace( /^[\s\uFEFF]+|[\s\uFEFF]+$/g, '' );
};
const xdfUtil = {
    getComputedStyle( el ) {
        let computedStyle = null;
        if ( window.getComputedStyle ) {
            computedStyle = getComputedStyle( el, null );
        } else {
            computedStyle = el.currentStyle;
        }
        return computedStyle;
    },
    getQueryString( link ) {
        const href = link || location.href;
        const param = href.indexOf( '?' ) !== -1 ? href.split( '?' )[1] : {};
        const _obj = {};
        Object.keys( param ).length
        && param.split( '&' ).forEach( item => {
            const [key, value] = item.split( '=' );
            return (
                _obj[key] = value
            );
        } );
        return _obj;
    },
    checkInjectInfo( inject = [], ignoreDefault, href = '' ) {
        let list = ['appId', 'systemSource'];
        list = ignoreDefault ? inject : list.concat( inject );
        // const list = ['appId', 'systemSource'].concat(inject);
        const param = xdfUtil.getQueryString( href );
        const lackParam = list.filter( item => !param[item] );
        return lackParam;
    },

    /**
     * 得到当前路径  / 或 page-h5bm
     */
    getCurrentPath() {
        const currentPath = process.env.NODE_ENV === 'development' ? '' : '/page-h5bm';
        return currentPath;
    },

    /**
     * @param obj
     * @returns {string} a=1&b=1
     */
    objToUrlString( obj ) {
        if ( !xdfUtil.checkType( obj, 'Object' ) ) { return; }
        let objString = '';
        for ( const key in obj ) {
            objString += `&${key}=${obj[key]}`;
        }
        return objString.substr( 1 );
    },
    checkType( traget, type ) {
        return Object.prototype.toString.call( traget ).slice( 8, -1 ) === type;
    },

    /**
     * jsBridgeXdfV3Cb
     */
    jsBridgeXdfV3Cb( cb ) {
        if ( window.jsBridgeXdfV3 ) {
            if ( typeof cb === 'function' ) {
                cb();
            }
        } else {
            document.addEventListener(
                'jsBridgeXdfV3Ready',
                () => {
                    if ( typeof cb === 'function' ) {
                        cb();
                    }
                },
                false
            );
        }
    },

    /**
     * 禁止后退
     */
    goBackNotWork() {
        if ( window.history && window.history.pushState ) {
            window.onpopstate = function() {
                // $(window).on('popstate', function() {
                window.history.pushState( 'forward', null, null );
                window.history.forward( 1 );
                // });
            };
        }
        window.history.pushState( 'forward', null, '' ); // 在IE中必须得有这两行
        window.history.forward( 1 );
    },
    addClass( el, cls ) {
        if ( !el ) { return; }
        let curClass = el.className;
        const classes = (
            cls || ''
        ).split( ' ' );
        for ( let i = 0, j = classes.length; i < j; i++ ) {
            const clsName = classes[i];
            if ( !clsName ) { continue; }
            if ( el.classList ) {
                el.classList.add( clsName );
            } else if ( !xdfUtil.hasClass( el, clsName ) ) {
                curClass += ` ${clsName}`;
            }
        }
        if ( !el.classList ) {
            el.className = curClass;
        }
    },
    clone( obj ) {
        return JSON.parse( JSON.stringify( obj ) );
    },
    hasClass( el, cls ) {
        if ( !el || !cls ) { return false; }
        if ( cls.indexOf( ' ' ) !== -1 ) { throw new Error( 'className should not contain space.' ); }
        if ( el.classList ) {
            return el.classList.contains( cls );
        }
            return (
                       ` ${el.className} `
                   ).indexOf( ` ${cls} ` ) > -1;
    },
    removeClass( el, cls ) {
        if ( !el || !cls ) { return; }
        const classes = cls.split( ' ' );
        let curClass = ` ${el.className} `;
        for ( let i = 0, j = classes.length; i < j; i++ ) {
            const clsName = classes[i];
            if ( !clsName ) { continue; }
            if ( el.classList ) {
                el.classList.remove( clsName );
            } else if ( xdfUtil.hasClass( el, clsName ) ) {
                curClass = curClass.replace( ` ${clsName} `, ' ' );
            }
        }
        if ( !el.classList ) {
            el.className = trim( curClass );
        }
    },
    timeCovert( time ) {
        // 2019-07-32 13:34:56 => 2019/07/32 13:34:56
        // eslint-disable-next-line
        return time.toString().replace( /\-/g, '/' );
    },
    dateSubString( date ) {
        if (date) {
            date = date.toString();
            return date.substr( 0, 10 );
        }
        return '';
    },
    fix( num, length = 2 ) {
        const str = new Array( length + 1 ).join( '0' ) + num;
        return num.toString().length < length ? str.slice( -length ) : `${num}`;
    },
    getScrollTop() {
        // 滚动条在Y轴上的滚动距离
        let scrollTop = 0,
        bodyScrollTop = 0,
        documentScrollTop = 0;
        if ( document.body ) {
            bodyScrollTop = document.body.scrollTop;
        }
        if ( document.documentElement ) {
            documentScrollTop = document.documentElement.scrollTop;
        }
        scrollTop = (
                        bodyScrollTop - documentScrollTop > 0
                    ) ? bodyScrollTop : documentScrollTop;
        return scrollTop;
    },
    getScrollHeight() {
        // 文档的总高度
        let scrollHeight = 0,
        bodyScrollHeight = 0,
        documentScrollHeight = 0;
        if ( document.body ) {
            bodyScrollHeight = document.body.scrollHeight;
        }
        if ( document.documentElement ) {
            documentScrollHeight = document.documentElement.scrollHeight;
        }
        scrollHeight = (
                           bodyScrollHeight - documentScrollHeight > 0
                       ) ? bodyScrollHeight : documentScrollHeight;
        return scrollHeight;
    },
    getWindowHeight() {
        // 浏览器视口的高度
        let windowHeight = 0;
        if ( document.compatMode === 'CSS1Compat' ) {
            windowHeight = document.documentElement.clientHeight;
        } else {
            windowHeight = document.body.clientHeight;
        }
        return windowHeight;
    },
    pageToPos( pos = 'top' ) {
        window.scrollTo( 0, pos === 'top' ? 0 : document.documentElement.clientHeight );
    },
    differenceArray( a, b ) {
        // 数组去差集 differenceArray([1,2,4],[2]) // [1,4]
        return a.concat( b ).filter( v => a.includes( v ) && !b.includes( v ) );
    },
    formatStudentClassJson( classCodeArray, studentCode, tag ) {
        const _studentClass = [];
        classCodeArray.forEach( item => {
            _studentClass.push( {
                Guid: uuid.guid(),
                ClassCode: item,
                StudentCode: studentCode || '',
                isRecommendPeople: false,
                seatNo: '',
                Tag: tag || ''
            } );
        } );
        return JSON.stringify( _studentClass );
    },
    formatStudentClassJsonNew(classCodeArray, studentCode, tag) {
        const _studentClass = [];
        const _tag = tag || '';
        const _studentCode = studentCode || '';
        classCodeArray.forEach(item => {
            _studentClass.push({
                guid: uuid.guid(),
                classCode: item,
                studentCode: _studentCode,
                isRecommendPeople: 'false',
                seatNo: '',
                tag: _tag
            });
        });
        return _studentClass;
    },
    loadOrderTips( timer, callback ) {
        const timerFns = [];
        let step = 0;
        const flagTimer = 5000;

        function clearTimerFn() {
            timerFns.forEach( v => clearTimeout( v ) );
        }

        function timerFn() {
            step += 1000;
            if ( step > 0 && step < flagTimer ) { callback( 1, clearTimerFn, step, flagTimer ); }
            if ( step > flagTimer && step < timer ) { callback( 2, clearTimerFn, step, flagTimer ); }
            if ( step >= timer ) {
                callback( 3, clearTimerFn, timer, flagTimer );
                return clearTimerFn();
            }
            const _t = setTimeout( () => timerFn(), 1000 );
            timerFns.push( _t );
        }

        clearTimerFn();
        timerFn();
    },
    jsonTostr( json ) {
        return this.checkType( json, 'Object' ) || this.checkType( json, 'Array' ) ? JSON.stringify( json ) : json;
    },
    arrUnique( arr ) {
        if ( !this.checkType( arr, 'Array' ) ) { return arr; }
        return Array.from( new Set( arr ) );
    },
    log(object, ...item) {
        let _str = object;
        if (typeof object !== 'object') { return console.log(_str, ...item); }
        _str = JSON.parse(JSON.stringify(_str));
        console.log(_str, ...item);
    },
    isNull(str) {
        if (str) { return false; }
        if (str === '0' || str === 0) { return false; }
        return true;
    },
    isClass(o) {
        if (o === null) { return 'Null'; }
        if (o === undefined) { return 'Undefined'; }
        return Object.prototype.toString.call(o).slice(8, -1);
    },
    isEmpty(object) {
        const type = this.isClass(object);
        if (typeof object !== 'object' || type === 'Null') { return this.isNull(object); }
        if (type === 'Array') { return object.length < 1; }
        if (type === 'Object') { return Object.keys(object).length < 1; }
    },
    deepClone(obj) {
        const oClass = this.isClass(obj);
        const newobj = oClass === 'Array' ? [] : {};
        if (typeof obj !== 'object' || oClass === 'Null') {
            return obj;
        }
        for (const i in obj) {
           newobj[i] = typeof obj[i] === 'object' ? this.deepClone(obj[i]) : obj[i];
        }
        return newobj;
    },
    // {a:1,b:2} => 'a=1&b=2'
    strParams(params) {
        if (this.isEmpty(params)) { return ''; }
        const paramsArray = [];
        for (const k in params) {
            const v = params[k];
            !this.isEmpty(v) && paramsArray.push(`${k}=${v}`);
        }
        return paramsArray.join('&');
    },
    // '?a=1&b=2' => {a:1,b:2}
    parseParams(strParams) {
        strParams = strParams || '';
        if (strParams.includes('?')) { strParams = strParams.split('?')[1]; }
        return strParams.split('&').reduce((acc, e) => {
            const list = e.split('=');
            acc[list[0]] = list[1];
            return acc;
        }, {});
    },

    /**
     * 复制信息
     * @param {String} text 分享内容
     * @param {String} mark 对应DOM标记,class或者id
     * @param {Function} callback 成功回调
    */
     copyText(text, mark, callback) {
        mark = mark || '.order-info_normal-item';
        const clipboard = new ClipboardJS(mark, {
            text() {
                return `${text}`;
            }
        });
        clipboard.on('success', e => {
            Toast('复制成功');
            callback ? callback('success') : '';
            clipboard.destroy();
        });
        clipboard.on('error', e => {
            Toast(e);
            callback ? callback(e) : '';
            e.clearSelection();
            clipboard.destroy();
        });
    }
};
export default xdfUtil;
