const net = require('net')
const types = require('./types')
const server = net.createServer()

const users = []

server.on('connection', client => {
  client.on('data', data => {
    data = JSON.parse(data)
    switch (data.type) {
      case types.login:
        if (users.find(item => item.nickname == data.nickname)) {
          return client.write(JSON.stringify({
            type: types.login,
            success: false,
            message: '昵称已重复'
          }))
        }

        client.nickname = data.nickname
        users.forEach(user => {
          user.write(JSON.stringify({
            type: types.log,
            message: `${client.nickname}上线了，当前聊天室人数为：${users.length + 1}`
          }))
        })
        users.push(client)
        client.write(JSON.stringify({
          type: types.login,
          success: true,
          message: '登录成功',
          sumUsers: users.length,
          nickname: data.nickname
        }))
        break;
      case types.broadcast:
        users.forEach(item => {
          if (item !== client) {
            item.write(JSON.stringify({
              type: types.broadcast,
              message: data.message,
              nickname: client.nickname
            }))
          }
        })
        break;
      case types.p2p:
        let user = users.find(item => item.nickname == data.nickname)
        console.log(user, data.nickname)
        if (!user) {
          return client.write(JSON.stringify({
            type: types.p2p,
            success: false,
            message: '该用户不存在'
          }))
        }
        user.write(JSON.stringify({
          type: types.p2p,
          success: true,
          message: data.message,
          nickname: client.nickname
        }))
        break;
      default:
        break;
    }
  })

  client.on('end', () => {
    let index = users.findIndex(user => user.nickname === client.nickname)
    if (index !== -1) {
      users.splice(index, 1)
      users.forEach(user => {
        user.write(JSON.stringify({
          type: types.logout,
          message: `${client.nickname}离开了聊天室！当前聊天室剩余在线人数为：${users.length}`,
        }))
      })
    }
  })
})

server.listen(3024, () => {
  console.log('服务器运行在：3024端口')
})
