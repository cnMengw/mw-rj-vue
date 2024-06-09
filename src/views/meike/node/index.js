const token = 'Hm_lvt_a2d66dc97f8a8c5600c3356fcf5136e9=1717633587,1717749804,1717893593,1717908021; JSESSIONID=B9B886B55092DD11F80A613C407645D0; gr_user_id=959bbd98-b082-4704-bb59-3a1fefe95861; a773a5312dd88294_gr_session_id=ef2c4ed1-000e-4212-b0dc-164f83974bd2; a773a5312dd88294_gr_session_id_sent_vst=ef2c4ed1-000e-4212-b0dc-164f83974bd2; MK_UC_ROOMBOX=MjI4ZjNiODQtYTQwMi00MzMwLWI2NWEtYWQwNjA1ZDFkN2Vk; MK_MS_ROOMBOX=NzU1NGRkYTItOWMyZS00MDFiLWI3YjEtMjI3MDhhZTNlMWVh; tfstk=fMOKauOLMVUKqZDkOeMM4BNFUFuimBLUXH8bZgj3FhK9o3W5KHYWw7L24MXHPD-JwGKPEMtltuhJXGWHKpx3wyR9D7VnYv87w_fSmmcmie7Fa_i0_A-Vuk7FRkGlRa_1AFuMfmcmie_2HhQKm4uFq8SlP__Cd7NsWZQlN76BVG61lZqCN_tW5VQRzuNQOa__1aQrppoRfysuwC08y6qtMCF7NBGPnihRfN7e6iBdcEITNedOJ9IXRB19Ho7JhIBecc2hAKLHDZxn1WKvPEJ5BQEsX_8MH3QvOqwA2H86tOOIr-7NaLOh1BisGOWWFKXJIkg1NTOpO1pigrI69UdOLd40Ze6v1BfeBmFccd8WwOTED-7MFEAHeHmaNMvv5hBDslVcGK-9wt1f4IRDMVr4miQudV3TU8WCS3YuT56WgJ2RWi0Kw8yPQV7OmVH8F8ZS7NImJbezUOuN.; CurrentMeikeSystemMainOrg=10000; CurrentMeikeSystemSubOrg=10000454';
const axios = require('axios');

let arr1 = [3692498,3692501,3692504,3692507,3692510,3692513]

// arr1 = [arr1[0]];

let _url = [];
// 向给定ID的用户发起请求
arr1.forEach((it, ind) => {
    axios({
        method: 'get',
        url: `https://nms.mk.metcom.com.cn/ms/classroom/video/url/${it}`,
        headers: { 
            'cookie': token,
            'Content-Type': 'application/json'
        }
    }).then(function (res) {
        // console.log(ind);
        // console.log(res.data.data.url);

        _url[ind] = res.data.data.url;

        console.log('11******************');
        console.log(JSON.stringify(_url));
        console.log(_url.length);
        console.log('22******************');


    }).catch(function (error) {
        // 处理错误情况
        console.log(error);
    }).then(function () {
        // 总是会执行
    });
})

setTimeout(() => {
    JSON.stringify(_url)
}, 600)
