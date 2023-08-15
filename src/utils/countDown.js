import xdfAxios from '@/sdk/xdf-axios';
const _list = [];
function CountDown() {
    let countDownBar = null;

    function clearTimerHander() {
        countDownBar && _list.forEach(v => clearTimeout(v)); // 销毁倒计时
    }

    function fix(num, length) {
        return (`${num}`).length < length
            ? (new Array(length + 1).join('0') + num).slice(-length)
            : `${num}`;
    }
    // 倒计时函数 time:orderCreateTime
    function countDownServer(orderCreateTime, timeLag, timeoutLimit, countDownObj, callback) {
        // serverSystemCurrentTime += 1000;
        let _clientTime = new Date().getTime();
        _clientTime += timeLag;
        const leftTime = orderCreateTime.getTime() + timeoutLimit - _clientTime;
        let days = parseInt(leftTime / 1000 / 60 / 60 / 24, 10);
        let hours = parseInt((leftTime / 1000 / 60 / 60) % 24, 10);
        let minutes = parseInt((leftTime / 1000 / 60) % 60, 10);
        let seconds = parseInt((leftTime / 1000) % 60, 10);
        if ( seconds < 0 ) {
            // clearTimerHander();
            countDownObj.d = 0;
            countDownObj.h = 0;
            countDownObj.m = 0;
            countDownObj.s = 0;
            return;
        }
        days = fix(days, 2);
        hours = fix(hours, 2);
        minutes = fix(minutes, 2);
        seconds = fix(seconds, 2);
        countDownBar = setTimeout(_ => {
            countDownServer(orderCreateTime, timeLag, timeoutLimit, countDownObj, callback);
        }, 1000);
        _list.push(countDownBar);
        countDownObj.h = hours;
        countDownObj.m = minutes;
        countDownObj.s = seconds;
        countDownObj.d = days;
        callback && callback(countDownObj, seconds);
    }

    function getCountDown(orderCreateDate, timeoutLimit, countDownObj, callback) {
        // console.log(orderCreateDate, timeoutLimit, countDownObj);
        xdfAxios({
            url: `${window.$mvvm.xdfConfig.bmUrl}/Unified/Common/GetServerTime`,
            method: 'get',
            timeout: 0,
            params: {}
        }).then(response => {
            response = response.data;
            if ( response.State === 1 ) {
                const serverSystemCurrentTime = Number(new Date(response.Data.replace(/\-/g, '/')));
                if ( orderCreateDate ) {
                    const orderCreatedTime = new Date(orderCreateDate.replace(/\-/g, '/'));
                    // console.log(orderCreatedTime, 'orderCreateDate1', serverSystemCurrentTime);
                    const clientTime = new Date().getTime();
                    const timeLag = serverSystemCurrentTime - clientTime;
                    countDownServer(orderCreatedTime, timeLag, timeoutLimit, countDownObj, callback);
                }
            } else {
                window.$mvvm.$toast(response.Error);
            }
        });
    }

    return { getCountDown, stopCountDown: clearTimerHander };
}
export default CountDown();
