# webpack-packing-process

## webpack 打包流程梳理

1. **初始化参数阶段**：从 webpack.config.js 中读取对应的配置参数和 shell 命令中传入的参数进行合并，得到最终打包配置参数
2. **开始编译准备阶段：**通过调用 webpack()方法返回一个 compiler 方法，创建一个 compiler 对象，并且注册各个 Webpack Plugin。找到配置入口 entry 代码，调用 compiler.run()方法进行编译
3. **模块编译阶段：**从入口模块进行分析，调用匹配文件的 loaders 对文件进行处理。同时分析模块依赖的模块，递归进行模块编译工作
4. **完成编译阶段：**在递归完成后，每个引用模块通过 loaders 处理完成 同时得到模块之前的依赖关系
5. **输出文件阶段**：整理模块依赖关系，同时将处理后的文件输出到 output 的磁盘目录中

## 目录建议

webpack/core 存放我们自己将要实现的 webpack 核心代码。

webpack/example 存放我们将用来打包的实例项目。

- webpack/example/webpak.config.js 配置文件.
  webpack/example/src/entry1 第一个入口文件
  webpack/example/src/entry1 第二个入口文件
  webpack/example/src/index.js 模块文件

webpack/loaders 存放我们的自定义 loader。
webpack/plugins 存放我们的自定义 plugin。
