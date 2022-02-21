const { SyncBailHook } = require('tapable');

/**
 * Synchook 是一个构造函数或者说是一个类
 * 当事件回调函数的返回值非 undefined 的时候就会停止后续的事件函数执行
 */

const hook = new SyncBailHook(["name", "age"]);

hook.tap('1', (name, age) => {
  console.log(1, name, age)
  return undefined
})

hook.tap('2', (name, age) => {
  console.log(2, name, age)
  return 1
})

hook.tap('3', (name, age) => {
  console.log(2, name, age)
  return 1
})

hook.call('zhufeng', 13)