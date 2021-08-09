//fs 模块提供了实用的函数来与文件系统进行交互.
const fs = require("fs");

//回调函数 形式
// fs.readFile('./resource/content.txt', (err, data) => {
//     // 如果出错 则抛出错误
//     if(err)  throw err;
//     //输出文件内容
//     console.log(data.toString());
// });

//Promise 形式
let p = new Promise((resolve, reject) => {
  fs.readFile("./resource/content.tx", (err, data) => {
    //如果出错
    if (err) reject(err);
    //如果成功
    resolve(data);
  });
});

//会输出promise函数的状态属性和promiseresult
console.log(999, p);
//调用 then
p.then(
  (value) => {
    //因为出来的是buffer二进制文件，需要通过toString 的方法进行解析
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);
