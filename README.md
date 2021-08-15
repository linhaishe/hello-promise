# hello-promise

分别是 原生 ajax，promise 和 axios 的笔记

## 异步编程

- fs 文件操作
  ```js
  require("fs").readFile("./index.html", (err, data) => {});
  ```
- 数据库操作
- AJAX
  ```js
  $.get("/server", (data) => {});
  ```
- 定时器
  ```js
  setTimeout(() => {}, 2000);
  ```

## demo.js

用 settimeout 做异步请求的模拟

```
//Promise 形式实现
// resolve 解决  函数类型的数据
// reject  拒绝  函数类型的数据
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    //30%  1-100  1 2 30
    //获取从1 - 100的一个随机数
    let n = rand(1, 100);
    //判断
    if (n <= 30) {
      resolve(n); // 将 promise 对象的状态设置为 『成功』
    } else {
      reject(n); // 将 promise 对象的状态设置为 『失败』
    }
  }, 1000);
});

console.log(p);
//调用 then 方法
// value 值
// reason 理由
p.then(
  (value) => {
    alert("恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 " + value);
  },
  (reason) => {
    alert("再接再厉, 您的号码为 " + reason);
  }
);

```

Promise 是一个构造函数，进行对象实例化，新构造一个 promise 对象，实例化后需要接收一个参数，这个参数是一个函数类型的值。函数有两个形参，resolve,reject,这两个都是函数类型的是数据。

promise 实例可以包裹一个异步操作

成功 调用 resolve()函数
失败 调用 reject()函数

通过调用 then 方法，将 resolve，reject 函数进行调用，感觉就像是将这两个函数用作插槽占位。

`p.then(()=>{},()=>{})`

```
p.then(
  (value) => {
    alert("恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 " + value);
  },
  (reason) => {
    alert("再接再厉, 您的号码为 " + reason);
  }
);
```

then 方法传入两个函数式参数，第一个参数是对象成功时的参数，第二个是对象状态为失败的参数。

### promise 传参

```
    //判断
    if (n <= 30) {
      resolve(n); // 将 promise 对象的状态设置为 『成功』
    } else {
      reject(n); // 将 promise 对象的状态设置为 『失败』
    }
```

value 和 reason 都为形参

```
p.then(
  (value) => {
    alert("恭喜恭喜, 奖品为 10万 RMB 劳斯莱斯优惠券, 您的中奖数字为 " + value);
  },
  (reason) => {
    alert("再接再厉, 您的号码为 " + reason);
  }
);


```

## promise-basic

### 实践练习

promise-basic git:(main) ✗ node 2-Promise 实践练习-fs 模块.js

```
//Promise 形式
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
    //因为出来的是buffer二进制文件，需要通过toString 的方法进行解析
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);

```

### 原生 ajax-promise 使用

处理逻辑：

1. 在 promise 实例中放入异步请求，并分别在成功和失败的位置放入 resolve,reject 函数。并将成功和失败的数据传入 resolve,reject 函数中
2. 通过 then 方法处理成功和失败的回调函数

```
btn.addEventListener("click", function () {
  //创建 Promise
  const p = new Promise((resolve, reject) => {
    //1.创建对象
    const xhr = new XMLHttpRequest();
    //2. 初始化
    xhr.open("GET", "https://api.apiopen.top/getJoke");
    //3. 发送
    xhr.send();
    //4. 处理响应结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断响应状态码 2xx
        if (xhr.status >= 200 && xhr.status < 300) {
          //控制台输出响应体
          resolve(xhr.response);
        } else {
          //控制台输出响应状态码
          reject(xhr.status);
        }
      }
    };
  });
  //调用then方法，处理响应成功或失败时的处理函数
  p.then(
    (value) => {
      console.log(value);
    },
    (reason) => {
      console.warn(reason);
    }
  );
});
```

### fs-promise 使用

```
/**
 * 封装一个函数 mineReadFile 读取文件内容
 * 参数:  path  文件路径
 * 返回:  promise 对象
 */
function mineReadFile(path) {
    //函数调用，返回一个 promise对象
  return new Promise((resolve, reject) => {
    //读取文件
    require("fs").readFile(path, (err, data) => {
      //判断
      if (err) reject(err);
      //成功
      resolve(data);
    });
  });
}

//返回的对象后面直接使用then方法
mineReadFile("./resource/content.txt").then(
  (value) => {
    //输出文件内容
    console.log(value.toString());
  },
  (reason) => {
    console.log(reason);
  }
);

```

### ajax 封装-promise

```
function sendAJAX(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    //将返回的数据转换为json对象格式，因为ajax传输的数据是字符串的形式
    xhr.responseType = "json";
    xhr.open("GET", url);
    xhr.send();
    //处理结果
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        //判断成功
        if (xhr.status >= 200 && xhr.status < 300) {
          //成功的结果
          resolve(xhr.response);
        } else {
          reject(xhr.status);
        }
      }
    };
  });
}

sendAJAX("https://api.apiopen.top/getJok").then(
  (value) => {
    console.log(value);
  },
  (reason) => {
    console.warn(reason);
  }
);

```

## promise-api

### promise-api-then/catch

```
let p = new Promise((resolve, reject) => {
  // ** 同步调用
  // console.log(111);
  //修改 promise 对象的状态
  reject("error");
});

// console.log(222);

//执行 catch 方法
p.catch((reason) => {
  console.log(reason);
});

```

### promise-api-resolve

```
let p1 = Promise.resolve(521);
//如果传入的参数为 非Promise类型的对象, 则返回的结果为成功promise对象
//如果传入的参数为 Promise 对象, 则参数的结果决定了 resolve 的结果
let p2 = Promise.resolve(
  new Promise((resolve, reject) => {
    // resolve('OK');
    reject("Error");
  })
);
// console.log(p2);
p2.catch((reason) => {
  console.log(reason);
});

```

### promise-api-reject

```
// let p = Promise.reject(521);
// let p2 = Promise.reject('iloveyou');
//他返回的结果永远是失败的
let p3 = Promise.reject(
  new Promise((resolve, reject) => {
    resolve("OK");
  })
);

console.log(p3);

```

### promise-api-all

可以用来检测多个 ajax 请求是否成功，如果没成功能返回未成功的那个 url

```
let p1 = new Promise((resolve, reject) => {
  resolve("OK");
});
// let p2 = Promise.resolve('Success');
let p2 = Promise.reject("Error");
let p3 = Promise.resolve("Oh Yeah");

//return "Error"
//[[Prototype]]: Promise
//[[PromiseState]]:"rejected"
//[PromiseResult]]: "Error"

const result = Promise.all([p1, p2, p3]);

console.log(result);

```

### key-questions

throw 会抛出错误，并改变 pending 的状态为 rejecte

```
let p = new Promise((resolve, reject) => {
  //1. resolve 函数
  // resolve('ok'); // pending   => fulfilled (resolved)
  //2. reject 函数
  // reject("error");// pending  =>  rejected
  //3. 抛出错误
  throw '出问题了';
});

console.log(p);

```

# axios 的使用

- 需要开启 json-server ,作为一个后端数据的使用
- 启动 json-server 在当前文件夹下输入如下命令：`json-server db.json`
