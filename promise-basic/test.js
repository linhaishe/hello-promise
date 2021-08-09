let p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("OK");
  }, 1000);
});
p.then((value) => {
  return new Promise((resolve, reject) => {
    resolve("success");
  });
})
  //then的返回结果是一个promise ,promise的状态，value里打印出来的是promise成功的状态，且这个状态是由它指定回调的返回值决定的
  .then((value) => {
    console.log(value);
  }) //success
  .then((value) => {
    console.log(value);
  }); //undefined
