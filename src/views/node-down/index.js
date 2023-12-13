const http = require('http');
const fs = require('fs');

const fileUrl = 'http://www.jingshibang.com//uploads/paper/file/1670464910/2022北京重点校初二（上）期中数学汇编：轴对称变换.pdf';
const filePath = './file.pdf';

let urls = [{"name":"2023北京二中初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1673843648/2023北京二中初二（上）期末物理（教师版）.pdf"},{"name":"2023北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1673845200/2023北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2022北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670637589/2022北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2021北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1621684408/2021北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2019北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1609116602/2019北京东城初二（上）期末物理含答案.pdf"},{"name":"2018北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670825673/2018北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2017北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670822551/2017北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2016北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670821142/2016北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2014北京东城南片初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670820973/2014北京东城南片初二（上）期末物理（教师版）.pdf"},{"name":"2015北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670818127/2015北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2014北京东城初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670817856/2014北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2013北京东城南片初二（上）期末物理","url":"http://www.jingshibang.com/uploads/paper/file/1670817319/2013北京东城南片初二（上）期末物理（教师版）.pdf"}]










// urls = urls.splice(150,200);

urls.forEach(it => {
    const request = http.get(it.url, (response) => {
      const fileStream = fs.createWriteStream(`${it.name}.pdf`);
      response.pipe(fileStream);
    });
    
    request.on('error', (err) => {
      console.error(`请求下载文件出错: ${err.message}`);
    });
    
    request.end();
})

