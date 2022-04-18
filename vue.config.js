const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: "./",
  lintOnSave: false,
  configureWebpack: {
    resolve: {
      alias: {
        // src下的文件夹
        assets: "@/assets",
        components: "@/components",
        views: "@/views",
      },
    },
  },
})
