const http = require('http');
const fs = require('fs');

const fileUrl = 'http://www.jingshibang.com//uploads/paper/file/1670464910/2022北京重点校初二（上）期中数学汇编：轴对称变换.pdf';
const filePath = './file.pdf';

let urls = [{"name":"2020北京十五中初二10月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1677149345/2020北京十五中初二10月月考物理（教师版）.pdf"},{"name":"2020北京四十三中初二9月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1677149396/2020北京四十三中初二9月月考物理（教师版）.pdf"},{"name":"2019北京人大附中初二9月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1677148554/2019北京人大附中初二9月月考物理（教师版）.pdf"},{"name":"2019北京人大附中初二10月月考物理","url":"http://www.jingshibang.com"},{"name":"2019北京一零一中初二4月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1677148766/2019北京一零一中初二4月月考物理（教师版）.pdf"},{"name":"2018北京北师大实验中学初二9月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1656751444/2018北京北师大实验中学初二9月月考物理（教师版）.pdf"},{"name":"2019北京昌平初二（下）第一次月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1599904825/2019北京昌平初二（下）第一次月考物理含答案.pdf"},{"name":"2020北京首都师大附中初二12月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1656826319/2020北京首都师大附中初二12月月考物理（教师版）.pdf"},{"name":"2018北京牛一实验学校初二10月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1696765662/2018北京牛一实验学校初二10月月考物理（教师版）.pdf"},{"name":"2019北京理工大附中分校初二10月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1677148373/2019北京理工大附中分校初二10月月考物理（教师版）.pdf"},{"name":"2022北京北师大实验中学初二12月月考物理","url":"http://www.jingshibang.com"},{"name":"2020北京北师大附中初二（下）第二次月考物理（教师版）","url":"http://www.jingshibang.com/uploads/paper/file/1677148955/2020北京北师大附中初二（下）第二次月考物理（教师版）.pdf"},{"name":"2023北京陈经纶中学初二12月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1703122045/2023北京陈经纶中学初二12月月考物理（教师版）.pdf"},{"name":"2023北京通州运河中学初二10月月考物理","url":"http://www.jingshibang.com"},{"name":"2024北京首都师大附中初二3月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1711852968/2024北京首都师大附中初二3月月考物理（教师版）.pdf"},{"name":"2024北京北师大附中初二（下）开学考物理","url":"http://www.jingshibang.com/uploads/paper/file/1710473730/2024北京北师大附中初二（下）开学考物理（教师版）.pdf"},{"name":"2019北京通州潞河中学初二（下）第二次月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1599904588/2019北京通州潞河中学初二（下）第二次月考物理含答案.pdf"},{"name":"2024北京十三中初二3月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1711792201/2024北京十三中初二3月月考物理（教师版）.pdf"},{"name":"2024北京牛栏山一中初二3月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1712557016/2024北京牛栏山一中初二3月月考物理（教师版）.pdf"},{"name":"2022北京陈经纶中学初二9月月考物理","url":"http://www.jingshibang.com/uploads/paper/file/1710639624/2022北京陈经纶中学初二9月月考物理（教师版）.pdf"}]


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

