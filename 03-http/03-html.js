const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  let data = fs.readFileSync('./index.html', 'utf-8')
  res.end(data)
  // res.end(`<h1>hello world</h1>
  // <p>你好世界！</p>
  // `)
})

server.listen(3000, '127.0.0.1', () => {
  console.log('server running!')
})