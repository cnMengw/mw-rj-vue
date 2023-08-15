// create 2019-3-21 13:41:32
// modify 2019-4-2 09:56:32
const DOMAIN = 'xdf.cn';
const uuid = {
    S4() {
        return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    },
    guid() {
        return `${this.S4() + this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}-${this.S4()}${this.S4()}${this.S4()}`;
    },
    setXDFUUID() {
        let _domain = '';
        const _date = new Date();
        _date.setTime(_date.getTime() + 7 * 24 * 60 * 60 * 1000);
        _date.toUTCString();
        _domain = window.location.hostname.indexOf(DOMAIN) > -1 ? `domain=${DOMAIN}` : '';
        document.cookie = `XDFUUID=${this.guid()}; expires=${_date}; path=/; ${_domain}`;
    },
    getXDFUUID() {
        let ret = '';
        let m = '';
        if ((m = String(document.cookie).match(new RegExp('(?:^| )XDFUUID(?:(?:=([^;]*))|;|$)')))) {
            ret = m[1] ? decodeURIComponent(m[1]) : '';
        }
        if (ret === undefined) {
            return '';
        }
        return ret;
    },
    outPut() {
        if (this.getXDFUUID() === '') {
            // this.setXDFUUID();
        }
    }
};
// uuid.outPut();
export default uuid;
