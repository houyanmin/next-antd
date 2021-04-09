
//     const server = express()
//     if (!dev) {
//       server.use(compression()) //gzip
//     }
//     //文章二级页面
//     server.get('/p/:id', (req, res) => {
//       const actualPage = '/detail'
//       const queryParams = {id: req.params.id}
//       app.render(req, res, actualPage, queryParams)
//     })

const express = require('express')
const next = require('next')
const cp = require('child_process');
const {createProxyMiddleware } = require('http-proxy-middleware')

const devProxy = {
    '/api': {
        target: 'https://va-api.khtuan.com', // 端口自己配置合适的
        changeOrigin: true
    }
}

const dev = process.env.NODE_ENV !== 'production'
const port = dev ? 3000 : process.env.PORT || 3000

const app = next({
    dev
})
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()
        if (dev && devProxy) {
            Object.keys(devProxy).forEach(function(context) {
                server.use(createProxyMiddleware(context, devProxy[context]))
            })
        }

        server.all('*', (req, res) => {
            handle(req, res)
        })

        server.listen(port, err => {
            if (err) {
                throw err
            }
            console.log(`> Ready on http://localhost:${port}`)
            const serverUrl = `http://localhost:${port}`;
            console.log(`> Ready on ${serverUrl}`);
            // 开发环境自动启动
            if (dev) {
                switch (process.platform) {
                //mac系统使用 一下命令打开url在浏览器
                case 'darwin':
                    cp.exec(`open ${serverUrl}`);
                    break;
                //win系统使用 一下命令打开url在浏览器
                case 'win32':
                    cp.exec(`start ${serverUrl}`);
                    break;
                // 默认mac系统
                default:
                    cp.exec(`open ${serverUrl}`);
                }
            }
        })
    })
    .catch(err => {
        console.log('An error occurred, unable to start the server')
        console.log('发生错误，无法启动服务器')
        console.log(err)
    })