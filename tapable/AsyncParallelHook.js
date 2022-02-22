const Hook = require('./Hook')
const HookCodeFactory = require('./HookCodeFactory')

class AsyncParallelHookCodeFactory extends HookCodeFactory {
  // 获取事件函数执行的代码需要动态的创建
  content() {
    return this.callTapsParallel()
  }
}

const factory = new AsyncParallelHookCodeFactory();

class AsyncParallelHook extends Hook {
  compile(options) {
    // 就是给 hook._x 赋值为事件函数的数组
    factory.setup(this, options)
    // 开始根据 options{taps, args, type} 创建 call 函数 new Function
    return factory.create(options)
  }
}

module.exports = AsyncParallelHook