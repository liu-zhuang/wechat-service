// 将request.body解析为xml
const xmlParser = require('koa-xml-body');

module.exports = app => {
	app.use(xmlParser());
}