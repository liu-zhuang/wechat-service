const onerror = require('koa-onerror'); // error handler 替代try...catch...
const errLog = require('debug')('err'); //错误日志

module.exports = app => {
	onerror(app, {
		all (error) {
			errLog(error);
		}
	});
}