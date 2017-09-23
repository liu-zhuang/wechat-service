// node_modules
const Koa = require('koa');
const Sha = require('sha1');
const xmlParser = require('koa-xml-body');
const bodyParser = require('koa-bodyparser');
const devLog = require('debug')('dev'); // debugger的namespace是dev 命令行里DEBUG=dev或者*的时候才会输出
const errLog = require('debug')('err'); //错误日志
// 配置文件
const config = require('./config/config');
// 自定义中间件
const validate = require('./middleware/validate.js');
const accessToken = require('./middleware/accessToken.js');
const logger = require('./middleware/logger.js');
// const reply = require('./middleware/replay.js');
// const xmlParse = require('./middleware/xmlParse.js');
// var json2xml = require('json2xml');

// 实例化koa
const app = new Koa();
devLog('%o booting', 'wechat service');
// 参数
const wechatconfig = {
	token: 'yebaomemeda'
};
// 将request.body解析为xml
app.use(xmlParser());
// 解析request.body
app.use(bodyParser());

app.use((ctx, next) =>{
	devLog(ctx.request.body);
	next();
});

// app.use(logger);

app.use(validate(wechatconfig));

app.use(accessToken.getAccessToken);
app.use(ctx=>{
	ctx.response.body ='success';
	devLog('success');
})
app.listen(config.port);

// console.log('server is running at ' + config.port);
devLog('server is running at ' + config.port);