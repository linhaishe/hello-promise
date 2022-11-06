// 文件的主要作用是用于读取resource里的数据

const fs = require("fs");

//回调函数 形式 获取数据
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错 则抛出错误
//     if(err)  throw err;
//     //输出文件内容
//     // node 2-Promise实践练习-fs模块.js
//     console.log(data.toString());
// });

//Promise 形式 获取数据
let p = new Promise((resolve, reject) => {
  fs.readFile("./resource/content.tx", (err, data) => {
    //如果出错
    if (err) reject(err);
    //如果成功
    resolve(data);
  });
});

//调用 then
p.then(
  (value) => {
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
