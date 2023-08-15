
const xdfCompute = {
    // 加法
    add(a, b) {
        let c, d, e;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (xdfCompute.mul(a, e) + xdfCompute.mul(b, e)) / e;
    },
    // 减法
    sub(a, b) {
        let c, d, e;
        try {
            c = a.toString().split('.')[1].length;
        } catch (f) {
            c = 0;
        }
        try {
            d = b.toString().split('.')[1].length;
        } catch (f) {
            d = 0;
        }
        return e = Math.pow(10, Math.max(c, d)), (xdfCompute.mul(a, e) - xdfCompute.mul(b, e)) / e;
    },
    // 乘法
    mul(a, b) {
        let c = 0;
        const d = a.toString();
        const e = b.toString();
        try {
            c += d.split('.')[1].length;
        } catch (f) {}
        try {
            c += e.split('.')[1].length;
        } catch (f) {}
        return Number(d.replace('.', '')) * Number(e.replace('.', '')) / Math.pow(10, c);
    },
    // 除法
    div(a, b) {
        let c, d,
e = 0,
            f = 0;
        try {
            e = a.toString().split('.')[1].length;
        } catch (g) {}
        try {
            f = b.toString().split('.')[1].length;
        } catch (g) {}
        return c = Number(a.toString().replace('.', '')), d = Number(b.toString().replace('.', '')), xdfCompute.mul(c / d, Math.pow(10, f - e));
    }
};
export default xdfCompute;
