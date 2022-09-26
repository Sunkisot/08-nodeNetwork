const net = require('net')

const server = net.createServer()

server.on('connection', clientSocket => {
  console.log('有新的连接进来了')

  // 监听clientSocket的data事件
  clientSocket.on('data', data => {
    console.log('客户端说：' + data.toString())
  })

  // 通过 clientSocket给当前连接的客户端发送数据
  clientSocket.write('hello')
})
server.on('error', err => {
  console.log(err)
})

server.listen(3048, () => {
  console.log('服务运行在3000端口')
})