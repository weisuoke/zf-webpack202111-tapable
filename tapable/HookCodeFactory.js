class HookCodeFactory {
  setup(hook, options) {
    // 把事件函数对象中的函数取出来，拼成一个数组传递给 hook._x
    hook._x = options.taps.map(tap => tap.fn)
  }

  args(options = {}) {
    let { before, after } = options
    let allArgs = this.options.args;
    if (before) allArgs = [before, ...allArgs]
    if (after) allArgs = [...allArgs, after]
    return allArgs.join(',')
  }

  init(options) {
    this.options = options;
  }

  deInit() {
    this.options = null;
  }

  header() {
    let code = '';

    code += `var _x = this._x \n`;
    return code;
  }

  /**
   * 动态创建函数
   * @param options
   *  taps tapInfo 数组
   *  args 参数数组
   *  type 注册类型
   */
  create(options) {
    this.init(options)
    let { type } = options;
    let fn;
    switch (type) {
      case 'sync':
        fn = new Function(
          this.args(),  // name, age
          this.header() + this.content()
        );
        break;
      case 'async':
        fn = new Function(
          this.args({ after: '_callback' }),  // name, age
          this.header() + this.content()
        );
        break;
      default:
        break;
    }
    return fn;
  }

  callTapsSeries() {
    let taps = this.options.taps;
    if (taps.length === 0) {
      return ''
    }
    let code = '';
    for (let i = 0; i < taps.length; i++) {
      let content = this.callTap(i);
      code += content;
    }
    return code;
  }

  callTapsParallel() {
    let taps = this.options.taps;
    let code = `var _counter = ${taps.length};\n`
    code += `
      var _done = (function() {
        _callback();
      })
    `

    for (let i = 0; i < taps.length; i++) {
      let content = this.callTap(i);
      code += content;
    }
    return code;
  }

  callTap(tapIndex) {
    let code = ''
    code += `var _fn${tapIndex} = _x[${tapIndex}];`;

    let tapInfo = this.options.taps[tapIndex]
    switch (tapInfo.type) {
      case 'sync':
        code += `_fn${tapIndex}(${this.args()})\n`;
        break;
      case 'async':
        code += `
          _fn${tapIndex}(${this.args({
            after: `
              function() {
                if (--_counter === 0) _done();
              }
            `
          })});
        `
        break;
      default:
        break;
    }
    return code;
  }
}

module.exports = HookCodeFactory