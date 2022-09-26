const temp = require('art-template')

const ret = temp.render(`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>hello {{ message }}</h1>
    <ul>
      {{each todos}}
      <li>{{ $value.title }} <input type="checkbox" {{ $value.completed ? 'checked' : '' }} /> </li>
      {{ /each }}
    </ul>
  </body>
  </html>
  `, {
  message: 'world',
  todos: [
    {
      title: '吃饭',
      completed: false
    },
    {
      title: '睡觉',
      completed: true
    },
    {
      title: '打豆豆',
      completed: false
    },
  ]
})

console.log(ret)