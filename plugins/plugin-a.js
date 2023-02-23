/**
 * plugin-a.js
 * 插件A
 * webpack插件本质上就是通过发布订阅的模式，通过compiler上监听事件。
 * 然后再打包编译过程中触发监听的事件从而添加一定的逻辑影响打包结果
 */

class PluginA {
  apply(compiler) {
    // #注册同步钩子 compiler.hooks.run.tap() 开始编译时的钩子
    // 这里的 compiler 对象就是我们 new Compiler() 创建的实例哦
    compiler.hooks.run.tap('Plugin A', () => {
      // 调用
      console.log('PluginA');
    });
  }
}

module.exports = PluginA;
