const http = require('http')
const temp = require('art-template')
const fs = require('fs')
const path = require('path')

const server = http.createServer((req, res) => {
  const url = req.url
  if (url === '/') {
    fs.readFile(path.join(__dirname, './index2.html'), (err, data) => {
      if (err) {
        throw err
      }
      const htmlstr = temp.render(data.toString(), {
        message: 'world',
        todos: [
          {
            title: '吃饭',
            completed: false
          },
          {
            title: '睡觉',
            completed: true
          },
          {
            title: '打豆豆',
            completed: false
          },
        ]
      })
      res.statusCode = 200
      res.setHeader('Content-Type', 'text/html; charset=utf-8')
      res.end(htmlstr)
    })
  }
})

server.listen(3024, '127.0.0.1', () => {
  console.log('server is running 3000 port')
})