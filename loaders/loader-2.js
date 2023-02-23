/**
 * 自定义loader loader-2.js
 * loader本质上就是一个函数，接受我们的源代码作为入参同时返回处理后的结果
 * 参考https://webpack.docschina.org/concepts/loaders/#loader-features
 */

function loader2(sourceCode) {
  console.log('join loader2');
  return sourceCode + `\n const loader2 = 'cynthiazqy'`;
}

module.exports = loader2;
