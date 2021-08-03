module.exports = {
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg')
    console.log('tag', '')
    svgRule.uses.clear()

    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  },
  configureWebpack: {
    devtool: 'source-map',
    devServer: {
      watchOptions: {
        ignored: ['node_modules'],
        aggregateTimeout: 300,
        poll: 1500
      },
      public: '192.168.56.132' // vagrant machine address
    }
  },
  css: {
    sourceMap: true,
    extract: false
  }
  // productionSourceMap: true
}
