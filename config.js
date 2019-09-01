module.exports = function (app, express) {
  app.set('port', process.env.PORT || 3001);   //可以在启动服务器前通过设置环境变量覆盖端口
  app.use(express.static(__dirname + '/public'));   //静态资源
  app.use(require('body-parser').json());  //body解析
  app.use(require('body-parser').urlencoded({ extended: true}));
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Credentials", true);
    //允许的header类型
    res.header("Access-Control-Allow-Headers","content-type");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","DELETE,PUT,POST,GET,OPTIONS");
    if (req.method.toLowerCase() == 'options')
      res.send(200);  //让options尝试请求快速结束
    else
      next();
  });
  app.disable('x-powered-by');   //禁止返回服务器的信息
  app.listen(app.get('port'), function () {
    console.log('listening in ' + app.get('port') + ' ==== ' + app.get('env'));
  });
};
