async function main() {
  let p = new Promise((resolve, reject) => {
    // resolve('OK');
    reject("Error");
  });
  //1. 右侧为promise的情况
  // let res = await p;
  //2. 右侧为其他类型的数据
  // let res2 = await 20;
  //3. 如果promise是失败的状态
  try {
    let res3 = await p;
  } catch (e) {
    console.log(e);
  }
}

main();
