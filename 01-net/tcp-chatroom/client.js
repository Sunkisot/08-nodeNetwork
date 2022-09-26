const net = require('net')
const types = require('./types')

let nickname = null

const client = net.createConnection({
  host: '127.0.0.1',
  port: 3024
})

client.on('connect', () => {
  console.log('成功连接到了服务器')
  // client.write('world')
  process.stdout.write('请输入昵称：')
  process.stdin.on('data', data => {
    data = data.toString().trim()
    if (!nickname) {
      client.write(JSON.stringify({
        type: types.login,
        nickname: data
      }))
      return
    }

    const matches = /^@(\w+)\s(.+)$/.test(data)
    // console.log(RegExp.$1, RegExp.$2)

    if (matches) {
      // 私聊消息
      client.write(JSON.stringify({
        type: types.p2p,
        message: RegExp.$2,
        nickname: RegExp.$1
      }))
    } else {
      // 群聊的消息
      client.write(JSON.stringify({
        type: types.broadcast,
        message: data
      }))
    }

  })
})

client.on('data', data => {
  data = JSON.parse(data)
  switch (data.type) {
    case types.login:
      if (!data.success) {
        console.log(`登录失败：${data.message}`)
        process.stdout.write('请输入昵称：')
      } else {
        console.log(`登录成功，当前在线用户：${data.sumUsers}`)
        nickname = data.nickname
      }
      break;
    case types.broadcast:
      console.log(`${data.nickname}:${data.message}`)
      break;
    case types.p2p:
      if (!data.success) {
        console.log(`发送失败：${data.message}`)
      } else {
        console.log(`${data.nickname}:${data.message}`)
      }
      break;
    case types.logout:
      console.log(`${data.message}`)
      break;
    case types.log:
      console.log(`${data.message}`)
      break;
    default:
      break;
  }
})

client.on('error', err => {
  console.log('连接出错：' + err)
})