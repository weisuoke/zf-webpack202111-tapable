const { SyncHook } = require('tapable')
const syncHook = new SyncHook(['name', 'age']);

let intercept1 = {
  register(tapInfo) {
    console.log('拦截器1开始 register')
  },
  tap() {
    console.log('拦截器1开始 tap')
  },
  call() {
    console.log('拦截器1开始 call')
  }
}

let intercept2 = {
  register(tapInfo) { // 挂载注册的时候触发
    console.log('拦截器2开始 register')
  },
  tap() { // 也是 call 的时候触发，一次 call 可能触发多次，每个回调函数都会触发一次
    console.log('拦截器2开始 tap')
  },
  call() {  // call 的时候触发，一次 call 只会触发一次
    console.log('拦截器2开始 call')
  }
}

syncHook.intercept(intercept1)
syncHook.intercept(intercept2)

syncHook.tap({ name: '回调A' }, () => {
  console.log('回调A')
})
syncHook.tap({ name: '回调B' }, () => {
  console.log('回调B')
})
syncHook.call()