const express = require('express');
const app = express();
require('./config')(app, express);   //默认配置

//nodemon
//路由（要放在404前面）
const routes = require('./routes/routes');
routes(app);

//app.use添加中间件
//404处理器
app.use(function (req, res) {
  res.type('text/plain');
  res.status(404);
  res.send('404 not found');
});

//500界面
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 page');
});

