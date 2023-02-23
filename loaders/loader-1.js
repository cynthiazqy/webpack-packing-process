/**
 * 自定义loader loader-1.js
 * loader本质上就是一个函数，接受我们的源代码作为入参同时返回处理后的结果
 * 参考https://webpack.docschina.org/concepts/loaders/#loader-features
 */

function loader1(sourceCode) {
  console.log('join loader1');
  return sourceCode + `\n const loader1 = 'https://github.com/cynthiazqy'`;
}

module.exports = loader1;
