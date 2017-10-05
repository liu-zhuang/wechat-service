// node_modules
const Koa = require('koa');
const devLog = require('debug')('dev'); // debugger的namespace是dev 命令行里DEBUG=dev或者*的时候才会输出

const R = require('ramda');
const path = require('path');
 
 // set middleware                                                          
let MIDDLEWARE = ['onerror', 'xmlBody', 'bodyparser', 'cors', 'helmet', 'router'];

// 定义构造函数
class Server {
	constructor () {
		this.app = new Koa();
		// log4js
		const logger = require('./util/logUtil');
		this.app.logger = logger;
		this.UseMiddleWare(this.app)(MIDDLEWARE);
		// 配置文件
		const config = require('./config/config');
		this.app.config = config;
	}
	UseMiddleWare (app) {
		return R.map(R.compose(
			m => m(app),
			require,
			m => path.resolve(__dirname, './middleware', `${m}`)
			));
	}
	async Start () {
		this.app.logger.debug({
			msg: 'botting server..a.'
		});
		this.app.listen(this.app.config.port);
	}
}
// 实例化koa
const server = new Server();
// 启动服务
server.Start();
devLog('%o booting', 'wechat service');

devLog('server is running at ' + server.app.config.port);