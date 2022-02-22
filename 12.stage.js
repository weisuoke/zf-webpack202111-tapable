/**
 * stage 阶段 在 UMI 插件系统中用到 stage
 */

let { SyncHook } = require('./tapable');
let hook = new SyncHook(['name']);

hook.tap({name: 'tapA', stage: 1}, () => {
  console.log('tapA')
})

hook.tap({name: 'tapB', stage: 3}, () => {
  console.log('tapB')
})

hook.tap({name: 'tapC', stage: 5}, () => {
  console.log('tapC')
})

hook.tap({name: 'tapD', stage: 2}, () => {
  console.log('tapD')
})

hook.call('zhufeng')