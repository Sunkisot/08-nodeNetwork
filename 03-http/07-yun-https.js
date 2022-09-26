const https = require('https');
const path = require('path')
const fs = require('fs');
const url = require('url')

const options = {
  key: fs.readFileSync(path.join(__dirname, './Nginx/2_yun.yun8.online.key')),
  cert: fs.readFileSync(path.join(__dirname, './Nginx/1_yun.yun8.online_bundle.crt'))
};

https.createServer(options, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' }) // html
  let url_obj = url.parse(req.url, true)
  if (req.method == 'GET') {
    if (url_obj.pathname === '/') {
      if (url_obj.query.kw != undefined) {
        res.end(`<p>hello world${url_obj.query.kw}</p>`)
      } else {
        res.write('<h1>Node.js</h1>')
      }
    }
  }
}).listen(3002);