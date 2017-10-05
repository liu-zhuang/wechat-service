const Router =  require('koa-router');
const Sha = require('sha1');
const options = require('../config/options');

const router = app => {
	const router = new Router();
	router.get('/wechat-get', (ctx, next) => {
		let {signature, timestamp, nonce, echostr} = ctx.query;
		let sort = [options.wechat.token, timestamp, nonce].sort().join('');
		let sha1 = Sha(sort);
		if (sha1 === signature) {
			ctx.response.body = echostr;
			app.logger.debug({
				msg: 'validate success'
			});
			next();
		} else {
			ctx.response.body = 'Fail';
			app.logger.debug({
				msg: 'validate fail'
			});
		}
	});

	app.use(router.routes());
	// app.use(router.allowMethods());
}

module.exports = router;