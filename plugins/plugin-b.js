/**
 * plugin-b.js
 * 插件B
 */

class PluginB {
  apply(compiler) {
    // compiler为 new Compiler() 创建的实例喔
    // #compiler.hooks.done.tap() 在 compilation 完成时执行
    compiler.hooks.done.tap('Plugin B', () => {
      console.log('PluginB');
    });
  }
}

module.exports = PluginB;
