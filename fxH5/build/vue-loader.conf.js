'use strict'

module.exports = {
  //You can set the vue-loader configuration by yourself.
  module: {
    rules: [
      //新版的vue-loader需要单独配置css-loader（在vue-loader.conf.js）
      {
        test: /\.css$/,
        use: ['vue-style-loader','css-loader']
      },
      {
        test: /\.scss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
    ]
  }
}
