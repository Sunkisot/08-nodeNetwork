const dgram = require('dgram')
const server = dgram.createSocket('udp4')

server.on('listening', () => {
  let address = server.address()
  console.log(`服务监听在${address.address}:${address.port}`)

  server.setBroadcast(true) // 开启广播模式

  server.send('hello', 3035, '255.255.255.255')

  setInterval(() => {
    // 直接地址 192.168.1.255
    // 受限地址 255.255.255.255
    server.send('hello', 3035, '192.168.1.255')
    server.send('hello', 3035, '255.255.255.255')
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