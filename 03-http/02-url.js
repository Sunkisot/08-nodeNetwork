const http = require('http')

const server = http.createServer((req, res) => {
  let url = req.url
  console.log(url)
  if(url == '/') {
    res.end('hello world')
  }else if(url == '/a') {
    res.end('hello a')
  }else {
    res.statusCode = 404
    res.end('404 is Not Found')
  }
})

server.listen(3000, '127.0.0.1', () => {
  console.log('server running!')
})