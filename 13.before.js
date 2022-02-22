/**
 * stage 阶段 在 UMI 插件系统中用到 stage
 */

let { SyncHook } = require('./tapable');
let hook = new SyncHook(['name']);

hook.tap({name: 'tapA'}, () => {
  console.log('tapA')
})

hook.tap({name: 'tapB'}, () => {
  console.log('tapB')
})

hook.tap({name: 'tapC'}, () => {
  console.log('tapC')
})

hook.tap({name: 'tapD', before: ['tapB', 'tapC']}, () => {
  console.log('tapD')
})

hook.call('zhufeng')