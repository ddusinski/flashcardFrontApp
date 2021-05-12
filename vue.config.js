// vue.config.js
module.exports = {
    devServer: {
        port: 3000,
        proxy: {
            '/api': {
                target: 'http://localhost:8092',
                ws: true,
                changeOrigin: true
            }
        }
    }
}