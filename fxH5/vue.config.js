// vue.config.js
module.exports = {
  baseUrl: '/',
  outputDir: 'dist', // 打包的目录
  lintOnSave: true, // 在保存时校验格式
  productionSourceMap: false, // 生产环境是否生成 SourceMap
  devServer: {
    open: false, // 启动服务后是否打开浏览器
    host: '127.0.0.1',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  }
}
