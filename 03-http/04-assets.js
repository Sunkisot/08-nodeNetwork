const http = require('http')
const fs = require('fs')
const mime = require('mime') // 通过文件后缀名获取content-type
const path = require('path')

const server = http.createServer((req, res) => {
  let url = req.url
  if (url.startsWith('/assets/')) {
    res.statusCode = 200
    let type = mime.getType(path.extname(url))
    console.log(type)
    try {
      res.setHeader('Content-Type', `${type}; charset=utf-8`)
      let data = fs.readFileSync(`.${url}`, 'utf-8')
      res.end(data)
    } catch (err) {
      res.statusCode = 404
      res.end('404 not found')
    }

  } else if (url == '/') {
    res.statusCode = 200
    res.setHeader('Content-Type', `text/html; charset=utf-8`)
    let data = fs.readFileSync(`./index.html`, 'utf-8')
    res.end(data)
  } else {
    res.statusCode = 404
    res.end('404 not found')
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('server running!')
})