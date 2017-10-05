const helmet = require('koa-helmet'); // 安全

module.exports = app => {
	app.use(helmet());
}