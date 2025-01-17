const http = require('https');
const fs = require('fs');

const fileUrl = 'http://www.jingshibang.com//uploads/paper/file/1670464910/2022北京重点校初二（上）期中数学汇编：轴对称变换.pdf';
const filePath = './file.pdf';

let urls = [{"name":"2025北京朝阳初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1736158748/2025北京朝阳初二（上）期末物理.pdf"},{"name":"2025北京东城初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1736169594/2025北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2025北京二中初二（上）期末物理","url":"https://www.jingshibang.com"},{"name":"2025北京石景山初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1736178953/2025北京石景山初二（上）期末物理.pdf"},{"name":"2025北京顺义初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1736159875/2025北京顺义初二（上）期末物理.pdf"},{"name":"2025北京大兴初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1736142515/2025北京大兴初二（上）期末物理（教师版）.pdf"},{"name":"2020北京东城初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1733547216/2020北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2021北京清华附中初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1712386153/2021北京清华附中初二（上）期末物理（教师版）.pdf"},{"name":"2024北京通州初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1706834743/2024北京通州初二（上）期末物理.pdf"},{"name":"2024北京怀柔初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1706258125/2024北京怀柔初二（上）期末物理（教师版）.pdf"},{"name":"2024北京二中初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1710492534/2024北京二中初二（上）期末物理.pdf"},{"name":"2024北京顺义初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1711359243/2024北京顺义初二（上）期末物理（教师版）.pdf"},{"name":"2024北京海淀初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1734085430/2024北京海淀初二（上）期末物理（教师版）.pdf"},{"name":"2024北京东城初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1706433337/2024北京东城初二（上）期末物理（教师版）.pdf"},{"name":"2024北京延庆初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1706435424/2024北京延庆初二（上）期末物理（教师版）.pdf"},{"name":"2024北京丰台初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1706356180/2024北京丰台初二（上）期末物理（教师版）.pdf"},{"name":"2024北京西城初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1708514381/2024北京西城初二（上）期末物理（教师版）.pdf"},{"name":"2024北京石景山初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1705137951/2024北京石景山初二（上）期末物理（教师版）.pdf"},{"name":"2024北京朝阳初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1705141840/2024北京朝阳初二（上）期末物理（教师版）.pdf"},{"name":"2024北京大兴初二（上）期末物理","url":"https://www.jingshibang.com/uploads/paper/file/1704769124/2024北京大兴初二（上）期末物理（教师版）.pdf"}]

// let a = document.createElement('a');
//   a.href = 'https://i-blog.csdnimg.cn/blog_migrate/0f927f02b4552b7ce77128facb93c508.png';
//   a.download = 'a1.jpg'; // 设置文件名
//   document.body.appendChild(a);
//   a.click(); // 模拟点击下载链接

// urls = urls.splice(0,1);
urls.forEach(it => {
    const request = http.get(it.url, (res) => {
      const fileStream = fs.createWriteStream(`${it.name}.pdf`);
      res.pipe(fileStream);
    });
    
    request.on('error', (err) => {
      console.error(`请求下载文件出错: ${err.message}`);
    });
    
    request.end();
})

