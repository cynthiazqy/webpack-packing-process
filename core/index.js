/**
 * 打包命令的核心入口文件
 */

const webpack = require('./webpack'); // 自定义webpack实现
// const webpack = require('webpack');
const config = require('../example/webpack.config');

// 步骤1： 初始化参数 根据配置文件和shell参数合成参数
// 步骤2：调用 webpack(options) 初始化 compiler 对象 ==> webpack() 方法会返回一个compiler对象

const compiler = webpack(config);

// 调用 run 方法进行打包 《== 核心编译
compiler.run((err, stats) => {
  if (err) {
    console.log('err', err);
  }
  // ...
});
