const cors = require('koa2-cors'); // 跨域

module.exports = app => {
	app.use(cors());
}