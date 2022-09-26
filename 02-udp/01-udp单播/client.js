const dgram = require('dgram')
const client = dgram.createSocket('udp4')

client.send('hello', 3034, 'localhost')

client.on('listening', () => {
  let address = client.address()
  console.log(`服务监听在${address.address}:${address.port}`)
})

client.on('message', (msg, rinfo) => {
  console.log(`收到了消息：${msg}, 来自${rinfo.address}:${rinfo.port}`)
})

client.on('error', (err) => {
  console.log(`服务出错：${err.stack}`)
})

// 如果此处绑定端口 send消息要在listening事件内进行
// client.bind(3035)