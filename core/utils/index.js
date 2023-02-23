/**
 * utils/index.js
 * 公共方法封装
 */
const fs = require('fs');

/**
 * 统一路径分隔符 主要为了后续生成模块ID方便
 * 后续会使用模块相对于rootPath的路径作为每一个文件的唯一ID
 * @param {*} path
 * @returns
 */
function toUnixPath(path) {
  return path.replace(/\\/g, '/');
}

/**
 * resolve.extensions是针对于引入依赖时，在没有书写文件后缀的情况下，
 * webpack会自动帮我们按照传入的规则为文件添加后缀
 * @param {*} modulePath
 * @param {*} extensions
 * @param {*} originModulePath
 * @param {*} moduleContext
 */
function tryExtensions(
  modulePath,
  extensions,
  originModulePath,
  moduleContext
) {
  // 优先尝试不需要扩展名选项
  // extensions.unshift('');是防止用户如果已经传入了后缀时，我们优先尝试直接寻找，
  // 如果可以找到文件那么就直接返回。找不到的情况下才会依次尝试。
  extensions.unshift('');
  for (let extension of extensions) {
    if (fs.existsSync(modulePath + extension)) {
      return modulePath + extension;
    }
  }

  // 未匹配对应文件
  throw new Error(
    `No module, Error: Can't resolve ${originModulePath} in ${moduleContext}`
  );
}

/**
 *
 * @param {*} chunk
 * name 属性入口文件名称
 * entryModule 入口文件module对象
 * modules 依赖模块路径
 */
function getSourceCode(chunk) {
  const { name, entryModule, modules } = chunk;
  return `
  (() => {
    var __webpack_modules__ = {
      ${modules
        .map((module) => {
          return `
          '${module.id}': (module) => {
            ${module._source}
      }
        `;
        })
        .join(',')}
    };
    // The module cache
    var __webpack_module_cache__ = {};

    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      var cachedModule = __webpack_module_cache__[moduleId];
      if (cachedModule !== undefined) {
        return cachedModule.exports;
      }
      // Create a new module (and put it into the cache)
      var module = (__webpack_module_cache__[moduleId] = {
        // no module.id needed
        // no module.loaded needed
        exports: {},
      });

      // Execute the module function
      __webpack_modules__[moduleId](module, module.exports, __webpack_require__);

      // Return the exports of the module
      return module.exports;
    }

    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
    (() => {
      ${entryModule._source}
    })();
  })();
  `;
}

module.exports = { toUnixPath, tryExtensions, getSourceCode };
