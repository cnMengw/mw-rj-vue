const http = require('http');
const fs = require('fs');
const download = require('download');

let urls = [{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/7f4a9db6918f43ef697b5d697e49b6f7_nb_watermark.mp4","title":"用铅笔芯使电路中的电流连续地变化"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/518b73be7249b510da8967142d2a2fea_nb_watermark.mp4","title":"比较物质的硬度"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/6cfc7d4e9968d891079e0ac61463bc0a_nb_watermark.mp4","title":"测量动滑轮提升重物做功"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/6c05ebeae7ed69312aaca7ca899bb4e7_nb_watermark.mp4","title":"测量提升物体所做的功"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/a875b6ff8b98d86d04f657d8bcf5752c_nb_watermark.mp4","title":"比较串联电路中两个灯泡的亮暗"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/47ad38469b09c68b11cf27af6dcb2ae2_nb_watermark.mp4","title":"比较并联电路中小灯泡的亮暗"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/621e485bfc05aa9e9a5662252f655839_nb_watermark.mp4","title":"探究滑动摩擦力的影响因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/105e3b534247a5c08379b8ff9679734f_nb_watermark.mp4","title":"探究平面镜成像的特点"},{"url":"https://huohua-component.huohuaschool.com/preview/video/59d2433241871593b38abb18a90ce7aa.mp4","title":"探究液体压强的影响因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/db8b44700a1e2cc4e326c5744df3a2d3_nb_watermark.mp4","title":"探究光折射时的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3930cbb28ddb208cd0c895505096ac96.mp4","title":"探究影响电阻大小的因素"},{"url":"https://huohua-component.huohuaschool.com/preview/video/f8cf2a5b91f20a1ae49eb9d4b8f21a56.mp4","title":"探究影响压力作用效果的因素"},{"url":"https://huohua-component.huohuaschool.com/preview/video/35980ecfcad47663e768368fc9102f57.mp4","title":"探究重力势能的影响因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/4537d47809ba336eff36c34a36b8fb72_nb_watermark.mp4","title":"天平的使用-测量固体的质量"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/c14bf6430c2c542b29c30589afc688bd_nb_watermark.mp4","title":"天平的使用-测量液体的质量"},{"url":"https://huohua-component.huohuaschool.com/preview/video/bbb6996b365a05df4a7ed16f553e28cd.mp4","title":"条形磁铁同名排斥、异名吸引"},{"url":"https://huohua-component.huohuaschool.com/preview/video/09150b2277c800fe58af199c9af9bcb0.mp4","title":"小灯泡亮度的改变"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/db85a9682e8f0bdb3733ddd6ceebf851_nb_watermark.mp4","title":"悬挂法确定物体的重心"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a364919df9a451e658233bfa2e77f9f3.mp4","title":"盐水浮鸡蛋"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/ea236fb509a5428d4d41a1921d23900c_nb_watermark.mp4","title":"影响蒸发快慢的因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/f88765d0c0b2096a64af624a1007c2c7_nb_watermark.mp4","title":"用量筒测量物体的体积"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/c96bbd6dddf530760ed424116d9a7b47_nb_watermark.mp4","title":"透镜对光的作用"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/d2d20a628a1b9d8bb6a90b3d46388c57_nb_watermark.mp4","title":"温度计的读数和使用"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3540b67e679af8f4a1f21ac8a961bdb8.mp4","title":"奥斯特实验"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5fe100b5f51cc2ed029575bfbf6d3291.mp4","title":"水果电池"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/aac549de15939f8d4f177b59f159dae5_nb_watermark.mp4","title":"用小磁针探究磁体周围的磁场"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5060aa5dcdbc4d4160bde931fb5c64e2.mp4","title":"探究影响导体产生热量的因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/694698cd7733b1798bf9401dfd6e7879_nb_watermark.mp4","title":"比较纸锥下落的快慢"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/d2f0eca4a9cf4c6e7839c2df9183375b_nb_watermark.mp4","title":"直流电动机"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/9893f3ecbc0075ba79cccdf0b47dfb13_nb_watermark.mp4","title":"影响沸点的因素"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5d8cd0bf1747462a0fe6f00dca19a8c8.mp4","title":"晶体的熔化和凝固"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/86de50fec6a305af2786b9a59ac7ec53_nb_watermark.mp4","title":"通电螺线管周围的磁场"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/61347c0ce49600a92a52345524e4ca75_nb_watermark.mp4","title":"镜面反射和漫反射"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d28ca61881ca43d8559054536e443975.mp4","title":"非晶体的熔化和凝固"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/46a1fab7799940991f6f1dfdf8c7b4ae_nb_watermark.mp4","title":"蜡烛燃烧实验"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/69c1c09ce4b7f2fde74d563bc73fa66e_nb_watermark.mp4","title":"影响响度的因素"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d5a1039f4711703e261efcad0ba48ce0.mp4","title":"U形磁铁同名排斥、异名吸引"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/9b7f3402da30075cb6029f1fd3f21151_nb_watermark.mp4","title":"观察磁场对通电直导线的作用"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/edbf6900e0174c4855564c338216e8ee_nb_watermark.mp4","title":"乙醚的汽化与液化"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5f6803d3966a7d9f1081b405ac6a9449.mp4","title":"阿基米德原理"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1e6ea64f52abe141b8bcbb2afc14e536_nb_watermark.mp4","title":"磁场对通电线圈的作用"},{"url":"https://huohua-component.huohuaschool.com/preview/video/e85aa232f39b9c3dfc967c0a28f4bf13.mp4","title":"测量固体的密度"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1cc1305cbab115d2c6f208aa7883d263_nb_watermark.mp4","title":"测量凸透镜的焦距"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/afc4fbde9e2f1f95b814ded63169ac61_nb_watermark.mp4","title":"通电直导线周围的磁场"},{"url":"https://huohua-component.huohuaschool.com/preview/video/06e31e6060571054a35e99581ae31b60.mp4","title":"测量斜面的机械效率"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/6f6b30b154175d1d061b3bdbb6118362_nb_watermark.mp4","title":"测量液体的密度"},{"url":"https://huohua-component.huohuaschool.com/preview/video/9a8ea42bd139bc8f181cf5d5510b3e7c.mp4","title":"磁生电"},{"url":"https://huohua-component.huohuaschool.com/preview/video/61baa7f9f473c7498399999ef6cfc111.mp4","title":"弹簧测力计的使用"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/d4dc7ce13ff0c08185f89413021deb1b_nb_watermark.mp4","title":"比较质量相等的不同燃料燃烧时放出的热量"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/35a8ac5316f69f92d1dd9c2ba6fafb68_nb_watermark.mp4","title":"测量纸锥下落的速度"},{"url":"https://huohua-component.huohuaschool.com/preview/video/b9a05073ba80d4024d63ef7f542ebff6.mp4","title":"电荷间的相互作用"},{"url":"https://huohua-component.huohuaschool.com/preview/video/90082577249d034a67d2076c98bea981.mp4","title":"电荷在金属棒中的定向移动"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/50053f37e0b4a8c2deea0737ffbc732f_nb_watermark.mp4","title":"练习使用密度计"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/c5632bbc48ba7dd0a87ed9dd85244d38_nb_watermark.mp4","title":"探究杠杆的平衡条件"},{"url":"https://huohua-component.huohuaschool.com/preview/video/47a79265ed35032e46b83bf3a9bc095e.mp4","title":"电流表的用法"},{"url":"https://huohua-component.huohuaschool.com/preview/video/baad0e3b665a7dd4542b2c6f041234bf.mp4","title":"电压表的用法"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/982600cda2f90f1716277880d2e791db_nb_watermark.mp4","title":"验证力的平行四边形法则"},{"url":"https://huohua-component.huohuaschool.com/preview/video/31f387def61f9c06d9a389fe73c39bf3.mp4","title":"发光二极管"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/b13b10950981302c4502b371420e6295_nb_watermark.mp4","title":"惯性"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/3cb466d1b838f8ffc62b8f6e698956ea_nb_watermark.mp4","title":"熔丝的熔断——短路与超负荷运行"},{"url":"https://huohua-component.huohuaschool.com/preview/video/dbc6f00bded15b82947e15c99886bbae.mp4","title":"光沿直线传播"},{"url":"https://huohua-component.huohuaschool.com/preview/video/36ec1b87887bbc1ffde0ec924b70a697.mp4","title":"滑动变阻器的使用"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a62b4234e5618cbbd60b120518af328b.mp4","title":"绝缘体变导体"},{"url":"https://huohua-component.huohuaschool.com/preview/video/ed99286dcbf5d78860c44bc976c1d74b.mp4","title":"刻度尺的使用"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/c2ffcda591789db96d5a67ac1e7e8158_nb_watermark.mp4","title":"力的作用是相互的"},{"url":"https://huohua-component.huohuaschool.com/preview/video/02380fd65fe4f663d5b7b75e75933a6c.mp4","title":"力的作用效果"},{"url":"https://huohua-component.huohuaschool.com/preview/video/382436daef00b4d629cc7b1700242696.mp4","title":"练习使用停表"},{"url":"https://huohua-component.huohuaschool.com/preview/video/e7637db53647185b9f7487c5956b4c87.mp4","title":"流体压强与流速的关系"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3a143eff54d1eda7eb9607d6a2fea727.mp4","title":"摩擦起电"},{"url":"https://huohua-component.huohuaschool.com/preview/video/fcae8ef8e2a4af668c33991e90b6fa97.mp4","title":"热胀冷缩"},{"url":"https://huohua-component.huohuaschool.com/preview/video/c2c6ecf894c2ec6a7a1b35cd0744faf7.mp4","title":"生活中的大气压强"},{"url":"https://huohua-component.huohuaschool.com/preview/video/0489e855ae35d4542504f56dbbe527f0.mp4","title":"探究动能的影响因素"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d7cacaf3367c5d1f335cf718b5daf993.mp4","title":"探究不同物质的吸热能力"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1af07cb23cad64e58d5b9049dfd8d35d_nb_watermark.mp4","title":"探究二力平衡的条件"},{"url":"https://huohua-component.huohuaschool.com/preview/video/0b96816737b265bc7ef7f44dda145016.mp4","title":"探究浮力大小跟哪些因素有关"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/d02c84ba3edc227b633da8513260acc8_nb_watermark.mp4","title":"探究光反射时的规律"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/44bd37e829baf85be159b5545ad48fa5_nb_watermark.mp4","title":"制作“浮沉子”"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1e9527e0d3c7fe6841d8147368d0027e_nb_watermark.mp4","title":"蜡烛跷跷板"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/f430afec4523073ae3acab2d36888233_nb_watermark.mp4","title":"观察点火爆炸现象"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/4dc8160abfe2b561c380baaefc4937e5_nb_watermark.mp4","title":"各种色光的热效应"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/07afcf124bcc078c592f33018269a3d1_nb_watermark.mp4","title":"练习使用测电笔"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/794928066cfd6109a84c85bec99f4801_nb_watermark.mp4","title":"探究动滑轮工作时的特点"},{"url":"https://huohua-component.huohuaschool.com/preview/video/4c60b29a8c19b842bb734932eb78b52e.mp4","title":"动滑轮和定滑轮的特点"},{"url":"https://huohua-component.huohuaschool.com/preview/video/734edd3db099a27c592b5a6142c15fdf.mp4","title":"浮力的引入"},{"url":"https://huohua-component.huohuaschool.com/preview/video/9949ba09f77dd80c45049aceafcde887.mp4","title":"跨步电压触电"},{"url":"https://huohua-component.huohuaschool.com/preview/video/b50b94d3ba6ef1e95af94db2f56a256c.mp4","title":"活塞式抽水机"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d6a67822f721661873ad55c5be7f6b60.mp4","title":"判断是否做功"},{"url":"https://huohua-component.huohuaschool.com/preview/video/47f2e66aef67d6fd7d9d2e0f240c5fe0.mp4","title":"热气球原理"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d0ce488e717d71af4f633e967e1d5039.mp4","title":"参照物"},{"url":"https://huohua-component.huohuaschool.com/preview/video/763c70388c1c05e1fc9fcdb3a8752859.mp4","title":"汽油机的工作过程"},{"url":"https://huohua-component.huohuaschool.com/preview/video/0b9c53b70ee915fc3520656598bc6342.mp4","title":"并联电路中电流的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/956afe5e5fd08f9d54f5e21ffefeef73.mp4","title":"并联电路中电压的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3f595afbd75ee8bca1b787bd742bb90b.mp4","title":"液体内部存在压强"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a89649f63227665984cb0862306db323.mp4","title":"串联电路中电压的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/b19a7a0f4e1c8fe93f65c54800c36ed2.mp4","title":"测量小灯泡的电功率"},{"url":"https://huohua-component.huohuaschool.com/preview/video/9ccbc22f30a0efb2fff510b1682cacd8.mp4","title":"电路的组装及电流的方向"},{"url":"https://huohua-component.huohuaschool.com/preview/video/c999e55c8fe74bc543b45b474eea30ab.mp4","title":"伏安法测小灯泡电阻"},{"url":"https://huohua-component.huohuaschool.com/preview/video/4e27f6512837c01103a019ea195611ad.mp4","title":"串联电路中电流的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/90ec623a76b2c8e69987d214c8ace8c7.mp4","title":"并联电路中电流的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/739d63ce6de56981227780fb352d45bc.mp4","title":"浮力产生的原因"},{"url":"https://huohua-component.huohuaschool.com/preview/video/0261ab1c4432d572099a1263598481ae.mp4","title":"测量铅块浸没水中所受的浮力"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a584b552f578a32646ba1df8a520f73e.mp4","title":"杠杆的平衡条件"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3623f9d79ea947ceaee819af411961ef.mp4","title":"橡皮泥小船"},{"url":"https://huohua-component.huohuaschool.com/preview/video/49ab7d2f2f43ed595de6b7385fc45c39.mp4","title":"测量滑轮组的机械效率"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a2365929b06274962e00ea648bec1be0.mp4","title":"希罗喷泉"},{"url":"https://huohua-component.huohuaschool.com/preview/video/695b3ca6af367bd1be23d8f02084f023.mp4","title":"大气压强的测量―“注射器”测量法"},{"url":"https://huohua-component.huohuaschool.com/preview/video/247e02a35a6964cb4425c5a0daea5460.mp4","title":"伏安法测电阻"},{"url":"https://huohua-component.huohuaschool.com/preview/video/16094c46e5656976d3d74125a203f57d.mp4","title":"测量物体运动的平均速度"},{"url":"https://huohua-component.huohuaschool.com/preview/video/483765d93e235af965b9583d458085ee.mp4","title":"电冰箱制冷原理"},{"url":"https://huohua-component.huohuaschool.com/preview/video/fbc28e03d276807d529b98c8be81f114.mp4","title":"电铃工作原理"},{"url":"https://huohua-component.huohuaschool.com/preview/video/3e298a5a3ab067f69897e9a21d0b110a.mp4","title":"通路、断路与短路"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5b35e3bd2af51cb3cbb232bc54dd6a0b.mp4","title":"串联电路中电流的规律"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a257ec3f9786c414b3c5687cd06fd9f6.mp4","title":"探究电流与电阻的关系"},{"url":"https://huohua-component.huohuaschool.com/preview/video/f9b1db2327a7596becd0749e90a0d50c.mp4","title":"探究电流与电压的关系"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5f2939c52eccf66c754e7ee44c0f69ce.mp4","title":"验电器检测物体是否带电"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/89446efefb5c1c7f86b7450a21d093ba_nb_watermark.mp4","title":"探究重力与质量的关系"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/40b00e37d8e7be9fcc54dd6e24618ceb_nb_watermark.mp4","title":"连通器"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1a262ba5bfec43690ab7710cb1bb4429_nb_watermark.mp4","title":"神奇的硬币"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/dfca360bfa918d726cb171485dc41fd3_nb_watermark.mp4","title":"探究水的沸腾"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/beac6616153d7bae9ccda19434fd3db2_nb_watermark.mp4","title":"跳动的烛焰"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/3427d7041338cd611c976f2022159b6b_nb_watermark.mp4","title":"阻力对物体运动的影响"},{"url":"https://huohua-component.huohuaschool.com/preview/video/aeb95d32b8a762f74efa2d5b4d82a05d.mp4","title":"单摆的运动"},{"url":"https://huohua-component.huohuaschool.com/preview/video/e9340456a52b4d693da081ac1a975016.mp4","title":"扩散快慢与温度的关系"},{"url":"https://huohua-component.huohuaschool.com/preview/video/6dad78efdd8ba6dd041e9264ccb53eb4.mp4","title":"分子间存在间隙"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/02d6798c7ae847251d1c560fd46ed1d1_nb_watermark.mp4","title":"大气压强的测量―“吸盘”测量法"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a12c8b30694018a70f4add9e81be9551.mp4","title":"分子间存在引力"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/8f2dffb025339f6e404262b98c56cb1a_nb_watermark.mp4","title":"声音的传播"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/5c3c433d706ba808d8639a428e02cb9b_nb_watermark.mp4","title":"模拟马德堡半球实验"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/10eb650736b218ad8937d9fe71f46ee4_nb_watermark.mp4","title":"模拟海市蜃楼"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/9827312168961674689f0c5c1860cdd1_nb_watermark.mp4","title":"桌面的微小形变"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/10aa8020a1b03e719f3aeb3bb18af241_nb_watermark.mp4","title":"液体扩散实验"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/8baf50b38e8bdd1946181a1ad35b29b1_nb_watermark.mp4","title":"胡克定律"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/b7913f0f507cc690cb6bfed846ed6236_nb_watermark.mp4","title":"光沿直线传播的条件"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/06288319ca37f1a6a822fd6aec7797c7_nb_watermark.mp4","title":"探究定滑轮工作时的特点"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/e2a7f54e10402043759117bfb53cc029_nb_watermark.mp4","title":"探究小孔成像时像与孔的形状之间的关系"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/c795b7627eae9943b3f04e2443f2b4a0_nb_watermark.mp4","title":"重力的方向"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/9d8ed92b16994366e923bb58f9192cd8_nb_watermark.mp4","title":"观察手摇发电机发电"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/0b8e7daf53e5d8e802792f0ae1656b54_nb_watermark.mp4","title":"估测各用电器的实际功率"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/a041f14e469c16137be91d9fff8bbcc0_nb_watermark.mp4","title":"浇不灭的蜡烛"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/4c0ffb50c934deaed94c327d22b6165f_nb_watermark.mp4","title":"观察“碘锤”中的物态变化"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/125be4c4d0307c23b224d325ffa5d7d6_nb_watermark.mp4","title":"检验大气压强的存在"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/d77d57f4978331ed59ac0b45c0fc94c6_nb_watermark.mp4","title":"光具有能量"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/fe6c4025d0bbcf1b483e82e43fc90c73_nb_watermark.mp4","title":"压燃实验"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/e5a692ea823de08acc08bbb941569467_nb_watermark.mp4","title":"人工降雨"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/20588e69d0365d80f38cf33ec13f3765_nb_watermark.mp4","title":"做功改变物体的内能"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/66d8789a83956ac4a3384a490f45dec4_nb_watermark.mp4","title":"水的表面张力"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/1324b33990bcefb5ca4bef5515497f8d_nb_watermark.mp4","title":"探究水的沸点与气压的关系"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/b7f6a509e1a233cafc702ce449394536_nb_watermark.mp4","title":"探究凸透镜成像的规律"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/b322a4efa5ec878ced9fb106986b0844_nb_watermark.mp4","title":"纸杯烧水"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/26dd9b1d8851569b2178cfdbb34b73f2_nb_watermark.mp4","title":"光的色散"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/bc10bd9779cabd44486548e6c45f91c1_nb_watermark.mp4","title":"影响音调的因素"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/f8f23480087bff737f7f1bdf1d4f0706_nb_watermark.mp4","title":"气体扩散实验"},{"url":"https://huohua-component.huohuaschool.com/preview/video/e45fa2d20690afaa9b0872c871560c27.mp4","title":"酒精蒸发吸热"},{"url":"https://huohua-component.huohuaschool.com/preview/video/5e2cfa8299c5fcd0703bc8abfdc9edbe.mp4","title":"神奇的瓶子"},{"url":"https://huohua-component.huohuaschool.com/preview/video/86bac88a6f44ddb7b89dcc78b73dc16e.mp4","title":"发声的梳子"},{"url":"https://huohua-component.huohuaschool.com/preview/video/a340ddb020ae54f299a4e1515f269bd7.mp4","title":"地源热泵原理"},{"url":"https://huohua-component.huohuaschool.com/preview/video/9a2113b30534e1489399a0de569b202a.mp4","title":"柴油机的工作过程"},{"url":"https://huohua-component.huohuaschool.com/preview/video/d63b21d85d36a32c27c4e0fde365a37e.mp4","title":"神奇的硬币"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/33b3868a976a88999f65361f62c38395_nb_watermark.mp4","title":"反射望远镜的成像原理"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/023d591b604a7c38cb4cd035c4efa73f_nb_watermark.mp4","title":"比较材料的隔声性能"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/0ead6ae234d243213ff42de27e0dec33_nb_watermark.mp4","title":"水杯上的小水珠"},{"url":"https://huohua-component.huohuaschool.com/preview/video/449e97b2b501e2f9be432714373a3ec6.mp4","title":"声音的产生"},{"url":"https://huohua-component.huohuaschool.com/preview/video/73feb16183e4111233c36f82c3d76a96.mp4","title":"酒精的汽化和液化"},{"url":"https://huohua-component.huohuaschool.com/video/narrowband/transcode/476d8b3ba7e5f1f9206000561595df9a_nb_watermark.mp4","title":"滴水实验"},{"url":"https://huohua-component.huohuaschool.com/preview/video/249857ce0e9f1ac3fba38242b2aa866e.mp4","title":"碘的升华和凝华"}]
urls = urls.splice(0,1);

urls.forEach(it => {
    const filePath = `${__dirname}/video`;
	let headers = {
		'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 11_1_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
	};
    download(it.url, filePath, {
        filename: it.title + '.mp4',
        headers,
    }).then(() => {
        console.log(`Download Completed`)
        return
    })
    // const request = http.get(it.url, (response) => {
    //   const fileStream = fs.createWriteStream(`${it.title}.mp4`);
    //   response.pipe(fileStream);
    // });
    
    // request.on('error', (err) => {
    //   console.error(`请求下载文件出错: ${err.message}`);
    // });
    
    // request.end();
})

