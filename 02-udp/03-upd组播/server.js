const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  let address = server.address()
  console.log(`服务监听在${address.address}:${address.port}`)

  setInterval(() => {
    server.send('hello', 3035, '224.0.1.100', err => {
      if(err) {
        console.log('发送失败！')
      }
    })
  }, 2000)
})

server.on('message', (msg, rinfo) => {
  console.log(`收到了消息：${msg}, 来自${rinfo.address}:${rinfo.port}`)
  server.send('world', rinfo.port, rinfo.adress)
})

server.on('error', (err) => {
  console.log(`服务出错：${err.stack}`)
})

server.bind(3034)