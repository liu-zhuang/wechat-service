const bodyParser = require('koa-bodyparser');

module.exports = app => {
	// 解析request.body
	app.use(bodyParser());
}