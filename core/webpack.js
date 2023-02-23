/**
 * webpack()方法的实现文件
 */

const Compiler = require('./compiler');

function webpack(options) {
  // 合并参数 得到合并后的参数 mergeOptions
  const mergeOptions = _mergeOptions(options);

  // step2 - 编译阶段 --> 1. 创建 compiler 对象
  // 可通过 new Compiler()类返回的实例对象上 compiler.hooks.run.tap 注册钩子
  const compiler = new Compiler(mergeOptions);

  // 加载插件(注册插件)
  _loadPlugins(options.plugins, compiler);

  return compiler;
}

/**
 * step1 - 合并参数阶段
 * @param {*} options
 */
function _mergeOptions(options) {
  console.log('000', process.argv.slice(2));
  // node index.js --mode=production --devtool=false  ==> [ '--mode=production', '--devtool=false' ]
  const shellOptions = process.argv.slice(2).reduce((option, argv) => {
    // argv ==> --mode=production
    const [key, value] = argv.split('=');
    if (key && value) {
      const parseKey = key.slice(2);
      option[parseKey] = value;
    }
    return option;
  }, {});

  return { ...options, ...shellOptions };
}

/**
 * step2 - 编译阶段 --> 2. 加载插件方法
 * @param {*} plugins 配置传过来的plugins
 * @param {*} compiler
 */
function _loadPlugins(plugins, compiler) {
  if (plugins && Array.isArray(plugins)) {
    plugins.forEach((plugin) => {
      // 任何一个webpack插件都是一个类(当然类本质上都是funciton的语法糖)，
      // 每个插件都必须存在一个apply方法
      // 编写webpack plugin本质就是操作compiler对象从而影响打包结果！
      // !相当于对每一个传入的插件在compiler实例对象中进行了 订阅！
      plugin.apply(compiler);
    });
  }
}

module.exports = webpack;
