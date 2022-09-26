const dgram = require('dgram')
const client = dgram.createSocket('udp4')



client.on('listening', () => {
  let address = client.address()
  console.log(`服务监听在${address.address}:${address.port}`)

  client.addMembership('224.0.1.100')

})

client.on('message', (msg, rinfo) => {
  console.log(`收到了消息：${msg}, 来自${rinfo.address}:${rinfo.port}`)
})

client.on('error', (err) => {
  console.log(`服务出错：${err.stack}`)
})

client.bind(3035)