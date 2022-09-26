const net = require('net')

const client = net.createConnection({
  host: '127.0.0.1',
  port: 3048
})

client.on('connect', () => {
  console.log('成功连接到服务器了')

  // 当客户端与服务端建立连接成功后就可以给服务端发送数据了
  client.write('world')

  // 建立连接成功以后，监听终端输入
  // 获取终端的输入发送给服务端
  process.stdin.on('data', data => {
    // console.log('终端输入' + data.toString())
    client.write(data.toString().trim())
  })
})

// 客户端监听data事件
// 当服务端发送消息过来就会触发该事件
client.on('data', data => {
  console.log('服务端说：' + data.toString())
})