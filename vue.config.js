module.exports = {
    lintOnSave: false,
    // publicPath: process.env.NODE_ENV === 'production' ? '/public/' : './',
    publicPath: './',
    outputDir: 'dist',
    assetsDir: "assets",
    productionSourceMap: false,
    devServer: {

        /* 自动打开浏览器 */
        open: true,
        /* 设置为0.0.0.0则所有的地址均能访问 */
        host: '0.0.0.0',
        port: 8088,
        https: false,
        hotOnly: false,
        /* 使用代理 */
        proxy: {
            '/api': {
                /* 目标代理服务器地址 */
                target: 'http://192.168.12.37:22401/price',
                /* 允许跨域 */
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            },
        },
    },
}